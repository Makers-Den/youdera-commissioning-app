import React from 'react';
import {
  PillsRadioGroup,
  RadioGroupProps,
} from 'ui/radio-group/PillsRadioGroup';

import { Field } from './Field';

export const PillsRadioGroupField = <T,>({
  name,
  fieldClassName,
  ...props
}: Omit<RadioGroupProps<T>, 'defaultValue'> & {
  name: string;
  fieldClassName?: string;
}) => (
  <Field name={name} className={fieldClassName}>
    {(field, fieldState, formState) => (
      <PillsRadioGroup
        {...props}
        {...field}
        defaultValue={formState?.defaultValues?.[name]}
      />
    )}
  </Field>
);
