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
      `&with[]=batteries.files` +
      `&with[]=meters` +
      `&with[]=meters.testlogs` +
      `&with[]=meters.files` +
      `&with[]=inverters` +
      `&with[]=inverters.testlogs` +
      `&with[]=inverters.mpp_trackers` +
      `&with[]=inverters.files`,
  );

  return response.data.data;
};
