import { useMutation, useQueryClient } from "@tanstack/react-query";

import { youderaApiInstance } from "../api-instances/youdera";
import { CommsParams, CommsTestResult, DataResponse } from "../apiTypes";
import { QueryKeys } from "../enums/queryKeys";

export const useUpdateInverterCommsMutation = (siteId: number) => {
    const queryClient = useQueryClient();
  
    return useMutation(
      ({ id, ...params }: CommsParams & { id: number }) => youderaApiInstance
        .post<DataResponse<CommsTestResult>>(`/inverters/${id}/communication`, params)
        .then(resp => resp.data.data),
      {
        onSuccess: () => {
          queryClient.invalidateQueries([QueryKeys.editedSite, siteId])
        }
      }
    );
  };
  