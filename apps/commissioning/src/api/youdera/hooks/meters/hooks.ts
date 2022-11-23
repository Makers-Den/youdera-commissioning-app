import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  addFileToMeter,
  createMeter,
  deleteFileFromString,
  deleteMeter,
  executeMeterVerification,
  getMeter,
  getMeterModels,
  getMeterVerificationGuide,
  updateMeter,
} from './apiRequests';
import { youderaApiInstance } from '../../api-instances/youdera';
import { CommsParams, CommsTestResult, Datapoint, DataResponse } from '../../apiTypes';
import { QueryKeys } from '../../enums/queryKeys';

export const useUpdateMeterCommsMutation = (siteId: number) => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, ...params }: CommsParams & { id: number }) =>
      youderaApiInstance
        .post<DataResponse<Datapoint>>(
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

export const useMeterCommsTestMutation = () => useMutation(
  ({ id, ...params }: CommsParams & { id: number }) =>
    youderaApiInstance
      .post<DataResponse<CommsTestResult>>(
        `/meters/${id}/communication/test`,
        params,
      )
      .then(resp => resp.data.data),
);

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

  const addFileToMeterMutation = useMutation(addFileToMeter, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.editedSite, siteId]);
      queryClient.invalidateQueries([QueryKeys.meter, siteId]);
    },
  });

  const deleteFileToMeterMutation = useMutation(deleteFileFromString, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.editedSite, siteId]);
      queryClient.invalidateQueries([QueryKeys.meter, siteId]);
    },
  })

  return {
    updateMeterMutation,
    createMeterMutation,
    deleteMeterMutation,
    executeMeterVerificationMutation,
    addFileToMeterMutation,
    deleteFileToMeterMutation
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

export const useMeterModelsQuery = () =>
  useQuery([QueryKeys.meterModels], async () => getMeterModels(), {
    suspense: true,
  });