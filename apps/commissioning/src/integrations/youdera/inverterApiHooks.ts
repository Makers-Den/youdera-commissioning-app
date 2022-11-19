import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { addFileToInverter, createInverter, deleteInverter, executeInverterVerification, getInverterDetails, getInverters, getInverterVerificationGuide } from './apiRequests';
import { QueryKeys } from './enums/queryKeys';

export const useInverterMutations = (siteId: number) => {
  const queryClient = useQueryClient();

  const invertersQuery = useQuery(
    [QueryKeys.inverters, siteId],
    async ({ queryKey }) => getInverters(queryKey[1] as number),
    { suspense: true },
  );

  const createInverterMutation = useMutation(createInverter, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.editedSite, siteId])
    },
  });

  /*
  const updateInverterMutation = useMutation(updateInverter, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.editedSite, siteId])
    },
  });
  */

  const deleteInverterMutation = useMutation(deleteInverter, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.editedSite, siteId])
    },
  });

  const executeInverterVerificationMutation = useMutation(executeInverterVerification, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.editedSite, siteId])
    },
  });

  const addFileToInverterMutation = useMutation(addFileToInverter, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.editedSite, siteId]);
    },
  });

  return {
    invertersQuery,
    addFileToInverterMutation,
    createInverterMutation,
    deleteInverterMutation,
    executeInverterVerificationMutation
  };
};

export const useInverterVerificationGuideQuery = (id: number) => useQuery(
  [QueryKeys.inverterVerificationGuide, id],
  ({ queryKey }) => getInverterVerificationGuide(queryKey[1] as number),
);

export const useInverterDetailsQuery = (inverterId: number) => useQuery(
  [QueryKeys.inverterDetails, inverterId],
  async ({ queryKey }) => (queryKey[1] as number) >= 0 && getInverterDetails(queryKey[1] as number),
)