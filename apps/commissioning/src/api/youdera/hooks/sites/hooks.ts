import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { getSite, getUncommissionedSites } from './apiRequests';
import { youderaApiInstance } from '../../api-instances/youdera';
import { ProjectManagerContactInfo } from '../../apiTypes';
import { QueryKeys } from '../../enums/queryKeys';

export const useSiteQuery = (siteId: number) => {
  const siteQuery = useQuery(
    [QueryKeys.editedSite, siteId] as [string, number],
    ({ queryKey }) => getSite(queryKey[1]),
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
    useCallback(
      () => youderaApiInstance
        .post<ProjectManagerContactInfo>(`sites/${siteId}/support`)
        .then(res => res.data.phone),
        [siteId]
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.editedSite, siteId]);
      },
    },
  );
};


export const useCommissionSiteMutation = (siteId: number) => {
  const queryClient = useQueryClient();
  
  return useMutation(
    useCallback(
      (payload: { roofer_done?: boolean } = {}) => youderaApiInstance
        .post<ProjectManagerContactInfo>(
          `sites/${siteId}/commission`,
          Object.keys(payload).length > 0 ? payload : undefined
        )
        .then(res => res.data.phone),
        [siteId]
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.editedSite, siteId]);
      },
    },
  );
}