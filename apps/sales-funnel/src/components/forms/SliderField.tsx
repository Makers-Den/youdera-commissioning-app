import { Slider, SliderProps } from 'ui/slider/Slider';

import { Field } from './Field';

export type SliderFieldProps = {
  name: string;
  fieldClassName?: string;
} & SliderProps;

export const SliderField = ({
  name,
  fieldClassName,
  ...props
}: SliderFieldProps) => (
  <Field name={name} className={fieldClassName}>
    {field => <Slider {...props} {...field} />}
  </Field>
);
