import { useFiles } from '@src/integrations/youdera/files/hooks/useFiles';
import { ApiFileType } from '@src/integrations/youdera/files/types';
import { useRef } from 'react';
import { useIntl } from 'react-intl';
import { useDisclosure } from 'ui/dialogs/useDisclosure';

import { DeletionDialog } from '../dialogs/DeletionDialog';
import { ImagesUploadBox, ImagesUploadBoxProps } from '../ImagesUploadBox';

export type StringLayoutsContentProps = {
  projectId: string;
};

export function StringLayoutsContent({ projectId }: StringLayoutsContentProps) {
  const intl = useIntl();

  const fileIdToDelete = useRef<string | null>(null);

  const stringLayoutGallery = useDisclosure();
  const additionalPicturesGallery = useDisclosure();
  const deleteDialog = useDisclosure();

  const { filesQuery, deleteFileFromSiteMutation, addFileToSiteMutation } =
    useFiles(projectId);

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
      } catch (err) {
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

        fileIdToDelete.current = null;
        deleteDialog.onClose();
      } catch (err) {
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
            .map(({ id, name, url }) => ({
              name,
              url,
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
          uploadFile={uploadFile(ApiFileType.stringLayout)}
          uploadedFiles={(filesQuery.data || [])
            .filter(({ type }) => type === ApiFileType.additionalPictures)
            .map(({ id, name, url }) => ({
              name,
              url,
              id,
              type: 'image',
            }))}
          onDelete={onDelete}
          isGalleryOpen={additionalPicturesGallery.isOpen}
          onGalleryClose={additionalPicturesGallery.onClose}
          onGalleryOpen={additionalPicturesGallery.onOpen}
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
    </>
  );
}
