import { CreateInverterRequestBody } from '../types';
import { youderaApiInstance } from '../../api-instances/youdera';

export const createInverter = async (body: CreateInverterRequestBody) => {
	const response = await youderaApiInstance.post(`/inverters`, body);

	return response.data.data;
};
