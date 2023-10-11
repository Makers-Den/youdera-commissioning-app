import React from 'react';
import { Field } from './Field';
import {
  CustomRadioGroup,
  RadioGroupProps,
} from 'ui/radio-group/CustomRadioGroup';

export const CustomRadioGroupField = <T,>({
  name,
  fieldClassName,
  ...props
}: Omit<RadioGroupProps<T>, 'defaultValue'> & {
  name: string;
  fieldClassName?: string;
}) => {
  console.log(props.className);
  return (
    <Field name={name} className={fieldClassName}>
      {(field, fieldState, formState) => (
        <CustomRadioGroup
          {...props}
          {...field}
          defaultValue={formState?.defaultValues?.[name]}
        />
      )}
    </Field>
  );
};
