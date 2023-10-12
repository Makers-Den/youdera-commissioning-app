import React from 'react';
import { CheckboxGroup, CheckboxGroupProps } from 'ui/checkboxes/CheckboxGroup';

import { Field } from './Field';

export const CheckboxGroupField = <T extends string>({
  name,
  fieldClassName,
  ...props
}: Omit<CheckboxGroupProps<T>, 'defaultValue'> & {
  name: string;
  fieldClassName?: string;
}) => (
  <Field name={name} className={fieldClassName}>
    {(field, fieldState, formState) => (
      <CheckboxGroup
        {...props}
        {...field}
        defaultValue={formState?.defaultValues?.[name]}
      />
    )}
  </Field>
);
