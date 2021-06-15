import { Schema, Document, model } from 'mongoose';
import {
  User as UserInterface,
  Omit,
  HintTypes,
  // @ts-ignore
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

const ImportedContactSubschema = new Schema({
  recordId: { type: String, required: true }, // corresponds to the contact's unique id on user's phone
  name: { type: String, required: true }, // corresponds to the persons' name on user's phone
  user: { type: Schema.Types.ObjectId, ref: 'user' }, // found app's user in the DB
});

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firebaseToken: { type: String, required: false },
  imageUrl: { type: String, required: false },
  status: { type: String, default: "available" },
  role: { type: String, default: "user" },
  hints: [{ type: UserHintSubSchema }],
  available: { type: Boolean, required: false, default: false },
  phone: { type: String, required: false },
  countryCode: { type: String, required: false, default: undefined },
  verified: { type: Boolean, required: false, default: false },
  contactsImported: { type: Boolean, required: false, default: false },
  contacts: [{ type: ImportedContactSubschema }],
});

UserSchema.pre('save', function <UserSchema>(next) {
  Object.values(HintTypes).map((hintType) => {
    this.hints.push({ type: hintType, seen: false });
  });
  next();
});

export const User = model<IUser>('user', UserSchema);
