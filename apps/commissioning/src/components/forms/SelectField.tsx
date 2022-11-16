import { useController } from 'react-hook-form';
import { Select, SelectProps } from 'ui/select/Select';

import { Field } from './Field';

export type SelectFieldProps = {
  name: string;
} & Omit<SelectProps, 'value' | 'onChange' | 'name' | 'validity'>;

export function SelectField({ name, ...props }: SelectFieldProps) {
  const control = useController({ name });

  return (
    <Field name={name}>
      {(_, fieldState) => (
        <Select
          {...props}
          {...control.field}
          validity={fieldState.invalid ? 'invalid' : undefined}
        />
      )}
    </Field>
  );
}
