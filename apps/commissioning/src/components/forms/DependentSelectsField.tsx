import { useEffect, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import {
  SelectOption,
  SelectOptionProps,
  SelectProps,
  SelectValue,
} from 'ui/select/Select';
import clsxm from 'ui/utils/clsxm';

import { SelectField } from './SelectField';

export interface DependentValue extends SelectValue {
  dependentKey: string;
}

export type DependentSelectsFieldsOutsideParentProps<
  Value extends { key: string },
  DepValue extends DependentValue,
> = {
  name: string;
  dependentOptions: SelectOptionProps<DepValue>[];
  dependentSelectProps: Omit<
    SelectProps<DepValue>,
    'onChange' | 'validity' | 'options' | 'children'
  >;
  dependentName: string;
  value: Value;
};

export function DependentSelectsField<
  Value extends { key: string },
  DepValue extends DependentValue,
>({
  value,
  dependentSelectProps,
  dependentOptions,
  dependentName,
}: DependentSelectsFieldsOutsideParentProps<Value, DepValue>) {
  const { setValue, formState } = useFormContext();
  const dependentValue = useWatch({
    name: dependentName,
    defaultValue: formState.defaultValues?.[dependentName],
  });

  useEffect(() => {
    if (value?.key !== dependentValue?.dependentKey) {
      setValue(dependentName, null);
    }
  }, [value?.key, dependentValue?.dependentKey, dependentName, setValue]);

  const filteredOptions = useMemo(
    () =>
      dependentOptions.filter(
        option => option.value.dependentKey === value?.key,
      ),
    [dependentOptions, value?.key],
  );

  return (
    <SelectField
      wrapperClassName={clsxm(!value && 'hidden')}
      name={dependentName}
      {...dependentSelectProps}
    >
      {filteredOptions.map(props => (
        <SelectOption {...props} />
      ))}
    </SelectField>
  );
}
