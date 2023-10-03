import React from 'react';

import { SvgIcon } from '../svg-icons/SvgIcon';
import { Label } from '../typography/Typography';
import clsxm from '../utils/clsxm';
import { validityStyle } from '../utils/constants';

export type NumberInputProps = {
  label: string;
  value?: string;
  placeholder?: string;
  isRequired?: boolean;
  unit?: string;
  validity?: 'valid' | 'invalid';
} & React.ComponentPropsWithRef<'input'>;

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
      <Label className={validity && validityStyle[validity].label}>
        {label}
        <span>{isRequired && '*'}</span>
      </Label>

      <div className="relative mt-1 w-full">
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
            'focus-visible:border-brand-one-400 focus:outline-none',
            'transition-colors duration-75',
            'disabled:cursor-not-allowed disabled:border-gray-500 disabled:bg-gray-400',
            'disabled:placeholder:font-medium disabled:placeholder:text-gray-800',
            validity && validityStyle[validity].input,
          )}
          {...rest}
          data-cy={label?.toLowerCase().replace(' ', '-') || 'number-input'}
        />

        <div className="suffix pointer-events-none absolute top-[9px] w-full pl-3">
          <span className="filler pointer-events-none select-none opacity-0">
            {value}
          </span>
          <span
            className={clsxm(
              'unit max-w[100% - 16px] pointer-events-none ml-1 inline-block select-none whitespace-pre',
              validity && validityStyle[validity].units,
            )}
          >
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
            className="hover:fill-brand-one-400 mb-[4px] h-[6px] fill-inherit"
          />
          <SvgIcon name="CaretDown" className="h-[6px] fill-inherit" />
        </div>
      </div>
    </div>
  ),
);
