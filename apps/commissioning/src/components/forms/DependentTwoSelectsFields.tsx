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
export type DependentField = {
  options: DependentOption[];
  selectProps: Omit<SelectProps, 'onChange' | 'validity' | 'options'>;
  name: string;
}
export type DependentSelectsFieldsProps = {
  options: AutocompleteSelectOption[];
  autoCompleteProps: Omit<
    AutocompleteSelectProps,
    'onChange' | 'validity' | 'options'
  >;
  name: string;
  dependentField1: DependentField
  dependentField2: DependentField
};

export function DependentTwoSelectsFields({
  options,
  autoCompleteProps,
  name,
  dependentField1,
  dependentField2
}: DependentSelectsFieldsProps) {
  const { setValue, formState } = useFormContext();

  const value = useWatch({
    name,
    defaultValue: formState.defaultValues?.[name],
  });
  const dependentValue1 = useWatch({
    name: dependentField1.name,
    defaultValue: formState.defaultValues?.[dependentField1.name],
  });
  const dependentValue2 = useWatch({
    name: dependentField2.name,
    defaultValue: formState.defaultValues?.[dependentField2.name],
  });

  // * 1
  useEffect(() => {
    if (value?.key !== dependentValue1?.dependentKey) {
      setValue(dependentField1.name, null);
    }
  }, [value?.key, dependentValue1?.dependentKey, dependentField1.name, setValue]);

  const filteredOptions1 = useMemo(
    () => dependentField1.options.filter(option => option.dependentKey === value?.key),
    [dependentField1.options, value?.key],
  );

  // * 2
  useEffect(() => {
    if (dependentValue1?.key !== dependentValue2?.dependentKey) {
      setValue(dependentField2.name, null);
    }
  }, [dependentValue1?.key, dependentValue2?.dependentKey, dependentField2.name, setValue]);

  const filteredOptions2 = useMemo(
    () => dependentField2.options.filter(option => option.dependentKey === dependentValue1?.key),
    [dependentField2.options, dependentValue1?.key],
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
        name={dependentField1.name}
        options={filteredOptions1}
        {...dependentField1.selectProps}
      />

      <SelectField
        wrapperClassName={clsxm((!value || !dependentValue1) && 'hidden')}
        name={dependentField2.name}
        options={filteredOptions2}
        {...dependentField2.selectProps}
      />
    </>
  );
}
