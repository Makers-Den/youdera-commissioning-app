import { ReactNode, useEffect, useRef, useState } from 'react';

import { FilePreviewer, FilePreviewerProps } from './FilePreviewer';
import { FileUploader, FileUploaderProps } from './FileUploader';
import { UploadedFile } from './types';
import clsxm from '../utils/clsxm';

export type FileUploaderWithPreviewProps = {
  fileUploaderProps: Omit<FileUploaderProps, 'children'>;
  filePreviewerProps?: Omit<
    FilePreviewerProps,
    'url' | 'name' | 'type' | 'onDeleteClick' | 'onAddClick'
  >;
  onDeleteFile: (file: UploadedFile) => void;
  uploadedFiles: UploadedFile[];
  className?: string;
  children: ReactNode;
  allowMultipleFiles?: boolean;
};

export function FileUploaderWithPreview({
  fileUploaderProps,
  filePreviewerProps,
  onDeleteFile,
  uploadedFiles,
  className,
  children,
  allowMultipleFiles,
}: FileUploaderWithPreviewProps) {
  const displayFileInput =  uploadedFiles.length <= 0 || allowMultipleFiles;

  return (
    <div className={clsxm(className, 'flex flex-col gap-4')}>
      {uploadedFiles.map(uploadedFile => (
        <FilePreviewer
          onDeleteClick={() => {
            onDeleteFile(uploadedFile);
          }}
          {...uploadedFile}
          {...filePreviewerProps}
        />
      ))}
      {displayFileInput && (
        <FileUploader {...fileUploaderProps}>{children}</FileUploader>
      )}
    </div>
  );
}
