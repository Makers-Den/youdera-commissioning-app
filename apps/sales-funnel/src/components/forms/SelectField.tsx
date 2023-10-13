import React from 'react';
import { Select, SelectProps, SelectValue } from 'ui/select/Select';

import { Field } from './Field';

export const SelectField = <T extends SelectValue>({
  name,
  fieldClassName,
  ...props
}: SelectProps<T> & { name: string; fieldClassName?: string }) => (
  <Field name={name} className={fieldClassName}>
    {(field, fieldState) => (
      <Select
        {...props}
        {...field}
        defaultValue={field.value}
        validity={fieldState.error && 'invalid'}
      />
    )}
  </Field>
);
