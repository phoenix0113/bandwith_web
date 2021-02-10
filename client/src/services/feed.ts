import { action, makeAutoObservable, observable, runInAction, toJS } from "mobx";
import { createContext } from "react";
import { getRecordingById, getRecordingsList } from "../axios/routes/feed";
import { GetRecordResponse } from "../shared/interfaces";
import { LOAD_MORE_RECORDINGS_THRESHOLD, RECORDINGS_LOAD_LIMIT } from "../utils/constants";
import { showErrorNotification } from "../utils/notification";
import { GlobalStorage } from "./global";

class FeedMobxService {
  @observable currentRecording: GetRecordResponse = null;

  @observable sharedRecording: GetRecordResponse = null;

  @observable recordings: Array<GetRecordResponse> = [];

  @observable allRecordingsLoaded = false;

  constructor() {
    makeAutoObservable(this);
    this.loadRecordings();
  }

  private loadRecordings = async () => {
    try {
      const { recordings } = await getRecordingsList({
        limit: RECORDINGS_LOAD_LIMIT, offset: this.recordings.length,
      });

      runInAction(() => {
        this.recordings.push(...recordings);
        if (!this.recordings.length && recordings.length) {
          this.currentRecording = recordings[0];
          this.setCurrentRecording(recordings[0]._id);
        }
      });

      if (recordings.length < RECORDINGS_LOAD_LIMIT) {
        this.allRecordingsLoaded = true;
        console.log("> All stored recordings were loaded");
      }
    } catch (err) {
      showErrorNotification(err.message);
    }
  }

  public fetchSharedRecording = async (id: string) => {
    console.log("> Trying to fetch shared recording");
    try {
      const recording = await getRecordingById(id);
      console.log("> Shared recording: ", recording);

      this.sharedRecording = recording;
      this.currentRecording = recording;
      if (GlobalStorage.currentCommentRoomSubscribtion) {
        GlobalStorage.leaveRecordingCommentsRoom(this.currentRecording._id);
      }
      GlobalStorage.joinRecordingCommentsRoom(recording._id);
    } catch (err) {
      showErrorNotification(err.message);
    }
  }

  @action public cleanSharedRecording = () => {
    this.sharedRecording = null;
    if (GlobalStorage.currentCommentRoomSubscribtion) {
      GlobalStorage.leaveRecordingCommentsRoom(this.currentRecording._id);
    }
    if (this.recordings.length) {
      this.currentRecording = this.recordings[0];
      GlobalStorage.joinRecordingCommentsRoom(this.currentRecording._id);
    }
  }

  @action public setCurrentRecording = (_id: string) => {
    if (GlobalStorage.currentCommentRoomSubscribtion) {
      GlobalStorage.leaveRecordingCommentsRoom(this.currentRecording._id);
    }

    const currentIndex = this.recordings.findIndex((r) => r._id === _id);
    console.log(`> Current recording (index: ${currentIndex}):`, toJS(this.recordings[currentIndex]));
    this.currentRecording = this.recordings[currentIndex];

    GlobalStorage.joinRecordingCommentsRoom(this.currentRecording._id);

    if (
      currentIndex + LOAD_MORE_RECORDINGS_THRESHOLD >= this.recordings.length
       && !this.allRecordingsLoaded) {
      console.log("> Loading more recordings due to threshold");
      this.loadRecordings();
    }
  }
}

export const FeedStorage = new FeedMobxService();

export const FeedStorageContext = createContext(FeedStorage);
