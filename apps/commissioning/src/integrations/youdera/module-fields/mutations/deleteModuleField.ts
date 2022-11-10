import { youderaApiInstance } from '../../api-instances/youdera';

export const deleteModuleField = async (moduleFieldId: string) => {
  const response = await youderaApiInstance.delete(`/roofs/${moduleFieldId}`);

  return response.data;
};
