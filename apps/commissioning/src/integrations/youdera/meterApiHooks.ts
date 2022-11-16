import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createMeter, deleteMeter, executeMeterVerification, getMeterVerificationGuide, updateMeter } from './apiRequests';
import { QueryKeys } from './enums/queryKeys';

export const useMeterMutations = (siteId: number) => {
  const queryClient = useQueryClient();

  const createMeterMutation = useMutation(createMeter, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.editedSite, siteId])
    },
  });

  const updateMeterMutation = useMutation(updateMeter, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.editedSite, siteId])
    },
  });

  const deleteMeterMutation = useMutation(deleteMeter, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.editedSite, siteId])
    },
  });

  const executeMeterVerificationMutation = useMutation(executeMeterVerification, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.editedSite, siteId])
    },
  });

  return {
    updateMeterMutation,
    createMeterMutation,
    deleteMeterMutation,
    executeMeterVerificationMutation
  };
};

export const useMeterQuery = (meterId: number) => useQuery(
  [QueryKeys.meterVerificationGuide, meterId],
  ({ queryKey }) => getMeterVerificationGuide(queryKey[1] as number),
);

export const useMeterVerificationGuideQuery = (meterId: number) => useQuery(
  [QueryKeys.meterVerificationGuide, meterId],
  ({ queryKey }) => getMeterVerificationGuide(queryKey[1] as number),
);