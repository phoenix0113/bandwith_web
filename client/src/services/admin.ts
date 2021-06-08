import { observable, runInAction } from "mobx";
import { createContext } from "react";
import { showErrorNotification } from "../utils/notification";
import { GetRecordResponse, GetUserDataResponse } from "../shared/interfaces";
import { VIDEO_LOAD_LIMIT } from "../utils/constants";
import { getUserList, getVideoList } from "../axios/routes/admin";

class AdminMobxService {
  @observable videos: Array<GetRecordResponse> = [];

  @observable users: Array<GetUserDataResponse> = [];

  @observable allVideosLoaded = false;

  @observable allUsersLoaded = false;

  constructor() {
    this.loadAllUsers();
    this.loadAllVideos();
  }

  // function for get all users
  private loadAllUsers = async () => {
    try {
      const { users } = await getUserList({
        limit: VIDEO_LOAD_LIMIT, offset: this.users.length,
      });

      runInAction(() => {
        this.users.push(...users);
        this.allUsersLoaded = true;
      });
    } catch (err) {
      showErrorNotification(err.message);
    }
  }

  // function for get all videos
  private loadAllVideos = async () => {
    try {
      const { recordings } = await getVideoList({
        limit: VIDEO_LOAD_LIMIT, offset: this.videos.length,
      });

      runInAction(() => {
        this.videos.push(...recordings);
        this.allVideosLoaded = true;
      });
    } catch (err) {
      showErrorNotification(err.message);
    }
  }
}

export const AdminStorage = new AdminMobxService();
export const AdminStorageContext = createContext(AdminStorage);
