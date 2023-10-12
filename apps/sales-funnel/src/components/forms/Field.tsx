import { ErrorMessage } from '@hookform/error-message';
import React, { ReactNode } from 'react';
import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from 'react-hook-form';
import { useController } from 'react-hook-form';
import { Label } from 'ui/typography/Typography';
import clsxm from 'ui/utils/clsxm';

type FieldProps = {
  children: (
    field: ControllerRenderProps<FieldValues, string>,
    fieldState: ControllerFieldState,
    formState?: UseFormStateReturn<FieldValues>,
  ) => ReactNode;
  name: string;
  className?: string;
};

export const Field = ({ name, className, children }: FieldProps) => {
  const { field, fieldState, formState } = useController({ name });
  const errorMessage = fieldState.error?.message;
  return (
    <div className={clsxm('flex flex-col gap-1', className)}>
      {children(field, fieldState, formState)}
      <ErrorMessage
        errors={formState.errors}
        name={name}
        render={({ message }) => (
          <Label className="text-danger-400">{message}</Label>
        )}
      />
    </div>
  );
};
