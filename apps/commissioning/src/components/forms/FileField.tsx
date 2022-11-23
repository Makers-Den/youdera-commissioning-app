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
  valueMapper?: (value: any) => UploadedFile;
} & Omit<
  FileUploaderWithPreviewProps,
  'fileUploaderProps' | 'onDeleteFile' | 'uploadedFiles'
>;

function defaultValueMapper(value: File) {
  const url = URL.createObjectURL(value);

  return {
    name: value.name,
    type: value.type,
    url,
    thumbnailUrl: url,
  };
}

export const FileField = ({
  children,
  name,
  valueMapper = defaultValueMapper,
  ...props
}: FileFieldProps) => {
  const { setValue } = useFormContext();
  const value = useWatch({ name });

  const [files, setFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    if (value) {
      setFiles([valueMapper(value)]);
    } else {
      setFiles([]);
    }
  }, [value, valueMapper]);

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
              setValue(name, null);
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
