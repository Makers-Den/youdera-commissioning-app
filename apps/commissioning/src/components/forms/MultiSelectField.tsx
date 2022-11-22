import { useController } from 'react-hook-form';
import { MultiSelect, MultiSelectProps, MultiSelectValue } from 'ui/select/MultiSelect';

import { Field } from './Field';

export type MultiSelectFieldProps<Value extends MultiSelectValue> = {
  name: string;
} & Omit<MultiSelectProps<Value>, 'value' | 'onChange' | 'name' | 'validity'>;

export function MultiSelectField<Value extends MultiSelectValue>({ name, ...props }: MultiSelectFieldProps<Value>) {
  const control = useController({ name });
  return (
    <Field name={name}>
      {(_, fieldState) => (
        <MultiSelect
          {...props}
          {...control.field}
          value={control.field.value || []}
          validity={fieldState.invalid ? 'invalid' : undefined}
        />
      )}
    </Field>
  );
}
