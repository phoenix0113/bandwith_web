import { Request, Response } from 'express';
import { CrudController } from './crudController';
import { UsersService } from '../services';

export class UsersController extends CrudController {
  static async loginUser(req: Request, res: Response) {
    await UsersController.processRequest(req, res, async () => {
      res.send(await UsersService.auth(req.body));
    });
  }

  static async registerUser(req: Request, res: Response) {
    await UsersController.processRequest(req, res, async () => {
      await UsersService.createUser(req.body);

      res.send({ success: true });
    });
  }

  static async getUserData(req: Request, res: Response) {
    await UsersController.processRequest(req, res, async () => {
      res.send(await UsersService.getUserData({ _id: req.params._id }));
    });
  }

  static async getProfileData(req: Request, res: Response) {
    await UsersController.processRequest(req, res, async () => {
      const { firebaseToken } = req.body;
      res.send(
        await UsersService.getFullUserData(
          { _id: req['user'].userId },
          { firebaseToken }
        )
      );
    });
  }

  static async getOAuthCreds(req: Request, res: Response) {
    await UsersController.processRequest(req, res, async () => {
      res.send(UsersService.getOAuthCreds());
    });
  }

  static async oauthGoogle(req: Request, res: Response) {
    await UsersController.processRequest(req, res, async () => {
      res.send(await UsersService.oauthGoogle(req.body));
    });
  }

  static async oauthFacebook(req: Request, res: Response) {
    await UsersController.processRequest(req, res, async () => {
      res.send(await UsersService.oauthFacebook(req.body));
    });
  }

  static async updateUserHint(req: Request, res: Response) {
    await UsersController.processRequest(req, res, async () => {
      res.send(await UsersService.updateUserHint(req.body, req['user'].userId));
    });
  }
}
