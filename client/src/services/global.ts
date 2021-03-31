import { createContext } from "react";
import axios from "axios";
import {
  observable, action, makeObservable, computed, runInAction, toJS,
} from "mobx";
import { Utils, CloudClient } from "avcore/client";
import SocketIO from "socket.io-client";

import { setBearerToken, clearBearerToken } from "../axios/instance";
import { checkNotifications, getNotificationList, removeNotification } from "../axios/routes/notifications";
import { getContactList, removeUserFromContactList, addUserToContactList } from "../axios/routes/contacts";
import { userProfile, avcoreCredentials, setReadHint } from "../axios/routes/user";

import { vibrate } from "../utils/vibration";

import ringtone from "../assets/audio/ringtone.mp3";

import { showErrorNotification, showInfoNotification } from "../utils/notification";
import { createAddToFriednsInvitation, createInvitationAcceptedNotification, createRemovedFromContactsNotification, createMissedCallNotification } from "../shared/utils";
import { SERVER_BASE_URL } from "../utils/constants";
import { MediaType, ActionStatus, GlobalServiceStatus } from "../interfaces/global";
import {
  UserProfileResponse, CloudCredentials, Notification, ContactItem, NotificationTypes, HintTypes,
} from "../shared/interfaces";

import {
  Kinds, CLIENT_ONLY_ACTIONS, ACTIONS, LobbyCallEventData,
  MakeLobbyCallResponse, ErrorData, UserStatus, APNCallRequest,
  APNCallCancel, APNCallTimeout,
} from "../shared/socket";
import { CallSocket } from "../interfaces/Socket";
import { ALL_USERS_ARE_UNAVAILABLE } from "../shared/errors";
// eslint-disable-next-line import/no-cycle
import { logger } from "./logger";

/**
 * Endpoint that is controlled by service-worker
 * to store JWT tokens
 * was designed mainly for IOS devices with Safari
 */
const DUMMY_ENDPOINT = "/token";
const audioPlayer = new Audio(ringtone);

export interface ContactItemWithStatus extends ContactItem {
  status: UserStatus;
}

export interface LobbyCallEventDataExtended extends LobbyCallEventData {
  isFriend: boolean;
}

export interface LobbyCallResponse extends MakeLobbyCallResponse {
  isFriend: boolean;
  onTimeoutHandler?: (callId: string, userId: string) => void;
  onCancelHandler?: (callId: string, userId: string) => void;
}

class GlobalMobxService {
  @observable serviceStatus: GlobalServiceStatus = GlobalServiceStatus.IDLE;

  @observable socket: CallSocket = null;

  private videoPermissions = false;

  private audioPermissions = false;

  @observable camera = true;

  @observable micro = true;

  @observable volume = true;

  @observable cameraMode: VideoFacingModeEnum = "user";

  @observable action: ActionStatus = null;

  @observable token: string = null;

  @observable firebaseToken: string = null;

  @observable profile: UserProfileResponse = null;

  public cloud: CloudCredentials = null;

  @observable avcoreCloudClient: CloudClient = null;

  @observable incommingCallData: LobbyCallEventDataExtended = null;

  @observable notifications: Array<Notification> = [];

  @observable contacts: Array<ContactItemWithStatus> = [];

  @observable onlineUsers: Array<string> = [];

  @observable busyUsers: Array<string> = [];

  public currentCommentRoomSubscribtion = null;

  constructor() {
    this.serviceStatus = GlobalServiceStatus.AUTHENTICATING;
    this.initializeService();
    makeObservable(this);
  }

  /**
   * General operations
   */
  private initializeService = async () => {
    try {
      const response = await axios.get(DUMMY_ENDPOINT);
      const { token } = response.data;

      this.token = token;

      this.serviceStatus = GlobalServiceStatus.SETTING_UP;

      if (this.token) {
        setBearerToken(this.token);
        // TODO: empty string for API compatibility, remove it later
        await this.fetchUserProfile("");
        this.joinLobby();
        this.fetchUserNotifications();
        this.fetchUserContacts();
        this.initializeAvcoreCloudClient();
      }

      this.initializeMedia();

      this.serviceStatus = GlobalServiceStatus.INITIALIZED;
    } catch (err) {
      console.log("> Expected error from worker's endpoint not found from token", err);
    }
  }

  login = async (token: string) => {
    this.token = token;

    /**
     * A dummy endpoint is not found by axios even though it works
     * Silence error here
     */
    axios.post("/token", { token }).catch(() => console.log("> Token was saved"));

    setBearerToken(this.token);
    await this.fetchUserProfile("");
    this.initializeAvcoreCloudClient();
    this.joinLobby();
    this.action = "success";

    this.fetchUserNotifications();
    this.fetchUserContacts();
  }

  private fetchUserProfile = async (firebaseToken: string) => {
    try {
      this.profile = await userProfile({ firebaseToken });
      console.log(`> Following firebase token was set to the profile: ${this.profile?.firebaseToken?.slice(0, 10)}...`);
    } catch (err) {
      showErrorNotification(err.message);
      if (err.message === "User with such credentials not found") {
        this.logout();
      }
    }
  }

  public updateHintAndProfile = async (type: HintTypes) => {
    try {
      this.profile = await setReadHint({ type });
    } catch (err) {
      showErrorNotification(err.message);
    }
  }

  logout = async () => {
    vibrate("click");

    /**
     * A dummy endpoint is not found by axios even though it works
     * Silence error here
     */
    axios.delete("/token").catch(() => console.log("> Token was removed"));

    this.token = null;
    clearBearerToken();

    if (this.socket) {
      this.socket.disconnect();
    }
  }

  @action setAction = (status: ActionStatus) => {
    this.action = status;
  }

  /**
   * Lobby
   */
  @action joinLobby = () => {
    this.socket = SocketIO(SERVER_BASE_URL, {
      transports: ["websocket"],
      query: `auth_token=${this.token}&socketId=${this.profile._id}-socket`,
    }) as CallSocket;

    this.socket.on("connect", () => {
      this.socket.emit(ACTIONS.JOIN_LOBBY, {
        self_id: this.profile._id,
        self_name: this.profile.name,
        self_image: this.profile.imageUrl || null,
      },
      ({ onlineUsers, busyUsers }) => {
        logger.log("info", "global.ts", "You've joined the the Waiting Lobby!", true, true);
        this.onlineUsers = onlineUsers;
        this.busyUsers = busyUsers;

        this.contacts.forEach((c) => {
          if (this.onlineUsers.includes(c._id)) c.status = "online";
          if (this.busyUsers.includes(c._id)) c.status = "busy";
        });
        console.log("> Online users in the lobby: ", toJS(this.onlineUsers));
        console.log("> Busy users in the lobby: ", toJS(this.busyUsers));
      });

      this.socket.on(CLIENT_ONLY_ACTIONS.LOBBY_CALL, (data) => {
        logger.log("info", "global.ts", `You've been called by ${data.caller_name} from room with id ${data.call_id}`, true, true);

        runInAction(() => {
          this.incommingCallData = {
            ...data,
            isFriend: this.isContact(data.caller_id),
          };
        });
      });

      this.socket.on(CLIENT_ONLY_ACTIONS.NOTIFICATION, (notification) => {
        console.log(`> You've got notifications from ${notification.user.name}. Notification: `, notification);

        switch (notification.type) {
          case NotificationTypes.ACCEPTED_INVITATION: {
            this.fetchUserContacts();

            // Removing invitation, if it is already accepted
            const index = this.notifications
              .findIndex((n) => n.type === NotificationTypes.INVITATION
                && n.user._id === notification.user._id);

            runInAction(() => {
              if (index !== -1) {
                this.notifications.splice(index, 1);
              }
              this.notifications = [notification, ...this.notifications];
            });

            break;
          }
          case NotificationTypes.REMOVED_FROM_CONTACTS:
            this.fetchUserContacts();
            break;
          default:
            runInAction(() => {
              this.notifications = [notification, ...this.notifications];
            });
        }
      });

      this.socket.on(CLIENT_ONLY_ACTIONS.USER_STATUS, ({ status, user_id }) => {
        if (status === "online") {
          const oldStatus = this.busyUsers.indexOf(user_id);
          if (oldStatus !== -1) this.busyUsers.splice(oldStatus, 1);

          this.onlineUsers.push(user_id);
        } else if (status === "busy") {
          const oldStatus = this.onlineUsers.indexOf(user_id);
          if (oldStatus !== -1) this.onlineUsers.splice(oldStatus, 1);

          this.busyUsers.push(user_id);
        } else if (status === "offline") {
          const oldOnlineStatus = this.onlineUsers.indexOf(user_id);
          if (oldOnlineStatus !== -1) {
            this.onlineUsers.splice(oldOnlineStatus, 1);
          } else {
            const oldBusyStatus = this.busyUsers.indexOf(user_id);
            if (oldBusyStatus !== -1) this.busyUsers.splice(oldBusyStatus, 1);
          }
        }

        this.contacts.forEach((c) => {
          if (c._id === user_id) {
            c.status = status;
          }
        });

        // TODO: remove in production (may take a huge amount of browser's performance)
        console.log("> Online users in lobby changed: ", toJS(this.onlineUsers));
        console.log("> Busy users in lobby changed: ", toJS(this.busyUsers));
        console.log("> Contacts' status changed: ", toJS(this.contacts));
      });
    });
  }

  public clearIncommingCallData = () => {
    this.incommingCallData = null;
  }

  public callRandomUser = (
    callId: string,
    callback: (data: LobbyCallResponse | ErrorData, error?: boolean) => void,
  ) => {
    if (!this.onlineUsers.length) {
      // no users in the lobby, make call via APN
      this.APNCall(callId, callback);
    } else {
      // there are online users in the lobby, prioritize them
      const randomOnlineUser = this.onlineUsers[
        Math.floor(Math.random() * this.onlineUsers.length)];

      this.callSpecificUser(callId, randomOnlineUser, callback, true);
    }
  }

  public APNCall = (
    callId: string,
    callback: (data: LobbyCallResponse | ErrorData, error?: boolean) => void,
  ) => {
    const requestData: APNCallRequest = { call_id: callId };

    this.socket.emit(ACTIONS.MAKE_APN_CALL, requestData, (data) => {
      if ("errorId" in data) {
        this.stopAudio();
        showInfoNotification(data.error);
        callback(null, true);
      } else {
        console.log(`> Trying to make APN call to ${data.participant_name}`);
        callback({
          ...data,
          isFriend: false,
          onCancelHandler: this.cancelAPNCallHandler,
          onTimeoutHandler: this.APNCallTimeoutHandler,
        });
      }
    });
  }

  private cancelAPNCallHandler = (callId: string, userId: string) => {
    console.log("> Cancelling APN call...");

    const requestData: APNCallCancel = { call_id: callId, user_id: userId };
    this.socket.emit(ACTIONS.CANCEL_APN_CALL, requestData, () => {
      console.log("> CANCEL_APN_CALL event success");
    });
  }

  private APNCallTimeoutHandler = (callId: string, userId: string) => {
    console.log("> APN call timeout...");

    const requestData: APNCallTimeout = { call_id: callId, user_id: userId };
    this.socket.emit(ACTIONS.APN_CALL_TIMEOUT, requestData, () => {
      console.log("> APN_CALL_TIMEOUT event success");
    });
  }

  public callSpecificUser = (
    callId: string,
    userId: string,
    callback: (data: LobbyCallResponse | ErrorData, error?: boolean) => void,
    isRandomCall = false,
  ) => {
    logger.log("info", "global.ts", `MAKE_LOBBY_CALL to ${userId} (generated callId: ${callId})`, true, true);
    this.socket.emit(
      ACTIONS.MAKE_LOBBY_CALL, { call_id: callId, _id: userId, isRandomCall }, (data) => {
        if ("errorId" in data) {
          this.stopAudio();
          showErrorNotification(data.error);
          callback(data);
        } else {
          console.log(`> Trying to call to ${data.participant_name}`);
          callback({
            ...data,
            isFriend: isRandomCall ? false : this.isContact(data.participant_id),
          });
        }
      },
    );
  }

  /**
   * Notifications
   */
  public sendAddToFriendInvitation = (
    target_id: string,
    callback: () => void,
  ) => {
    this.socket.emit(
      ACTIONS.SEND_INVITATION,
      {
        target_id,
        notification: createAddToFriednsInvitation({
          _id: this.profile._id,
          name: this.profile.name,
          imageUrl: this.profile.imageUrl,
        }),
      },
      () => {
        console.log("> Invitation has been sent");
        callback();
      },
    );
  }

  public sendMissedCallNotification = () => {
    this.socket.emit(ACTIONS.SEND_MISSED_CALL_NOTIFICATION, {
      notification: createMissedCallNotification({
        _id: this.profile._id,
        name: this.profile.name,
        imageUrl: this.profile.imageUrl,
      }),
    },
    () => {
      console.log("> Missed call notification has been sent to you");
    });
  }

  private fetchUserNotifications = async () => {
    try {
      this.notifications = await getNotificationList() || [];
    } catch (err) {
      showErrorNotification(err.message);
    }
  }

  public deleteNotification = async (id: string) => {
    try {
      if (await removeNotification({ notification_id: id })) {
        this.notifications = this.notifications.filter((n) => n._id !== id);
      }
    } catch (err) {
      showErrorNotification(err.message);
    }
  }

  public checkNotificationsStatus = async () => {
    try {
      const unreadNotifications = this.notifications
        .reduce<Array<string>>((acc, n) => (n.read ? acc : [...acc, n._id]), []);

      if (!unreadNotifications.length) {
        console.log("> All notifications are already read");
      } else {
        console.log("> Mark following notifications as read: ", unreadNotifications);
        if (await checkNotifications({ notifications: unreadNotifications })) {
          this.notifications = this.notifications.map((n) => ({
            ...n,
            read: true,
          }));
        }
      }
    } catch (err) {
      showErrorNotification(err.message);
    }
  }

  /**
   * Contacts
   */
  public fetchUserContacts = async () => {
    try {
      const contacts = await getContactList();

      this.contacts = contacts.map((contact) => {
        let status: UserStatus = "offline";
        if (this.onlineUsers.includes(contact._id)) status = "online";
        if (this.busyUsers.includes(contact._id)) status = "busy";

        return {
          ...contact,
          status,
        };
      });
    } catch (err) {
      showErrorNotification(err.message);
    }
  }

  public addContact = async (userId: string, callback: () => void) => {
    try {
      if (await addUserToContactList({ contactPerson: userId })) {
        showInfoNotification("User in your contacts now");
        this.socket.emit(
          ACTIONS.SEND_INVITATION_ACCEPTED,
          {
            target_id: userId,
            notification: createInvitationAcceptedNotification({
              _id: this.profile._id,
              name: this.profile.name,
              imageUrl: this.profile.imageUrl,
            }),
          },
          () => {
            console.log("> Notifications (invitation accepted) has been sent");
            callback();
          },
        );
      }
    } catch (err) {
      showErrorNotification(err.message);
    }
  };

  public isContact = (userId: string): boolean => !!this.contacts.find((c) => c._id === userId)

  public removeContact = async (userId: string): Promise<boolean> => {
    try {
      if (await removeUserFromContactList({ contactPerson: userId })) {
        this.contacts = this.contacts.filter((c) => c._id !== userId);

        this.socket.emit(
          ACTIONS.SEND_REMOVED_FROM_CONTACTS,
          {
            target_id: userId,
            notification: createRemovedFromContactsNotification({
              _id: this.profile._id,
              name: this.profile.name,
              imageUrl: this.profile.imageUrl,
            }),
          },
          () => {
            console.log("> User was removed from your contact list");
          },
        );

        return true;
      }
      showErrorNotification("Something went wrong while deleting a contact");
      return false;
    } catch (err) {
      showErrorNotification(err.message);
      return false;
    }
  }

  public canCallToUser = (userId: string): boolean => this.onlineUsers.includes(userId);

  /**
   * Recordings
   */
  public joinRecordingCommentsRoom = (recordingId: string): void => {
    this.socket.emit(ACTIONS.JOIN_RECORDING_COMMENTS_ROOM, { recordingId }, () => {
      this.currentCommentRoomSubscribtion = recordingId;
      console.log(`You've joined comments room for recording ${recordingId}`);
    });
  }

  public leaveRecordingCommentsRoom = (recordingId: string): void => {
    this.socket.emit(ACTIONS.LEAVE_RECORDING_COMMENTS_ROOM, { recordingId }, () => {
      this.currentCommentRoomSubscribtion = null;
      console.log(`You've left comments room for recording ${recordingId}`);
    });
  }

  /**
   * Media operations
   */
  @action public toggleCameraMode = (): void => {
    vibrate("click");
    if (this.cameraMode === "environment") {
      this.cameraMode = "user";
    } else {
      this.cameraMode = "environment";
    }
  }

  @action public toggleMedia = (type: MediaType): void => {
    vibrate("click");
    switch (type) {
      case MediaType.CAMERA:
        this.camera = !this.camera;
        break;
      case MediaType.MICRO:
        this.micro = !this.micro;
        break;
      case MediaType.VOLUME:
        this.volume = !this.volume;
        break;
      default:
        break;
    }
  }

  @computed get kinds() {
    return this.generateKindsFromMedia();
  }

  public generateKindsFromMedia = (): Kinds => {
    const kinds: Kinds = [];
    if (this.camera) kinds.push("video");
    if (this.micro) kinds.push("audio");
    return kinds;
  }

  @action resetMedia = () => {
    this.micro = true;
    this.camera = true;
    this.volume = true;
  }

  @action setVolumeValueFromSafari = (value: boolean) => {
    this.volume = value;
  }

  private initializeMedia = async () => {
    // TODO: find a workaround for Safari requesting permissions every time
    if (Utils.isSafari) {
      this.camera = true;
      this.videoPermissions = true;
      this.volume = true;
      this.audioPermissions = true;

      return;
    }

    await this.providedPermissions();

    if (!this.videoPermissions && !this.audioPermissions) {
      const videoPermissionsPromise = this.requestMediaPermissions(true, false);
      const audioPermissionsPromise = this.requestMediaPermissions(false, true);

      const videoPermissions = await videoPermissionsPromise;
      const audioPermissions = await audioPermissionsPromise;

      runInAction(() => {
        this.videoPermissions = videoPermissions;
        this.camera = videoPermissions;

        this.audioPermissions = audioPermissions;
        this.micro = audioPermissions;
      });
    }

    console.log("> Media has been initialized!");
  }

  /**
   * Returns available permissions based on the devices availability
   * If there's a device with id for a specific kind than the permission for this kind was provided
   * @returns Promise
   */
  private providedPermissions = async () => {
    if (navigator.mediaDevices?.enumerateDevices) {
      const devices = await navigator.mediaDevices.enumerateDevices();
      devices.forEach((device) => {
        if (device.kind === "videoinput" && device.deviceId) {
          runInAction(() => {
            this.videoPermissions = true;
            this.camera = true;
          });
        } else if (device.kind === "audioinput" && device.deviceId) {
          runInAction(() => {
            this.audioPermissions = true;
            this.micro = true;
          });
        }
      });
    }
  }

  private requestMediaPermissions = async (video: boolean, audio: boolean): Promise<boolean> => {
    try {
      const temporaryStream = await Utils.getUserMedia({ audio, video });
      temporaryStream.getTracks().forEach((t) => t.stop());

      return true;
    } catch (err) {
    // TODO: success handler for "permission denied"
      showErrorNotification(err.message);
      return false;
    }
  };

  private initializeAvcoreCloudClient = async () => {
    try {
      if (!this.cloud && !this.avcoreCloudClient) {
        this.cloud = await avcoreCredentials();
        this.avcoreCloudClient = new CloudClient(this.cloud.url, this.cloud.token);

        logger.log("info", "global.ts", `Avcore CloudClient has been initialized with token: ${this.cloud.token} and url: ${this.cloud.url}`, true, true);
      }
    } catch (err) {
      showErrorNotification(err.message);
    }
  }

  /**
   * Ringtone control
   */
  private player: HTMLAudioElement = null;

  public setSafariPlayer = (player: HTMLAudioElement) => {
    this.player = player;
  }

  public playAudio = () => {
    if (Utils.isSafari) {
      this.player.src = ringtone;
      this.player.muted = false;
      this.player.play();
    } else {
      audioPlayer.play();
    }
  }

  public stopAudio = () => {
    if (Utils.isSafari) {
      this.player.muted = true;
      this.player.pause();
      this.player.currentTime = 0;
    } else {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
    }
  }
}

export const GlobalStorage = new GlobalMobxService();

export const GlobalStorageContext = createContext(GlobalStorage);
