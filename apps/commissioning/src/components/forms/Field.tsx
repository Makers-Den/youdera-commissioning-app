import { ErrorMessage } from '@hookform/error-message';
import React, { FC, ReactNode } from "react"
import { FieldError, FieldValues, useFormContext, UseFormRegister } from "react-hook-form";
import { Label } from 'ui/typography/Typography';


export interface FieldState {
  invalid: boolean;
  isDirty: boolean;
  isTouched: boolean;
  error?: FieldError | undefined;
}
export interface FieldProps {
  name: string
  children: (register: UseFormRegister<FieldValues>, fieldState: FieldState) => ReactNode
}

export const Field: FC<FieldProps> = ({
  children,
  name,
}) => {

  const { register, formState, getFieldState } = useFormContext();

  return (
    <div className='w-full'>
      {children(register, getFieldState(name))}
      <ErrorMessage
        errors={formState.errors}
        name={name}
        render={({ message }) => <Label className='text-red-400'>{message}</Label>}
      />
    </div>
  )
}
