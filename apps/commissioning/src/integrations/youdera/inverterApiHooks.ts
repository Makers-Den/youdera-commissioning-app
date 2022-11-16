import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { addFileToInverter,createInverter, deleteInverter, executeInverterVerification, getInverterVerificationGuide } from './apiRequests';
import { QueryKeys } from './enums/queryKeys';

export const useInverterMutations = (siteId: number) => {
  const queryClient = useQueryClient();

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