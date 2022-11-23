/* eslint-disable @typescript-eslint/naming-convention */
import { MeterModel } from '@src/api/youdera/apiTypes';
import { useMeterModelsQuery } from '@src/api/youdera/hooks/meters/hooks';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';

import {
  DependentSelectsFields,
  DependentSelectsFieldsProps,
} from './DependentSelectsFields';

export type MeterModelSelectFieldsProps = {};

type DependentProps = DependentSelectsFieldsProps<
  MeterModel & { label: string; dependentKey: string }
>;

export function MeterModelSelectFields() {
  const intl = useIntl();

  const meterModelsQuery = useMeterModelsQuery();

  const { manufacturerOptions, modelOptions } = useMemo(
    () =>
      (meterModelsQuery.data || []).reduce<{
        manufacturerOptions: DependentProps['options'];
        modelOptions: DependentProps['dependentOptions'];
      }>(
        (prevVal, curVal) => {
          const { manufacturer_name, manufacturer_id, name } = curVal;
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
                children: () => name,
                value: { ...curVal, dependentKey: manId, label: name },
              },
            ],
          };
        },
        {
          manufacturerOptions: [],
          modelOptions: [],
        },
      ),
    [meterModelsQuery.data],
  );

  return (
    <DependentSelectsFields
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
      dependentOptions={modelOptions}
      dependentSelectProps={{
        label: intl.formatMessage({
          defaultMessage: 'Model',
        }),
        placeholder: intl.formatMessage({
          defaultMessage: 'Select',
        }),
      }}
      dependentName="model"
    />
  );
}
