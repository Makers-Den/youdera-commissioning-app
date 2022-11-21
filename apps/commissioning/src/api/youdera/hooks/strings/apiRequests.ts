import { youderaApiInstance } from '../../api-instances/youdera';
import {
  ApiFile,
  CreateStringRequestBody,
  DataResponse,
  DeleteFileFromStringRequest,
  String,
  StringsOnRoof,
} from '../../apiTypes';
import { UpdateDataResponse } from '../../types';

export interface AddFileToStringRequest {
  stringId: string;
  file: File;
}

export interface AddFileToStringArgs extends AddFileToStringRequest {
  setUploadProgress?: (percentage: number) => void;
}

export const addFileToString = async ({
  stringId,
  file,
  setUploadProgress,
}: AddFileToStringArgs) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', 'image');

  const response = await youderaApiInstance.post<DataResponse<ApiFile>>(
    `/strings/${stringId}/files`,
    formData,
    {
      headers: {
        'Content-type': 'multipart/form-data',
      },
      onUploadProgress(progressEvent) {
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setUploadProgress?.(percentCompleted);
        }
      },
    },
  );

  return response.data.data;
};

export const deleteFileFromString = async ({
  stringId,
  fileId
}: DeleteFileFromStringRequest) => {
  const response = await youderaApiInstance.delete(
    `/strings/${stringId}/files/${fileId}/`,
  );

  return response.data;
};



export const createString = async (body: CreateStringRequestBody) => {
  const response = await youderaApiInstance.post(`/strings`, body);

  return response.data.data;
};

export const deleteString = async (stringId: number) => {
  const response = await youderaApiInstance.delete(`/strings/${stringId}`);

  return response.data.data;
};

export const getStringsOnRoof = async (roofId: number) => {
  const response = await youderaApiInstance.get<DataResponse<StringsOnRoof>>(
    `/roofs/${roofId}?with[]=strings`,
  );

  return {
    ...response.data.data,
  };
};

export const getStringDetails = async (stringId: number): Promise<String> => {
  const response = await youderaApiInstance.get<DataResponse<String>>(
    `strings/${stringId}?with[]=mpp_tracker&with[]=files`,
  );
  return response.data.data;
};

export const updateString = async ({
  id,
  ...rest
}: {
  id: number,
} & Partial<CreateStringRequestBody>) => {
  const response = await youderaApiInstance.patch<UpdateDataResponse<CreateStringRequestBody>>(`/strings/${id}`, { ...rest });

  return response.data.data;
};
