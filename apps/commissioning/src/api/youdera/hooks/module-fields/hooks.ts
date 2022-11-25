import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createModuleField,
  deleteModuleField,
  getModuleFieldsForProject,
  updateModuleField,
} from './apiRequests';
import { CreateModuleRequestBody } from '../../apiTypes';
import { QueryKeys } from '../../enums/queryKeys';

export const useModuleFieldsQuery = (projectId: number) =>
  useQuery(
    [QueryKeys.moduleFields, projectId],
    ({ queryKey }) => getModuleFieldsForProject(queryKey[1] as number),
    {
      suspense: true,
    },
  );

export const useModuleFieldsMutations = (projectId: number) => {
  const queryClient = useQueryClient();

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
    createModuleFieldsMutation,
    updateModuleFieldsMutation,
    deleteModuleFieldsMutation,
  };
};
