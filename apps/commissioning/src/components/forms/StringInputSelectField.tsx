/* eslint-disable @typescript-eslint/naming-convention */
import { Inverter } from '@src/api/youdera/apiTypes';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { AutocompleteSelectOption } from 'ui/select/AutocompleteSelect';
import { IconName } from 'ui/svg-icons/SvgIcon';

import {
  DependentSelectsField,
} from './DependentSelectsField';

export type StringInputSelectFieldProps = {
  inverterValue: AutocompleteSelectOption;
  inverters: Inverter[];
};

export const StringInputSelectField = ({
  inverterValue,
  inverters
}: StringInputSelectFieldProps) => {
  const intl = useIntl();

  const inverterInputsOptions = useMemo(() => {
    if (!inverterValue?.key || inverterValue?.key === '-1') return [];

    const selectedInverter = inverters.filter(
      inverter => inverter.id.toString() === inverterValue.key,
    )[0];

    return selectedInverter.mpp_trackers.map((input, idx) => ({
      children: () => (idx + 1).toString(),
      value: {
        key: input.id.toString(),
        label: (idx + 1).toString(),
        value: input.id,
        dependentKey: inverterValue?.key ?? '',
      },
      icon: 'Chip' as IconName,
    }));
  }, [inverterValue, inverters]);

  return (
    <DependentSelectsField
      value={inverterValue}
      name="inverter"
      dependentOptions={inverterInputsOptions}
      dependentSelectProps={{
        label: intl.formatMessage({
          defaultMessage: 'Input',
        }),
        placeholder: intl.formatMessage({
          defaultMessage: 'Select',
        }),
      }}
      dependentName="input"
    />
  );
};
