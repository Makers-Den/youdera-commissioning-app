import { Inverter } from '../types'
import { youderaApiInstance } from '../../api-instances/youdera';
import { Site } from '../../sites/types';
import { CreateDataResponse } from '../../types';

export const getInverters = async (siteId: number) => {
	const response = await youderaApiInstance.get<CreateDataResponse<Site & { inverters: Inverter[] }>>(
		`sites/${siteId}?with[]=inverters&with[]=inverters.mpp_trackers`,
	);

	return response.data.data.inverters;
};
