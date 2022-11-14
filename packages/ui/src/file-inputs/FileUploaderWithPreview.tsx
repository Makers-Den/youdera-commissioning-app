import { ReactNode } from 'react';

import { FilePreviewer, FilePreviewerProps } from './FilePreviewer';
import { FileUploader, FileUploaderProps } from './FileUploader';
import { UploadedFile } from './types';
import { Label } from '../typography/Typography';
import clsxm from '../utils/clsxm';

export type FileUploaderWithPreviewProps = {
  fileUploaderProps: Omit<FileUploaderProps, 'children'>;
  filePreviewerProps?: Omit<
    FilePreviewerProps,
    'url' | 'name' | 'type' | 'onDeleteClick' | 'onAddClick'
  >;
  onDeleteFile: (file: UploadedFile) => void;
  uploadedFiles: UploadedFile[];
  label?: string;
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
  label,
}: FileUploaderWithPreviewProps) {
  const displayFileInput = uploadedFiles.length <= 0 || allowMultipleFiles;

  return (
    <div className={clsxm(className, 'flex flex-col gap-3')}>
      {label && <Label>{label}</Label>}
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
