import { stringify } from "query-string";
import { instance, shareinstance } from "../instance";
import { IAxiosError } from "../interfaces";
import { getError } from "../utils";

import { GetAllRecordsQuery, PublishRecordingRequest, BasicResponse, GetAllRecordsResponse, GetRecordResponse } from "../../shared/interfaces";
import { API } from "../../shared/routes";

export const getRecordingsList = async (
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

export const publishRecording = async (
  request: PublishRecordingRequest,
): Promise<Document> => {
  try {
    const response = await instance.post<Document>(API.RECORD_PUBLISH, request);

    console.log("Publish response: ", response.data);

    return response.data;
  } catch (err) {
    const { response } = err as IAxiosError;
    throw new Error(getError(response));
  }
};

export const getRecordingById = async (id: string): Promise<GetRecordResponse> => {
  try {
    const response = await instance.get<GetRecordResponse>(`${API.RECORD}/${id}`);

    return response.data;
  } catch (err) {
    const { response } = err as IAxiosError;
    throw new Error(getError(response));
  }
};

export const getSharedRecordingById = async (id: string): Promise<GetRecordResponse> => {
  try {
    const response = await shareinstance.get<GetRecordResponse>(`${API.SHARED}/${id}`);

    return response.data;
  } catch (err) {
    const { response } = err as IAxiosError;
    throw new Error(getError(response));
  }
};
