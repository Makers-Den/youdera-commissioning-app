import { youderaApiInstance } from '../../api-instances/youdera';
import { DataResponse, Inverter } from '../../apiTypes';
import { Site } from '../../sites/types';

export const getInverters = async (siteId: number): Promise<Inverter[]> => {
	const response = await youderaApiInstance.get<DataResponse<Site & { inverters: Inverter[] }>>(
		`sites/${siteId}?with[]=inverters&with[]=inverters.mpp_trackers`,
	);

	return response.data.data.inverters;
};
