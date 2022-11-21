/* eslint-disable @typescript-eslint/naming-convention */
import { useIntl } from 'react-intl';

import { DependentOption, DependentSelectsField } from './DependentSelectsField';

export type ExistingInverterSelectFieldProps = {
  inverterValue: any;
  inverterInputsOptions: DependentOption[];
};

export const ExistingInverterSelectField = ({
  inverterValue,
  inverterInputsOptions,
}: ExistingInverterSelectFieldProps) => {
  const intl = useIntl();

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