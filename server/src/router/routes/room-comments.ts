import { Router } from 'express';
import { PATH } from '../../../../client/src/shared/routes';
import { RoomCommentsController } from '../../controllers';

export const roomCommentsRouter = Router();

roomCommentsRouter.get('/', RoomCommentsController.getRoomComments);
roomCommentsRouter.post('/', RoomCommentsController.addComment);

roomCommentsRouter.get(
  `/${PATH.REC_COMMENTS}`,
  RoomCommentsController.getRecordComments
);
