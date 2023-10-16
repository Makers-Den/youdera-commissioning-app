import React from 'react';
import { TextArea, TextAreaProps } from 'ui/text-area/TextArea';

import { Field } from './Field';

export const TextAreaField = ({
  name,
  fieldClassName,
  ...props
}: TextAreaProps & { name: string; fieldClassName?: string }) => (
  <Field name={name} className={fieldClassName}>
    {(field, fieldState) => (
      <TextArea
        validity={fieldState.error && 'invalid'}
        {...props}
        {...field}
      />
    )}
  </Field>
);
