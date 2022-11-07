import { AddFileToSiteRequest, ApiFile } from '../types';
import { youderaApiInstance } from '../../api-instances/youdera';
import { CreateDataResponse } from '../../types';

export interface AddFileToSiteArgs extends AddFileToSiteRequest {
  setUploadProgress?: (percentage: number) => void;
}

export const addFileToSite = async ({
  siteId,
  file,
  type,
  setUploadProgress,
}: AddFileToSiteArgs) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);

  const response = await youderaApiInstance.post<CreateDataResponse<ApiFile>>(
    `/sites/${siteId}/document`,
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
