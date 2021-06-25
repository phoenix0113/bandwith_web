import { Request, Response } from 'express';
import { CrudController } from './crudController';
import { UsersService } from '../services';
import { UpdateRecordingQuery } from '../../../client/src/shared/interfaces';
import { parseQuery } from "../config";

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

  static async oauthApple(req: Request, res: Response) {
    await UsersController.processRequest(req, res, async () => {
      await UsersService.oauthApple(req.body);

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

  static async sendSMS(req: Request, res: Response) {
    await UsersController.processRequest(req, res, async () => {
      res.send(await UsersService.sendSMS(req.body));
    });
  }

  static async verifyCode(req: Request, res: Response) {
    await UsersController.processRequest(req, res, async () => {
      res.send(await UsersService.verifyCode(req.body));
    });
  }

  static async updatePhone(req: Request, res: Response) {
    await UsersController.processRequest(req, res, async () => {
      res.send(
        await UsersService.updateUserPhoneNumber(req.body, req['user'].userId)
      );
    });
  }

  static async getAllUsers(req: Request, res:Response) {
    await UsersController.processRequest(req, res, async () => {
      res.send(
        await UsersService.getAllUsers()
      );
    });
  }

  static async updateUserStatus(req: Request, res: Response) {
    await UsersController.processRequest(req, res, async () => {
      res.send(
        await UsersService.updateUserStatus(
          parseQuery(req.query) as UpdateRecordingQuery
        )
      );
    });
  }

  static async getVerifyCode(req: Request, res: Response) {
    await UsersController.processRequest(req, res, async () => {
      res.send(await UsersService.getVerifyCode(req.body));
    });
  }

  static async resetPassword(req: Request, res: Response) {
    await UsersController.processRequest(req, res, async () => {
      res.send(await UsersService.resetPassword(req.body));
    });
  }
}
