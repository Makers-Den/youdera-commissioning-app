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

export type DependentField<Value extends DependentValue> = {
  options: SelectOptionProps<Value>[];
  selectProps: Omit<SelectProps<Value>, 'onChange' | 'validity' | 'children'>;
  name: string;
};
export type DependentThreeSelectsFieldsProps<
  Value extends { key: string },
  DepValue1 extends DependentValue,
  DepValue2 extends DependentValue,
  DepValue3 extends DependentValue,
> = {
  value: Value;
  dependentField1: DependentField<DepValue1>;
  dependentField2: DependentField<DepValue2>;
  dependentField3: DependentField<DepValue3>;
};

export function DependentThreeSelectsFields<
  Value extends { key: string },
  DepValue1 extends DependentValue,
  DepValue2 extends DependentValue,
  DepValue3 extends DependentValue,
>({
  value,
  dependentField1,
  dependentField2,
  dependentField3,
}: DependentThreeSelectsFieldsProps<Value, DepValue1, DepValue2, DepValue3>) {
  const { setValue, formState } = useFormContext();

  const dependentValue1 = useWatch({
    name: dependentField1.name,
    defaultValue: formState.defaultValues?.[dependentField1.name],
  });
  const dependentValue2 = useWatch({
    name: dependentField2.name,
    defaultValue: formState.defaultValues?.[dependentField2.name],
  });
  const dependentValue3 = useWatch({
    name: dependentField3.name,
    defaultValue: formState.defaultValues?.[dependentField3.name],
  });

  // * 1
  useEffect(() => {
    if (value?.key !== dependentValue1?.dependentKey) {
      setValue(dependentField1.name, null);
    }
  }, [
    value?.key,
    dependentValue1?.dependentKey,
    dependentField1.name,
    setValue,
  ]);

  const filteredOptions1 = useMemo(
    () =>
      dependentField1.options.filter(
        option => option.value.dependentKey === value?.key,
      ),
    [dependentField1.options, value?.key],
  );

  // * 2
  useEffect(() => {
    if (dependentValue1?.key !== dependentValue2?.dependentKey) {
      setValue(dependentField2.name, null);
    }
  }, [
    dependentValue1?.key,
    dependentValue2?.dependentKey,
    dependentField2.name,
    setValue,
  ]);

  const filteredOptions2 = useMemo(
    () =>
      dependentField2.options.filter(
        option => option.value.dependentKey === dependentValue1?.key,
      ),
    [dependentField2.options, dependentValue1?.key],
  );

  // * 3
  useEffect(() => {
    if (dependentValue2?.key !== dependentValue3?.dependentKey) {
      setValue(dependentField3.name, null);
    }
  }, [
    dependentValue2?.key,
    dependentValue3?.dependentKey,
    dependentField3.name,
    setValue,
  ]);

  const filteredOptions3 = useMemo(
    () =>
      dependentField3.options.filter(
        option => option.value.dependentKey === dependentValue2?.key,
      ),
    [dependentField3.options, dependentValue2?.key],
  );

  return (
    <>
      <SelectField
        wrapperClassName={clsxm(!value && 'hidden')}
        name={dependentField1.name}
        {...dependentField1.selectProps}
      >
        {filteredOptions1.map(props => (
          <SelectOption {...props} />
        ))}
      </SelectField>

      <SelectField
        wrapperClassName={clsxm((!value || !dependentValue1) && 'hidden')}
        name={dependentField2.name}
        {...dependentField2.selectProps}
      >
        {filteredOptions2.map(props => (
          <SelectOption {...props} />
        ))}
      </SelectField>

      <SelectField
        wrapperClassName={clsxm(
          (!value || !dependentValue1 || !dependentValue2) && 'hidden',
        )}
        name={dependentField3.name}
        {...dependentField3.selectProps}
      >
        {filteredOptions3.map(props => (
          <SelectOption {...props} />
        ))}
      </SelectField>
    </>
  );
}
