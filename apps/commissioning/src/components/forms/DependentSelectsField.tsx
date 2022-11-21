import { useEffect, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { SelectOption, SelectProps } from 'ui/select/Select';
import clsxm from 'ui/utils/clsxm';

import { SelectField } from './SelectField';

export type DependentOption = SelectOption & { dependentKey: string };

export type DependentSelectsFieldsOutsideParentProps = {
  name: string;
  dependentOptions: DependentOption[];
  dependentSelectProps: Omit<SelectProps, 'onChange' | 'validity' | 'options'>;
  dependentName: string;
  value: any;
};

export function DependentSelectsField({
  value,
  dependentSelectProps,
  dependentOptions,
  dependentName,
}: DependentSelectsFieldsOutsideParentProps) {
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
    () => dependentOptions.filter(option => option.dependentKey === value?.key),
    [dependentOptions, value?.key],
  );

  return (
    <SelectField
      wrapperClassName={clsxm(!value && 'hidden')}
      name={dependentName}
      options={filteredOptions}
      {...dependentSelectProps}
    />
  );
}
