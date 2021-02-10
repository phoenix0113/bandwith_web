import { messaging } from './init';
import { FirebaseNotificationRequest, FirebaseNotificationDummyType } from '../../../client/src/shared/interfaces';

export const sendNotificationToClient = async (token: string, data: FirebaseNotificationRequest): Promise<boolean> => {
  console.log(`Trying to send a notification to ${token.substr(0, 15)}...`);

  const {from, ...notificationData} = data;

  try {
    const response = await messaging.send({
        token,
        data: notificationData as unknown as FirebaseNotificationDummyType,
    });

    console.log(`Notification sent to ${token.substr(0, 15)}...`);

    return !!response;
  } catch (error) {
    console.error('Error sending message', error);
    throw new Error(`Error sending message: ${error.message}`);
  }
};