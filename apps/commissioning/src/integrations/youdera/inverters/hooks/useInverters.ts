import { useQuery } from '@tanstack/react-query';

import { getInverters } from '../queries/getInverters';
import { QueryKeys } from '../../enums/queryKeys';

export const useInverters = (siteId: number) => {

  const invertersQuery = useQuery(
    [QueryKeys.inverters, siteId],
    async ({ queryKey }) => getInverters(queryKey[1] as number),
  );

  return {
    invertersQuery
  };
};
