import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteInverter } from '../mutations/deleteInverter';
import { QueryKeys } from '../../enums/queryKeys';

export const useInverterApi = (siteId: number) => {
  const queryClient = useQueryClient();

  const deleteInverterMutation = useMutation(deleteInverter, {
    onSuccess: () => {
      // NOTE: this is quite coarse. We could also have inverters cached separately
      queryClient.invalidateQueries([QueryKeys.editedSite, siteId])
    },
  });

  return {
    deleteInverterMutation,
  };
};
