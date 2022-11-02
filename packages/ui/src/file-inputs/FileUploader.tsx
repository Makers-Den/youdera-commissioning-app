import { FormEvent, ReactNode } from 'react';

import { FileInputWrapper } from './FileInputWrapper';
import { UploadStatus } from './types';
import { SvgIcon } from '../svg-icons/SvgIcon';
import { Typography } from '../typography/Typography';
import clsxm from '../utils/clsxm';

export type FileUploaderProps = {
  status: UploadStatus;
  errorMessage?: string;
  uploadProgressPercentage?: number;
  children: ReactNode;
  className?: string;

  onChange: (event: FormEvent<HTMLInputElement>) => void;
  name?: string;
  multiple?: boolean;
  accept?: string;
  capture?: boolean | 'user' | 'environment';
  disabled?: boolean;
};

export function FileUploader({
  status,
  errorMessage,
  uploadProgressPercentage,
  children,
  className,
  ...fileInputProps
}: FileUploaderProps) {
  let computedChildren: ReactNode = children;

  if (status === UploadStatus.uploading && uploadProgressPercentage) {
    computedChildren = (
      <>
        <div
          className="absolute left-0 h-full rounded-md bg-gray-300"
          style={{ width: `${uploadProgressPercentage}%` }}
        />
        <Typography variant="body" className="relative z-10">
          {uploadProgressPercentage}%
        </Typography>
      </>
    );
  }

  if (status === UploadStatus.error && errorMessage) {
    computedChildren = (
      <Typography
        variant="body"
        weight="bold"
        className="flex items-center gap-2"
      >
        <SvgIcon name="Problem" className="w-4 text-red-400" />
        {errorMessage}
      </Typography>
    );
  }

  return (
    <FileInputWrapper {...fileInputProps}>
      <button
        type="button"
        className={clsxm(
          'relative flex items-center justify-center p-4',
          'rounded-md bg-gray-100',
          status === UploadStatus.success &&
          'border border-dashed border-green-400',
          status === UploadStatus.idle &&
          'border border-dashed border-green-400',
          status === UploadStatus.error &&
          'border border-dashed border-red-500 bg-red-100',
          className,
        )}
      >
        {computedChildren}
      </button>
    </FileInputWrapper>
  );
}
