import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { FileUploader } from 'ui/file-inputs/FileUploader';
import { FileUploaderWithPreview } from 'ui/file-inputs/FileUploaderWithPreview';
import {
  useFileUploader,
  UseFileUploaderArgs,
} from 'ui/file-inputs/useFileUploader';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Typography } from 'ui/typography/Typography';

import { CenterWrapper } from './utils/CenterWrapper';
import { asyncTimeout, getRandomIntInRange } from './utils/helpers';

export default {
  component: FileUploader,
  title: 'Components/FileUploader',
} as ComponentMeta<typeof FileUploader>;

const Template: ComponentStory<typeof FileUploader> = args => (
  <CenterWrapper>
    <FileUploader className="w-[280px]" {...args}>
      <div className="flex items-center gap-4">
        <SvgIcon name="Camera" className="text-brand-two-400 w-8" />
        <div>
          <Typography>Take photo by camera</Typography>
          <Typography>
            or{' '}
            <span className="text-brand-two-400 underline">
              click here to upload
            </span>
          </Typography>
        </div>
      </div>
    </FileUploader>
  </CenterWrapper>
);

const uploadFileMock: UseFileUploaderArgs['uploadFile'] = (
  event,
  setUploadProgress,
  addNewFile,
  setErrorMessage,
) => {
  if (event.currentTarget.files?.length) {
    const file = event.currentTarget.files?.[0];

    const reader = new FileReader();

    reader.addEventListener('load', async ev => {
      for (let i = 0; i < 100; i += getRandomIntInRange(2, 5)) {
        setUploadProgress(i);
        // eslint-disable-next-line no-await-in-loop
        await asyncTimeout(getRandomIntInRange(50, 300));
      }
      addNewFile((ev.target?.result as string) || '');
    });
    // reader.addEventListener('progress', ev => {
    //   setUploadProgress(Math.floor((100 * ev.loaded) / ev.total));
    // });
    reader.addEventListener('error', () => {
      setErrorMessage('Error. try again later');
    });

    reader.readAsDataURL(file);
  }
};

export const Overview = () => {
  const { fileUploaderProps } = useFileUploader({ uploadFile: uploadFileMock });

  return (
    <CenterWrapper>
      <FileUploader
        className="w-[280px]"
        accept="image/*"
        {...fileUploaderProps}
      >
        <div className="flex items-center gap-4">
          <SvgIcon name="Camera" className="text-brand-two-400 w-8" />
          <div>
            <Typography>Take photo by camera</Typography>
            <Typography>
              or{' '}
              <span className="text-brand-two-400 underline">
                click here to upload
              </span>
            </Typography>
          </div>
        </div>
      </FileUploader>
    </CenterWrapper>
  );
};

export const WithPreview = () => {
  const { fileUploaderProps, uploadedFilesUrls, removeFile } = useFileUploader({
    uploadFile: uploadFileMock,
  });

  return (
    <CenterWrapper>
      <FileUploaderWithPreview
        fileUploaderProps={{ ...fileUploaderProps, className: 'w-full' }}
        onDeleteFile={removeFile}
        uploadedFiles={uploadedFilesUrls}
        className="w-[280px]"
        allowMultipleFiles
      >
        <div className="flex items-center gap-4">
          <SvgIcon name="Camera" className="text-brand-two-400 w-8" />
          <div>
            <Typography>Take photo by camera</Typography>
            <Typography>
              or{' '}
              <span className="text-brand-two-400 underline">
                click here to upload
              </span>
            </Typography>
          </div>
        </div>
      </FileUploaderWithPreview>
    </CenterWrapper>
  );
};
