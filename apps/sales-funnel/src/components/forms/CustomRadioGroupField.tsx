import React from 'react';
import {
  CustomRadioGroup,
  RadioGroupProps,
} from 'ui/radio-group/CustomRadioGroup';

import { Field } from './Field';

export const CustomRadioGroupField = <T,>({
  name,
  fieldClassName,
  ...props
}: Omit<RadioGroupProps<T>, 'defaultValue'> & {
  name: string;
  fieldClassName?: string;
}) => (
  <Field name={name} className={fieldClassName}>
    {(field, fieldState, formState) => (
      <CustomRadioGroup
        {...props}
        {...field}
        defaultValue={formState?.defaultValues?.[name]}
      />
    )}
  </Field>
);
