import { Schema, Document, model } from 'mongoose';
import {
  BlockRecording as BlockRecordingInterface,
  Omit,
} from '../../../client/src/shared/interfaces';

export interface FeaturedRecording
  extends Omit<BlockRecordingInterface, '_id'>,
    Document {}

const FeaturedRecordingSchema = new Schema({
  callrecording: { type: String, required: true },
  user: { type: String, required: true },
});

export const FeaturedRecording = model<FeaturedRecording>(
  'featuredrecordings',
  FeaturedRecordingSchema
);
