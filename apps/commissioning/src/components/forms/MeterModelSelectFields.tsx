/* eslint-disable @typescript-eslint/naming-convention */
import { useInverterModelsQuery } from '@src/api/youdera/hooks/inverters/hooks';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';

import {
  DependentSelectsFieldsProps,
} from './DependentSelectsFields';
import { DependentTwoSelectsFields } from './DependentTwoSelectsFields';

export type MeterModelSelectFieldsProps = {};

export function MeterModelSelectFields() {
  const intl = useIntl();

  const inverterModelsQuery = useInverterModelsQuery();

  const { manufacturerOptions, modelOptions } = useMemo(
    () =>
      (inverterModelsQuery.data || []).reduce<{
        manufacturerOptions: DependentSelectsFieldsProps['options'];
        modelOptions: DependentSelectsFieldsProps['dependentOptions'];
      }>(
        (prevVal, curVal) => {
          const { manufacturer_name, manufacturer_id, name, id } = curVal;
          const manId = manufacturer_id.toString();

          const manufacturerOptions = [...prevVal.manufacturerOptions];

          if (!manufacturerOptions.some(({ key }) => key === manId)) {
            manufacturerOptions.push({
              key: manId,
              label: manufacturer_name,
            });
          }
          return {
            manufacturerOptions,
            modelOptions: [
              ...prevVal.modelOptions,
              {
                key: id.toString(),
                label: name,
                dependentKey: manId,
              },
            ],
          };
        },
        {
          manufacturerOptions: [],
          modelOptions: [],
        },
      ),
    [inverterModelsQuery.data],
  );

  return (
    <DependentTwoSelectsFields
      options={manufacturerOptions}
      autoCompleteProps={{
        label: intl.formatMessage({ defaultMessage: 'Manufacturer' }),
        placeholder: intl.formatMessage({
          defaultMessage: 'Select',
        }),
        noOptionsString: intl.formatMessage({
          defaultMessage: 'Nothing found.',
        }),
      }}
      name="manufacturer"
      dependentField1={{
        name: "model",
        options: modelOptions,
        selectProps: {
          label: intl.formatMessage({
            defaultMessage: 'Model',
          }),
          placeholder: intl.formatMessage({
            defaultMessage: 'Select',
          }),
        }
      }}
      dependentField2={{
        name: "model",
        options: modelOptions,
        selectProps: {
          label: intl.formatMessage({
            defaultMessage: 'Model',
          }),
          placeholder: intl.formatMessage({
            defaultMessage: 'Select',
          }),
        }
      }}
    />
  );
}
