import { youderaApiInstance } from '../../api-instances/youdera';

export const deleteModuleField = async (moduleFieldId: number) => {
  const response = await youderaApiInstance.delete(`/roofs/${moduleFieldId}`);

  return response.data;
};
