import React from 'react';
import {
  TimeRangeInput,
  TimeRangeInputProps,
} from 'ui/range-inputs/TimeRangeInput';

import { Field } from './Field';

export const TimeRangeInputField = ({
  name,
  fieldClassName,
  ...props
}: TimeRangeInputProps & {
  name: string;
  fieldClassName?: string;
}) => (
  <Field name={name} className={fieldClassName}>
    {(field, fieldState) => <TimeRangeInput {...props} {...field} />}
  </Field>
);
