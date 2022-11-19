import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getStringDetails, updateString } from "./apiRequests";
import { QueryKeys } from "./enums/queryKeys";

export const useStringDetailsQuery = (stringId: number) => useQuery(
  [QueryKeys.stringDetails, stringId],
  async ({ queryKey }) => (queryKey[1] as number) > 0 && getStringDetails(queryKey[1] as number),
  { suspense: true },
)

export const useString = (stringId: number) => {
  const queryClient = useQueryClient();

  const stringDetailsQuery = useQuery(
    [QueryKeys.stringDetails, stringId],
    async ({ queryKey }) => (queryKey[1] as number) > 0 && getStringDetails(queryKey[1] as number),
    { suspense: true },
  )

  const updateStringMutation = useMutation(updateString, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.strings, stringId])
    },
  });

  return {
    stringDetailsQuery,
    updateStringMutation,
  }
}