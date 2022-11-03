import { useQuery } from '@tanstack/react-query';

import { getModules } from '../queries/getModules';
import { QueryKeys } from '../../enums/queryKeys';

export const useGetModules = () => {
  const modulesQuery = useQuery([QueryKeys.modules], getModules);

  return { modulesQuery };
};
