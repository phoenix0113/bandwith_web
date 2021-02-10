import { Request, Response } from 'express';
import { CrudController } from './crudController';
import { NotificationsService } from '../services';

export class NotificationsController extends CrudController {
  static async addNotification(req: Request, res: Response) {
    await NotificationsController.processRequest(req, res, async () => {
      await NotificationsService.createNotification(
        req.body,
        req['user'].userId
      );

      res.send({ success: true });
    });
  }

  static async getNotifications(req: Request, res: Response) {
    await NotificationsController.processRequest(req, res, async () => {
      res.send(
        await NotificationsService.getAllUsersNotifications({
          _id: req['user'].userId,
        })
      );
    });
  }

  static async deleteNotification(req: Request, res: Response) {
    await NotificationsController.processRequest(req, res, async () => {
      await NotificationsService.deleteNotification({
        notification_id: req.params._id,
      });

      res.send({ success: true });
    });
  }

  static async checkNotifications(req: Request, res: Response) {
    await NotificationsController.processRequest(req, res, async () => {
      await NotificationsService.checkNotifications(req.body);

      res.send({ success: true });
    });
  }
}
