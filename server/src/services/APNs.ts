import apn from 'apn';
import path from 'path';

import { conf } from '../config/config';

import { APN, APNRequest, APNInterface } from '../models';

const apnOptions: apn.ProviderOptions = {
  token: {
    key: path.join(__dirname, '../../cert/apnKey.p8'),
    keyId: conf.iosNotifications.keyId,
    teamId: conf.iosNotifications.teamId,
  },
  production: true,
};

console.log('> initializing APN with following options: ', apnOptions);

export const apnProvider = new apn.Provider(apnOptions);

export const testNotification = new apn.Notification({
  alert: {
    title: 'Notification',
    body: 'Test notification from server',
  },
  topic: conf.iosNotifications.bundleId,
  payload: {
    test: 'value',
  },
  pushType: 'alert', // or 'background'
});

export const sendNotification = async (
  deviceTokens: Array<string>
): Promise<void> => {
  console.log('> Trying to send push notification to: ', deviceTokens);

  try {
    const { failed, sent } = await apnProvider.send(
      testNotification,
      deviceTokens
    );

    console.log('> sent push-notifications: ', sent.length ? sent : 'none');

    console.log(
      '> failed push-notifications: ',
      failed.length ? failed : 'none'
    );
  } catch (err) {
    console.error('> sendNotificationError: ', err);
  }
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
  static async getRandomDeviceId(callerUserId: string): Promise<APNInterface> {
    try {
      const apnList = await APN.find({});

      const otherUsersDeviceId = apnList.filter((t) => t.user !== callerUserId);
      const randomIndex = Math.floor(Math.random() * otherUsersDeviceId.length);

      const targetDeviceId: APNInterface = {
        _id: otherUsersDeviceId[randomIndex]._id,
        deviceId: otherUsersDeviceId[randomIndex].deviceId,
        user: otherUsersDeviceId[randomIndex].user,
      };

      return targetDeviceId;
    } catch (e) {
      throw e;
    }
  }
}
