import { makeAutoObservable, observable, runInAction } from "mobx";
import { createContext } from "react";
import { showErrorNotification } from "../utils/notification";
import { GetRecordResponse, GetUserDataResponse } from "../shared/interfaces";
import { getUserList, getVideoList, updateRecordingStatus } from "../axios/routes/admin";

class AdminMobxService {
  @observable videos: Array<GetRecordResponse> = [];

  @observable users: Array<GetUserDataResponse> = [];

  @observable allVideosLoaded = false;

  @observable allUsersLoaded = false;

  constructor() {
    makeAutoObservable(this);
    this.loadAllUsers();
    this.loadAllVideos();
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

  // function for update status of video
  public updateStatus = async (
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
}

export const AdminStorage = new AdminMobxService();
export const AdminStorageContext = createContext(AdminStorage);
