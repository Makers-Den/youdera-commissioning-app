import { InverterModel } from '../types';
import { youderaApiInstance } from '../../api-instances/youdera';
import { CreateDataResponse } from '../../types';

export const getInverterModels = async () => {
  const response = await youderaApiInstance.get<CreateDataResponse<InverterModel[]>>(`/catalogue/models/inverter`);
  return response.data.data;
};
