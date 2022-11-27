import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  addFileToSite,
  AddFileToSiteArgs,
  deleteFileFromSite,
  getSiteFiles,
} from './apiRequests';
import { DeleteFileFromSiteRequest } from '../../apiTypes';
import { QueryKeys } from '../../enums/queryKeys';

export const useFilesQuery = (projectId: number) =>
  useQuery(
    [QueryKeys.files, projectId],
    ({ queryKey }) => getSiteFiles(queryKey[1] as string),
    { suspense: true },
  );

export const useFilesMutations = (projectId: number) => {
  const queryClient = useQueryClient();

  const addFileToSiteMutation = useMutation(
    (args: Omit<AddFileToSiteArgs, 'siteId'>) =>
      addFileToSite({ ...args, siteId: projectId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.files, projectId]);
      },
    },
  );

  const deleteFileFromSiteMutation = useMutation(
    (args: Omit<DeleteFileFromSiteRequest, 'siteId'>) =>
      deleteFileFromSite({ ...args, siteId: projectId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.files, projectId]);
      },
    },
  );

  return { addFileToSiteMutation, deleteFileFromSiteMutation };
};
