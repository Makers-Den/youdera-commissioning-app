import { useQuery } from '@tanstack/react-query';

import { getGateways } from './apiRequests';
import { QueryKeys } from '../../enums/queryKeys';

export const useGatewaysQuery = (
  { suspense }: { suspense?: boolean } = { suspense: true },
) =>
  useQuery([QueryKeys.unattachedGateways], getGateways, {
    suspense,
  });

export const useUnattachedGatewaysQuery = () =>
  useQuery([QueryKeys.unattachedGateways], getGateways, {
    suspense: true,
  });
