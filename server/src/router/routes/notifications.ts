import { Router } from 'express';
import { PATH } from '../../../../client/src/shared/routes';
import { NotificationsController } from '../../controllers';

export const notificationRouter = Router();

notificationRouter.post('/', NotificationsController.addNotification);
notificationRouter.get('/', NotificationsController.getNotifications);
notificationRouter.delete('/:_id', NotificationsController.deleteNotification);
notificationRouter.post(
  `/${PATH.CHECK}`,
  NotificationsController.checkNotifications
);
