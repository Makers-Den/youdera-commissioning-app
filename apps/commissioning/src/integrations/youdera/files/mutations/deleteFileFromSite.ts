import { DeleteFileFromSiteRequest } from '../types';
import { youderaApiInstance } from '../../api-instances/youdera';

export const deleteFileFromSite = async ({
  siteId,
  documentId,
}: DeleteFileFromSiteRequest) => {
  const response = await youderaApiInstance.delete(
    `/sites/${siteId}/document/${documentId}/`,
  );

  return response.data;
};
