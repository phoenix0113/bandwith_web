import { Request, Response } from 'express';
import { CrudController } from './crudController';
import { FeaturedService } from '../services';
import { parseQuery } from "../config";
import { Document, CreateBlockRecordingRequest } from '../../../client/src/shared/interfaces';

export class FeaturedController extends CrudController {
  // function for get block recordings by user ID
  static async getFeaturedRecordingsByID(req: Request, res: Response) {
    await FeaturedController.processRequest(req, res, async () => {
      res.send(
        await FeaturedService.getFeaturedRecordingsByID(
          parseQuery(req.query) as Document
        )
      );
    });
  }

  // function for add new block recording
  static async addFeaturedRecording(req: Request, res: Response) {
    await FeaturedController.processRequest(req, res, async () => {
      res.send(
        await FeaturedService.addFeatured(
          parseQuery(req.query) as CreateBlockRecordingRequest
        )
      );
    });
  }

  // function for add new block recording
  static async removeFeaturedRecording(req: Request, res: Response) {
    await FeaturedController.processRequest(req, res, async () => {
      res.send(
        await FeaturedService.removeFeatured(
          parseQuery(req.query) as CreateBlockRecordingRequest
        )
      );
    });
  }

  // function for update featured status of call recording
  static async updateFeaturedRecording(req: Request, res: Response) {
    await FeaturedController.processRequest(req, res, async () => {
      res.send(await FeaturedService.updateFeaturedRecording(req.body));
    });
  }

  // function for update featured status of call recording
  static async checkFeaturedRecording(req: Request, res: Response) {
    await FeaturedController.processRequest(req, res, async () => {
      res.send(
        await FeaturedService.checkFeaturedRecording({ _id: req.params._id })
      );
    });
  }

  // function for update featured status of call recording
  static async getFeaturedRecording(req: Request, res: Response) {
    await FeaturedController.processRequest(req, res, async () => {
      res.send(await FeaturedService.getFeaturedRecording(req.body));
    });
  }
}
