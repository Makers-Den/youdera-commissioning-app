import { youderaApiInstance } from '../../api-instances/youdera';
import {
  ApiFile,
  DataResponse,
  DeleteFileFromMeterRequest,
  Meter,
  MeterModel,
  VerificationTestResult,
} from '../../apiTypes';
import { CreateDataResponse } from '../../types';

export const deleteMeter = async (id: number): Promise<Meter> => {
  const response = await youderaApiInstance.delete<DataResponse<Meter>>(
    `/meters/${id}`,
  );
  return response.data.data;
};

export const getMeter = async (id: number): Promise<Meter> => {
  const response = await youderaApiInstance.get<DataResponse<Meter>>(
    `/meters/${id}`,
  );
  return response.data.data;
};

export type CreateMeterArgs = {
  number?: string;
  factor?: number;
  type: string;
  site: number;
  manufacturer: string;
  cmodel: number;
  is_auxiliary: boolean;
};

export const createMeter = async (body: CreateMeterArgs): Promise<Meter> => {
  const response = await youderaApiInstance.post<DataResponse<Meter>>(
    `/meters`,
    body,
  );
  return response.data.data;
};

export type UpdateMeterRequestBody = {
  id: number;
} & Partial<Meter>;

export const updateMeter = async ({
  id,
  ...meter
}: UpdateMeterRequestBody): Promise<Meter> => {
  const response = await youderaApiInstance.patch<CreateDataResponse<Meter>>(
    `/meters/${id}`,
    meter,
  );
  return response.data.data;
};

export interface AddFileToInverterRequest {
  meterId: Meter['id'];
  file: File;
}
export interface AddFileToMeterArgs extends AddFileToInverterRequest {
  setUploadProgress?: (percentage: number) => void;
}

export const addFileToMeter = async ({
  meterId,
  file,
  setUploadProgress,
}: AddFileToMeterArgs) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', 'image');

  const response = await youderaApiInstance.post<DataResponse<ApiFile>>(
    `/meters/${meterId}/files`,
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
  meterId,
  fileId,
}: DeleteFileFromMeterRequest) => {
  const response = await youderaApiInstance.delete(
    `/strings/${meterId}/files/${fileId}/`,
  );

  return response.data;
};

export const getMeterVerificationGuide = async (
  id: number,
): Promise<string> => {
  const response = await youderaApiInstance.get<DataResponse<string>>(
    `/meters/${id}/test`,
  );
  return response.data.data;
};

export const executeMeterVerification = async (
  id: number,
): Promise<VerificationTestResult> => {
  const response = await youderaApiInstance.post<
    DataResponse<VerificationTestResult>
  >(`/meters/${id}/test`);
  return response.data.data;
};

export const getMeterModels = async () => {
  const response = await youderaApiInstance.get<
    CreateDataResponse<MeterModel[]>
  >(`/catalogue/models/meter`);
  return response.data.data;
};
