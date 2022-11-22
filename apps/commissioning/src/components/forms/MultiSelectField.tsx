import { useController } from 'react-hook-form';
import { MultiSelect, MultiSelectProps } from 'ui/select/MultiSelect';

import { Field } from './Field';

export type MultiSelectFieldProps = {
  name: string;
} & Omit<MultiSelectProps, 'value' | 'onChange' | 'name' | 'validity'>;

export function MultiSelectField({ name, ...props }: MultiSelectFieldProps) {
  const control = useController({ name });

  return (
    <Field name={name}>
      {(_, fieldState) => (
        <MultiSelect
          {...props}
          {...control.field}
          validity={fieldState.invalid ? 'invalid' : undefined}
        />
      )}
    </Field>
  );
}
