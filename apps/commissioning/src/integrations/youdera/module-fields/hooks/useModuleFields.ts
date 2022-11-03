import { useQuery } from '@tanstack/react-query';

import { getModuleFieldsForProject } from '../queries/getModuleFieldsForProject';
import { QueryKeys } from '../../enums/queryKeys';

export const useModuleFields = (projectId: number) => {
  const moduleFieldsQuery = useQuery(
    [QueryKeys.moduleFields, projectId],
    async ({ queryKey }) => getModuleFieldsForProject(queryKey[1] as number),
  );

  return { moduleFieldsQuery };
};
