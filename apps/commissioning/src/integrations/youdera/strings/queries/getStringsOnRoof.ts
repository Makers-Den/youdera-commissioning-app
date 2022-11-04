import { StringsOnRoof } from '../types';
import { youderaApiInstance } from '../../api-instances/youdera';
import { CreateDataResponse } from '../../types';

export const getStringsOnRoof = async (roofId: number) => {
	const response = await youderaApiInstance.get<CreateDataResponse<StringsOnRoof>>(
		`/roofs/${roofId}?with[]=strings`,
	);

	return response.data.data;
};
