import React, { FC } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";


export const FormWrapper: FC<React.PropsWithChildren<UseFormReturn>> = (
  { children,
    ...rest }
) => (
  <FormProvider {...rest} >
    {children}
  </FormProvider>
)