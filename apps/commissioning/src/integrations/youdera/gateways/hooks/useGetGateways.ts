import { useQuery } from '@tanstack/react-query';

import { getGateways } from '../queries/getGateways';
import { QueryKeys } from '../../enums/queryKeys';

export const useGetGateways = ({ suspense }: { suspense?: boolean } = { suspense: true }) => {
  const gatewaysQuery = useQuery(
    [QueryKeys.unattachedGateways],
    getGateways,
    {
      suspense,
    },
  );

  return { gatewaysQuery };
};
