import { Response } from 'express';

import { CrudController } from './crudController';
import { UsersService } from '../services';
import { sendNotificationToClient } from '../firebase/notify';

import {
  SubscribeToFirebasePushesRequest,
  FirebaseNotificationRequest,
} from '../../../client/src/shared/interfaces';
import { TypedRequest } from '../types/Request';

export class FirebaseController extends CrudController {
  private tokens: Array<string> = [];

  public subscribeToPushes = (
    req: TypedRequest<SubscribeToFirebasePushesRequest>,
    res: Response
  ) => {
    const { token } = req.body;

    if (this.tokens.includes(token)) {
      console.log(`Token is already subscribed to notifications: `, token);
    } else {
      this.tokens.push(token);
      console.log(
        `Token has been added to the notification-subscribed tokens: `,
        token
      );
    }

    console.log('current tokens: ', this.tokens);

    return res.sendStatus(201);
  };

  public notifySubscribers = async (
    req: TypedRequest<FirebaseNotificationRequest>,
    res: Response
  ) => {
    const tokens: string[] = [];
    const { users } = await UsersService.getAllUsers();
    users.forEach((userItem) => {
      if (userItem.firebaseToken) {
        tokens.push(userItem.firebaseToken);
      }
    });

    if (!tokens.length) {
      return res.status(400).send("There's no user to notify!");
    }

    const otherUsers = tokens.filter((t) => t !== req.body.from);
    const randomIndex = Math.floor(Math.random() * otherUsers.length);

    await sendNotificationToClient(otherUsers[randomIndex], req.body);
    return res.send(
      await UsersService.getUserByFirebaseToken(otherUsers[randomIndex])
    );
  };
}

export const FirebaseControllerInstance = new FirebaseController();
