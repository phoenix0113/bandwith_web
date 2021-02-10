import { Router } from 'express';
import { UsersController } from '../../controllers';
import { PATH } from '../../../../client/src/shared/routes';

export const userRouter = Router();

userRouter.post(`/${PATH.LOGIN}`, UsersController.loginUser);

userRouter.post(`/${PATH.REGISTRATION}`, UsersController.registerUser);

userRouter.get(`/${PATH.USER}/:_id`, UsersController.getUserData);

userRouter.post(`/${PATH.PROFILE}`, UsersController.getProfileData);

userRouter.get(`/${PATH.OAUTH}/${PATH.CREDS}`, UsersController.getOAuthCreds);

userRouter.post(`/${PATH.OAUTH}/${PATH.GOOGLE}`, UsersController.oauthGoogle);

userRouter.post(
  `/${PATH.OAUTH}/${PATH.FACEBOOK}`,
  UsersController.oauthFacebook
);

userRouter.post(`/${PATH.USER}/${PATH.HINTS}`, UsersController.updateUserHint);
