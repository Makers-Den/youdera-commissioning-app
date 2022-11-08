import React, { FC } from "react";
import { FormProvider, UseFormProps } from "react-hook-form";


export const FormWrapper: FC<React.PropsWithChildren<UseFormProps>> = (
  { children },
  rest
) => (
  <FormProvider {...rest} >
    {children}
  </FormProvider>
)