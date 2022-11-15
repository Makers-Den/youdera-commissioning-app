import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addFileToInverter } from '../mutations/addFileToInverter';
import { createInverter } from '../mutations/createInverter';
import { deleteInverter } from '../../apiRequests';
import { QueryKeys } from '../../enums/queryKeys';

export const useInverterApi = (siteId: number) => {
  const queryClient = useQueryClient();

  const deleteInverterMutation = useMutation(deleteInverter, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.editedSite, siteId]);
    },
  });

  const createInverterMutation = useMutation(createInverter, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.editedSite, siteId]);
    },
  });

  const addFileToInverterMutation = useMutation(addFileToInverter, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.editedSite, siteId]);
    },
  });

  return {
    deleteInverterMutation,
    createInverterMutation,
    addFileToInverterMutation,
  };
};
