import { makeAutoObservable, observable, runInAction } from "mobx";
import { createContext } from "react";
import { CloudClient } from "avcore/client";
import { showErrorNotification } from "../utils/notification";
import { GetRecordResponse, User } from "../shared/interfaces";
import {
  // getUserList, getRecordingList, updateRecordingStatus, updateUserStatusByID, addBlockRecording,
  // getUnblockedVideosByUserID, removeBlockRecording, getAvailableVideoList, getRecordingByID,
  // addFeaturedRecording, removeFeaturedRecording, getFeaturedVideosByUserID, deleteRecording,
  getRecordingList, loadNewRecordings, updateRecordingStatus, deleteRecording,
} from "../axios/routes/admin";
import { GlobalServiceStatus } from "../interfaces/global";
import { VIDEO_LOAD_LIMIT } from "../utils/constants";

class AdminMobxService {
  @observable serviceStatus: GlobalServiceStatus = GlobalServiceStatus.IDLE;

  @observable avcoreCloudClient: CloudClient = null;

  @observable videos: Array<GetRecordResponse> = [];

  @observable availableRecordings: Array<GetRecordResponse> = [];

  @observable newRecordings: Array<GetRecordResponse> = [];

  @observable videosByUser: Array<GetRecordResponse> = [];

  @observable currentVideo: GetRecordResponse = null;

  @observable users: Array<User> = [];

  @observable blockedIDs: Array<string> = [];

  @observable featuredIDs: Array<string> = [];

  @observable allVideosLoaded = false;

  @observable allUsersLoaded = false;

  constructor() {
    makeAutoObservable(this);
    this.loadNewRecordings();
    // this.loadAllUsers();
    this.loadAllRecordings();
    // this.loadAvailableVideos();
  }

  // // function for get all users
  // private loadAllUsers = async () => {
  //   try {
  //     const { users } = await getUserList({
  //       offset: this.users.length,
  //     });

  //     runInAction(() => {
  //       this.users.push(...users);
  //     });
  //   } catch (err) {
  //     showErrorNotification(err.message);
  //   } finally {
  //     this.allUsersLoaded = true;
  //   }
  // };

  // function for get all videos
  private loadAllRecordings = async () => {
    this.videos = [];
    try {
      const { recordings } = await getRecordingList({
        offset: this.videos.length,
      });

      this.currentVideo = recordings[0];
      runInAction(() => {
        this.videos.push(...recordings);
      });
    } catch (err) {
      showErrorNotification(err.message);
    } finally {
      this.allVideosLoaded = true;
    }
  };

  // functioin for get all new call recordings
  private loadNewRecordings = async () => {
    try {
      this.newRecordings = [];
      const { recordings } = await loadNewRecordings();

      runInAction(() => {
        this.newRecordings.push(...recordings);
      });
    } catch (err) {
      showErrorNotification(err.message);
    }
  };

  // // function for get all available call recordings
  // private loadAvailableVideos = async () => {
  //   try {
  //     const { recordings } = await getAvailableVideoList({
  //       offset: this.availableVideos.length,
  //     });

  //     this.currentVideo = recordings[0];
  //     runInAction(() => {
  //       this.availableVideos.push(...recordings);
  //     });
  //   } catch (err) {
  //     showErrorNotification(err.message);
  //   } finally {
  //     this.allVideosLoaded = true;
  //   }
  // };

  // function for update status of video
  public updateRecordingStatus = async (
    _id: string,
    status: string,
    type: string,
  ) => {
    try {
      const { code } = await updateRecordingStatus({
        _id,
        status,
      });
      if (type === "new") {
        this.loadNewRecordings();
      }
    } catch (err) {
      showErrorNotification(err.message);
    }
  };

  // function for delete status of video
  public deleteRecording = async (
    callId: string,
    type: string,
  ) => {
    try {
      await deleteRecording(callId);
      if (type === "new") {
        this.loadNewRecordings();
      } else if (type === "available") {
        this.loadNewRecordings();
      } else if (type === "blocked") {
        this.loadNewRecordings();
      }
    } catch (err) {
      showErrorNotification(err.message);
    }
  };

  // // function for get video by id
  // public getVideoByID = async (
  //   _id: string,
  // ) => {
  //   try {
  //     this.currentVideo = await getRecordingByID(_id);
  //   } catch (err) {
  //     showErrorNotification(err.message);
  //   }
  // };

  // // function for update status of user
  // public updateUserStatus = async (
  //   _id: string,
  //   status: string,
  // ) => {
  //   try {
  //     const { code } = await updateUserStatusByID({
  //       _id,
  //       status,
  //     });
  //   } catch (err) {
  //     showErrorNotification(err.message);
  //   }
  // };

  // // function for get unblocked video ids by user id
  // public getUnblockedVideosByID = async (
  //   _id: string,
  // ) => {
  //   this.blockedIDs = [];
  //   try {
  //     const { ids } = await getUnblockedVideosByUserID({
  //       _id,
  //     });

  //     runInAction(() => {
  //       this.blockedIDs.push(...ids);
  //     });
  //   } catch (err) {
  //     showErrorNotification(err.message);
  //   }
  // };

  // // function for add video to blocked videos by user id
  // public addBlockID = async (
  //   callrecording: string,
  //   user: string,
  // ) => {
  //   try {
  //     const { code } = await addBlockRecording({
  //       callrecording,
  //       user,
  //     });
  //   } catch (err) {
  //     showErrorNotification(err.message);
  //   }
  // };

  // // function for remove video from blocked videos by user id
  // public removeBlockID = async (
  //   callrecording: string,
  //   user: string,
  // ) => {
  //   try {
  //     const { code } = await removeBlockRecording({
  //       callrecording,
  //       user,
  //     });
  //   } catch (err) {
  //     showErrorNotification(err.message);
  //   }
  // };

  // // function for get featured video ids by user id
  // public getFeaturedVideosByID = async (
  //   _id: string,
  // ) => {
  //   this.featuredIDs = [];
  //   try {
  //     const { ids } = await getFeaturedVideosByUserID({
  //       _id,
  //     });

  //     runInAction(() => {
  //       this.featuredIDs.push(...ids);
  //     });
  //   } catch (err) {
  //     showErrorNotification(err.message);
  //   }
  // };

  // // function for add video to featured videos by user id
  // public addFeaturedID = async (
  //   callrecording: string,
  //   user: string,
  // ) => {
  //   try {
  //     const { code } = await addFeaturedRecording({
  //       callrecording,
  //       user,
  //     });
  //   } catch (err) {
  //     showErrorNotification(err.message);
  //   }
  // };

  // // function for remove video to featured videos by user id
  // public removeFeaturedID = async (
  //   callrecording: string,
  //   user: string,
  // ) => {
  //   try {
  //     const { code } = await removeFeaturedRecording({
  //       callrecording,
  //       user,
  //     });
  //   } catch (err) {
  //     showErrorNotification(err.message);
  //   }
  // };
}

export const AdminStorage = new AdminMobxService();
export const AdminStorageContext = createContext(AdminStorage);
