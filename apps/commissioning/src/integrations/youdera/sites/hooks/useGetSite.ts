import { useQuery } from '@tanstack/react-query';

import { youderaApiInstance } from '../../api-instances/youdera';
import { DataResponse, Site } from '../../apiTypes';
import { QueryKeys } from '../../enums/queryKeys';

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

export const useGetSite = (siteId: number) => {
  const siteQuery = useQuery(
    [QueryKeys.editedSite, siteId],
    ({ queryKey }) => getSite(String(queryKey[1])),
    {
      suspense: true,
    },
  );

  return { siteQuery };
};
