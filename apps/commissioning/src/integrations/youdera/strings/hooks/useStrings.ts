import { useQuery } from '@tanstack/react-query';

import { getStringsOnRoof } from '../queries/getStringsOnRoof';
import { QueryKeys } from '../../enums/queryKeys';

export const useStrings = (roofId: number) => {
  const stringsOnRoofQuery = useQuery(
    [QueryKeys.strings, roofId],
    async ({ queryKey }) => getStringsOnRoof(queryKey[1] as number),
  );

  return { stringsOnRoofQuery };
};
