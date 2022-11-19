import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  addFileToString,
  createString,
  deleteString,
  getStringDetails,
  getStringsOnRoof,
} from './apiRequests';
import { QueryKeys } from '../../enums/queryKeys';

export const useStringsQuery = (roofId: number) =>
  useQuery([QueryKeys.strings, roofId], async ({ queryKey }) =>
    getStringsOnRoof(queryKey[1] as number),
  );

export const useStringDetailsQuery = (stringId: number) =>
  useQuery(
    [QueryKeys.stringDetails, stringId],
    async ({ queryKey }) =>
      (queryKey[1] as number) > 0 && getStringDetails(queryKey[1] as number),
    { suspense: true },
  );

export const useStringsMutations = (roofId: number) => {
  const queryClient = useQueryClient();

  const createStringMutation = useMutation(createString, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.strings, roofId]);
    },
  });

  const addFileToStringMutation = useMutation(addFileToString, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.strings, roofId]);
    },
  });

  const deleteStringMutation = useMutation(deleteString, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.strings, roofId]);
    },
  });

  return {
    addFileToStringMutation,
    createStringMutation,
    deleteStringMutation,
  };
};
