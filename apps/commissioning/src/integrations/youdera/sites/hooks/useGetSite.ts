import { UseBaseQueryResult, useQuery } from '@tanstack/react-query';

import { getSite } from '../queries/getSite';
import { Site } from '../types';
import { QueryKeys } from '../../enums/queryKeys';

export declare type UseSuspenseQueryResult<TData = unknown, TError = unknown> = UseBaseQueryResult<TData, TError> & {
  data: TData;
};

export const useSuspenseQuery = useQuery;

export const useGetSite = (siteId: number) => {
  const siteQuery = useSuspenseQuery(
    [QueryKeys.editedSite, siteId],
    ({ queryKey }) => getSite(String(queryKey[1])),
    {
      suspense: true,
    },
  ) as UseSuspenseQueryResult<Site>;

  return { siteQuery };
};
