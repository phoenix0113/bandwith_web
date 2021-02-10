import { Schema, Document, model } from 'mongoose';
import { Omit, NotificationTypes } from '../../../client/src/shared/interfaces';

interface NotificationInterface {
  _id: string;
  header: string;
  body: string;
  user: string;
  type: NotificationTypes;
  read?: boolean;
}
export interface INotification
  extends Omit<NotificationInterface, '_id'>,
    Document {}

const NotificationSchema = new Schema({
  header: { type: String, required: true },
  body: { type: String, required: true },
  type: {
    type: String,
    enum: Object.values(NotificationTypes),
    required: true,
  },
  receiverId: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
  user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
  read: { type: Boolean, default: false },
});

export const Notification = model<INotification>(
  'notification',
  NotificationSchema
);
