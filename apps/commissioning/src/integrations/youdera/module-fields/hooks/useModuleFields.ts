import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createModuleField } from '../mutations/createModuleField';
import { deleteModuleField } from '../mutations/deleteModuleField';
import { updateModuleField } from '../mutations/updateModuleFields';
import { getModuleFieldsForProject } from '../queries/getModuleFieldsForProject';
import { CreateModuleRequestBody } from '../types';
import { QueryKeys } from '../../enums/queryKeys';

export const useModuleFields = (projectId: string) => {
  const queryClient = useQueryClient();

  const moduleFieldsQuery = useQuery(
    [QueryKeys.moduleFields, projectId],
    ({ queryKey }) => getModuleFieldsForProject(queryKey[1] as string),
    {
      suspense: true,
    },
  );

  const createModuleFieldsMutation = useMutation(
    (args: Omit<CreateModuleRequestBody, 'site'>) =>
      createModuleField({ ...args, site: projectId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.moduleFields, projectId]);
      },
    },
  );

  const updateModuleFieldsMutation = useMutation(updateModuleField, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.moduleFields, projectId]);
    },
  });

  const deleteModuleFieldsMutation = useMutation(deleteModuleField, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.moduleFields, projectId]);
    },
  });

  return {
    moduleFieldsQuery,
    createModuleFieldsMutation,
    updateModuleFieldsMutation,
    deleteModuleFieldsMutation,
  };
};
