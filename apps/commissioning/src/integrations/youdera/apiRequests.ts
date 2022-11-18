import { youderaApiInstance } from './api-instances/youdera';
import {
  AddFileToBatteryRequest,
  ApiFile,
  Battery,
  CreateBatteryRequest,
  CreateInverterRequestBody,
  DataResponse,
  Inverter,
  Meter,
  String,
  VerificationTestResult,
} from './apiTypes';
import { Site } from './sites/types';

export const getUncommissionedSites = async () => {
  const response = await youderaApiInstance.get<DataResponse<Site[]>>(
    '/sites/uncommissioned',
  );
  return response.data.data;
};

export const getSite = async (siteId: string) => {
  const response = await youderaApiInstance.get<DataResponse<Site>>(
    `/sites/${siteId}` +
      `?with[]=files` +
      `&with[]=batteries` +
      `&with[]=batteries.testlogs` +
      `&with[]=meters` +
      `&with[]=meters.testlogs` +
      `&with[]=inverters` +
      `&with[]=inverters.testlogs` +
      `&with[]=inverters.mpp_trackers`,
  );

  return response.data.data;
};

export const getStringDetails = async (stringId: number): Promise<String> => {
  const response = await youderaApiInstance.get<DataResponse<String>>(
    `strings/${stringId}?with[]=mpp_tracker&with[]=files`,
  );
  return response.data.data;
};

export const deleteMeter = async (id: number): Promise<Meter> => {
  const response = await youderaApiInstance.delete<DataResponse<Meter>>(
    `/meters/${id}`,
  );
  return response.data.data;
};

export const deleteBattery = async (id: number): Promise<Battery> => {
  const response = await youderaApiInstance.delete<DataResponse<Battery>>(
    `/batteries/${id}`,
  );
  return response.data.data;
};

export const getInverters = async (siteId: number): Promise<Inverter[]> => {
  const response = await youderaApiInstance.get<
    DataResponse<Site & { inverters: Inverter[] }>
  >(`sites/${siteId}?with[]=inverters&with[]=inverters.mpp_trackers`);
  return response.data.data.inverters;
};

export const getInverterDetails = async (
  inverterId: number,
): Promise<Inverter> => {
  const response = await youderaApiInstance.get<DataResponse<Inverter>>(
    `inverters/${inverterId}?with[]=files&with[]=mpp_trackers`,
  );
  return response.data.data;
};

export const createInverter = async (
  body: CreateInverterRequestBody,
): Promise<Inverter> => {
  const response = await youderaApiInstance.post<DataResponse<Inverter>>(
    `/inverters`,
    body,
  );
  return response.data.data;
};

export const deleteInverter = async (id: number): Promise<Inverter> => {
  const response = await youderaApiInstance.delete<DataResponse<Inverter>>(
    `/inverters/${id}`,
  );
  return response.data.data;
};

export const getInverterVerificationGuide = async (
  id: number,
): Promise<string> => {
  const response = await youderaApiInstance.get<DataResponse<string>>(
    `/inverters/${id}/test`,
  );
  return response.data.data;
};

export const executeInverterVerification = async (
  id: number,
): Promise<VerificationTestResult> => {
  const response = await youderaApiInstance.post<
    DataResponse<VerificationTestResult>
  >(`/inverters/${id}/test`);
  return response.data.data;
};

export interface AddFileToInverterRequest {
  inverterId: Inverter['id'];
  file: File;
}

export interface AddFileToInverterArgs extends AddFileToInverterRequest {
  setUploadProgress?: (percentage: number) => void;
}

export const addFileToInverter = async ({
  inverterId,
  file,
  setUploadProgress,
}: AddFileToInverterArgs) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', 'image');

  const response = await youderaApiInstance.post<DataResponse<ApiFile>>(
    `/inverters/${inverterId}/files`,
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

export const getBattery = async (id: number): Promise<Battery> => {
  const response = await youderaApiInstance.get<DataResponse<Battery>>(
    `/batteries/${id}`,
  );
  return response.data.data;
};

export const createBattery = async (body: CreateBatteryRequest) => {
  const response = await youderaApiInstance.post<DataResponse<Battery>>(
    `/batteries`,
    body,
  );

  return response.data;
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

export const executeBatteryVerification = async (
  id: number,
): Promise<VerificationTestResult> => {
  const response = await youderaApiInstance.post<
    DataResponse<VerificationTestResult>
  >(`/batteries/${id}/test`);
  return response.data.data;
};

export const getMeter = async (id: number): Promise<Meter> => {
  const response = await youderaApiInstance.get<DataResponse<Meter>>(
    `/meters/${id}`,
  );
  return response.data.data;
};

export type CreateMeterArgs = {
  name: string;
  number: string;
  factor: number;
  type: string;
  site: number;
  manufacturer: string;
  model: string;
};

export const createMeter = async (body: CreateMeterArgs): Promise<Meter> => {
  const response = await youderaApiInstance.post<DataResponse<Meter>>(
    `/meters`,
    body,
  );
  return response.data.data;
};

export type UpdateMeterArgs = {
  id: number;
  meter: Partial<Meter>;
};

export const updateMeter = async ({
  id,
  meter,
}: UpdateMeterArgs): Promise<Meter> => {
  const response = await youderaApiInstance.patch<DataResponse<Meter>>(
    `/meters/${id}`,
    meter,
  );
  return response.data.data;
};

export const addFileToMeter = async (
  id: number,
  file: File,
  setUploadProgress?: (percentage: number) => void,
) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', 'image');

  const response = await youderaApiInstance.post<DataResponse<ApiFile>>(
    `/meters/${id}/files`,
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

export const getMeterVerificationGuide = async (
  id: number,
): Promise<string> => {
  const response = await youderaApiInstance.get<DataResponse<string>>(
    `/meters/${id}/test`,
  );
  return response.data.data;
};

export const executeMeterVerification = async (
  id: number,
): Promise<VerificationTestResult> => {
  const response = await youderaApiInstance.post<
    DataResponse<VerificationTestResult>
  >(`/meters/${id}/test`);
  return response.data.data;
};
