import { SiteWithFiles } from '../types';
import { youderaApiInstance } from '../../api-instances/youdera';
import { CreateDataResponse } from '../../types';

export const getSiteFiles = async (siteId: string) => {
  const response = await youderaApiInstance.get<
    CreateDataResponse<SiteWithFiles>
  >(`/sites/${siteId}?with[]=files`);

  return response.data.data.files;
};
