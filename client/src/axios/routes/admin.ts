import { stringify } from "query-string";
import {
  GetAllRecordsQuery, GetAllRecordsResponse, UpdateRecordingQuery, UpdateRecordingResponse,
  GetAllUsersResponse,
} from "../../shared/interfaces";
import { IAxiosError } from "../interfaces";
import { getError } from "../utils";
import { instance } from "../instance";
import { API } from "../../shared/routes";

export const getRecordingList = async (
  query: GetAllRecordsQuery,
): Promise<GetAllRecordsResponse> => {
  const stringified = stringify(query);

  try {
    const response = await instance.get<GetAllRecordsResponse>(`${API.RECORD}?${stringified}`);

    return response.data;
  } catch (err) {
    const { response } = err as IAxiosError;
    throw new Error(getError(response));
  }
};

export const updateRecordingStatus = async (
  query: UpdateRecordingQuery,
): Promise<UpdateRecordingResponse> => {
  const stringified = stringify(query);

  try {
    const response = await instance.post<UpdateRecordingResponse>(`${API.RECORD}?${stringified}`);
    return response.data;
  } catch (err) {
    const { response } = err as IAxiosError;
    throw new Error(getError(response));
  }
};

export const deleteRecording = async (callId: string): Promise<UpdateRecordingResponse> => {
  try {
    const response = await instance.delete<UpdateRecordingResponse>(`${API.RECORD}/${callId}`);
    return response.data;
  } catch (err) {
    const { response } = err as IAxiosError;
    throw new Error(getError(response));
  }
};

export const updateUserStatusByID = async (
  query: UpdateRecordingQuery,
): Promise<UpdateRecordingResponse> => {
  const stringified = stringify(query);

  try {
    const response = await instance.post<UpdateRecordingResponse>(`${API.USER_UPDATE}?${stringified}`);
    return response.data;
  } catch (err) {
    const { response } = err as IAxiosError;
    throw new Error(getError(response));
  }
};

export const loadNewRecordings = async (
  query: GetAllRecordsQuery,
): Promise<GetAllRecordsResponse> => {
  const stringified = stringify(query);

  try {
    const response = await instance.post<GetAllRecordsResponse>(`${API.RECORD_NEW}?${stringified}`);

    return response.data;
  } catch (err) {
    const { response } = err as IAxiosError;
    throw new Error(getError(response));
  }
};

export const loadAvailableRecordings = async (
  query: GetAllRecordsQuery,
): Promise<GetAllRecordsResponse> => {
  const stringified = stringify(query);

  try {
    const response = await instance.post<GetAllRecordsResponse>(`${API.RECORD_AVAILABLE}?${stringified}`);

    return response.data;
  } catch (err) {
    const { response } = err as IAxiosError;
    throw new Error(getError(response));
  }
};

export const loadBlockRecordings = async (
  query: GetAllRecordsQuery,
): Promise<GetAllRecordsResponse> => {
  const stringified = stringify(query);

  try {
    const response = await instance.post<GetAllRecordsResponse>(`${API.RECORD_BLOCK}?${stringified}`);

    return response.data;
  } catch (err) {
    const { response } = err as IAxiosError;
    throw new Error(getError(response));
  }
};

export const loadAllUsers = async (
  query: GetAllRecordsQuery,
): Promise<GetAllUsersResponse> => {
  const stringified = stringify(query);

  try {
    const response = await instance.post<GetAllUsersResponse>(`${API.USER}?${stringified}`);

    return response.data;
  } catch (err) {
    const { response } = err as IAxiosError;
    throw new Error(getError(response));
  }
};
