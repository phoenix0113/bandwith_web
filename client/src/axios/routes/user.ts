import { instance } from "../instance";
import { IAxiosError } from "../interfaces";
import { getError } from "../utils";

import {
  AuthResponse, LoginRequest, OAuthFacebookRequest, AvcoreAuthResponse, CloudCredentials,
  OAuthGoogleRequest, RegistrationRequest, UserProfileRequest, UserProfileResponse,
  SetReadHintRequest, SetReadHintResponse,
} from "../../shared/interfaces";
import { API } from "../../shared/routes";

export const authWithGoogle = async (request: OAuthGoogleRequest): Promise<AuthResponse> => {
  try {
    const response = await instance.post<AuthResponse>(API.OAUTH_GOOGLE, request);

    return response.data;
  } catch (err) {
    const { response } = err as IAxiosError;
    throw new Error(getError(response));
  }
};

export const authWithFacebook = async (request: OAuthFacebookRequest): Promise<AuthResponse> => {
  try {
    const response = await instance.post<AuthResponse>(API.OAUTH_FACEBOOK, request);

    return response.data;
  } catch (err) {
    const { response } = err as IAxiosError;
    throw new Error(getError(response));
  }
};

export const login = async (request: LoginRequest): Promise<AuthResponse> => {
  try {
    const response = await instance.post<AuthResponse>(API.LOGIN, request);

    return response.data;
  } catch (err) {
    const { response } = err as IAxiosError;
    throw new Error(getError(response));
  }
};

export const register = async (request: RegistrationRequest): Promise<AuthResponse> => {
  try {
    const response = await instance.post<AuthResponse>(API.REGISTRATION, request);

    return response.data;
  } catch (err) {
    const { response } = err as IAxiosError;
    throw new Error(getError(response));
  }
};

export const userProfile = async (request: UserProfileRequest): Promise<UserProfileResponse> => {
  try {
    const response = await instance.post<UserProfileResponse>(API.USER_PROFILE, request);

    return response.data;
  } catch (err) {
    const { response } = err as IAxiosError;
    throw new Error(getError(response));
  }
};

export const avcoreCredentials = async (): Promise<CloudCredentials> => {
  try {
    const response = await instance.get<AvcoreAuthResponse>(API.AVCORE_CREDS);

    return response.data.cloud;
  } catch (err) {
    const { response } = err as IAxiosError;
    throw new Error(getError(response));
  }
};

export const setReadHint = async (request: SetReadHintRequest): Promise<SetReadHintResponse> => {
  try {
    const response = await instance.post<SetReadHintResponse>(API.USER_HINTS, request);

    return response.data;
  } catch (err) {
    const { response } = err as IAxiosError;
    throw new Error(getError(response));
  }
};
