import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { addFileToString } from '../mutations/addFileToString';
import { createString } from '../mutations/createString';
import { deleteString } from '../mutations/deleteString';
import { getStringsOnRoof } from '../queries/getStringsOnRoof';
import { QueryKeys } from '../../enums/queryKeys';

export const useStrings = (roofId: number) => {
  const queryClient = useQueryClient();

  const stringsOnRoofQuery = useQuery(
    [QueryKeys.strings, roofId],
    async ({ queryKey }) => getStringsOnRoof(queryKey[1] as number),
  );

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
    stringsOnRoofQuery,
    createStringMutation,
    deleteStringMutation,
  };
};
