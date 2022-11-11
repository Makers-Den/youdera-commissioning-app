import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteMeter } from '../mutations/deleteMeter';
import { QueryKeys } from '../../enums/queryKeys';

export const useMeterApi = (siteId: number) => {
  const queryClient = useQueryClient();

  const deleteMeterMutation = useMutation(deleteMeter, {
    onSuccess: () => {
      // NOTE: this is quite coarse. We could also have inverters cached separately
      queryClient.invalidateQueries([QueryKeys.editedSite, siteId])
    },
  });

  return {
    deleteMeterMutation,
  };
};
