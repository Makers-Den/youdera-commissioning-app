import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { addFileToSite, AddFileToSiteArgs } from '../mutations/addFileToSite';
import { deleteFileFromSite } from '../mutations/deleteFileFromSite';
import { getSiteFiles } from '../queries/getSiteFiles';
import { DeleteFileFromSiteRequest } from '../types';
import { QueryKeys } from '../../enums/queryKeys';

export const useFiles = (projectId: string) => {
  const queryClient = useQueryClient();

  const filesQuery = useQuery(
    [QueryKeys.files, projectId],
    ({ queryKey }) => getSiteFiles(queryKey[1] as string),
    { suspense: true },
  );

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

  return { filesQuery, addFileToSiteMutation, deleteFileFromSiteMutation };
};
