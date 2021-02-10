import { instance } from "../instance";
import { IAxiosError } from "../interfaces";
import { getError } from "../utils";

import { FirebaseNotificationRequest, SubscribeToFirebasePushesRequest } from "../../shared/interfaces";
import { API } from "../../shared/routes";

export const subscribeToFirebasePushes = async (
  request: SubscribeToFirebasePushesRequest,
): Promise<void> => {
  try {
    await instance.post(API.SUBSCRIBE_TO_FIREBASE_PUSHES, request);
  } catch (err) {
    const { response } = err as IAxiosError;
    throw new Error(getError(response));
  }
};

export const sendFirebasePush = async (
  request: FirebaseNotificationRequest,
): Promise<void> => {
  try {
    await instance.post(API.SEND_FIREBASE_PUSH, request);
  } catch (err) {
    const { response } = err as IAxiosError;
    throw new Error(getError(response));
  }
};
