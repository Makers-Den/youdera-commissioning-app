import { youderaApiInstance } from '../../api-instances/youdera';
import {
  CreateModuleRequestBody,
  DataResponse,
  ModuleField,
  SiteWithModuleFields,
  UpdateModuleRequestBody,
} from '../../apiTypes';

export const createModuleField = async (body: CreateModuleRequestBody) => {
  const response = await youderaApiInstance.post(`/roofs`, body);

  return response.data.data;
};

export const deleteModuleField = async (moduleFieldId: ModuleField['id']) => {
  const response = await youderaApiInstance.delete(`/roofs/${moduleFieldId}`);

  return response.data;
};

export const updateModuleField = async ({
  id,
  ...body
}: UpdateModuleRequestBody) => {
  const response = await youderaApiInstance.patch(`/roofs/${id}`, body);

  return response.data;
};

export const getModuleFieldsForProject = async (projectId: string) => {
  const response = await youderaApiInstance.get<
    DataResponse<SiteWithModuleFields>
  >(`/sites/${projectId}?with[]=roofs`);

  return response.data.data.roofs;
};
