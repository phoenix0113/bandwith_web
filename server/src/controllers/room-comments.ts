import { Request, Response } from 'express';
import { CrudController } from './crudController';
import { RoomCommentsService } from '../services';
import {
  GetAllCommentsQuery,
  GetAllRecordCommentsQuery,
} from '../../../client/src/shared/interfaces';
import { parseQuery } from '../config';

export class RoomCommentsController extends CrudController {
  static async getRoomComments(req: Request, res: Response) {
    await RoomCommentsController.processRequest(req, res, async () => {
      res.send(
        await RoomCommentsService.getAllRoomComments(
          parseQuery(req.query) as GetAllCommentsQuery
        )
      );
    });
  }

  static async addComment(req: Request, res: Response) {
    await RoomCommentsController.processRequest(req, res, async () => {
      res.send(await RoomCommentsService.addCommentToRoom(req.body));
    });
  }

  static async getRecordComments(req: Request, res: Response) {
    await RoomCommentsController.processRequest(req, res, async () => {
      res.send(
        await RoomCommentsService.getAllRecordingComments(
          parseQuery(req.query) as GetAllRecordCommentsQuery
        )
      );
    });
  }
}
