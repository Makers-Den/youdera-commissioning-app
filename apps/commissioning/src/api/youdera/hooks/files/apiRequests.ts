import { youderaApiInstance } from '../../api-instances/youdera';
import {
  AddFileToSiteRequest,
  ApiFile,
  DeleteFileFromSiteRequest,
  SiteWithFiles,
} from '../../apiTypes';
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

export const deleteFileFromSite = async ({
  siteId,
  documentId,
}: DeleteFileFromSiteRequest) => {
  const response = await youderaApiInstance.delete(
    `/sites/${siteId}/document/${documentId}/`,
  );

  return response.data;
};

export const getSiteFiles = async (siteId: string) => {
  const response = await youderaApiInstance.get<
    CreateDataResponse<SiteWithFiles>
  >(`/sites/${siteId}?with[]=files`);

  return response.data.data.files;
};
