import { Router } from 'express';
import { BlockController } from '../../controllers';

export const blockRouter = Router();

blockRouter.get('/', BlockController.getBlockRecordingsByID);
blockRouter.post('/', BlockController.addBlockRecording);
blockRouter.delete('/', BlockController.removeBlockRecording);
