import React, { useEffect } from 'react';

import { SvgIcon } from '../svg-icons/SvgIcon';
import { BodyText } from '../typography/Typography';
import clsxm from '../utils/clsxm';

export type NumberInputProps = {
  label: string;
  value?: string;
  placeholder?: string;
  mandatory?: boolean;
  unit?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
} & React.ComponentPropsWithRef<'input'>;

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      children,
      className,
      value,
      label,
      disabled,
      placeholder,
      mandatory,
      unit,
      setValue,
      ...rest
    },
    ref,
  ) => {

    const handleInputChange = (e: React.ChangeEvent<any>) => (
      setValue(e.target.value)
    )

    return (
      <div className={clsxm('w-64', className)}>
        <BodyText className="mb-2 text-sm text-gray-700">
          {label}
          {mandatory && '*'}
        </BodyText>

        <div className='relative w-full'>
          <input
            value={value}
            disabled={disabled}
            onChange={handleInputChange}
            ref={ref}
            min={0}
            type="number"
            placeholder={placeholder}
            className={clsxm(
              'inline-flex items-center justify-center rounded px-3 py-2 w-full',
              'bg-gray-100 font-medium text-gray-800',
              'placeholder:font-normal',
              'border-[1px] border-gray-400',
              'focus:outline-none focus-visible:border-orange-400',
              'transition-colors duration-75',
              'disabled:cursor-not-allowed disabled:border-gray-500 disabled:bg-gray-400',
              'disabled:placeholder:font-medium disabled:placeholder:text-gray-800',
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
    );
  },
);
