import { StringsOnRoof } from '../types';
import { youderaApiInstance } from '../../api-instances/youdera';
import { CreateDataResponse } from '../../types';

export const getStringsOnRoof = async (roofId: number) => {
	const response = await youderaApiInstance.get<CreateDataResponse<StringsOnRoof>>(
		`/roofs/${roofId}?with[]=strings`,
	);

	return {
		...response.data.data,
		//Hardcoded values - waiting for backend
		strings: response.data.data.strings.map((string) => ({
			...string,
			module_type: 'Hardcoded Value'
		}))
	};
};
