import React from 'react';

import { SvgIcon } from '../svg-icons/SvgIcon';
import { BodyText } from '../typography/Typography';
import clsxm from '../utils/clsxm';

export type NumberInputProps = {
  label: string;
  value?: string;
  placeholder?: string;
  isRequired?: boolean;
  unit?: string;
  validity?: 'valid' | 'invalid';
} & React.ComponentPropsWithRef<'input'>;

const validityStyle = {
  valid: {
    icon: 'fill-green-400 h-4 w-4',
    units: 'text-green-400',
    input: 'focus-visible:ring-0 border-green-400',
  },
  invalid: {
    icon: 'fill-red-400 h-4 w-4',
    units: 'text-red-400',
    input: 'focus-visible:ring-0 border-red-400',
  },
};

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      value,
      label,
      disabled,
      placeholder,
      isRequired,
      unit,
      validity,
      ...rest
    },
    ref,
  ) => (
    <div className={clsxm('w-64', className)}>
      <BodyText className="mb-2 text-sm text-gray-700">
        {label}
        {isRequired && '*'}
      </BodyText>

      <div className="relative w-full">
        <input
          value={value}
          disabled={disabled}
          ref={ref}
          min={0}
          type="number"
          placeholder={placeholder}
          className={clsxm(
            'inline-flex w-full items-center justify-center rounded px-3 py-2',
            'bg-gray-100 font-medium text-gray-800',
            'placeholder:font-normal',
            'border-[1px] border-gray-400',
            'focus:outline-none focus-visible:border-orange-400',
            'transition-colors duration-75',
            'disabled:cursor-not-allowed disabled:border-gray-500 disabled:bg-gray-400',
            'disabled:placeholder:font-medium disabled:placeholder:text-gray-800',
            validity && validityStyle[validity].input,
          )}
          {...rest}
        />

        <div className="suffix pointer-events-none absolute top-[9px] w-full pl-3">
          <span className="filler pointer-events-none select-none opacity-0">
            {value}
          </span>
          <span className="unit max-w[100% - 16px] pointer-events-none ml-1 inline-block select-none whitespace-pre">
            {value && unit}
          </span>
        </div>

        <div
          className={clsxm(
            'pointer-events-none absolute top-1/2 right-0 mr-2 -translate-y-1/2',
            'flex flex-col items-center justify-center fill-gray-500 pr-[5.5px]',
            validity && validityStyle[validity].icon,
          )}
        >
          <SvgIcon
            name="CaretUp"
            className="mb-[4px] h-[6px] fill-inherit hover:fill-orange-400"
          />
          <SvgIcon name="CaretDown" className="h-[6px] fill-inherit" />
        </div>
      </div>
    </div>
  ),
);
