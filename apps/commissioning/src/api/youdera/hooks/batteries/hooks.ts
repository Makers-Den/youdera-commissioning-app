import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  addFileToBattery,
  createBattery,
  deleteBattery,
  executeBatteryVerification,
  getBatteryModels,
  getBatteryVerificationGuide,
  updateBattery,
} from './apiRequests';
import { youderaApiInstance } from '../../api-instances/youdera';
import {
  CommsParams,
  CommsTestResult,
  CreateBatteryRequest,
  DataResponse,
  UpdateBatteryRequest,
} from '../../apiTypes';
import { QueryKeys } from '../../enums/queryKeys';

export const useUpdateBatteryCommsMutation = (siteId: number) => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, ...params }: CommsParams & { id: number }) =>
      youderaApiInstance
        .post<DataResponse<CommsTestResult>>(
          `/batteries/${id}/communication`,
          params,
        )
        .then(resp => resp.data.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.editedSite, siteId]);
      },
    },
  );
};

export const useBatteryMutations = (siteId: number) => {
  const queryClient = useQueryClient();

  const createBatteryMutation = useMutation(
    (body: Omit<CreateBatteryRequest, 'site'>) =>
      createBattery({ site: siteId, ...body }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.editedSite, siteId]);
      },
    },
  );

  const addFileToBatteryMutation = useMutation(addFileToBattery, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.editedSite, siteId]);
    },
  });

  const updateBatteryMutation = useMutation(
    (body: Omit<UpdateBatteryRequest, 'site'>) =>
      updateBattery({ site: siteId, ...body }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.editedSite, siteId]);
      },
    },
  );

  const deleteBatteryMutation = useMutation(deleteBattery, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.editedSite, siteId]);
    },
  });

  const executeBatteryVerificationMutation = useMutation(
    executeBatteryVerification,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.editedSite, siteId]);
      },
    },
  );

  return {
    addFileToBatteryMutation,
    deleteBatteryMutation,
    executeBatteryVerificationMutation,
    createBatteryMutation,
    updateBatteryMutation,
  };
};

export const useBatteryVerificationGuideQuery = (id: number) =>
  useQuery([QueryKeys.batteryVerificationGuide, id], ({ queryKey }) =>
    getBatteryVerificationGuide(queryKey[1] as number),
  );

export const useBatteryModelsQuery = () =>
  useQuery([QueryKeys.batteryModels], getBatteryModels);
