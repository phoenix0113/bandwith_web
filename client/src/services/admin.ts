import { makeAutoObservable, observable, runInAction } from "mobx";
import { createContext } from "react";
import { CloudClient } from "avcore/client";
import { showErrorNotification } from "../utils/notification";
import { GetRecordResponse, User } from "../shared/interfaces";
import {
  getRecordingList, loadNewRecordings, updateRecordingStatus, deleteRecording, updateUserStatusByID,
  loadAvailableRecordings, loadBlockRecordings, loadAllUsers,
} from "../axios/routes/admin";
import { GlobalServiceStatus } from "../interfaces/global";
import { ADMIN_RECORDINGS_LOAD_LIMIT } from "../utils/constants";

class AdminMobxService {
  @observable serviceStatus: GlobalServiceStatus = GlobalServiceStatus.IDLE;

  @observable avcoreCloudClient: CloudClient = null;

  @observable recordings: Array<GetRecordResponse> = [];

  @observable newRecordings: Array<GetRecordResponse> = [];

  @observable availableRecordings: Array<GetRecordResponse> = [];

  @observable blockRecordings: Array<GetRecordResponse> = [];

  @observable currentRecording: GetRecordResponse = null;

  @observable users: Array<User> = [];

  @observable allRecordingsLoaded = false;

  @observable allUsersLoaded = false;

  constructor() {
    makeAutoObservable(this);
    this.loadNewRecordings();
    this.loadAvailableRecordings();
    this.loadBlockRecordings();
    this.loadAllUsers();
    // this.loadAllRecordings();
  }

  // function for get all users
  private loadAllUsers = async () => {
    try {
      const { users } = await loadAllUsers({
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
  };

  // // function for get all recordings
  // private loadAllRecordings = async () => {
  //   this.recordings = [];
  //   try {
  //     const { recordings } = await getRecordingList({
  //       offset: this.recordings.length,
  //     });

  //     this.currentRecording = recordings[0];
  //     runInAction(() => {
  //       this.recordings.push(...recordings);
  //     });
  //   } catch (err) {
  //     showErrorNotification(err.message);
  //   } finally {
  //     this.allRecordingsLoaded = true;
  //   }
  // };

  // functioin for get all new call recordings
  public loadNewRecordings = async () => {
    try {
      const { recordings } = await loadNewRecordings({
        limit: ADMIN_RECORDINGS_LOAD_LIMIT, offset: this.newRecordings.length,
      });

      runInAction(() => {
        this.newRecordings.push(...recordings);
      });

      if (recordings.length < ADMIN_RECORDINGS_LOAD_LIMIT) {
        console.log("> All stored new recordings were loaded");
      }
    } catch (err) {
      showErrorNotification(err.message);
    }
  };

  // function for get all available call recordings
  public loadAvailableRecordings = async () => {
    try {
      const { recordings } = await loadAvailableRecordings({
        limit: ADMIN_RECORDINGS_LOAD_LIMIT, offset: this.availableRecordings.length,
      });

      runInAction(() => {
        this.availableRecordings.push(...recordings);
      });

      if (recordings.length < ADMIN_RECORDINGS_LOAD_LIMIT) {
        console.log("> All stored available recordings were loaded");
      }
    } catch (err) {
      showErrorNotification(err.message);
    }
  };

  // function for get all available call recordings
  public loadBlockRecordings = async () => {
    try {
      const { recordings } = await loadBlockRecordings({
        limit: ADMIN_RECORDINGS_LOAD_LIMIT, offset: this.blockRecordings.length,
      });

      runInAction(() => {
        this.blockRecordings.push(...recordings);
      });

      if (recordings.length < ADMIN_RECORDINGS_LOAD_LIMIT) {
        console.log("> All stored blocked recordings were loaded");
      }
    } catch (err) {
      showErrorNotification(err.message);
    }
  };

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
        this.newRecordings = this.popupItemID(this.newRecordings, _id);
      } else if (type === "available") {
        this.availableRecordings = this.popupItemID(this.availableRecordings, _id);
      } else if (type === "blocked") {
        this.blockRecordings = this.popupItemID(this.blockRecordings, _id);
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
        this.newRecordings = this.popupItemByCallId(this.newRecordings, callId);
      } else if (type === "available") {
        this.availableRecordings = this.popupItemByCallId(this.availableRecordings, callId);
      } else if (type === "blocked") {
        this.blockRecordings = this.popupItemByCallId(this.blockRecordings, callId);
      }
    } catch (err) {
      showErrorNotification(err.message);
    }
  };

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

      const user = this.users.find((item) => item._id === _id);
      user.status = status;
    } catch (err) {
      showErrorNotification(err.message);
    }
  };

  // function for popup item from arrays by callId
  private popupItemByCallId = (items: Array<GetRecordResponse>, callId: string) => {
    const filterItems = items.filter((item) => item.callId !== callId);
    console.log(filterItems);
    return filterItems;
  }

  // function for popup item from arrays by _id
  private popupItemID = (items: Array<GetRecordResponse>, _id: string) => {
    const filterItems = items.filter((item) => item._id !== _id);
    return filterItems;
  }
}

export const AdminStorage = new AdminMobxService();
export const AdminStorageContext = createContext(AdminStorage);
