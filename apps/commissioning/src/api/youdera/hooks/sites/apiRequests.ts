import { youderaApiInstance } from '../../api-instances/youdera';
import { DataResponse, Site } from '../../apiTypes';

export const getUncommissionedSites = async () => {
  const response = await youderaApiInstance.get<DataResponse<Site[]>>(
    '/sites/uncommissioned',
  );
  return response.data.data;
};

/**
 * This fetches the site with no extra data.
 */
 export const getMinimalSite = async (siteId: number) => {
  const response = await youderaApiInstance.get<DataResponse<Site>>(
    `/sites/${siteId}`);

  return response.data.data;
};


/**
 * This fetches the site with all possible data
 */
export const getSite = async (siteId: number) => {
  const response = await youderaApiInstance.get<DataResponse<Site>>(
    `/sites/${siteId}` +
      `?with[]=files` +
      `&with[]=batteries` +
      `&with[]=batteries.testlogs` +
      `&with[]=batteries.files` +
      `&with[]=batteries.datapoints` +
      `&with[]=batteries.inverter` +
      `&with[]=meters` +
      `&with[]=meters.testlogs` +
      `&with[]=meters.files` +
      `&with[]=meters.datapoints` +
      `&with[]=inverters` +
      `&with[]=inverters.testlogs` +
      `&with[]=inverters.mpp_trackers` +
      `&with[]=inverters.files` +
      `&with[]=inverters.datapoints`,
  );

  return response.data.data;
};
