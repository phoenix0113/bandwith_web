import { Request, Response } from 'express';
import { CrudController } from './crudController';
import { BlockService } from '../services';
import { parseQuery } from "../config";
import { Document, CreateBlockRecordingRequest } from '../../../client/src/shared/interfaces';

export class BlockController extends CrudController {
  // function for get block recordings by user ID
  static async getBlockRecordingsByID(req: Request, res: Response) {
    await BlockController.processRequest(req, res, async () => {
      res.send(
        await BlockService.getBlockRecordingsByID(
          parseQuery(req.query) as Document
        )
      );
    });
  }

  // function for add new block recording
  static async addBlockRecording(req: Request, res: Response) {
    await BlockController.processRequest(req, res, async () => {
      res.send(
        await BlockService.addBlock(
          parseQuery(req.query) as CreateBlockRecordingRequest
        )
      );
    });
  }

  // function for add new block recording
  static async removeBlockRecording(req: Request, res: Response) {
    await BlockController.processRequest(req, res, async () => {
      res.send(
        await BlockService.removeBlock(
          parseQuery(req.query) as CreateBlockRecordingRequest
        )
      );
    });
  }
}
