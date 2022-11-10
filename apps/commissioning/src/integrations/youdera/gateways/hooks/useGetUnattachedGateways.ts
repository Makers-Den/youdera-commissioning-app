import { useQuery } from '@tanstack/react-query';

import { getGateways } from '../queries/getGateways';
import { QueryKeys } from '../../enums/queryKeys';

export const useGetUnattachedGateways = () => {
  const unattachedGatewaysQuery = useQuery(
    [QueryKeys.unattachedGateways],
    getGateways,
    {
      suspense: true,
    },
  );

  return { unattachedGatewaysQuery };
};
