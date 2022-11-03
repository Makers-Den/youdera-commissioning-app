import { Site } from '../types';
import { youderaApiInstance } from '../../api-instances/youdera';
import { CreateDataResponse } from '../../types';

export const getUncommissionedSites = async () => {
  const response = await youderaApiInstance.get<CreateDataResponse<Site[]>>(
    '/sites/uncommissioned',
  );

  return response.data.data;
};
