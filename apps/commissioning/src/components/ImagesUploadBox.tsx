import { useState } from 'react';
import { useIntl } from 'react-intl';
import { BoxContent, BoxHeader, BoxTitle } from 'ui/box/Box';
import { FileUploader } from 'ui/file-inputs/FileUploader';
import { UploadedFile } from 'ui/file-inputs/types';
import {
  useFileUploader,
  UseFileUploaderArgs,
} from 'ui/file-inputs/useFileUploader';
import { Gallery } from 'ui/gallery/Gallery';
import { SquareImage } from 'ui/image/SquareImage';
import { List, ListItem } from 'ui/list/List';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Typography } from 'ui/typography/Typography';

import { LargeBox } from './LargeBox';

export type ImagesUploadBoxProps = {
  title: string;
  uploadFile: UseFileUploaderArgs['uploadFile'];
  uploadedFiles: (UploadedFile & { id: string })[];
  onDelete: (id: string) => void;
  isGalleryOpen: boolean;
  onGalleryClose: () => void;
  onGalleryOpen: () => void;
};

export function ImagesUploadBox({
  title,
  uploadFile,
  uploadedFiles,
  onDelete,
  isGalleryOpen,
  onGalleryClose,
  onGalleryOpen,
}: ImagesUploadBoxProps) {
  const intl = useIntl();

  const { fileUploaderProps } = useFileUploader({
    uploadFile,
  });

  const [currentImageIndex, setCurrentImageIndex] = useState<
    number | undefined
  >();

  const listClickHandler = (index: number) => () => {
    setCurrentImageIndex(index);
    onGalleryOpen();
  };

  return (
    <>
      <LargeBox>
        <BoxHeader>
          <BoxTitle title={title} />
        </BoxHeader>
        <BoxContent>
          <List direction="horizontal" className="mb-5 flex-wrap">
            {uploadedFiles.map(({ name, thumbnailUrl }, index) => (
              <ListItem
                variant="withoutPadding"
                key={name}
                className="w-28 cursor-pointer overflow-hidden"
                onClick={listClickHandler(index)}
              >
                <SquareImage src={thumbnailUrl} alt={name} />
              </ListItem>
            ))}
          </List>
          <FileUploader
            accept="image/*"
            className="w-full"
            {...fileUploaderProps}
          >
            <div className="flex w-full items-center justify-center gap-4">
              <SvgIcon name="Camera" className="w-8 text-green-400" />
              <div>
                <Typography>
                  {intl.formatMessage({
                    defaultMessage: 'Take photo by camera',
                  })}
                </Typography>
                <Typography>
                  {intl.formatMessage({
                    defaultMessage: 'or',
                  })}{' '}
                  <span className="text-green-400 underline">
                    {intl.formatMessage({
                      defaultMessage: 'click here to upload',
                    })}
                  </span>
                </Typography>
              </div>
            </div>
          </FileUploader>
        </BoxContent>
      </LargeBox>
      <Gallery
        open={isGalleryOpen}
        onClose={onGalleryClose}
        title={title}
        openImageIndex={currentImageIndex}
        images={uploadedFiles.map(({ url, thumbnailUrl, id }) => ({
          url,
          thumbnailUrl,
          id,
        }))}
        onDelete={onDelete}
      />
    </>
  );
}
