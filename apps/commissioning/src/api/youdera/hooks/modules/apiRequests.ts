import { youderaApiInstance } from '../../api-instances/youdera';
import { DataResponse, Module } from '../../apiTypes';

export const getModules = async () => {
  const response = await youderaApiInstance.get<DataResponse<Module[]>>(
    '/catalogue/models/module',
  );

  return response.data.data;
};
