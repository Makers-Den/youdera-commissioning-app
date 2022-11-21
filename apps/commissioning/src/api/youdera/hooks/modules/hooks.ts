import { useQuery } from '@tanstack/react-query';

import { getModules } from './apiRequests';
import { QueryKeys } from '../../enums/queryKeys';

export const useModulesQuery = () =>
  useQuery([QueryKeys.modules], getModules, {
    suspense: true,
  });
