import { ErrorMessage } from '@hookform/error-message';
import React, { FC } from "react"
import { Control, Controller, useController } from "react-hook-form";
import { Label } from 'ui/typography/Typography';

export interface FieldProps {
  name: string
  control: Control
}

export const Field: FC<React.PropsWithChildren<FieldProps>> = ({
  children,
  name,
  control
}) => {

  const { field } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue: "",
  });

  return (
    <Controller
      {...field}
      render={({ formState: { errors } }) => (
        <>
          {children}
          <ErrorMessage
            errors={errors}
            name="multipleErrorInput"
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <Label key={type}>{message}</Label>
              ))
            }
          />
        </>
      )}
    />
  )
}
