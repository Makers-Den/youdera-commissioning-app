import { InverterModel } from '../types';
import { youderaApiInstance } from '../../api-instances/youdera';

export const getInverterModels = async () => {
  const response = await youderaApiInstance.get<InverterModel[]>(`/catalogue/models/inverter`);
  return response.data;
};
