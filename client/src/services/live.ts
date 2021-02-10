import { createContext } from "react";
import { observable, makeAutoObservable, runInAction } from "mobx";
import { API_OPERATION } from "avcore";
import { ConferenceApi } from "avcore/client";

import { GlobalStorage } from "./global";
import { ACTIONS, CLIENT_ONLY_ACTIONS, Kinds, ParticipantData } from "../shared/socket";
import { showInfoNotification } from "../utils/notification";
import { LiveCallStatus } from "../interfaces/call";

class LiveCallMobXService {
  private callId: string = null;

  @observable firstParticipant: ParticipantData = null;

  @observable secondParticipant: ParticipantData = null;

  @observable callStatus: LiveCallStatus = null;

  @observable playback: ConferenceApi = null;

  @observable liveStream: MediaStream = null;

  constructor() {
    makeAutoObservable(this);
    this.callStatus = LiveCallStatus.INITIALIZED;
  }

  public joinAsViewer = (callId: string) => {
    this.callId = callId;

    GlobalStorage.socket.emit(ACTIONS.JOIN_CALL_AS_VIEWER, { callId }, (data) => {
      console.log("> Trying to join a Live call");

      if ("errorId" in data) {
        showInfoNotification(data.error);
        this.callStatus = LiveCallStatus.MISSED;
        this.resetService();
      } else {
        runInAction(() => {
          this.firstParticipant = data.firstParticipant;
          this.secondParticipant = data.secondParticipant;
          this.callStatus = LiveCallStatus.IN_PROGRESS;
        });

        console.log(`> You have joined room (as a viewer) with id ${callId}`);

        GlobalStorage.socket.on(CLIENT_ONLY_ACTIONS.LIVE_CALL_ENDED, () => {
          showInfoNotification("Live call ended");
          this.callStatus = LiveCallStatus.FINISHED;
          this.resetService();
        });
      }
    });
  }

  public leaveCall = () => {
    this.callStatus = LiveCallStatus.FINISHED;
    this.resetService();
  }

  public subscribeToLiveStream = async () => {
    const kinds: Kinds = ["video", "audio"];

    console.log("> Subscribing to liveStream with id: ", this.callId);

    const playback = await GlobalStorage.avcoreCloudClient.create(
      API_OPERATION.SUBSCRIBE,
      this.callId,
      { kinds },
    );

    const liveStream = await playback.subscribe();

    runInAction(() => {
      this.liveStream = liveStream;
      this.playback = playback;
    });

    console.log(`> You've subscribed to the live stream with id ${this.callId}. Playing: [${kinds}]`);
  }

  private resetService = () => {
    GlobalStorage.socket.emit(ACTIONS.LEAVE_CALL_AS_VIEWER, { callId: this.callId }, () => {
      console.log(`> You left the room (as a viewer) with id ${this.callId}`);
    });
    GlobalStorage.socket.off(CLIENT_ONLY_ACTIONS.LIVE_CALL_ENDED);

    this.callId = null;

    setTimeout(() => {
      this.callStatus = LiveCallStatus.INITIALIZED;
    }, 1000);
  }
}

export const LiveCallStorage = new LiveCallMobXService();

export const LiveCallStorageContext = createContext(LiveCallStorage);
