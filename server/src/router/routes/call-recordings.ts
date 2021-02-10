import { Router } from 'express';
import { PATH } from '../../../../client/src/shared/routes';
import { CallRecordingsController } from '../../controllers';

export const callRecordingsRouter = Router();

callRecordingsRouter.post(
  `/${PATH.PUBLISH}`,
  CallRecordingsController.publishRecording
);

callRecordingsRouter.get('/:_id', CallRecordingsController.getRecordById);
callRecordingsRouter.delete('/', CallRecordingsController.deleteRecordByCallId);
callRecordingsRouter.get('/', CallRecordingsController.getAllRecords);
