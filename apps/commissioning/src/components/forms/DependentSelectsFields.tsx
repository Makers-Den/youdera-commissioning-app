import { useEffect, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import {
  AutocompleteSelectOption,
  AutocompleteSelectProps,
} from 'ui/select/AutocompleteSelect';
import {
  SelectOption,
  SelectOptionProps,
  SelectProps,
  SelectValue,
} from 'ui/select/Select';
import clsxm from 'ui/utils/clsxm';

import { AutocompleteSelectField } from './AutocompleteField';
import { SelectField } from './SelectField';

export interface DependentValue extends SelectValue {
  dependentKey: string;
}

export type DependentSelectsFieldsProps<Value extends DependentValue> = {
  options: AutocompleteSelectOption[];
  autoCompleteProps: Omit<
    AutocompleteSelectProps,
    'onChange' | 'validity' | 'options'
  >;
  name: string;
  dependentOptions: SelectOptionProps<Value>[];
  dependentSelectProps: Omit<
    SelectProps<Value>,
    'onChange' | 'validity' | 'children'
  >;
  dependentName: string;
};

export function DependentSelectsFields<Value extends DependentValue>({
  options,
  autoCompleteProps,
  name,
  dependentSelectProps,
  dependentOptions,
  dependentName,
}: DependentSelectsFieldsProps<Value>) {
  const { setValue, formState } = useFormContext();
  const value = useWatch({
    name,
    defaultValue: formState.defaultValues?.[name],
  });
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
    <>
      <AutocompleteSelectField
        name={name}
        options={options}
        {...autoCompleteProps}
      />

      <SelectField
        {...dependentSelectProps}
        wrapperClassName={clsxm(!value && 'hidden', dependentSelectProps.wrapperClassName)}
        name={dependentName}
      >
        {filteredOptions.map(props => (
          <SelectOption key={props.value.label} {...props} />
        ))}
      </SelectField>
    </>
  );
}
