import React from 'react';
import { RadioGroup, RadioGroupProps } from 'ui/radio-group/RadioGroup';

import { Field } from './Field';

export const RadioGroupField = <T,>({
  name,
  fieldClassName,
  ...props
}: Omit<RadioGroupProps<T>, 'defaultValue'> & {
  name: string;
  fieldClassName?: string;
}) => (
  <Field name={name} className={fieldClassName}>
    {(field, fieldState, formState) => (
      <RadioGroup
        {...props}
        {...field}
        defaultValue={formState?.defaultValues?.[name]}
      />
    )}
  </Field>
);
