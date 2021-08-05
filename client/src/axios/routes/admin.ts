import { stringify } from "query-string";
import {
  GetAllRecordsQuery, GetAllRecordsResponse, GetAllUsersResponse, UpdateRecordingQuery,
  UpdateRecordingResponse, Document, BlockedVideoIdsResponse, CreateBlockRecordingRequest,
  GetRecordResponse,
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

// export const getAvailableVideoList = async (
//   query: GetAllRecordsQuery,
// ): Promise<GetAllRecordsResponse> => {
//   const stringified = stringify(query);

//   try {
//     const response = await instance.post<GetAllRecordsResponse>
// (`${API.RECORD_AVAILABLE}?${stringified}`);

//     return response.data;
//   } catch (err) {
//     const { response } = err as IAxiosError;
//     throw new Error(getError(response));
//   }
// };

// export const getUserList = async (
//   query: GetAllRecordsQuery,
// ): Promise<GetAllUsersResponse> => {
//   const stringified = stringify(query);

//   try {
//     const response = await instance.get<GetAllUsersResponse>
// (`${API.USER}?${stringified}`);

//     return response.data;
//   } catch (err) {
//     const { response } = err as IAxiosError;
//     throw new Error(getError(response));
//   }
// };

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

// export const updateUserStatusByID = async (
//   query: UpdateRecordingQuery,
// ): Promise<UpdateRecordingResponse> => {
//   const stringified = stringify(query);

//   try {
//     const response = await instance.post<UpdateRecordingResponse>
// (`${API.USER}?${stringified}`);
//     return response.data;
//   } catch (err) {
//     const { response } = err as IAxiosError;
//     throw new Error(getError(response));
//   }
// };

// export const getUnblockedVideosByUserID = async (
//   query: Document,
// ): Promise<BlockedVideoIdsResponse> => {
//   const stringified = stringify(query);

//   try {
//     const response = await instance.get<BlockedVideoIdsResponse>
// (`${API.BLOCK}?${stringified}`);
//     return response.data;
//   } catch (err) {
//     const { response } = err as IAxiosError;
//     throw new Error(getError(response));
//   }
// };

// export const addBlockRecording = async (
//   query: CreateBlockRecordingRequest,
// ): Promise<UpdateRecordingResponse> => {
//   const stringified = stringify(query);

//   try {
//     const response = await instance.post<UpdateRecordingResponse>
// (`${API.BLOCK}?${stringified}`);
//     return response.data;
//   } catch (err) {
//     const { response } = err as IAxiosError;
//     throw new Error(getError(response));
//   }
// };

// export const removeBlockRecording = async (
//   query: CreateBlockRecordingRequest,
// ): Promise<UpdateRecordingResponse> => {
//   const stringified = stringify(query);

//   try {
//     const response = await instance.delete<UpdateRecordingResponse>
// (`${API.BLOCK}?${stringified}`);
//     return response.data;
//   } catch (err) {
//     const { response } = err as IAxiosError;
//     throw new Error(getError(response));
//   }
// };

// export const getRecordingByID = async (id: string): Promise<GetRecordResponse> => {
//   try {
//     const response = await instance.get<GetRecordResponse>(`${API.RECORD}/${id}`);

//     return response.data;
//   } catch (err) {
//     const { response } = err as IAxiosError;
//     throw new Error(getError(response));
//   }
// };

// export const getFeaturedVideosByUserID = async (
//   query: Document,
// ): Promise<BlockedVideoIdsResponse> => {
//   const stringified = stringify(query);

//   try {
//     const response = await instance.get<BlockedVideoIdsResponse>
// (`${API.FEATURED}?${stringified}`);
//     return response.data;
//   } catch (err) {
//     const { response } = err as IAxiosError;
//     throw new Error(getError(response));
//   }
// };

// export const addFeaturedRecording = async (
//   query: CreateBlockRecordingRequest,
// ): Promise<UpdateRecordingResponse> => {
//   const stringified = stringify(query);

//   try {
//     const response = await instance.post<UpdateRecordingResponse>
// (`${API.FEATURED}?${stringified}`);
//     return response.data;
//   } catch (err) {
//     const { response } = err as IAxiosError;
//     throw new Error(getError(response));
//   }
// };

// export const removeFeaturedRecording = async (
//   query: CreateBlockRecordingRequest,
// ): Promise<UpdateRecordingResponse> => {
//   const stringified = stringify(query);

//   try {
//     const response = await instance.delete<UpdateRecordingResponse>
// (`${API.FEATURED}?${stringified}`);
//     return response.data;
//   } catch (err) {
//     const { response } = err as IAxiosError;
//     throw new Error(getError(response));
//   }
// };

export const loadNewRecordings = async (): Promise<GetAllRecordsResponse> => {
  try {
    const response = await instance.post<GetAllRecordsResponse>(`${API.RECORD_NEW}`);

    return response.data;
  } catch (err) {
    const { response } = err as IAxiosError;
    throw new Error(getError(response));
  }
};
