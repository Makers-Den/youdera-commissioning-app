import React from 'react';
import {
  AutocompleteSelect,
  AutocompleteSelectProps,
} from 'ui/select/AutocompleteSelect';

import { Field } from './Field';

export const AutocompleteSelectField = ({
  name,
  fieldClassName,
  ...props
}: AutocompleteSelectProps & { name: string; fieldClassName?: string }) => (
  <Field name={name} className={fieldClassName}>
    {(field, fieldState) => (
      <AutocompleteSelect
        validity={fieldState.error && 'invalid'}
        {...props}
        {...field}
      />
    )}
  </Field>
);
