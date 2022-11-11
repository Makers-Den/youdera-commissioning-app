import { youderaApiInstance } from '../../api-instances/youdera';

export const deleteInverter = async (id: number) => {
  const response = await youderaApiInstance.delete(`/inverters/${id}`);

  return response.data;
};
