import * as React from 'react';
import clsxm from '../../lib/clsxm';
import { BodyText } from '../typography/Typography';

type InputProps = {
  label: string,
  disabled?: boolean
  icon?: SVGElement;
  valid?: boolean;
  invalid?: boolean;
} & React.ComponentPropsWithRef<'input'>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      children,
      className,
      label,
      disabled,
      valid,
      invalid,
      icon,
      ...rest
    },
    ref
  ) => {
    return (
      <div>
        <BodyText className='mb-3 text-darkGray-secondary'>{label}</BodyText>
        <input
          ref={ref}
          type='input'
          disabled={disabled}
          className={clsxm(
            'inline-flex items-center justify-center rounded px-3 py-2',
            'font-medium text-darkGray-secondary',
            'border-[1px] border-gray-secondary',
            'focus:outline-none focus-visible:ring focus-visible:ring-primary-500', //??
            'transition-colors duration-75',
            'disabled:cursor-not-allowed',
            className
          )}
          {...rest}
        />
      </div>
    );
  }
);
