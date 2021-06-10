import { makeAutoObservable, observable, runInAction } from "mobx";
import { createContext } from "react";
import axios from "axios";
import { CloudClient } from "avcore/client";
import { showErrorNotification } from "../utils/notification";
import { GetRecordResponse, User } from "../shared/interfaces";
import {
  getUserList, getVideoList, updateRecordingStatus, updateUserStatusByID, addBlockRecording,
  getUnblockedVideosByUserID, removeBlockRecording, getAvailableVideoList,
} from "../axios/routes/admin";
import { CallSocket } from "../interfaces/Socket";
import { GlobalServiceStatus } from "../interfaces/global";

const DUMMY_ENDPOINT = "/admin/token";

class AdminMobxService {
  @observable serviceStatus: GlobalServiceStatus = GlobalServiceStatus.IDLE;

  @observable avcoreCloudClient: CloudClient = null;

  @observable videos: Array<GetRecordResponse> = [];

  @observable availableVideos: Array<GetRecordResponse> = [];

  @observable users: Array<User> = [];

  @observable blockedIDs: Array<string> = [];

  @observable socket: CallSocket = null;

  @observable token: string = null;

  @observable allVideosLoaded = false;

  @observable allUsersLoaded = false;

  constructor() {
    makeAutoObservable(this);
    // this.initializeService();
    this.loadAllUsers();
    this.loadAllVideos();
    this.loadAvailableVideos();
  }

  private initializeService = async () => {
    // try {
    //   const response = await axios.get(DUMMY_ENDPOINT);
    //   const { token } = response.data;
    //   this.token = token;
    // } catch (err) {
    //   console.log("> Expected error from worker's endpoint not found from token", err);
    // }
  }

  // function for get all users
  private loadAllUsers = async () => {
    try {
      const { users } = await getUserList({
        offset: this.users.length,
      });

      runInAction(() => {
        this.users.push(...users);
      });
    } catch (err) {
      showErrorNotification(err.message);
    } finally {
      this.allUsersLoaded = true;
    }
  }

  // function for get all videos
  private loadAllVideos = async () => {
    try {
      const { recordings } = await getVideoList({
        offset: this.videos.length,
      });

      runInAction(() => {
        this.videos.push(...recordings);
      });
    } catch (err) {
      showErrorNotification(err.message);
    } finally {
      this.allVideosLoaded = true;
    }
  }

  // function for get all videos
  private loadAvailableVideos = async () => {
    try {
      const { recordings } = await getAvailableVideoList({
        offset: this.availableVideos.length,
      });

      runInAction(() => {
        this.availableVideos.push(...recordings);
      });
    } catch (err) {
      showErrorNotification(err.message);
    } finally {
      this.allVideosLoaded = true;
    }
  }

  // function for update status of video
  public updateVideoStatus = async (
    _id: string,
    status: string,
  ) => {
    try {
      const { code } = await updateRecordingStatus({
        _id,
        status,
      });
    } catch (err) {
      showErrorNotification(err.message);
    }
  }

  // function for update status of user
  public updateUserStatus = async (
    _id: string,
    status: string,
  ) => {
    try {
      const { code } = await updateUserStatusByID({
        _id,
        status,
      });
    } catch (err) {
      showErrorNotification(err.message);
    }
  }

  // function for get unblocked video ids by user id
  public getUnblockedVideosByID = async (
    _id: string,
  ) => {
    this.blockedIDs = [];
    try {
      const { ids } = await getUnblockedVideosByUserID({
        _id,
      });

      runInAction(() => {
        this.blockedIDs.push(...ids);
      });
    } catch (err) {
      showErrorNotification(err.message);
    }
  }

  // function for get unblocked video ids by user id
  public addBlockID = async (
    callrecording: string,
    user: string,
  ) => {
    try {
      const { code } = await addBlockRecording({
        callrecording,
        user,
      });
    } catch (err) {
      showErrorNotification(err.message);
    }
  }

  // function for get unblocked video ids by user id
  public removeBlockID = async (
    callrecording: string,
    user: string,
  ) => {
    try {
      const { code } = await removeBlockRecording({
        callrecording,
        user,
      });
    } catch (err) {
      showErrorNotification(err.message);
    }
  }
}

export const AdminStorage = new AdminMobxService();
export const AdminStorageContext = createContext(AdminStorage);
