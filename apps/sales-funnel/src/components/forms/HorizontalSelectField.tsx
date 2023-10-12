import React from 'react';
import {
  HorizontalSelect,
  HorizontalSelectProps,
} from 'ui/select/HorizontalSelect';

import { Field } from './Field';

export const HorizontalSelectField = <T extends string>({
  name,
  fieldClassName,
  ...props
}: HorizontalSelectProps<T> & { name: string; fieldClassName?: string }) => (
  <Field name={name} className={fieldClassName}>
    {(field, fieldState) => (
      <HorizontalSelect {...props} {...field} defaultValue={field.value} />
    )}
  </Field>
);
