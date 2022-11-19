import { DeleteFileFromStringRequest } from '../types';
import { youderaApiInstance } from '../../api-instances/youdera';

export const deleteFileFromString = async ({
  stringId,
  fileId
}: DeleteFileFromStringRequest) => {
  const response = await youderaApiInstance.delete(
    `/strings/${stringId}/files/${fileId}/`,
  );

  return response.data;
};
