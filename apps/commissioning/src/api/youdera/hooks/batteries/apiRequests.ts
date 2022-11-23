import { youderaApiInstance } from '../../api-instances/youdera';
import {
  AddFileToBatteryRequest,
  ApiFile,
  Battery,
  BatteryModel,
  CreateBatteryRequest,
  DataResponse,
  UpdateBatteryRequest,
  VerificationTestResult,
} from '../../apiTypes';

export const deleteBattery = async (id: number): Promise<Battery> => {
  const response = await youderaApiInstance.delete<DataResponse<Battery>>(
    `/batteries/${id}`,
  );
  return response.data.data;
};

export const getBattery = async (id: number): Promise<Battery> => {
  const response = await youderaApiInstance.get<DataResponse<Battery>>(
    `/batteries/${id}`,
  );
  return response.data.data;
};

export const createBattery = async (body: CreateBatteryRequest) => {
  const response = await youderaApiInstance.post<DataResponse<Battery>>(
    `/batteries`,
    { ...body, name: 'Default' },
  );

  return response.data.data;
};

export const updateBattery = async ({ id, ...body }: UpdateBatteryRequest) => {
  const response = await youderaApiInstance.patch<DataResponse<Battery>>(
    `/batteries/${id}`,
    { ...body, name: 'Default' },
  );

  return response.data.data;
};

export const getBatteryVerificationGuide = async (
  id: number,
): Promise<string> => {
  const response = await youderaApiInstance.get<DataResponse<string>>(
    `/batteries/${id}/test`,
  );
  return response.data.data;
};

export interface AddFileToBatteryArgs extends AddFileToBatteryRequest {
  setUploadProgress?: (percentage: number) => void;
}

export const addFileToBattery = async ({
  batteryId,
  file,
  setUploadProgress,
}: AddFileToBatteryArgs) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', 'image');

  const response = await youderaApiInstance.post<DataResponse<ApiFile>>(
    `/batteries/${batteryId}/files`,
    formData,
    {
      headers: {
        'Content-type': 'multipart/form-data',
      },
      onUploadProgress(progressEvent) {
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setUploadProgress?.(percentCompleted);
        }
      },
    },
  );

  return response.data.data;
};

export interface DeleteFileFromBatteryReq {
  batteryId: Battery['id'];
  fileId: ApiFile['id'];
}

export const deleteFileFromBattery = async ({
  batteryId,
  fileId,
}: DeleteFileFromBatteryReq) => {
  const response = await youderaApiInstance.delete<DataResponse<ApiFile>>(
    `/batteries/${batteryId}/files/${fileId}`,
  );

  return response.data.data;
};

export const executeBatteryVerification = async (
  id: number,
): Promise<VerificationTestResult> => {
  const response = await youderaApiInstance.post<
    DataResponse<VerificationTestResult>
  >(`/batteries/${id}/test`);
  return response.data.data;
};

export const getBatteryModels = async () => {
  const response = await youderaApiInstance.get<DataResponse<BatteryModel[]>>(
    `/catalogue/models/battery`,
  );
  return response.data.data;
};
