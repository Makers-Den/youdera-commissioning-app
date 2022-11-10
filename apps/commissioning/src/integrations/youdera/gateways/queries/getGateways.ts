import { Gateway } from '../types';
import { youderaApiInstance } from '../../api-instances/youdera';
import { CreateDataResponse } from '../../types';

export const getGateways = async () => {
  const response = await youderaApiInstance.get<CreateDataResponse<Gateway[]>>(
    '/gateways',
  );

  return response.data.data;
};
