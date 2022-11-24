import { useController } from 'react-hook-form';
import { Select, SelectProps, SelectValue } from 'ui/select/Select';

import { Field } from './Field';

export type SelectFieldProps<Value extends SelectValue> = {
  name: string;
} & Omit<SelectProps<Value>, 'value' | 'onChange' | 'name' | 'validity'>;

export function SelectField<Value extends SelectValue>({
  name,
  ...props
}: SelectFieldProps<Value>) {
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
