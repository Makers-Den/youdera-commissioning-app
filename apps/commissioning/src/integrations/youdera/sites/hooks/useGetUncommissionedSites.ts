import { useQuery } from '@tanstack/react-query';

import { getUncommissionedSites } from '../queries/getUncommissionedSites';
import { QueryKeys } from '../../enums/queryKeys';

export const useGetUncommissionedSites = () => {
  const uncommissionedSitesQuery = useQuery(
    [QueryKeys.uncommissionedSites],
    getUncommissionedSites,
    {
      suspense: true,
    },
  );

  return { uncommissionedSitesQuery };
};
