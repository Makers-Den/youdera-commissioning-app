import { useQuery } from '@tanstack/react-query';

import { getInverterModels } from '../queries/getInverterModels';
import { QueryKeys } from '../../enums/queryKeys';

export const useModels = () => {
	const inverterModelsQuery = useQuery(
		[QueryKeys.inverterModels],
		getInverterModels,
	);

	return { inverterModelsQuery };
};