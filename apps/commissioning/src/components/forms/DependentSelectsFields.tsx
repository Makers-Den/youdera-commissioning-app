import { useEffect, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import {
  AutocompleteSelectOption,
  AutocompleteSelectProps,
} from 'ui/select/AutocompleteSelect';
import { SelectOption, SelectProps } from 'ui/select/Select';
import clsxm from 'ui/utils/clsxm';

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

      <SelectField
        wrapperClassName={clsxm(!value && 'hidden')}
        name={dependentName}
        options={filteredOptions}
        {...dependentSelectProps}
      />
    </>
  );
}
