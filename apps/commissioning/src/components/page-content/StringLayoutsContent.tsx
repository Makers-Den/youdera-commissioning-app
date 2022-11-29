import { ApiFileType } from '@src/api/youdera/apiTypes';
import {
  useFilesMutations,
  useFilesQuery,
} from '@src/api/youdera/hooks/files/hooks';
import { useRef } from 'react';
import { useIntl } from 'react-intl';
import { useDisclosure } from 'ui/dialogs/useDisclosure';
import { Toast, useToast } from 'ui/toast/Toast';

import { DeletionDialog } from '../dialogs/DeletionDialog';
import { ImagesUploadBox, ImagesUploadBoxProps } from '../ImagesUploadBox';

export type StringLayoutsContentProps = {
  projectId: number;
};

export function StringLayoutsContent({ projectId }: StringLayoutsContentProps) {
  const intl = useIntl();

  const toast = useToast();

  const fileIdToDelete = useRef<string | null>(null);

  const stringLayoutGallery = useDisclosure();
  const additionalPicturesGallery = useDisclosure();
  const deleteDialog = useDisclosure();

  const filesQuery = useFilesQuery(projectId);

  const { deleteFileFromSiteMutation, addFileToSiteMutation } =
    useFilesMutations(projectId);

  const uploadFile =
    (type: ApiFileType): ImagesUploadBoxProps['uploadFile'] =>
      async (
        event,
        setUploadPercentageProgress,
        setUploadedUrl,
        setErrorMessage,
      ) => {
        const file = event.currentTarget.files![0];
        try {
          const response = await addFileToSiteMutation.mutateAsync({
            file,
            type,
            setUploadProgress: setUploadPercentageProgress,
          });
          setUploadedUrl(response.url);
          toast.success(
            intl.formatMessage({
              defaultMessage: 'File uploaded successfully!',
            }),
          );
        } catch (err) {
          //@ts-ignore
          toast.error(err.message);
          // eslint-disable-next-line no-console
          console.error(err);
          setErrorMessage('There was an issue');
        }
      };

  const onDelete: ImagesUploadBoxProps['onDelete'] = id => {
    fileIdToDelete.current = id;
    deleteDialog.onOpen();
  };

  const onDeleteConfrimHandler = async () => {
    if (fileIdToDelete.current !== null) {
      try {
        await deleteFileFromSiteMutation.mutateAsync({
          documentId: fileIdToDelete.current,
        });

        toast.success(
          intl.formatMessage({
            defaultMessage: 'File deleted successfully!',
          }),
        );
        fileIdToDelete.current = null;
        deleteDialog.onClose();
      } catch (err) {
        //@ts-ignore
        toast.error(err.message);
        // eslint-disable-next-line no-console
        console.error(err);
      }
    }
  };

  const onCancelDelete = () => {
    fileIdToDelete.current = null;
    deleteDialog.onClose();
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <ImagesUploadBox
          title={intl.formatMessage({ defaultMessage: 'String layout' })}
          uploadFile={uploadFile(ApiFileType.stringLayout)}
          uploadedFiles={(filesQuery.data || [])
            .filter(({ type }) => type === ApiFileType.stringLayout)
            .map(({ id, name, url, url_thumb }) => ({
              name,
              url,
              thumbnailUrl: url_thumb,
              id,
              type: 'image',
            }))}
          onDelete={onDelete}
          isGalleryOpen={stringLayoutGallery.isOpen}
          onGalleryClose={stringLayoutGallery.onClose}
          onGalleryOpen={stringLayoutGallery.onOpen}
        />
        <ImagesUploadBox
          title={intl.formatMessage({ defaultMessage: 'Additional pictures' })}
          uploadFile={uploadFile(ApiFileType.additionalPictures)}
          uploadedFiles={(filesQuery.data || [])
            .filter(({ type }) => type === ApiFileType.additionalPictures)
            .map(({ id, name, url, url_thumb }) => ({
              name,
              url,
              thumbnailUrl: url_thumb,
              id,
              type: 'image',
            }))}
          onDelete={onDelete}
          isGalleryOpen={additionalPicturesGallery.isOpen}
          onGalleryClose={additionalPicturesGallery.onClose}
          onGalleryOpen={additionalPicturesGallery.onOpen}
          data-cy='additional-upload'
        />
      </div>
      <DeletionDialog
        isOpen={deleteDialog.isOpen}
        onClose={deleteDialog.onClose}
        description={intl.formatMessage({
          defaultMessage: 'Are you sure to delete the image?',
        })}
        onCancel={onCancelDelete}
        isDeleting={deleteFileFromSiteMutation.isLoading}
        onDelete={onDeleteConfrimHandler}
      />
      <Toast />
    </>
  );
}
