import { Gateway } from '../types';
import { youderaApiInstance } from '../../api-instances/youdera';
import { UpdateDataResponse } from '../../types';

export const updateGateway = async ({
  gatewayId,
  siteId
}: {
  gatewayId: number,
  siteId?: number | null;
}): Promise<Gateway> => {
  const response = await youderaApiInstance.patch<UpdateDataResponse<Gateway>>(`/gateways/${gatewayId}`, {
    site_id: siteId
  });

  return response.data.data;
};
