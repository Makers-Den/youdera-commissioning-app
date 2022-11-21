/* eslint-disable @typescript-eslint/naming-convention */
import { useIntl } from 'react-intl';

import { DependentOption, DependentThreeSelectsFields } from './DependentThreeSelectsFields';


export type ExistingInverterSelectFieldProps = {
  inverterValue: any;
  inverterManufacturerOptions: DependentOption[];
  inverterModelOptions: DependentOption[];
  inverterInputsOptions: DependentOption[];
};

export const NewInverterSelectField = ({
  inverterValue,
  inverterManufacturerOptions,
  inverterModelOptions,
  inverterInputsOptions,
}: ExistingInverterSelectFieldProps) => {
  const intl = useIntl();

  return (
    <DependentThreeSelectsFields
      value={inverterValue}
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