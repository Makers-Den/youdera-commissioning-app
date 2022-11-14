import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteBattery, executeBatteryVerification, getBatteryVerificationGuide } from './apiRequests';
import { QueryKeys } from './enums/queryKeys';

export const useBatteryMutations = (siteId: number) => {
  const queryClient = useQueryClient();
  /*
  const createBatteryMutation = useMutation(createBattery, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.editedSite, siteId])
    },
  });

  const updateBatteryMutation = useMutation(updateBattery, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.editedSite, siteId])
    },
  });
  */

  const deleteBatteryMutation = useMutation(deleteBattery, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.editedSite, siteId])
    },
  });

  const executeBatteryVerificationMutation = useMutation(executeBatteryVerification, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.editedSite, siteId])
    },
  });

  return {
    deleteBatteryMutation,
    executeBatteryVerificationMutation,
  };
};

export const useBatteryVerificationGuideQuery = (id: number) => useQuery(
  [QueryKeys.batteryVerificationGuide, id],
  ({ queryKey }) => getBatteryVerificationGuide(queryKey[1] as number),
);
