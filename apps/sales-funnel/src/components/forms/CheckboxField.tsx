import React from 'react';
import { Checkbox, CheckboxProps } from 'ui/checkboxes/Checkbox';

import { Field } from './Field';

export const CheckboxField = ({
  name,
  fieldClassName,
  ...props
}: Omit<CheckboxProps, 'defaultValue'> & {
  name: string;
  fieldClassName?: string;
}) => (
  <Field name={name} className={fieldClassName}>
    {(field, fieldState, formState) => (
      <Checkbox
        {...props}
        {...field}
        defaultValue={formState?.defaultValues?.[name]}
      />
    )}
  </Field>
);
