import { UserInfo } from '../types';
import { youderaApiInstance } from '../../api-instances/youdera';

export const getUserInfo = async () => {
  const response = await youderaApiInstance.get<UserInfo>(`/auth`);

  return response.data;
};
