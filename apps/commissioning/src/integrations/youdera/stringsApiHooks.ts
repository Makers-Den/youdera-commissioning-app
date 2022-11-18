import { useQuery } from "@tanstack/react-query";

import { getStringDetails } from "./apiRequests";
import { QueryKeys } from "./enums/queryKeys";

export const useStringDetailsQuery = (stringId: number) => useQuery(
	[QueryKeys.stringDetails, stringId],
	async ({ queryKey }) => (queryKey[1] as number) > 0 && getStringDetails(queryKey[1] as number),
	{ suspense: true },
)