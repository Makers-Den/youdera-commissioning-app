import { UpdateModuleRequestBody } from '../types';
import { youderaApiInstance } from '../../api-instances/youdera';

export const updateModuleField = async ({
  id,
  ...body
}: UpdateModuleRequestBody) => {
  const response = await youderaApiInstance.patch(`/roofs/${id}`, body);

  return response.data;
};
