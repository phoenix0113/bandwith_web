import { Schema, Document, model } from 'mongoose';
import {
  Contact as ContactInterface,
  Omit,
} from '../../../client/src/shared/interfaces';

export interface IContact extends Omit<ContactInterface, '_id'>, Document {}

const ContactSchema = new Schema({
  contactPerson: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
  contactOwner: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
});

export const Contact = model<IContact>('contact', ContactSchema);
