import { Schema, Document, model } from 'mongoose';
import {
  User as UserInterface,
  Omit,
  HintTypes,
} from '../../../client/src/shared/interfaces';

export interface IUser extends Omit<UserInterface, '_id'>, Document {}

const UserHintSubSchema = new Schema({
  type: {
    type: String,
    enum: Object.values(HintTypes),
    required: true,
  },
  seen: { type: Boolean, default: false },
});

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firebaseToken: { type: String, required: false },
  imageUrl: { type: String, required: false },
  hints: [{ type: UserHintSubSchema }],
});

UserSchema.pre('save', function <UserSchema>(next) {
  Object.values(HintTypes).map((hintType) => {
    this.hints.push({ type: hintType, seen: false });
  });
  next();
});

export const User = model<IUser>('user', UserSchema);
