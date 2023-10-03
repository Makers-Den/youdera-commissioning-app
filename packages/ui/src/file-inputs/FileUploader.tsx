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
  wrapperClassname?: string;

  onBlur?: (event: React.FocusEvent<HTMLLabelElement, Element>) => void;
};

export function FileUploader({
  status,
  errorMessage,
  uploadProgressPercentage,
  children,
  className,
  wrapperClassname,
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
        <SvgIcon name="Problem" className="text-danger-400 w-4" />
        {errorMessage}
      </Typography>
    );
  }

  return (
    <FileInputWrapper {...fileInputProps} className={wrapperClassname}>
      <button
        type="button"
        className={clsxm(
          'relative flex items-center justify-center p-4',
          'rounded-md bg-gray-100',
          status === UploadStatus.success &&
            'border-brand-two-400 border border-dashed',
          status === UploadStatus.idle &&
            'border-brand-two-400 border border-dashed',
          status === UploadStatus.error &&
            'border-danger-500 bg-danger-100 border border-dashed',
          className,
        )}
      >
        {computedChildren}
      </button>
    </FileInputWrapper>
  );
}
