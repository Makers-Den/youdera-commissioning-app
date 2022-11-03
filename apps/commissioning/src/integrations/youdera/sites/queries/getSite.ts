import { youderaApiInstance } from '../../api-instances/youdera';

export const getSite = async (siteId: string) => {
  const response = await youderaApiInstance.get(
    `/sites/${siteId}?with[]=files`,
  );

  return response.data;
};
