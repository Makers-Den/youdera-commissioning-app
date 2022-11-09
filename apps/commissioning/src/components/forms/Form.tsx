import React, { FC } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";

export type FormProps = {
  className: string,
  onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
} & UseFormReturn

export const Form: FC<React.PropsWithChildren<FormProps>> = (
  {
    children,
    onSubmit,
    className,
    ...rest
  }
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