import { useState } from 'react';
import { Box, BoxContent, BoxHeader, BoxTitle } from 'ui/box/Box';
import { useDisclosure } from 'ui/dialogs/useDisclosure';
import { FileUploader } from 'ui/file-inputs/FileUploader';
import {
  useFileUploader,
  UseFileUploaderArgs,
} from 'ui/file-inputs/useFileUploader';
import { Gallery } from 'ui/gallery/Gallery';
import { SquareImage } from 'ui/image/SquareImage';
import { List, ListItem } from 'ui/list/List';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Typography } from 'ui/typography/Typography';

export type ImagesUploadBoxProps = {
  title: string;
  uploadFile: UseFileUploaderArgs['uploadFile'];
  initialState: UseFileUploaderArgs['initialState'];
};

export function ImagesUploadBox({
  title,
  uploadFile,
  initialState,
}: ImagesUploadBoxProps) {
  const { fileUploaderProps, uploadedFilesUrls, removeFile } = useFileUploader({
    uploadFile,
    initialState,
  });

  const [currentImageIndex, setCurrentImageIndex] = useState<
    number | undefined
  >();

  const gallery = useDisclosure();

  const listClickHandler = (index: number) => () => {
    setCurrentImageIndex(index);
    gallery.onOpen();
  };

  const onDeleteHandler = (url: string) => {
    const findFile = uploadedFilesUrls.find(file => file.url === url);

    if (findFile) {
      removeFile(findFile);
    }
  };

  return (
    <>
      <Box>
        <BoxHeader>
          <BoxTitle title={title} />
        </BoxHeader>
        <BoxContent>
          <List>
            {uploadedFilesUrls.map(({ url, name }, index) => (
              <ListItem key={name} onClick={listClickHandler(index)}>
                <SquareImage wrapperClassName="w-28" src={url} alt={name} />
              </ListItem>
            ))}
          </List>
          <FileUploader accept="image/*" {...fileUploaderProps}>
            <div className="flex items-center gap-4">
              <SvgIcon name="Camera" className="w-8 text-green-400" />
              <div>
                <Typography>Take photo by camera</Typography>
                <Typography>
                  or{' '}
                  <span className="text-green-400 underline">
                    click here to upload
                  </span>
                </Typography>
              </div>
            </div>
          </FileUploader>
        </BoxContent>
      </Box>
      <Gallery
        open={gallery.isOpen}
        onClose={gallery.onClose}
        title={title}
        openImageIndex={currentImageIndex}
        onDelete={onDeleteHandler}
        images={uploadedFilesUrls.map(({ url }) => ({
          url,
          id: url,
        }))}
      />
    </>
  );
}
