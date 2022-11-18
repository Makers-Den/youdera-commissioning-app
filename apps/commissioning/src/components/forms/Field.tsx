import { ErrorMessage } from '@hookform/error-message';
import React, { FC, ReactNode, useEffect } from 'react';
import {
  FieldError,
  FieldValues,
  useFormContext,
  UseFormRegister,
} from 'react-hook-form';
import { Label } from 'ui/typography/Typography';

export interface FieldState {
  invalid: boolean;
  isDirty: boolean;
  isTouched: boolean;
  error?: FieldError | undefined;
}
export interface FieldProps {
  name: string;
  children: (
    register: UseFormRegister<FieldValues>,
    fieldState: FieldState,
  ) => ReactNode;
}

export const Field: FC<FieldProps> = ({ children, name }) => {
  const { register, formState, getFieldState, unregister } = useFormContext();

  // ? This made that getValues() didn't show defaultValues on initial render
  // useEffect(
  //   () => () => {
  //     unregister(name);
  //   },
  //   [unregister, name],
  // );

  return (
    <div className="w-full">
      {children(register, getFieldState(name))}
      <ErrorMessage
        errors={formState.errors}
        name={name}
        render={({ message }) => (
          <Label className="text-red-400">{message}</Label>
        )}
      />
    </div>
  );
};
