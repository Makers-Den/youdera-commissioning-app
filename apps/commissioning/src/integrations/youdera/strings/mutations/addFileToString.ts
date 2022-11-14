import { youderaApiInstance } from '../../api-instances/youdera';
import { ApiFile } from '../../files/types';
import { CreateDataResponse } from '../../types';

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

  const response = await youderaApiInstance.post<CreateDataResponse<ApiFile>>(
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
