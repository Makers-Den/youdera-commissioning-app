import { useQuery } from '@tanstack/react-query';

import { getBatteryModels } from '../queries/getBatteryModels';
import { QueryKeys } from '../../enums/queryKeys';

export const useBatteryModelsApi = () => {
  const batteryModelsQuery = useQuery(
    [QueryKeys.batteryModels],
    getBatteryModels,
  );

  return { batteryModelsQuery };
};
