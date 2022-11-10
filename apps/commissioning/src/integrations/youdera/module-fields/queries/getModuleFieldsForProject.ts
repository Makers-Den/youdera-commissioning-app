import { SiteWithModuleFields } from '../types';
import { youderaApiInstance } from '../../api-instances/youdera';
import { CreateDataResponse } from '../../types';

export const getModuleFieldsForProject = async (projectId: string) => {
  const response = await youderaApiInstance.get<
    CreateDataResponse<SiteWithModuleFields>
  >(`/sites/${projectId}?with[]=roofs`);

  return response.data.data.roofs;
};
