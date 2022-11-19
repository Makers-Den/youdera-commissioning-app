import { youderaApiInstance } from '../../api-instances/youdera';
import { DataResponse, Gateway } from '../../apiTypes';

export const getGateways = async () => {
  const response = await youderaApiInstance.get<DataResponse<Gateway[]>>(
    '/gateways',
  );

  return response.data.data;
};

export const getUnattachedGateways = async () => {
  const response = await youderaApiInstance.get<DataResponse<Gateway[]>>(
    '/gateways/unattached',
  );

  return response.data.data;
};

export const updateGateway = async ({
  gatewayId,
  siteId,
}: {
  gatewayId: number;
  siteId?: number | null;
}): Promise<Gateway> => {
  const response = await youderaApiInstance.patch<DataResponse<Gateway>>(
    `/gateways/${gatewayId}`,
    {
      site_id: siteId,
    },
  );

  return response.data.data;
};
