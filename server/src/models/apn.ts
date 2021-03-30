import { Schema, Document, model } from 'mongoose';
import { Omit } from '../../../client/src/shared/interfaces';

export interface APNInterface {
  _id: string;
  deviceId: string;
  user: string;
}

export type APNRequest = Omit<APNInterface, '_id'>;

export interface IAPN extends Omit<APNInterface, '_id'>, Document {}

const APNSchema = new Schema({
  deviceId: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
});

export const APN = model<IAPN>('apn', APNSchema);
