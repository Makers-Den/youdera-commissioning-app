import { Site } from '../types';
import { youderaApiInstance } from '../../api-instances/youdera';
import { CreateDataResponse } from '../../types';

export const getSite = async (siteId: string) => {
  const response = await youderaApiInstance.get<CreateDataResponse<Site>>(
    `/sites/${siteId}?with[]=files&with[]=batteries&with[]=meters&with[]=inverters&with[]=inverters.mpp_trackers`,
  );

  return response.data.data;
};
