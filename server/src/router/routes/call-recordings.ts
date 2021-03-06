import { Router } from 'express';
import { PATH } from '../../../../client/src/shared/routes';
import { CallRecordingsController } from '../../controllers';

export const callRecordingsRouter = Router();

callRecordingsRouter.post(`/${PATH.PUBLISH}`, CallRecordingsController.publishRecording);
callRecordingsRouter.post(`/${PATH.ALL}`, CallRecordingsController.getAllRecordingID);
callRecordingsRouter.get('/:_id', CallRecordingsController.getRecordById);
callRecordingsRouter.delete('/', CallRecordingsController.deleteRecordByCallId);
callRecordingsRouter.get('/', CallRecordingsController.getAllRecords);
callRecordingsRouter.post('/', CallRecordingsController.updateRecordingStatus);
callRecordingsRouter.delete('/:_id', CallRecordingsController.deleteRecordingByID);
callRecordingsRouter.post(`/${PATH.NEW}`, CallRecordingsController.getNewRecords);
callRecordingsRouter.post(`/${PATH.AVAILABLE}`, CallRecordingsController.getAvailableRecords);
callRecordingsRouter.post(`/${PATH.BLOCK}`, CallRecordingsController.getBlockRecords);
callRecordingsRouter.post(`/${PATH.REPORT}`, CallRecordingsController.sendReport);
callRecordingsRouter.post(`/${PATH.DELETE}`, CallRecordingsController.deleteRecord);
callRecordingsRouter.post(`/${PATH.FILTER}/:_id`, CallRecordingsController.getRecordingsByUserID);
callRecordingsRouter.post(`/${PATH.FILTER}/${PATH.ALL}/:_id`, CallRecordingsController.getAllRecordingsByUserID);
