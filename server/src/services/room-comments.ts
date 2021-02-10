import { Comment, CommentRequest } from '../models';
import {
  GetAllCommentsQuery,
  GetAllCommentsResponse,
  Document,
  GetAllRecordCommentsQuery,
} from '../../../client/src/shared/interfaces';

export class RoomCommentsService {
  static async setRecordingIdToComments(
    callId: string,
    recordingId: string
  ): Promise<void> {
    try {
      await Comment.updateMany(
        { callId },
        { $push: { recordingIds: recordingId } },
        {
          new: true,
          multi: true,
        }
      );
    } catch (err) {
      throw err;
    }
  }

  static async getAllRecordingComments({
    recordId,
    limit,
    offset,
  }: GetAllRecordCommentsQuery): Promise<GetAllCommentsResponse> {
    try {
      const amount = await Comment.countDocuments({
        recordingIds: recordId,
      });

      const comments = await Comment.find({ recordingIds: recordId })
        .sort({ date: 'desc' })
        .skip((offset && +offset) || 0)
        .limit((limit && +limit) || 0)
        .populate({
          path: 'user',
          select: '-password -email -firebaseToken',
        });

      return { comments: Object.assign([], comments), amount };
    } catch (err) {
      throw err;
    }
  }

  static async getAllRoomComments({
    callId,
    limit,
    offset,
  }: GetAllCommentsQuery): Promise<GetAllCommentsResponse> {
    try {
      const amount = await Comment.countDocuments({ callId });

      const comments = await Comment.find({ callId })
        .sort({ date: 'desc' })
        .skip((offset && +offset) || 0)
        .limit((limit && +limit) || 0)
        .populate({
          path: 'user',
          select: '-password -email -firebaseToken',
        });

      return { comments: Object.assign([], comments), amount };
    } catch (err) {
      throw err;
    }
  }

  static async addCommentToRoom({
    content,
    user: { _id },
    date,
    callId,
    recordingIds = [],
  }: CommentRequest): Promise<Document> {
    try {
      const c = new Comment({
        content,
        date,
        user: _id,
        callId,
        recordingIds,
      });

      await c.save();

      return { _id: c._id.toString() };
    } catch (err) {
      throw err;
    }
  }
}
