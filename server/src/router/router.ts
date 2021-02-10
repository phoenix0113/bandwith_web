import { Router } from 'express';
import {
  userRouter,
  firebaseRouter,
  contactRouter,
  notificationRouter,
  roomCommentsRouter,
  callRecordingsRouter,
  logsRouter,
} from './routes';

import { PATH } from '../../../client/src/shared/routes';

export const router = Router();

router.use('/', userRouter);
router.use(`/${PATH.FIREBASE}`, firebaseRouter);
router.use(`/${PATH.CONTACTS}`, contactRouter);
router.use(`/${PATH.NOTIFICATIONS}`, notificationRouter);
router.use(`/${PATH.COMMENTS}`, roomCommentsRouter);
router.use(`/${PATH.RECORD}`, callRecordingsRouter);
router.use(`/${PATH.LOGS}`, logsRouter);
