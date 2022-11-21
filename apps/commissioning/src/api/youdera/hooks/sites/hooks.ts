import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getSite, getUncommissionedSites } from './apiRequests';
import { youderaApiInstance } from '../../api-instances/youdera';
import { ProjectManagerContactInfo } from '../../apiTypes';
import { QueryKeys } from '../../enums/queryKeys';

export const useSiteQuery = (siteId: number) => {
  const siteQuery = useQuery(
    [QueryKeys.editedSite, siteId],
    ({ queryKey }) => getSite(String(queryKey[1])),
    {
      suspense: true,
    },
  );

  return { siteQuery };
};

export const useUncommissionedSitesQuery = () => {
  const uncommissionedSitesQuery = useQuery(
    [QueryKeys.uncommissionedSites],
    getUncommissionedSites,
    {
      suspense: true,
    },
  );

  return { uncommissionedSitesQuery };
};

export const useContactSiteProjectManagerMutation = (siteId: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    () =>
      youderaApiInstance
        .post<ProjectManagerContactInfo>(`sites/${siteId}/support`)
        .then(res => res.data.phone),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.editedSite, siteId]);
      },
    },
  );
};
