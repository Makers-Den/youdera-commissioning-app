import React from 'react';
import { Input, InputProps } from 'ui/inputs/Input';

import { Field } from './Field';

export const InputField = ({
  name,
  className,
  ...props
}: InputProps & { name: string }) => (
  <Field name={name} className={className}>
    {(field, fieldState) => (
      <Input validity={fieldState.error && 'invalid'} {...props} {...field} />
    )}
  </Field>
);
