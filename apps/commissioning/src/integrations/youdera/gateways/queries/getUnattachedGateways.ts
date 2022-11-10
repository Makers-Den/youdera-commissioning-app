import { Gateway } from '../types';
import { youderaApiInstance } from '../../api-instances/youdera';
import { CreateDataResponse } from '../../types';

export const getUnattachedGateways = async () => {
  const response = await youderaApiInstance.get<CreateDataResponse<Gateway[]>>(
    '/gateways/unattached',
  );

  return response.data.data;
};
