/* eslint-disable @typescript-eslint/naming-convention */
import { useMeterModelsQuery } from '@src/api/youdera/hooks/meters/hooks';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';

import {
  DependentSelectsFields,
  DependentSelectsFieldsProps,
} from './DependentSelectsFields';

export type MeterModelSelectFieldsProps = {};

export function MeterModelSelectFields() {
  const intl = useIntl();

  const meterModelsQuery = useMeterModelsQuery();
  const { manufacturerOptions, modelOptions } = useMemo(
    () =>
      (meterModelsQuery.data || []).reduce<{
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
