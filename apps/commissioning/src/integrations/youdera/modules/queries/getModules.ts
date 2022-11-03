import { Module } from '../types';
import { youderaApiInstance } from '../../api-instances/youdera';
import { CreateDataResponse } from '../../types';

export const getModules = async () => {
  const response = await youderaApiInstance.get<CreateDataResponse<Module[]>>(
    '/catalogue/models/module',
  );

  return response.data.data;
};
