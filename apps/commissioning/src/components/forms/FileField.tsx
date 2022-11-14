import { ReactNode, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import {
  FileUploaderWithPreview,
  FileUploaderWithPreviewProps,
} from 'ui/file-inputs/FileUploaderWithPreview';
import { UploadedFile, UploadStatus } from 'ui/file-inputs/types';

import { Field } from './Field';

export type FileFieldProps = {
  children: ReactNode;
  name: string;
} & Omit<
  FileUploaderWithPreviewProps,
  'fileUploaderProps' | 'onDeleteFile' | 'uploadedFiles'
>;

export const FileField = ({ children, name, ...props }: FileFieldProps) => {
  const { resetField, setValue } = useFormContext();
  const value = useWatch({ name });

  const [files, setFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    if (value) {
      const url = URL.createObjectURL(value);

      setFiles([
        {
          name: 'asdsad',
          type: 'image',
          url,
        },
      ]);
    } else {
      setFiles([]);
    }
  }, [value]);

  return (
    <Field name={name}>
      {(register, fieldState) => {
        const { invalid, error } = fieldState;
        const { onBlur } = register(name);

        const computedOnChange = (event: React.FormEvent<HTMLInputElement>) => {
          const file = event.currentTarget.files?.[0];

          setValue(name, file);
        };
        return (
          <FileUploaderWithPreview
            {...props}
            fileUploaderProps={{
              status: invalid ? UploadStatus.error : UploadStatus.idle,
              onChange: computedOnChange,
              onBlur,
              errorMessage: error?.message,
              className: 'w-full',
            }}
            onDeleteFile={() => {
              resetField(name, { keepDirty: true });
            }}
            uploadedFiles={files}
          >
            {children}
          </FileUploaderWithPreview>
        );
      }}
    </Field>
  );
};
