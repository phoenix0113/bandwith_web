import { createContext } from "react";
import { observable, makeAutoObservable, runInAction } from "mobx";

import { Comment } from "../shared/interfaces";
import { GlobalStorage } from "./global";
import { ACTIONS, CLIENT_ONLY_ACTIONS, SendCommentRequest } from "../shared/socket";
import { getComments } from "../axios/routes/comments";
import { COMMENTS_LOAD_LIMIT } from "../utils/constants";
import { showErrorNotification } from "../utils/notification";

class CommentsMobxService {
  @observable comments: Array<Comment> = [];

  @observable allCommentsLoaded = false;

  @observable totalAmount = 0;

  @observable loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * `Comments` service shouldn't have any idea about `callId`
   * we are working with while subscribing to comments
   * Since we use global socket, it's already handled by other (`Call`) services
   */
  public subscribeToComments = (): void => {
    GlobalStorage.socket.on(CLIENT_ONLY_ACTIONS.COMMENT, (comment) => {
      console.log("> Received new comment: ", comment);
      runInAction(() => {
        this.comments.unshift(comment);
        this.totalAmount += 1;
      });
    });
  }

  public fetchComments = async (id: string, isRecording: boolean): Promise<void> => {
    this.loading = true;
    try {
      const { amount, comments } = await getComments(
        id,
        COMMENTS_LOAD_LIMIT,
        this.comments.length,
        isRecording,
      );

      console.log(`> Loaded ${comments?.length} comments. IsRecording comments: ${isRecording}`);

      runInAction(() => {
        if (comments.length < COMMENTS_LOAD_LIMIT) {
          console.log("> All stored comments was loaded");
          this.allCommentsLoaded = true;
        }

        this.comments.push(...comments);
        this.totalAmount = amount;
      });
    } catch (err) {
      console.error(err);
      showErrorNotification(err.message);
    } finally {
      this.loading = false;
    }
  }

  /**
   * Depending on the type of comment (comment for recording or "live" call)
   * we need to pass parameters in a different way
   * If it is a "live" call, we pass `callId` param
   * If it is a recording, we pass `recording._id` as a item in `recordingsId` array
   */
  public sendComment = (
    id: string, // callId or recordingId
    content: string,
    isRecording: boolean,
  ): void => {
    const comment: SendCommentRequest = {
      callId: isRecording ? null : id,
      content,
      date: Date.now(),
      user: {
        _id: GlobalStorage.profile._id,
        name: GlobalStorage.profile.name,
        imageUrl: GlobalStorage.profile.imageUrl,
      },
      recordingIds: isRecording ? [id] : [],
    };

    console.log(`> You are sending a comment (isRecording: ${isRecording}): `, comment);

    GlobalStorage.socket.emit(ACTIONS.SEND_COMMENT, comment, (savedComment) => {
      console.log("> Your comment was saved: ", savedComment);
      runInAction(() => {
        this.comments.unshift(savedComment);
        this.totalAmount += 1;
      });
    });
  }

  public resetService = (): void => {
    GlobalStorage.socket.off(CLIENT_ONLY_ACTIONS.COMMENT);
    this.allCommentsLoaded = false;
    this.comments = [];
    console.log("> Comments service was reset");
  }
}

export const CommentsStorage = new CommentsMobxService();

export const CommentsStorageContext = createContext(CommentsStorage);
