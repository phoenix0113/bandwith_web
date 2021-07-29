import { Router } from 'express';
import { PATH } from '../../../../client/src/shared/routes';
import { FeaturedController } from '../../controllers';

export const featuredRouter = Router();

featuredRouter.get('/', FeaturedController.getFeaturedRecordingsByID);
featuredRouter.post('/', FeaturedController.addFeaturedRecording);
featuredRouter.delete('/', FeaturedController.removeFeaturedRecording);
featuredRouter.post(`/${PATH.CHECK}/:_id`, FeaturedController.checkFeaturedRecording);
featuredRouter.post(`/${PATH.UPDATE}`, FeaturedController.updateFeaturedRecording);
featuredRouter.post(`/${PATH.STATUS}`, FeaturedController.getFeaturedRecording);
