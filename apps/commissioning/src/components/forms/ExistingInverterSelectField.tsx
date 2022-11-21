/* eslint-disable @typescript-eslint/naming-convention */
import { useIntl } from 'react-intl';
import { AutocompleteSelectOption } from 'ui/select/AutocompleteSelect';

import {
  DependentOption,
  DependentSelectsFields,
} from './DependentSelectsFields';

export type ExistingInverterSelectFieldProps = {
  inverterOptions: AutocompleteSelectOption[];
  inverterInputsOptions: DependentOption[];
};

export const ExistingInverterSelectField = ({
  inverterOptions,
  inverterInputsOptions,
}: ExistingInverterSelectFieldProps) => {
  const intl = useIntl();

  return (
    <DependentSelectsFields
      options={inverterOptions}
      autoCompleteProps={{
        label: intl.formatMessage({
          defaultMessage: 'Select inverter',
        }),
        placeholder: intl.formatMessage({
          defaultMessage: 'Select',
        }),
        noOptionsString: intl.formatMessage({
          defaultMessage: 'Nothing found.',
        }),
      }}
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