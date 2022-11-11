import { useQuery } from '@tanstack/react-query';

import { getSite } from '../queries/getSite';
import { QueryKeys } from '../../enums/queryKeys';

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
