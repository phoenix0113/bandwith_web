import { makeAutoObservable, observable, runInAction } from "mobx";
import { createContext } from "react";
import { showErrorNotification } from "../utils/notification";
import { GetRecordResponse, User, GetUserDataResponse } from "../shared/interfaces";
import {
  loadNewRecordings, updateRecordingStatus, deleteRecording, updateUserStatusByID,
  loadAvailableRecordings, loadBlockRecordings, loadUsers, getRecordingByID, getUserDataByID,
  getRecordingsByUserID,
} from "../axios/routes/admin";
import { ADMIN_RECORDINGS_LOAD_LIMIT, ADMIN_USERS_LOAD_LIMIT } from "../utils/constants";

class AdminMobxService {
  @observable newRecordings: Array<GetRecordResponse> = [];

  @observable newRecordingCount = -1;

  @observable availableRecordings: Array<GetRecordResponse> = [];

  @observable availableRecordingCount = -1;

  @observable blockRecordings: Array<GetRecordResponse> = [];

  @observable blockRecordingsCount = -1;

  @observable searchRecordingKey = "";

  @observable searchUserKey = "";

  @observable currentRecording: GetRecordResponse = null;

  @observable currentAuthorList: Array<GetUserDataResponse> = [];

  @observable users: Array<User> = [];

  @observable userCount = -1;

  @observable currentUser: User = null;

  @observable currentUserRecordings: Array<GetRecordResponse> = [];

  @observable onLoaded = false;

  constructor() {
    makeAutoObservable(this);
  }

  // function for get all users
  public loadUsers = async () => {
    try {
      if (this.userCount !== this.users.length) {
        this.onLoaded = false;
        const { users, amount } = await loadUsers({
          limit: ADMIN_USERS_LOAD_LIMIT,
          offset: this.users.length,
          key: this.searchUserKey,
        });

        runInAction(() => {
          this.users.push(...users);
          this.userCount = amount;
        });

        if (this.currentUser === null) {
          this.currentUser = this.users[0];
          const { recordings } = await getRecordingsByUserID(this.currentUser._id);
          this.currentUserRecordings = recordings;
        }
      }
    } catch (err) {
      showErrorNotification(err.message);
    } finally {
      this.onLoaded = true;
    }
  };

  // functioin for get all new call recordings
  public loadNewRecordings = async () => {
    try {
      if (this.newRecordingCount !== this.newRecordings.length) {
        this.onLoaded = false;
        const { recordings, amount } = await loadNewRecordings({
          limit: ADMIN_RECORDINGS_LOAD_LIMIT,
          offset: this.newRecordings.length,
          key: this.searchRecordingKey,
        });

        runInAction(() => {
          this.newRecordings.push(...recordings);
          this.newRecordingCount = amount;
        });

        if (recordings.length < ADMIN_RECORDINGS_LOAD_LIMIT) {
          console.log("> All stored new recordings were loaded");
        }
      }
    } catch (err) {
      showErrorNotification(err.message);
    } finally {
      this.onLoaded = true;
    }
  };

  // function for get all available call recordings
  public loadAvailableRecordings = async () => {
    try {
      if (this.availableRecordingCount !== this.availableRecordings.length) {
        this.onLoaded = false;
        const { recordings, amount } = await loadAvailableRecordings({
          limit: ADMIN_RECORDINGS_LOAD_LIMIT,
          offset: this.availableRecordings.length,
          key: this.searchRecordingKey,
        });

        runInAction(() => {
          this.availableRecordings.push(...recordings);
          this.availableRecordingCount = amount;
        });

        if (recordings.length < ADMIN_RECORDINGS_LOAD_LIMIT) {
          console.log("> All stored available recordings were loaded");
        }
      }
    } catch (err) {
      showErrorNotification(err.message);
    } finally {
      this.onLoaded = true;
    }
  };

  // function for get all available call recordings
  public loadBlockRecordings = async () => {
    try {
      if (this.blockRecordingsCount !== this.blockRecordings.length) {
        this.onLoaded = false;
        const { recordings, amount } = await loadBlockRecordings({
          limit: ADMIN_RECORDINGS_LOAD_LIMIT,
          offset: this.blockRecordings.length,
          key: this.searchRecordingKey,
        });

        runInAction(() => {
          this.blockRecordings.push(...recordings);
          this.blockRecordingsCount = amount;
        });

        if (recordings.length < ADMIN_RECORDINGS_LOAD_LIMIT) {
          console.log("> All stored blocked recordings were loaded");
        }
      }
    } catch (err) {
      showErrorNotification(err.message);
    } finally {
      this.onLoaded = true;
    }
  };

  // function for update status of video
  public updateRecordingStatus = async (
    _id: string,
    status: string,
    type: string,
  ) => {
    this.onLoaded = false;
    try {
      const { code } = await updateRecordingStatus({
        _id,
        status,
      });
      if (type === "new") {
        this.newRecordings = this.popupItemID(this.newRecordings, _id);
        this.newRecordingCount -= 1;
      } else if (type === "available") {
        this.availableRecordings = this.popupItemID(this.availableRecordings, _id);
        this.availableRecordingCount -= 1;
      } else if (type === "blocked") {
        this.blockRecordings = this.popupItemID(this.blockRecordings, _id);
        this.blockRecordingsCount -= 1;
      }

      if (status === "public") {
        this.newRecordings = this.popupItemID(this.newRecordings, _id);
        this.availableRecordingCount += 1;
      } else if (status === "block") {
        this.availableRecordings = this.popupItemID(this.availableRecordings, _id);
        this.blockRecordingsCount += 1;
      }
    } catch (err) {
      showErrorNotification(err.message);
    }
    this.onLoaded = true;
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
        this.newRecordingCount -= 1;
      } else if (type === "available") {
        this.availableRecordings = this.popupItemByCallId(this.availableRecordings, callId);
        this.availableRecordingCount -= 1;
      } else if (type === "blocked") {
        this.blockRecordings = this.popupItemByCallId(this.blockRecordings, callId);
        this.blockRecordingsCount -= 1;
      }
    } catch (err) {
      showErrorNotification(err.message);
    }
  };

  // function for set current recording from ID
  public setCurrentRecording = async (
    id: string,
  ) => {
    try {
      this.onLoaded = false;
      const recording = await getRecordingByID(id);
      this.currentRecording = recording;
      const authorId1 = this.currentRecording.authorList[0].toString();
      this.currentAuthorList[0] = await getUserDataByID(authorId1);
      if (this.currentRecording.authorList.length === 2) {
        const authorId2 = this.currentRecording.authorList[1].toString();
        this.currentAuthorList[1] = await getUserDataByID(authorId2);
      } else {
        this.currentAuthorList[1] = null;
      }
      this.onLoaded = true;
    } catch (err) {
      showErrorNotification(err.message);
    }
  };

  // function for search recordings
  public setSearchRecordingsKey = async (
    key: string,
    type: string,
  ) => {
    try {
      this.searchRecordingKey = key;
      if (type === "new") {
        this.newRecordings = [];
        this.loadNewRecordings();
      } else if (type === "available") {
        this.availableRecordings = [];
        this.loadAvailableRecordings();
      } else if (type === "blocked") {
        this.blockRecordings = [];
        this.loadBlockRecordings();
      }
    } catch (err) {
      showErrorNotification(err.message);
    }
  };

  // function for search recordings
  public setSearchUserKey = async (
    key: string,
  ) => {
    try {
      this.searchUserKey = key;
      this.users = [];
      this.loadUsers();
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

  // function for change current user
  public changeCurrentUser = async (id: string) => {
    const user = this.users.filter((item) => item._id === id);
    this.currentUser = user[0];
    const { recordings } = await getRecordingsByUserID(this.currentUser._id);
    this.currentUserRecordings = recordings;
  }
}

export const AdminStorage = new AdminMobxService();
export const AdminStorageContext = createContext(AdminStorage);
