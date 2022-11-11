import { youderaApiInstance } from '../../api-instances/youdera';

export const deleteMeter = async (id: number) => {
  const response = await youderaApiInstance.delete(`/meters/${id}`);

  return response.data;
};
