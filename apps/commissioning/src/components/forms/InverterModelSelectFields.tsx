/* eslint-disable @typescript-eslint/naming-convention */
import { InverterModel } from '@src/api/youdera/apiTypes';
import { useInverterModelsQuery } from '@src/api/youdera/hooks/inverters/hooks';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';

import {
  DependentSelectsFields,
  DependentSelectsFieldsProps,
} from './DependentSelectsFields';

export type InverterModelSelectFieldsProps = {};

type InverterModelOption = Pick<
  InverterModel,
  'name' | 'id' | 'manufacturer_id' | 'manufacturer_name'
> & {
  autoSerialnumber: boolean;
};

type DependentProps = DependentSelectsFieldsProps<
  InverterModelOption & { label: string; dependentKey: string }
>;

export function InverterModelSelectFields() {
  const intl = useIntl();

  const inverterModelsQuery = useInverterModelsQuery();

  const { manufacturerOptions, modelOptions } = useMemo(
    () =>
      (inverterModelsQuery.data || []).reduce<{
        manufacturerOptions: DependentProps['options'];
        modelOptions: DependentProps['dependentOptions'];
      }>(
        (prevVal, curVal) => {
          const { manufacturer_name, manufacturer_id, name, data, id } = curVal;
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
                value: {
                  manufacturer_name,
                  manufacturer_id,
                  name,
                  autoSerialnumber: data.auto_serialnumber,
                  dependentKey: manId,
                  label: name,
                  id,
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
    [inverterModelsQuery.data],
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
