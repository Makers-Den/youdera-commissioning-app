import { youderaApiInstance } from '../../api-instances/youdera';

export const deleteString = async (stringId: number) => {
	const response = await youderaApiInstance.delete(`/strings/${stringId}`);

	return response.data.data;
};
