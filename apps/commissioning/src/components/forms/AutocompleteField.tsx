import { useController } from 'react-hook-form';
import {
  AutocompleteSelect,
  AutocompleteSelectProps,
} from 'ui/select/AutocompleteSelect';

import { Field } from './Field';

export type AutocompleteSelectFieldProps = {
  name: string;
} & Omit<AutocompleteSelectProps, 'value' | 'onChange' | 'name' | 'validity'>;

export function AutocompleteSelectField({
  name,
  ...props
}: AutocompleteSelectFieldProps) {
  const control = useController({ name });

  return (
    <Field name={name}>
      {(_, fieldState) => (
        <AutocompleteSelect
          {...props}
          {...control.field}
          validity={fieldState.invalid ? 'invalid' : undefined}
        />
      )}
    </Field>
  );
}
