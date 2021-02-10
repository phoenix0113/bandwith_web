import { OAuth2Client } from 'google-auth-library';
import fetch from 'node-fetch';
import { User } from '../models';
import {
  RegistrationRequest,
  LoginRequest,
  AuthResponse,
  Document,
  GetUserDataResponse,
  UserProfileResponse,
  UserProfileRequest,
  GetAllUsersResponse,
  GetUserResponse,
  OAuthGoogleRequest,
  OAuthFacebookRequest,
  SetReadHintRequest,
  HintTypes,
} from '../../../client/src/shared/interfaces';
import { conf } from '../config';
import { Algorithm, sign } from 'jsonwebtoken';

export class UsersService {
  static async getAllUsers(): Promise<GetAllUsersResponse> {
    const users = await User.find();

    return { users };
  }

  static async getUserByFirebaseToken(
    firebaseToken: string
  ): Promise<GetUserResponse | undefined> {
    const user = await User.findOne({ firebaseToken });

    if (!user) {
      throw { status: 400, message: 'User with such token not found' };
    }

    return { user };
  }

  static async createUser(user: RegistrationRequest) {
    const u = new User(user);
    try {
      await u.save();
    } catch (e) {
      if (e.code === 11000) {
        if ('email' in e.keyPattern) {
          throw { status: 409, message: `E-mail already in use` };
        } else {
          throw e;
        }
      } else {
        throw e;
      }
    }
    return { _id: u._id.toString() };
  }

  static async auth({ email, password }: LoginRequest): Promise<AuthResponse> {
    const { unsetField } = conf.oauth;

    if (password === unsetField) {
      throw {
        status: 400,
        message:
          'This email was used when creating an account via social networks',
      };
    } else {
      const user = await User.findOne({
        email,
        password,
      });
      if (!user) {
        throw { status: 400, message: 'User with such credentials not found' };
      }
      console.log(email, UsersService.generateServerToken(user._id.toString()));
      return {
        token: UsersService.generateServerToken(user._id.toString()),
      };
    }
  }

  static generateServerToken(userId: string) {
    return sign({ userId }, conf.auth.secret, {
      algorithm: conf.auth.algorithm as Algorithm,
    });
  }

  static async getUserData({ _id }: Document): Promise<GetUserDataResponse> {
    const user = await User.findById(_id).select('-password');
    if (!user) {
      throw { status: 400, message: 'User with such credentials not found' };
    }

    return user;
  }

  static async getFullUserData(
    { _id }: Document,
    { firebaseToken }: UserProfileRequest
  ): Promise<UserProfileResponse> {
    const user = await User.findById(_id);
    if (!user) {
      throw { status: 400, message: 'User with such credentials not found' };
    }

    if (firebaseToken && user.firebaseToken !== firebaseToken) {
      user.firebaseToken = firebaseToken;
      await user.save();
    }

    return user;
  }

  static getOAuthCreds() {
    const { google, facebook } = conf.oauth;

    return {
      google: { client_id: google.client_id },
      facebook: { client_id: facebook.client_id },
    };
  }

  static async oauthGoogle({
    tokenId,
  }: OAuthGoogleRequest): Promise<AuthResponse> {
    const {
      google: { client_id },
      unsetField,
    } = conf.oauth;

    const gClient = new OAuth2Client(client_id);
    const result = await gClient.verifyIdToken({
      idToken: tokenId,
      audience: client_id,
    });

    const {
      email_verified,
      name = unsetField,
      email,
      picture,
    } = result.getPayload()!;

    if (email_verified && email) {
      const user = await User.findOne({ email });

      let userId = user?._id.toString();

      if (!user) {
        const { _id } = await UsersService.createUser({
          name,
          email,
          password: unsetField,
          imageUrl: picture,
        });

        userId = _id.toString();
      }

      const token = UsersService.generateServerToken(userId);
      return { token };
    } else {
      throw { status: 400, message: 'Email not verified' };
    }
  }

  static async oauthFacebook({
    accessToken,
    userID,
  }: OAuthFacebookRequest): Promise<AuthResponse> {
    const {
      facebook: { user_data_url },
      unsetField,
    } = conf.oauth;
    const response = await fetch(
      `${user_data_url}/${userID}/?fields=id,name,email&access_token=${accessToken}`
    );
    const { email, name } = await response.json();

    const imgResponse = await fetch(
      `${user_data_url}/${userID}/picture?redirect=0`
    );
    const {
      data: { url },
    } = await imgResponse.json();

    const user = await User.findOne({ email });
    let userId = user?._id.toString();

    if (!user) {
      const { _id } = await UsersService.createUser({
        name,
        email,
        password: unsetField,
        imageUrl: url,
      });

      userId = _id.toString();
    }

    const token = UsersService.generateServerToken(userId);
    return { token };
  }

  static async updateUserHint({ type }: SetReadHintRequest, _id: string) {
    const user = await User.findOneAndUpdate(
      { _id, 'hints.type': type },
      { $set: { 'hints.$.seen': true } },
      {
        new: true,
      }
    );

    return user;
  }

  static async updateUsers() {
    try {
      const hints: { type: HintTypes; seen: boolean }[] = [];
      Object.values(HintTypes).map((hintType) => {
        hints.push({ type: hintType, seen: false });
      });

      await User.updateMany(
        {},
        { $set: { hints } },
        {
          new: true,
          multi: true,
        }
      );
    } catch (err) {
      throw err;
    }
  }
}
