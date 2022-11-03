import { youderaApiInstance } from '../../api-instances/youdera';

export const logOut = async () => {
  const response = await youderaApiInstance.get(`/auth/logout`);
  return response.data;
};
