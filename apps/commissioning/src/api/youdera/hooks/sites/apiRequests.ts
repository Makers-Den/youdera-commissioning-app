import { youderaApiInstance } from '../../api-instances/youdera';
import { DataResponse, Site } from '../../apiTypes';

export const getUncommissionedSites = async () => {
  const response = await youderaApiInstance.get<DataResponse<Site[]>>(
    '/sites/uncommissioned',
  );
  return response.data.data;
};

export const getSite = async (siteId: string) => {
  const response = await youderaApiInstance.get<DataResponse<Site>>(
    `/sites/${siteId}` +
      `?with[]=files` +
      `&with[]=batteries` +
      `&with[]=batteries.testlogs` +
      `&with[]=meters` +
      `&with[]=meters.testlogs` +
      `&with[]=inverters` +
      `&with[]=inverters.testlogs` +
      `&with[]=inverters.mpp_trackers`,
  );

  return response.data.data;
};
