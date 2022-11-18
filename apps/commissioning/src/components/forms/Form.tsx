import React, { ReactNode } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";

export type FormProps<Values extends object> = {
  className: string,
  onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
  children: ReactNode
} & UseFormReturn<Values>

export const Form = <Values extends object>(
  {
    children,
    onSubmit,
    className,
    ...rest
  }: FormProps<Values>
) => (
  <FormProvider {...rest} >
    <form
      onSubmit={onSubmit}
      className={className}
    >
      {children}
    </form>
  </FormProvider>
)