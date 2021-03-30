import apn from 'apn';
import path from 'path';
import { LobbyCallEventData } from '../../../client/src/shared/socket';

import { conf } from '../config/config';

import {
  APN,
  APNRequest,
  APNInterface,
  IAPN,
  GetRandomDeviceResponse,
  UserData,
} from '../models/apn';

const apnOptions: apn.ProviderOptions = {
  token: {
    key: path.join(__dirname, '../../cert/apnKey.p8'),
    keyId: conf.iosNotifications.keyId,
    teamId: conf.iosNotifications.teamId,
  },
  production: true,
};

export const apnProvider = new apn.Provider(apnOptions);

export const sendNotification = async (
  deviceTokens: Array<string>,
  eventData: LobbyCallEventData
): Promise<void> => {
  const callNotification = new apn.Notification({
    alert: {
      title: 'Incoming call',
      body: `You have a call from ${eventData.caller_name}`,
    },
    topic: conf.iosNotifications.bundleId,
    payload: eventData,
    pushType: 'alert', // or 'background'
  });

  callNotification.sound = 'ringtone.mp3';

  console.log(
    '> [APN] Trying to send "APN call" push notification to: ',
    deviceTokens
  );

  try {
    const { failed, sent } = await apnProvider.send(
      callNotification,
      deviceTokens
    );

    console.log('[APN] sent push-notifications: ', sent.length ? sent : 'none');

    console.log(
      '[APN] failed push-notifications: ',
      failed.length ? failed : 'none'
    );
  } catch (err) {
    console.error('[APN] sendNotificationError: ', err);
  }
};

const isUserPopulated = (obj: UserData | any): obj is UserData => {
  return obj && obj.name && typeof obj.name === 'string';
};

export class APNService {
  static async addAPNDeviceId({ deviceId, user }: APNRequest) {
    // saves new or update existing APN deviceId when user sends his token via socket.io
    try {
      const existing = await APN.findOne({ user });
      if (existing) {
        console.log(
          `[APN] deviceId for user ${user} is already exist (${deviceId})`
        );
        if (deviceId !== existing.deviceId) {
          console.log(
            `[APN] deviceId is being updated from ${existing.deviceId} to ${deviceId}`
          );
          existing.deviceId = deviceId;
          existing.save();
        } else {
          console.log(`[APN] no need to update deviceId`);
        }
      } else {
        const apn = new APN({ deviceId, user });
        await apn.save();
        console.log(
          `[APN] created new document for user ${user} with deviceId ${deviceId}`
        );
      }
    } catch (e) {
      throw e;
    }
  }

  // TODO: implement this if "available status" will be a thing in the App
  static async deleteAPNDeviceId({ deviceId, user }: APNRequest) {}

  static async getAllDevices(): Promise<Array<APNInterface>> {
    try {
      const apnList = await APN.find({});

      return apnList;
    } catch (e) {
      throw e;
    }
  }

  // returns device id with its user's id, that can be used to call via APN
  static async getRandomDeviceId(
    callerUserId: string
  ): Promise<GetRandomDeviceResponse | null> {
    try {
      const apnList: Array<IAPN> = await APN.where('user').ne(callerUserId);

      if (!apnList) {
        console.log('[APN] no device id found');
        return null;
      }

      console.log('[APN] Found deviceIds: ', apnList);

      const randomIndex = Math.floor(Math.random() * apnList.length);

      const targetAPN = await apnList[randomIndex]
        .populate({
          path: 'user',
          select: '_id name imageUrl',
        })
        .execPopulate();

      console.log('[APN] Selected populated deviceId: ', targetAPN);

      if (!isUserPopulated(targetAPN.user)) {
        throw new Error(
          'Something went wrong while populating APN document. Current document:'
        );
      }

      return {
        deviceId: targetAPN.deviceId,
        user: targetAPN.user,
      };
    } catch (e) {
      throw e;
    }
  }
}
