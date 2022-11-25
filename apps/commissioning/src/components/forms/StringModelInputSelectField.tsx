/* eslint-disable @typescript-eslint/naming-convention */
import { InverterModel } from '@src/api/youdera/apiTypes';
import { useInverterModelsQuery } from '@src/api/youdera/hooks/inverters/hooks';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { AutocompleteSelectOption } from 'ui/select/AutocompleteSelect';
import { SelectOptionProps } from 'ui/select/Select';

import { DependentThreeSelectsFields } from './DependentThreeSelectsFields';

export type StringModelInputSelectFieldProps = {
  inverterValue: any;
  manufacturerValue: any;
  modelValue: any;

};
type Options = SelectOptionProps<{
  dependentKey: string;
  label: string;
}>[];

export const StringModelInputSelectField = ({
  inverterValue,
  manufacturerValue,
  modelValue,
}: StringModelInputSelectFieldProps) => {
  const intl = useIntl();

  const inverterModelsQuery = useInverterModelsQuery();
  const inverterModels = inverterModelsQuery.data as InverterModel[];

  // * Options
  const inverterManufacturerOptions = useMemo(() => {
    const result: unknown[] = [];
    const map = new Map();
    inverterModels.forEach(model => {
      if (!map.has(model.manufacturer_id)) {
        map.set(model.manufacturer_id, true);
        result.push({
          children: () => model.manufacturer_name,
          value: {
            key: model.manufacturer_id.toString(),
            label: model.manufacturer_name,
            value: model.manufacturer_id,
            dependentKey: (inverterValue as AutocompleteSelectOption)?.key ?? '',
          }
        });
      }
    });
    return result as Options;
  }, [inverterModels, inverterValue]);

  const inverterModelOptions = useMemo(() => {
    if (!manufacturerValue || !inverterModels) return [];
    return inverterModels
      .filter(
        model => model.manufacturer_id.toString() === manufacturerValue.key,
      )
      .map(model => ({
        children: () => model.name,
        value: {
          key: model.id.toString(),
          label: model.name,
          value: model.id,
          icon: 'Table',
          dependentKey: manufacturerValue.key,
        }

      }));
  }, [inverterModels, manufacturerValue]);

  const inverterInputOptions = useMemo(() => {
    if (!modelValue || !inverterModels) return [];
    const numberOfInputs = inverterModels.filter(
      model => model.id.toString() === modelValue.key,
    )[0]?.data.inputs;
    return Array(numberOfInputs)
      .fill(0)
      .map((_, idx) => ({
        children: () => (idx + 1).toString(),
        value: {
          key: idx.toString(),
          label: (idx + 1).toString(),
          icon: 'Chip',
          value: idx.toString(),
          dependentKey: modelValue.key,
        }
      }));
  }, [inverterModels, modelValue]);
  // *

  return (
    <DependentThreeSelectsFields
      value={inverterValue}
      dependentField1={{
        name: 'manufacturer',
        options: inverterManufacturerOptions,
        selectProps: {
          label: intl.formatMessage({
            defaultMessage: 'Manufacturer',
          }),
          placeholder: intl.formatMessage({
            defaultMessage: 'Select',
          }),
        },
      }}
      dependentField2={{
        name: 'model',
        options: inverterModelOptions as Options,
        selectProps: {
          label: intl.formatMessage({
            defaultMessage: 'Model',
          }),
          placeholder: intl.formatMessage({
            defaultMessage: 'Select',
          }),
        },
      }}
      dependentField3={{
        name: 'newInput',
        options: inverterInputOptions as Options,
        selectProps: {
          label: intl.formatMessage({
            defaultMessage: 'Input',
          }),
          placeholder: intl.formatMessage({
            defaultMessage: 'Select',
          }),
        },
      }}
    />
  );
};
