import { useEffect, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import {
  AutocompleteSelectOption,
  AutocompleteSelectProps,
} from 'ui/select/AutocompleteSelect';
import { SelectOption, SelectProps } from 'ui/select/Select';

import { AutocompleteSelectField } from './AutocompleteField';
import { SelectField } from './SelectField';

export type DependentOption = SelectOption & { dependentKey: string };

export type DependentSelectsFieldsProps = {
  options: AutocompleteSelectOption[];
  autoCompleteProps: Omit<
    AutocompleteSelectProps,
    'onChange' | 'validity' | 'options'
  >;
  name: string;
  dependentOptions: DependentOption[];
  dependentSelectProps: Omit<SelectProps, 'onChange' | 'validity' | 'options'>;
  dependentName: string;
};

export function DependentSelectsFields({
  options,
  autoCompleteProps,
  name,
  dependentSelectProps,
  dependentOptions,
  dependentName,
}: DependentSelectsFieldsProps) {
  const { setValue } = useFormContext();
  const value = useWatch({ name });

  useEffect(() => {
    if (value?.key) {
      setValue(dependentName, null);
    }
  }, [value?.key, dependentName, setValue]);

  const filteredOptions = useMemo(
    () => dependentOptions.filter(option => option.dependentKey === value?.key),
    [dependentOptions, value?.key],
  );

  return (
    <>
      <AutocompleteSelectField
        name={name}
        options={options}
        {...autoCompleteProps}
      />

      {value && (
        <SelectField
          name={dependentName}
          options={filteredOptions}
          {...dependentSelectProps}
        />
      )}
    </>
  );
}
