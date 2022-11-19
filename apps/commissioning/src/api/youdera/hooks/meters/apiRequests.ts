import { youderaApiInstance } from '../../api-instances/youdera';
import {
  ApiFile,
  DataResponse,
  Meter,
  VerificationTestResult,
} from '../../apiTypes';

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
  name: string;
  number: string;
  factor: number;
  type: string;
  site: number;
  manufacturer: string;
  model: string;
};

export const createMeter = async (body: CreateMeterArgs): Promise<Meter> => {
  const response = await youderaApiInstance.post<DataResponse<Meter>>(
    `/meters`,
    body,
  );
  return response.data.data;
};

export type UpdateMeterArgs = {
  id: number;
  meter: Partial<Meter>;
};

export const updateMeter = async ({
  id,
  meter,
}: UpdateMeterArgs): Promise<Meter> => {
  const response = await youderaApiInstance.patch<DataResponse<Meter>>(
    `/meters/${id}`,
    meter,
  );
  return response.data.data;
};

export const addFileToMeter = async (
  id: number,
  file: File,
  setUploadProgress?: (percentage: number) => void,
) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', 'image');

  const response = await youderaApiInstance.post<DataResponse<ApiFile>>(
    `/meters/${id}/files`,
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