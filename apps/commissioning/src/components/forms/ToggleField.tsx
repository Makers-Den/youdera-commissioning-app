import { useController } from 'react-hook-form';
import { Toggle, ToggleProps } from 'ui/toggle/Toggle';

import { Field } from './Field';

export type SelectFieldProps = {
  name: string;
} & Omit<ToggleProps, 'value' | 'onChange' | 'name'>;

export function ToggleField({ name, ...props }: SelectFieldProps) {
  const control = useController({ name });
  return (
    <Field name={name}>
      {() => (
        <Toggle
          checked={control.field.value}
          {...props}
          {...control.field}
        />
      )}
    </Field>
  );
}
