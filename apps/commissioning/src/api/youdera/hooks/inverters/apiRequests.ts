import { youderaApiInstance } from '../../api-instances/youdera';
import {
  ApiFile,
  CreateInverterRequestBody,
  DataResponse,
  Inverter,
  InverterModel,
  Site,
  VerificationTestResult,
} from '../../apiTypes';
import { CreateDataResponse } from '../../types';

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

export const createInverter = async (body: CreateInverterRequestBody) => {
  const response = await youderaApiInstance.post<CreateDataResponse<Inverter>>(
    `/inverters`,
    body,
  );

  return response.data.data;
};

export const getInverterModels = async () => {
  const response = await youderaApiInstance.get<
    CreateDataResponse<InverterModel[]>
  >(`/catalogue/models/inverter`);
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
