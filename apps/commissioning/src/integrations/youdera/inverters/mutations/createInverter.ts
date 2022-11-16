import { CreateInverterRequestBody, Inverter } from '../types';
import { youderaApiInstance } from '../../api-instances/youdera';
import { CreateDataResponse } from '../../types';

export const createInverter = async (body: CreateInverterRequestBody) => {
  const response = await youderaApiInstance.post<CreateDataResponse<Inverter>>(
    `/inverters`,
    body,
  );

  return response.data.data;
};
