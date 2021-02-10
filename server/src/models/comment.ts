import { Schema, Document, model } from 'mongoose';
import { Omit, CommentUser } from '../../../client/src/shared/interfaces';

interface CommentInterface {
  _id: string;
  date: string;
  callId?: string;
  user: string;
  recordingIds?: string[];
}

export interface CommentRequest {
  content: string;
  user: CommentUser;
  date: number;
  callId?: string;
  recordingIds?: string[];
}

export interface IComment extends Omit<CommentInterface, '_id'>, Document {}

const CommentSchema = new Schema({
  content: { type: String, required: true },
  date: { type: Number, required: true, default: Date.now() },
  callId: { type: String, required: false },
  user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
  recordingIds: {
    type: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    default: [],
  },
});

export const Comment = model<IComment>('сomment', CommentSchema);
