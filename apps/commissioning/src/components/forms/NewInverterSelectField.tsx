/* eslint-disable @typescript-eslint/naming-convention */
import { useIntl } from 'react-intl';
import { AutocompleteSelectOption } from 'ui/select/AutocompleteSelect';

import { DependentFourSelectsFields } from './DependentFourSelectsFields';
import {
  DependentOption,
} from './DependentSelectsFields';

export type ExistingInverterSelectFieldProps = {
  inverterOptions: AutocompleteSelectOption[];
  inverterManufacturerOptions: DependentOption[];
  inverterModelOptions: DependentOption[];
  inverterInputsOptions: DependentOption[];
};

export const NewInverterSelectField = ({
  inverterOptions,
  inverterManufacturerOptions,
  inverterModelOptions,
  inverterInputsOptions,
}: ExistingInverterSelectFieldProps) => {
  const intl = useIntl();

  return (
    <DependentFourSelectsFields
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
      dependentField1={{
        name: "manufacturer",
        options: inverterManufacturerOptions,
        selectProps: {
          label: intl.formatMessage({
            defaultMessage: 'Manufacturer',
          }),
          placeholder: intl.formatMessage({
            defaultMessage: 'Select',
          }),
        }
      }}
      dependentField2={{
        name: "model",
        options: inverterModelOptions,
        selectProps: {
          label: intl.formatMessage({
            defaultMessage: 'Model',
          }),
          placeholder: intl.formatMessage({
            defaultMessage: 'Select',
          }),
        }
      }}
      dependentField3={{
        name: "newInput",
        options: inverterInputsOptions,
        selectProps: {
          label: intl.formatMessage({
            defaultMessage: 'Input',
          }),
          placeholder: intl.formatMessage({
            defaultMessage: 'Select',
          }),
        }
      }}

    />
  );
};