import React from 'react';
import { Input, InputProps } from 'ui/inputs/Input';

import { Field } from './Field';

export const InputField = ({
  name,
  fieldClassName,
  ...props
}: InputProps & { name: string; fieldClassName?: string }) => (
  <Field name={name} className={fieldClassName}>
    {(field, fieldState) => (
      <Input validity={fieldState.error && 'invalid'} {...props} {...field} />
    )}
  </Field>
);
