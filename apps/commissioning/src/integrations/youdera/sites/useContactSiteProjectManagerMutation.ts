import { useMutation, useQueryClient } from "@tanstack/react-query"

import { youderaApiInstance } from "../api-instances/youdera"
import { ProjectManagerContactInfo } from "../apiTypes";
import { QueryKeys } from "../enums/queryKeys";

/**
 * Emails project manager a link to this site and returns their phone number
 */
export const useContactSiteProjectManagerMutation = (siteId: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => youderaApiInstance.post<ProjectManagerContactInfo>(`sites/${siteId}/support`).then(res => res.data.phone), 
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.editedSite, siteId]);
      }
    }
  );
}
