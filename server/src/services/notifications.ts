import { Notification } from '../models';
import {
  NotificationRequest,
  Document,
  GetNotificationListResponse,
  DeleteNotificationRequest,
  NotificationTypes,
  CheckNotificationsRequest,
} from '../../../client/src/shared/interfaces';

export class NotificationsService {
  static async createNotification(
    { header, body, type, user: { _id } }: NotificationRequest,
    receiverId: string
  ) {
    try {
      const n = new Notification({ receiverId, header, body, type, user: _id });
      await n.save();

      return { _id: n._id.toString() };
    } catch (e) {
      throw e;
    }
  }

  static async getConcreteNotification({ _id }: Document) {
    const notification = await Notification.findById(_id);

    if (!notification) {
      throw { status: 400, message: 'Notification not found' };
    }

    return { notification };
  }

  static async getAllUsersNotifications({
    _id,
  }: Document): Promise<GetNotificationListResponse> {
    const notifications = await Notification.find({ receiverId: _id }).populate(
      {
        path: 'user',
        select: '-password -email -firebaseToken',
      }
    );

    return { notifications: Object.assign([], notifications) };
  }

  static async deleteNotification({
    notification_id,
  }: DeleteNotificationRequest) {
    await Notification.findByIdAndRemove(notification_id);
  }

  static async defineMutualInvitations(
    receiverId: string,
    senderId: string
  ): Promise<string> {
    const mutualNotification = await Notification.findOne({
      receiverId: senderId,
      user: receiverId,
      type: NotificationTypes.INVITATION,
    });

    return mutualNotification?._id.toString();
  }

  static async checkNotifications({
    notifications,
  }: CheckNotificationsRequest) {
    const notificationsToCheck = notifications.map((_id) =>
      Notification.findByIdAndUpdate(_id, { $set: { read: true } })
    );

    await Promise.all(notificationsToCheck);
  }
}
