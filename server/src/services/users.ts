import { promisify } from 'util';
import { OAuth2Client } from 'google-auth-library';
import fetch from 'node-fetch';
import Nexmo from 'nexmo';
import { Algorithm, sign } from 'jsonwebtoken';
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
  SendSMSRequest,
  VerifyCodeRequest,
  UpdatePhoneRequest,
  BasicResponse,
  NexmoResponse,
  GetVerifyCodeRequest,
  GetVerifyCodeResponse,
} from '../../../client/src/shared/interfaces';
import { conf } from '../config';

export class UsersService {
  static nexmo = new Nexmo({
    apiKey: conf.phoneVerification.apiKey,
    apiSecret: conf.phoneVerification.apiSecret,
  });

  static async getAllUsers(): Promise<GetAllUsersResponse> {
    const users = await User.find({
      role: "user",
    });

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

  static async auth({ email, password, role }: LoginRequest): Promise<AuthResponse> {
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
        role,
      });
      if (!user) {
        throw { status: 400, message: 'User with such credentials not found' };
      }
      if (user.status === "block") {
        throw { status: 400, message: 'This account has been blocked by the administrator.' };
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
    const user = await User.findById(_id).select('-password').populate({
      path: 'contacts.user',
      select: '_id name imageUrl',
    });

    if (!user) {
      throw { status: 400, message: 'User with such credentials not found' };
    }

    if (firebaseToken && user.firebaseToken !== firebaseToken) {
      user.firebaseToken = firebaseToken;
      await user.save();
    }

    return user;
  }

  // TODO: if this function will ever be used, need to specify platform to return valid secret and id
  static getOAuthCreds() {
    const { google, facebook } = conf.oauth;

    return {
      google: { client_id: google.client_id },
      facebook: { client_id: facebook.client_id },
    };
  }

  static async oauthGoogle({
    tokenId,
    isIos,
  }: OAuthGoogleRequest): Promise<AuthResponse> {
    const {
      google: { client_id, ios_client_id },
      unsetField,
    } = conf.oauth;

    const targetClientId = isIos ? ios_client_id : client_id;

    console.log(
      `> Using ${targetClientId} for google oauth (request's isIos: ${isIos})`
    );

    const gClient = new OAuth2Client(targetClientId);
    const result = await gClient.verifyIdToken({
      idToken: tokenId,
      audience: targetClientId,
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

  static async updateUserAvailability(
    available: boolean,
    _id: string
  ): Promise<boolean> {
    const user = await User.findById(_id);

    if (!user) {
      throw new Error('> updateUserAvailability: no user was found');
    }

    user.available = available;

    const updated = await user.save();

    console.log(
      `[APN] update "available" status for user ${_id}. Current status: ${updated.available}`
    );

    return true;
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

  static async resetUsersAvailability() {
    try {
      await User.updateMany(
        {},
        { $set: { available: false } },
        {
          new: true,
          multi: true,
        }
      );
    } catch (err) {
      throw err;
    }
  }

  // user types in the phone and send it to the server for SMS verification
  static async sendSMS({
    phone,
    request_id,
  }: SendSMSRequest): Promise<NexmoResponse> {
    try {
      if (request_id) {
        const cancelVerification = promisify(
          UsersService.nexmo.verify.control
        ).bind(UsersService.nexmo.verify);
        console.log('await cancelVerification();');
        await cancelVerification({ request_id, cmd: 'cancel' });
      }

      const existingPhone = await User.findOne({ phone });
      const sendCodeToPhone = promisify(UsersService.nexmo.verify.request).bind(
        UsersService.nexmo.verify
      );

      if (existingPhone) {
        throw {
          status: 409,
          message: 'This phone number is already in use',
        };
      } else {
        const response = await sendCodeToPhone({
          number: phone,
          brand: 'Bandwwith',
          code_length: conf.phoneVerification.code_length,
        });

        if (+response.status === 0) {
          return {
            success: true,
            request_id: response.request_id,
          };
        } else {
          throw {
            status: 457,
            nexmoStatus: response.status,
            message: response.error_text,
          };
        }
      }
    } catch (err) {
      throw err;
    }
  }

  // user received SMS with code and sent it to the server for verification
  static async verifyCode({
    code,
    request_id,
  }: VerifyCodeRequest): Promise<BasicResponse> {
    try {
      const checkCode = promisify(UsersService.nexmo.verify.check).bind(
        UsersService.nexmo.verify
      );

      const response = await checkCode({
        request_id,
        code,
      });

      if (+response.status === 0) {
        return { success: true };
      } else {
        throw {
          status: 457,
          nexmoStatus: response.status,
          message: response.error_text,
        };
      }
    } catch (err) {
      throw err;
    }
  }

  // user's code was verified (success: true) and now they send their phone again to save it in the DB
  static async updateUserPhoneNumber(
    { phone, countryCode }: UpdatePhoneRequest,
    _id: string
  ): Promise<UserProfileResponse> {
    const user = await User.findById(_id);

    if (!user) {
      throw { status: 400, message: 'User with such credentials not found' };
    }

    user.phone = phone;
    user.countryCode = countryCode;
    user.verified = true;

    await user.save();

    return user;
  }

  static async updateUserStatus({ _id, status }) {
    try {
      const user = await User.findById(_id);
      if (!user) {
        throw { status: 400, message: 'User not found' };
      }

      await User.findOneAndUpdate(
        { _id },
        { $set: { status } },
        {
          new: true,
        }
      );

      return { code: 200 };
    } catch (err) {
      throw err;
    }
  }

  static async getVerifyCode({ email, role }: GetVerifyCodeRequest): Promise<GetVerifyCodeResponse> {
    try {
      const user = await User.findOne({
        email,
        role,
      });

      if (!user) {
        throw { status: 400, message: 'User not found' };
      }

      const code = Math.floor(Math.random() * 100000000);

      // const nodemailer = require("nodemailer");
      // const transport = nodemailer.createTransport({
      //   service: "gmail",
      //   auth: {
      //     user: process.env['MAIL_ADDRESS'],
      //     pass: process.env['MAIL_PASSWORD'],
      //   },
      // });

      // let mail_options = {
      //   from: process.env['MAIL_ADDRESS'],
      //   to: email,
      //   subject: "Email verify code",
      //   html: `<p>${code}</p>`
      // };

      // transport.sendMail(mail_options, function(error: any) {
      //   if (error) {
      //     throw error;
      //   }
      // })

      var api_key = process.env['MAILGUN_KEY'];
      var domain = process.env['MAILGUN_DOMAIN'];
      var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

      var data = {
        from: process.env['MAIL_ADDRESS'],
        to: email,
        subject: 'Email Verify Code',
        text: code,
      };

      mailgun.messages().send(data, function (error) {
        if (error) {
          throw error;
        }
      });

      return { code: code.toString() };
    } catch (err) {
      throw err;
    }
  }

  static async resetPassword({ email, role, password }: LoginRequest): Promise<GetVerifyCodeResponse> {
    try {
      const user = await User.findOne({
        email,
        role,
      });

      if (!user) {
        throw { status: 400, message: 'User not found' };
      }

      await User.findOneAndUpdate(
        { email, role },
        { $set: { password } },
        {
          new: true,
        }
      );

      return { code: "200" };
    } catch (err) {
      throw err;
    }
  }
}
