import { Inverter } from '../types';
import { youderaApiInstance } from '../../api-instances/youdera';
import { ApiFile } from '../../files/types';
import { CreateDataResponse } from '../../types';

export interface AddFileToInverterRequest {
  inverterId: Inverter['id'];
  file: File;
}

export interface AddFileToInverterArgs extends AddFileToInverterRequest {
  setUploadProgress?: (percentage: number) => void;
}

export const addFileToInverter = async ({
  inverterId,
  file,
  setUploadProgress,
}: AddFileToInverterArgs) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', 'image');

  const response = await youderaApiInstance.post<CreateDataResponse<ApiFile>>(
    `/inverters/${inverterId}/files`,
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
