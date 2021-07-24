import { observable, makeAutoObservable } from "mobx";
import { createContext } from "react";
import { getSharedRecordingById } from "../axios/routes/feed";
import { GetRecordResponse } from "../shared/interfaces";
import { showErrorNotification } from "../utils/notification";

class SharedMobxService {
  @observable sharedRecording: GetRecordResponse = null;

  @observable sharedRecordingID: string = null;

  constructor() {
    makeAutoObservable(this);
  }

  public setShareCurrentRecordingID = async (id: string) => {
    try {
      this.sharedRecordingID = id;
      this.setShareCurrentRecording(this.sharedRecordingID);
    } catch (err) {
      showErrorNotification(err.message);
    }
  }

  public setShareCurrentRecording = async (id: string) => {
    try {
      const recording = await getSharedRecordingById(id);

      this.sharedRecording = recording;
    } catch (err) {
      showErrorNotification(err.message);
    }
  }
}

export const SharedStorage = new SharedMobxService();

export const SharedStorageContext = createContext(SharedStorage);
