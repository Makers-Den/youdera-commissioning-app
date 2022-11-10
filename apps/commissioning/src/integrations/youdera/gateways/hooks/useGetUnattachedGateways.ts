import { useQuery } from '@tanstack/react-query';

import { getUnattachedGateways } from '../queries/getUnattachedGateways';
import { QueryKeys } from '../../enums/queryKeys';

export const useGetUnattachedGateways = () => {
  const unattachedGatewaysQuery = useQuery(
    [QueryKeys.unattachedGateways],
    getUnattachedGateways,
    {
      suspense: true,
    },
  );

  return { unattachedGatewaysQuery };
};
