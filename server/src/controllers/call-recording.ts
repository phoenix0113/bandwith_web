import { Request, Response } from 'express';
import { CrudController } from './crudController';
import { CallRecordingService, RoomCommentsService } from '../services';
import { GetAllRecordsQuery, UpdateRecordingQuery, CheckRecordingNameRequest } from '../../../client/src/shared/interfaces';
import { parseQuery } from '../config';

export class CallRecordingsController extends CrudController {
  static async publishRecording(req: Request, res: Response) {
    await CallRecordingsController.processRequest(req, res, async () => {
      const { _id } = await CallRecordingService.publishRecording(
        req.body,
        req['user'].userId
      );

      await RoomCommentsService.setRecordingIdToComments(req.body.callId, _id);

      res.send({ _id: _id });
    });
  }

  static async checkRecording(req: Request, res: Response) {
    await CallRecordingsController.processRequest(req, res, async () => {
      res.send(
        await CallRecordingService.checkRecording(
          parseQuery(req.query) as CheckRecordingNameRequest
        )
      );
    });
  }

  static async getRecordById(req: Request, res: Response) {
    await CallRecordingsController.processRequest(req, res, async () => {
      res.send(
        await CallRecordingService.getRecordingById({ _id: req.params._id })
      );
    });
  }

  static async deleteRecordByCallId(req: Request, res: Response) {
    await CallRecordingsController.processRequest(req, res, async () => {
      if (req.query.callId) {
        await CallRecordingService.deleteRecording({
          callId: req.query.callId.toString(),
        });

        res.send({ success: true });
      } else {
        res.send({
          success: false,
          error: 'CallId should be provided as query param',
        });
      }
    });
  }

  static async getAllRecords(req: Request, res: Response) {
    await CallRecordingsController.processRequest(req, res, async () => {
      res.send(
        await CallRecordingService.getAllRecordings(
          parseQuery(req.query) as GetAllRecordsQuery
        )
      );
    });
  }

  static async getAvailableRecords(req: Request, res: Response) {
    await CallRecordingsController.processRequest(req, res, async () => {
      res.send(
        await CallRecordingService.getAvailableRecords(
          parseQuery(req.query) as GetAllRecordsQuery
        )
      );
    });
  }

  static async updateRecordingStatus(req: Request, res: Response) {
    await CallRecordingsController.processRequest(req, res, async () => {
      res.send(
        await CallRecordingService.updateRecordingStatus(
          parseQuery(req.query) as UpdateRecordingQuery
        )
      );
    });
  }

  static async sendReport(req: Request, res: Response) {
    await CallRecordingsController.processRequest(req, res, async () => {
      res.send(await CallRecordingService.sendReport(req.body));
    });
  }

  static async getRecordingsByUserID(req: Request, res: Response) {
    await CallRecordingsController.processRequest(req, res, async () => {
      res.send(
        await CallRecordingService.getRecordingsByUserID({ _id: req.params._id })
      );
    });
  }
}
