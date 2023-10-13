import React from 'react';
import {
  BoxesRadioGroup,
  RadioGroupProps,
} from 'ui/radio-group/BoxesRadioGroup';

import { Field } from './Field';

export const BoxesRadioGroupField = <T,>({
  name,
  fieldClassName,
  ...props
}: Omit<RadioGroupProps<T>, 'defaultValue'> & {
  name: string;
  fieldClassName?: string;
}) => (
  <Field name={name} className={fieldClassName}>
    {(field, fieldState, formState) => (
      <BoxesRadioGroup
        {...props}
        {...field}
        defaultValue={formState?.defaultValues?.[name]}
      />
    )}
  </Field>
);
