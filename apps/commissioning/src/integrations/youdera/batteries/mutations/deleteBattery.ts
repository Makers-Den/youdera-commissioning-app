import { youderaApiInstance } from '../../api-instances/youdera';

export const deleteBattery = async (id: number) => {
  const response = await youderaApiInstance.delete(`/batteries/${id}`);

  return response.data;
};
