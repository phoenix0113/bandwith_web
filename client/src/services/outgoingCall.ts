import { createContext } from "react";
import { v4 as uuid } from "uuid";
import { observable, makeObservable, action, runInAction, toJS } from "mobx";

import { AVCoreCall, CallType } from "./avcoreCall";
import { GlobalStorage, LobbyCallResponse } from "./global";

import { ACTIONS, CLIENT_ONLY_ACTIONS, ErrorData } from "../shared/socket";
import { CallParticipantData, IncommingCallStatus, OutgoingCallStatus } from "../interfaces/call";

import { vibrate } from "../utils/vibration";
import { showInfoNotification } from "../utils/notification";
import { logger } from "./logger";

class OutgoingCallMobxService extends AVCoreCall {
  @observable status: OutgoingCallStatus = null;

  @observable callParticipantData: CallParticipantData = null;

  constructor() {
    super(CallType.OUTGOING);
    makeObservable(this);
    this.status = OutgoingCallStatus.INITIALIZED;
  }

  public makeCall = (userId: string = null) => {
    vibrate("click");

    const callId = uuid();

    GlobalStorage.socket.emit(
      ACTIONS.JOIN_CALL,
      { callId, socketId: GlobalStorage.socket.id },
      async () => {
        console.log(`> You have joined room (as an initiator) with id ${callId}`);

        if (userId) {
          GlobalStorage.callSpecificUser(callId, userId, (data) => {
            this.handleCallCallback(data);
            runInAction(() => {
              this.callId = callId;
              GlobalStorage.playAudio();
              this.status = OutgoingCallStatus.WAITING_FOR_PARTICIPANT;
            });
          });
        } else {
          GlobalStorage.callRandomUser(callId, (data, error) => {
            if (error) {
              this.leaveCall(() => {
                this.resetService();
              });
            } else {
              this.handleCallCallback(data);
              runInAction(() => {
                this.callId = callId;
                if (!error) {
                  GlobalStorage.playAudio();
                }
                this.status = OutgoingCallStatus.WAITING_FOR_PARTICIPANT;
              });
            }
          });
        }
      },
    );

    GlobalStorage.socket.on(ACTIONS.JOIN_CALL, async (data) => {
      console.log(`> Socket ${data.socketId} joined ${data.callId} (receiver)`);
      logger.log("info", "outgoingCall.ts", `Socket ${data.socketId} joined ${data.callId} (receiver)`, true);
    });

    GlobalStorage.socket.on(ACTIONS.STREAM_START, (data) => {
      this.remoteStreamId = data.stream;
      logger.log("info", "outgoingCall.ts", `STREAM_START event with stream ${data.stream}. Subscribing...`, true);
      this.subscribeToStream(data.kinds, data.stream);
    });

    GlobalStorage.socket.on(ACTIONS.STREAM_CHANGE, (data) => {
      logger.log("info", "outgoingCall.ts", `STREAM_CHANGE event with stream ${data.stream}. Updating subscription...`, true);
      this.updateSubscribedStream(data.kinds, data.stream);
    });

    GlobalStorage.socket.on(ACTIONS.STREAM_STOP, (data) => {
      logger.log("info", "outgoingCall.ts", `STREAM_STOP event with stream ${data.stream}. Closing subscription...`, true);
      this.closeSubscribedStream();
    });

    GlobalStorage.socket.on(ACTIONS.CALL_STATUS_FROM_RECEIVER, ({ status }) => {
      switch (status) {
        case IncommingCallStatus.ACCEPT:
          logger.log("info", "outgoingCall.ts", "Call was accepted by receiver", true, true);
          this.onReceiversAccept();
          break;
        case IncommingCallStatus.REJECT:
          logger.log("info", "outgoingCall.ts", "Call was rejected by receiver", true, true, true);
          this.onReceiversReject();
          break;
        case IncommingCallStatus.FINISHED:
          logger.log("info", "outgoingCall.ts", "Call was finished by receiver", true, true);
          this.onReceiversFinish();
          break;
        default:
          throw new Error("> Unexpected call status");
      }
    });

    GlobalStorage.socket.on(CLIENT_ONLY_ACTIONS.PARTICIPANT_DISCONNECTED, (data) => {
      console.log(`> Participant ${data.userId} was disconnected from the call ${data.callId} due to long absence`);
      showInfoNotification("Participant was disconnected from call due to long absence");
      this.closeSubscribedStream();
      this.onReceiversFinish();
    });

    GlobalStorage.socket.on(CLIENT_ONLY_ACTIONS.SELF_DISCONNECTED, (data) => {
      console.log(`> You was disconnected from the call ${data.callId} due to long absence`);
      showInfoNotification("You was disconnected from call due to long absence");

      this.closeSubscribedStream();

      // TODO: check if this is safe to call this function that includes
      // already called on server events in socket.emit
      this.onReceiversFinish();
    });
  }

  private handleCallCallback = (data: LobbyCallResponse | ErrorData) => {
    if (!data || "errorId" in data) {
      this.leaveCall(() => {
        this.resetService();
      });
    } else {
      console.log("> Call participant data: ", toJS(data));
      this.callParticipantData = {
        id: data.participant_id,
        name: data.participant_name,
        image: data.participant_image,
        isFriend: data.isFriend,
      };
    }
  }

  public resetOutgoingCall = () => {
    this.resetService();
  }

  public noResponseHandler = () => {
    GlobalStorage.stopAudio();
    logger.log("info", "outgoingCall.ts", "Receiver didn't respond", true, true, true);
    this.setStatusAndNotify(OutgoingCallStatus.NO_RESPONSE, () => {
      this.leaveCall(() => {
        this.resetService();
      });
    });
  }

  public cancelCallHandler = () => {
    GlobalStorage.stopAudio();
    vibrate("click");
    logger.log("info", "outgoingCall.ts", "You canceled the call", true, true);
    this.setStatusAndNotify(OutgoingCallStatus.CANCELED, () => {
      this.leaveCall(() => {
        this.resetService();
      });
    });
  }

  public endCallHandler = () => {
    vibrate("click");
    this.setStatusAndNotify(OutgoingCallStatus.FINISHED, () => {
      logger.log("info", "outgoingCall.ts", "Call was finished from your side", true, true);
      this.stopStreaming(() => {
        this.leaveCall();
      });
    });
  }

  @action private onReceiversAccept = () => {
    GlobalStorage.stopAudio();
    this.status = OutgoingCallStatus.ANSWERED_BY_PARTICIPANT;

    this.trackViewers();
    this.trackParticipantAppStatuses();
    this.startStreaming();
  }

  @action private onReceiversReject = () => {
    GlobalStorage.stopAudio();
    this.status = OutgoingCallStatus.REJECTED_BY_PARTICIPANT;
    this.leaveCall(() => {
      this.resetService();
    });
  }

  @action private onReceiversFinish = () => {
    this.status = OutgoingCallStatus.FINISHED;
    this.stopStreaming(() => {
      this.leaveCall();
    });
  }

  @action private setStatusAndNotify = (status: OutgoingCallStatus, callback: () => void) => {
    this.status = status;
    GlobalStorage.socket.emit(
      ACTIONS.CALL_STATUS_FROM_INITIATOR,
      { status: this.status, socketId: GlobalStorage.socket.id, callId: this.callId },
      callback,
    );
  }

  @action private leaveCall = (callback?: () => void) => {
    GlobalStorage.socket.emit(ACTIONS.LEAVE_CALL, { callId: this.callId }, () => {
      logger.log("info", "outgoingCall.ts", `You left the call room with id ${this.callId}`, true);

      this.stopTrackingViewers();
      this.stopTrackingParticipantAppStatuses();
      GlobalStorage.socket.off(ACTIONS.STREAM_START);
      GlobalStorage.socket.off(ACTIONS.STREAM_CHANGE);
      GlobalStorage.socket.off(ACTIONS.STREAM_STOP);
      GlobalStorage.socket.off(ACTIONS.JOIN_CALL);
      GlobalStorage.socket.off(ACTIONS.CALL_STATUS_FROM_RECEIVER);
      GlobalStorage.socket.off(CLIENT_ONLY_ACTIONS.SELF_DISCONNECTED);
      GlobalStorage.socket.off(CLIENT_ONLY_ACTIONS.PARTICIPANT_DISCONNECTED);

      logger.log("info", "outgoingCall.ts", "All listeners and trackers were cleaned", true, true);

      if (callback) {
        callback();
      }
    });
  }

  @action private resetService = () => {
    this.status = OutgoingCallStatus.INITIALIZED;
    this.callParticipantData = null;
    this.callId = null;
    this.participantAppStatus = null;
    this.participantCallDetectorStatus = null;

    GlobalStorage.resetMedia();

    logger.log("info", "outgoingCall.ts", "OutgoingCall service was reset. Redirecting to Home page...", true, true);
  }
}

export const OutgoingCallStorage = new OutgoingCallMobxService();

export const OutgoingCallStorageContext = createContext(OutgoingCallStorage);
