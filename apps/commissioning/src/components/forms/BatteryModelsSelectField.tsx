/* eslint-disable @typescript-eslint/naming-convention */
import { BatteryModel } from '@src/api/youdera/apiTypes';
import { useBatteryModelsQuery } from '@src/api/youdera/hooks/batteries/hooks';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';

import {
  DependentSelectsFields,
  DependentSelectsFieldsProps,
} from './DependentSelectsFields';

export type BatteryModelsSelectFieldProps = {};

type BatteryModelOption = Omit<BatteryModel, 'data'> & {
  autoSerialnumber: boolean;
  acCoupled: boolean;
};

type DependentProps = DependentSelectsFieldsProps<
  BatteryModelOption & { label: string; dependentKey: string }
>;

export function BatteryModelsSelectField() {
  const intl = useIntl();

  const batteryModelsQuery = useBatteryModelsQuery();

  const { manufacturerOptions, modelOptions } = useMemo(
    () =>
      (batteryModelsQuery.data || []).reduce<{
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

          const { data, ...restData } = curVal;
          return {
            manufacturerOptions,
            modelOptions: [
              ...prevVal.modelOptions,
              {
                children: () => name,
                value: {
                  ...restData,
                  autoSerialnumber: data.auto_serialnumber,
                  acCoupled: data.ac_coupled,
                  dependentKey: manId,
                  label: name,
                },
              },
            ],
          };
        },
        {
          manufacturerOptions: [],
          modelOptions: [],
        },
      ),
    [batteryModelsQuery.data],
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
        compareValueBy: 'id',
      }}
      dependentName="model"
    />
  );
}
