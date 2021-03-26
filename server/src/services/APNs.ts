import apn from 'apn';
import path from 'path';

import { conf } from '../config/config';

const apnOptions: apn.ProviderOptions = {
  token: {
    key: path.join(__dirname, '../../cert/apnKey.p8'),
    keyId: conf.iosNotifications.keyId,
    teamId: conf.iosNotifications.teamId,
  },
  production: false,
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
