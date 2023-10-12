import React from 'react';
import {
  AutocompleteSelect,
  AutocompleteSelectProps,
} from 'ui/select/AutocompleteSelect';

import { Field } from './Field';

export const AutocompleteSelectField = ({
  name,
  className,
  ...props
}: AutocompleteSelectProps & { name: string }) => (
  <Field name={name} className={className}>
    {(field, fieldState) => (
      <AutocompleteSelect
        validity={fieldState.error && 'invalid'}
        {...props}
        {...field}
      />
    )}
  </Field>
);
