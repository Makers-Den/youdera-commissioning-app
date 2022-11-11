import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteBattery } from '../mutations/deleteBattery';
import { QueryKeys } from '../../enums/queryKeys';

export const useBatteryApi = (siteId: number) => {
  const queryClient = useQueryClient();

  const deleteBatteryMutation = useMutation(deleteBattery, {
    onSuccess: () => {
      // NOTE: this is quite coarse. We could also have inverters cached separately
      queryClient.invalidateQueries([QueryKeys.editedSite, siteId])
    },
  });

  return {
    deleteBatteryMutation,
  };
};
