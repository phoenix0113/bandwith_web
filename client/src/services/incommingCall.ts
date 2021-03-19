import { createContext } from "react";
import {
  observable, makeObservable, runInAction, action, reaction, toJS,
} from "mobx";

import { GlobalStorage, LobbyCallEventDataExtended } from "./global";
import { AVCoreCall, CallType } from "./avcoreCall";

import { ACTIONS, CLIENT_ONLY_ACTIONS } from "../shared/socket";
import { CallParticipantData, IncommingCallStatus, OutgoingCallStatus } from "../interfaces/call";

import { vibrate } from "../utils/vibration";
import { logger } from "./logger";
import { showInfoNotification } from "../utils/notification";

class IncommingCallMobxService extends AVCoreCall {
  @observable status: IncommingCallStatus = null;

  @observable callParticipantData: CallParticipantData;

  constructor() {
    super(CallType.INCOMMING);
    makeObservable(this);

    reaction(
      () => GlobalStorage.incommingCallData,
      (incommingCallData) => {
        if (incommingCallData) {
          logger.log("info", "incommingCall.ts", `Call is being initialized... Current status: ${this.status}`);
          if (this.status !== IncommingCallStatus.INCOMMING) {
            this.status = IncommingCallStatus.INCOMMING;
            GlobalStorage.playAudio();
            this.initializeCall(incommingCallData);
          }
        } else {
          logger.log("info", "incommingCall.ts", `Can't initialize call. Current service status: ${this.status}`, true, true);
        }
      },
    );

    this.status = IncommingCallStatus.INITIALIZED;
  }

  public initializeCall = (incommingCallData: LobbyCallEventDataExtended) => {
    runInAction(() => {
      console.log("> Call participant data: ", toJS(incommingCallData));
      logger.log("info", "incommingCall.ts", `Call participant data: ${incommingCallData.caller_id}|${incommingCallData.caller_name}`);

      this.callParticipantData = {
        id: incommingCallData.caller_id,
        name: incommingCallData.caller_name,
        image: incommingCallData.caller_image,
        socketId: incommingCallData.caller_socket,
        isFriend: incommingCallData.isFriend,
      };
      this.callId = incommingCallData.call_id;
    });

    GlobalStorage.socket.emit(
      ACTIONS.JOIN_CALL, { callId: this.callId, socketId: GlobalStorage.socket.id }, () => {
        logger.log("info", "incommingCall.ts", `You have joined room (as a receiver) with id ${this.callId}`, true);
      },
    );

    GlobalStorage.socket.on(ACTIONS.STREAM_START, (data) => {
      logger.log("info", "incommingCall.ts", `STREAM_START event with stream ${data.stream}. Subscribing...`, true);
      this.subscribeToStream(data.kinds, data.stream);
    });

    GlobalStorage.socket.on(ACTIONS.STREAM_CHANGE, (data) => {
      logger.log("info", "incommingCall.ts", `STREAM_CHANGE event with stream ${data.stream}. Updating subscription...`, true);
      this.updateSubscribedStream(data.kinds, data.stream);
    });

    GlobalStorage.socket.on(ACTIONS.STREAM_STOP, (data) => {
      logger.log("info", "incommingCall.ts", `STREAM_STOP event with stream ${data.stream}. Closing subscription...`, true);
      this.closeSubscribedStream();
    });

    GlobalStorage.socket.on(ACTIONS.CALL_STATUS_FROM_INITIATOR, ({ status }) => {
      switch (status) {
        case OutgoingCallStatus.CANCELED:
          logger.log("info", "incommingCall.ts", "Initiator canceled call", true, true);
          this.onInitiatorsCancel();
          break;
        case OutgoingCallStatus.NO_RESPONSE:
          logger.log("info", "incommingCall.ts", "Timeout (15sec) expired. Call was missed", true, true);
          this.onInitiatorsNoResponse();
          break;
        case OutgoingCallStatus.FINISHED:
          logger.log("info", "incommingCall.ts", "Call was finished by initiator", true, true);
          this.onInitiatorsFinished();
          break;
        default:
          throw new Error("> Unexpected call status");
      }
    });

    GlobalStorage.socket.on(CLIENT_ONLY_ACTIONS.PARTICIPANT_DISCONNECTED, ({ userId, callId }) => {
      console.log(`> Participant ${userId} was disconnected from the call ${callId} due to long absence`);
      showInfoNotification("Participant was disconnected from call due to long absence");
      this.onInitiatorsFinished();
    });

    GlobalStorage.socket.on(CLIENT_ONLY_ACTIONS.SELF_DISCONNECTED, ({ callId }) => {
      console.log(`> You was disconnected from the call ${callId} due to long absence`);
      showInfoNotification("You was disconnected from call due to long absence");

      this.closeSubscribedStream();

      // TODO: check if this is safe to call this function that
      // includes already called on server events in socket.emit
      this.onInitiatorsFinished();
    });
  }

  public resetIncommingCall = () => {
    this.resetService();
  }

  public onAcceptCall = () => {
    GlobalStorage.stopAudio();
    vibrate("click");
    this.setStatusAndNotify(IncommingCallStatus.ACCEPT, async () => {
      logger.log("info", "incommingCall.ts", "You acceped call. Starting a stream and init viewers tracker. ACCEPT status was sent", true, true);
      this.trackViewers();
      this.trackParticipantAppStatuses();
      this.startStreaming();
    });
  }

  public onRejectCall = () => {
    GlobalStorage.stopAudio();
    vibrate("click");
    this.setStatusAndNotify(IncommingCallStatus.REJECT, () => {
      logger.log("info", "incommingCall.ts", "You rejected call. REJECT status was sent", true, true);
      this.leaveCall(() => {
        this.resetService();
      });
    });
  }

  public endCall = () => {
    vibrate("click");
    this.setStatusAndNotify(IncommingCallStatus.FINISHED, () => {
      logger.log("info", "incommingCall.ts", "Call was finished from your side. FINISHED status was sent", true, true);
      this.stopStreaming(() => {
        this.leaveCall();
      });
    });
  }

  @action private onInitiatorsCancel = () => {
    GlobalStorage.stopAudio();
    this.status = IncommingCallStatus.CANCELED;
    this.leaveCall(() => {
      this.resetService();
    });
  }

  @action private onInitiatorsNoResponse = () => {
    GlobalStorage.stopAudio();
    this.status = IncommingCallStatus.MISSED;
    this.leaveCall(() => {
      this.resetService();
    });
    GlobalStorage.sendMissedCallNotification();
  }

  @action private onInitiatorsFinished = () => {
    this.status = IncommingCallStatus.FINISHED;
    this.stopStreaming(() => {
      this.leaveCall();
    });
  }

  @action private setStatusAndNotify = (status: IncommingCallStatus, callback: () => void) => {
    this.status = status;
    GlobalStorage.socket.emit(
      ACTIONS.CALL_STATUS_FROM_RECEIVER,
      { status: this.status, socketId: GlobalStorage.socket.id, callId: this.callId },
      callback,
    );
  }

  @action private leaveCall = (callback?: () => void) => {
    GlobalStorage.socket.emit(ACTIONS.LEAVE_CALL, { callId: this.callId }, () => {
      logger.log("info", "incommingCall.ts", `You left the call room with id ${this.callId}`, true);

      this.stopTrackingViewers();
      this.stopTrackingParticipantAppStatuses();
      GlobalStorage.socket.off(ACTIONS.STREAM_START);
      GlobalStorage.socket.off(ACTIONS.STREAM_CHANGE);
      GlobalStorage.socket.off(ACTIONS.STREAM_STOP);
      GlobalStorage.socket.off(ACTIONS.CALL_STATUS_FROM_INITIATOR);
      GlobalStorage.socket.off(CLIENT_ONLY_ACTIONS.SELF_DISCONNECTED);
      GlobalStorage.socket.off(CLIENT_ONLY_ACTIONS.PARTICIPANT_DISCONNECTED);

      logger.log("info", "incommingCall.ts", "All listeners and trackers were cleaned", true);

      if (callback) {
        callback();
      }
    });
  }

  @action private resetService = () => {
    this.status = IncommingCallStatus.INITIALIZED;
    this.callParticipantData = null;
    this.callId = null;

    GlobalStorage.clearIncommingCallData();
    GlobalStorage.resetMedia();

    logger.log("info", "incommingCall.ts", "IncommingCall service was reset. Redirecting to Home page...", true, true);
  }
}

export const IncommingCallStorage = new IncommingCallMobxService();

export const IncommingCallStorageContext = createContext(IncommingCallStorage);
