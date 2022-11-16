import { Site } from '../types';
import { youderaApiInstance } from '../../api-instances/youdera';
import { CreateDataResponse } from '../../types';

export const getSite = async (siteId: string) => {
  const response = await youderaApiInstance.get<CreateDataResponse<Site>>(
    `/sites/${siteId}` + 
    `?with[]=files` + 
    `&with[]=batteries` + 
    `&with[]=batteries.testlogs` + 
    `&with[]=batteries.files` + 
    `&with[]=meters` + 
    `&with[]=meters.testlogs` + 
    `&with[]=meters.files` + 
    `&with[]=inverters` + 
    `&with[]=inverters.testlogs` + 
    `&with[]=inverters.files` + 
    `&with[]=inverters.mpp_trackers`,
  );

  return response.data.data;
};
