import { Router } from 'express';
import { FirebaseControllerInstance } from '../../controllers';
import { PATH } from '../../../../client/src/shared/routes';

export const firebaseRouter = Router();

firebaseRouter.post(`/${PATH.SUBSCRIBE}`, FirebaseControllerInstance.subscribeToPushes);

firebaseRouter.post(`/${PATH.PUSH}`, FirebaseControllerInstance.notifySubscribers);
