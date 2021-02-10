import { Schema, Document, model } from 'mongoose';
import {
  CallRecording as CallRecordingInterface,
  Omit,
} from '../../../client/src/shared/interfaces';
import { Comment as CommentModel } from './comment';
import { CallRecordingService } from '../services';

export interface ICallRecording
  extends Omit<CallRecordingInterface, '_id'>,
    Document {}

const CallRecordingSchema = new Schema({
  pipeId: { type: String, required: true, unique: true },
  callId: { type: String, required: true, unique: true },
  createDate: { type: Number, default: Date.now() },
  list: { type: Array },
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  participants: [{ type: Schema.Types.ObjectId, ref: 'user' }],
});

CallRecordingSchema.pre('remove', async function <CallRecordingSchema>(next) {
  try {
    await CommentModel.deleteMany({ callId: this.callId });
    await CallRecordingService.removeStreamRecords({ pipeId: this.pipeId });
  } catch (err) {
    throw err;
  }

  next();
});

export const CallRecording = model<ICallRecording>(
  'callrecording',
  CallRecordingSchema
);
