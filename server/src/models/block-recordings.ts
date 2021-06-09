import { Schema, Document, model } from 'mongoose';
import {
  BlockRecording as BlockRecordingInterface,
  Omit,
} from '../../../client/src/shared/interfaces';

export interface BlockRecording
  extends Omit<BlockRecordingInterface, '_id'>,
    Document {}

const BlockRecordingSchema = new Schema({
  callrecording: { type: String, required: true },
  user: { type: String, required: true },
});

export const BlockRecording = model<BlockRecording>(
  'blockrecordings',
  BlockRecordingSchema
);
