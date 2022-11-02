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
  const uploadedFilesLength = uploadedFiles.length;

  const prevUploadedFilesLength = useRef(uploadedFilesLength);

  const [displayFileInput, setDisplayFileInput] = useState(
    uploadedFilesLength <= 0,
  );

  useEffect(() => {
    if (uploadedFilesLength <= 0) {
      setDisplayFileInput(true);
    } else if (uploadedFilesLength > prevUploadedFilesLength.current) {
      setDisplayFileInput(false);
    }

    prevUploadedFilesLength.current = uploadedFilesLength;
  }, [uploadedFilesLength]);

  const onAddClick = allowMultipleFiles
    ? () => {
      setDisplayFileInput(true);
    }
    : undefined;

  return (
    <div className={clsxm(className, 'flex flex-col gap-4')}>
      {uploadedFiles.map(uploadedFile => (
        <FilePreviewer
          onDeleteClick={() => {
            onDeleteFile(uploadedFile);
          }}
          onAddClick={onAddClick}
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
