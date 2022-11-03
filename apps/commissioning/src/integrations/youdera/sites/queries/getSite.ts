import { Site } from '../types';
import { youderaApiInstance } from '../../api-instances/youdera';
import { CreateDataResponse } from '../../types';

export const getSite = async (siteId: string) => {
  const response = await youderaApiInstance.get<CreateDataResponse<Site>>(
    `/sites/${siteId}?with[]=files`,
  );

  return response.data.data;
};
