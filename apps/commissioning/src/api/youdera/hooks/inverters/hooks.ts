import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  addFileToInverter,
  createInverter,
  deleteFileFromInverter,
  deleteInverter,
  executeInverterVerification,
  getInverterDetails,
  getInverterModels,
  getInverters,
  getInverterVerificationGuide,
  updateInverter,
} from './apiRequests';
import { youderaApiInstance } from '../../api-instances/youdera';
import { CommsParams, CommsTestResult, Datapoint, DataResponse } from '../../apiTypes';
import { QueryKeys } from '../../enums/queryKeys';

export const useUpdateInverterCommsMutation = (siteId: number) => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, ...params }: CommsParams & { id: number }) =>
      youderaApiInstance
        .post<DataResponse<Datapoint>>(
          `/inverters/${id}/communication`,
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

export const useInverterCommsTestMutation = () => useMutation(
  ({ id, ...params }: CommsParams & { id: number }) =>
    youderaApiInstance
      .post<DataResponse<CommsTestResult>>(
        `/inverters/${id}/communication/test`,
        params,
      )
      .then(resp => resp.data.data),
);

export const useInverterMutations = (siteId: number) => {
  const queryClient = useQueryClient();

  const createInverterMutation = useMutation(createInverter, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.editedSite, siteId]);
      queryClient.invalidateQueries([QueryKeys.inverters, siteId]);
    },
  });

  const updateInverterMutation = useMutation(updateInverter, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.editedSite, siteId]);
      queryClient.invalidateQueries([QueryKeys.inverters, siteId]);
    },
  });

  const deleteInverterMutation = useMutation(deleteInverter, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.editedSite, siteId]);
      queryClient.invalidateQueries([QueryKeys.inverters, siteId]);
    },
  });

  const executeInverterVerificationMutation = useMutation(
    executeInverterVerification,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.editedSite, siteId]);
        queryClient.invalidateQueries([QueryKeys.inverters, siteId]);
      },
    },
  );

  const addFileToInverterMutation = useMutation(addFileToInverter, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.editedSite, siteId]);
      queryClient.invalidateQueries([QueryKeys.inverters, siteId]);
    },
  });

  const deleteFileFromInverterMutation = useMutation(deleteFileFromInverter, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.editedSite, siteId]);
      queryClient.invalidateQueries([QueryKeys.inverters, siteId]);
    },
  });

  return {
    addFileToInverterMutation,
    updateInverterMutation,
    createInverterMutation,
    deleteInverterMutation,
    executeInverterVerificationMutation,
    deleteFileFromInverterMutation,
  };
};

export const useInvertersQuery = (siteId: number) =>
  useQuery(
    [QueryKeys.inverters, siteId],
    async ({ queryKey }) => getInverters(queryKey[1] as number),
    { suspense: true },
  );

export const useInverterModelsQuery = () =>
  useQuery([QueryKeys.inverterModels], async () => getInverterModels(), {
    suspense: true,
  });

export const useInverterDetailsQuery = (inverterId: number) =>
  useQuery(
    [QueryKeys.inverterDetails, inverterId],
    async ({ queryKey }) =>
      (queryKey[1] as number) >= 0 && getInverterDetails(queryKey[1] as number),
  );

export const useInverterVerificationGuideQuery = (id: number) =>
  useQuery([QueryKeys.inverterVerificationGuide, id], ({ queryKey }) =>
    getInverterVerificationGuide(queryKey[1] as number),
  );
