import { youderaApiInstance } from '../../api-instances/youdera';
import { BatteryModel } from '../../apiTypes';
import { CreateDataResponse } from '../../types';

export const getBatteryModels = async () => {
  const response = await youderaApiInstance.get<
    CreateDataResponse<BatteryModel[]>
  >(`/catalogue/models/battery`);
  return response.data.data;
};
