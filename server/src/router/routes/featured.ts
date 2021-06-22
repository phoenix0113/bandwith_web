import { Router } from 'express';
import { FeaturedController } from '../../controllers';

export const featuredRouter = Router();

featuredRouter.get('/', FeaturedController.getFeaturedRecordingsByID);
featuredRouter.post('/', FeaturedController.addFeaturedRecording);
featuredRouter.delete('/', FeaturedController.removeFeaturedRecording);
