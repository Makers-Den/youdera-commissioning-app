import { CreateStringRequestBody } from '../types';
import { youderaApiInstance } from '../../api-instances/youdera';

export const createString = async (body: CreateStringRequestBody) => {
	const response = await youderaApiInstance.post(`/strings`, body);

	return response.data.data;
};
