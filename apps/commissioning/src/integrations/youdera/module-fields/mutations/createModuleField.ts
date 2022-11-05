import { CreateModuleRequestBody } from '../types';
import { youderaApiInstance } from '../../api-instances/youdera';

export const createModuleField = async (body: CreateModuleRequestBody) => {
  const response = await youderaApiInstance.post(`/roofs`, body);

  return response.data.data.roofs;
};
