import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createMeter,
  deleteMeter,
  executeMeterVerification,
  getMeter,
  getMeterVerificationGuide,
  updateMeter,
} from './apiRequests';
import { youderaApiInstance } from '../../api-instances/youdera';
import { CommsParams, CommsTestResult, DataResponse } from '../../apiTypes';
import { QueryKeys } from '../../enums/queryKeys';

export const useUpdateMeterCommsMutation = (siteId: number) => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, ...params }: CommsParams & { id: number }) =>
      youderaApiInstance
        .post<DataResponse<CommsTestResult>>(
          `/meters/${id}/communication`,
          params,
        )
        .then(resp => resp.data.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.editedSite, siteId]);
      },
    },
  );
};

export const useMeterMutations = (siteId: number) => {
  const queryClient = useQueryClient();

  const createMeterMutation = useMutation(createMeter, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.editedSite, siteId]);
    },
  });

  const updateMeterMutation = useMutation(updateMeter, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.editedSite, siteId]);
    },
  });

  const deleteMeterMutation = useMutation(deleteMeter, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.editedSite, siteId]);
    },
  });

  const executeMeterVerificationMutation = useMutation(
    executeMeterVerification,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.editedSite, siteId]);
      },
    },
  );

  return {
    updateMeterMutation,
    createMeterMutation,
    deleteMeterMutation,
    executeMeterVerificationMutation,
  };
};

export const useMeterQuery = (meterId: number) =>
  useQuery([QueryKeys.meter, meterId], ({ queryKey }) =>
    getMeter(queryKey[1] as number),
  );

export const useMeterVerificationGuideQuery = (meterId: number) =>
  useQuery([QueryKeys.meterVerificationGuide, meterId], ({ queryKey }) =>
    getMeterVerificationGuide(queryKey[1] as number),
  );