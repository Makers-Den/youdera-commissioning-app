import { CreateModuleRequestBody, ModuleField } from '../types';
import { youderaApiInstance } from '../../api-instances/youdera';
import { DataResponse } from '../../apiTypes';

export const createModuleField = async (body: CreateModuleRequestBody): Promise<ModuleField> => {
  const response = await youderaApiInstance.post<DataResponse<ModuleField>>(`/roofs`, body);

  return response.data.data;
};
