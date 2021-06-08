import { stringify } from "query-string";
import { GetAllRecordsQuery, GetAllRecordsResponse, GetAllUsersResponse } from "../../shared/interfaces";
import { IAxiosError } from "../interfaces";
import { getError } from "../utils";
import { instance } from "../instance";
import { API } from "../../shared/routes";

export const getVideoList = async (
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

export const getUserList = async (
  query: GetAllRecordsQuery,
): Promise<GetAllUsersResponse> => {
  const stringified = stringify(query);

  try {
    const response = await instance.get<GetAllUsersResponse>(`${API.USER}?${stringified}`);

    return response.data;
  } catch (err) {
    const { response } = err as IAxiosError;
    throw new Error(getError(response));
  }
};
