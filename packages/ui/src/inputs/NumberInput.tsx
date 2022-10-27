import * as React from 'react';
import clsxm from '../../lib/clsxm';
import { BodyText } from '../typography/Typography';
import { Combobox } from '@headlessui/react';
import { SvgIcon, IconName } from '../svg-icons/SvgIcon';

export type NumberInputProps = {
  label: string;
  value: string;
  placeholder?: string;
  mandatory?: boolean;
  width?: string;
  unit?: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
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
      width,
      unit,
      setValue,
      ...rest
    },
    ref,
  ) => {
    const handleInputChange = (e: React.ChangeEvent<any>) => {
      setValue(e.target.value);
      if (e.target.value.length === 0) {
        e.target.parentElement.querySelector('.suffix .unit').innerHTML = '';
        return;
      }

      // Using a filler char will prevent the suffix to be overwritten with the input
      e.target.parentElement.querySelector('.suffix .unit').innerHTML = unit ?? '';
      e.target.parentElement.querySelector('.suffix .filler').innerHTML = e.target.value;
    };

    return (
      <div className={clsxm('max-w-fit', className)}>
        <BodyText className="mb-2 text-gray-700 text-sm">
          {label}
          {mandatory && '*'}
        </BodyText>

        <div className="relative max-w-fit">
          <input
            value={value}
            disabled={disabled}
            onChange={handleInputChange}
            ref={ref}
            min={0}
            type="number"
            placeholder={placeholder}
            className={clsxm(
              'inline-flex items-center justify-center rounded px-3 py-2',
              'font-medium text-gray-800 bg-gray-100',
              'placeholder:font-normal',
              'border-[1px] border-gray-400',
              'focus:outline-none focus-visible:ring-1 focus-visible:ring-orange-400',
              'transition-colors duration-75',
              'disabled:cursor-not-allowed disabled:bg-gray-400 disabled:border-gray-500',
              'disabled:placeholder:text-gray-800 disabled:placeholder:font-medium',
              `w-${width}`,
            )}
            {...rest}
          />

          <div className="suffix absolute top-[9px] pointer-events-none w-full pl-3">
            <span className="filler pointer-events-none select-none opacity-0" />
            <span className="unit pointer-events-none select-none inline-block whitespace-pre max-w[100% - 16px] ml-1" />
          </div>

          <div
            className={clsxm(
              'absolute top-1/2 -translate-y-1/2 right-0 pointer-events-none',
              'flex flex-col items-center pr-[5.5px] fill-gray-500'
            )}>
            <SvgIcon
              name={'CaretUp'}
              className="fill-inherit h-4 mt-1 mr-2 spin-button-up"
            ></SvgIcon>
            <SvgIcon
              name={'CaretDown'}
              className="fill-inherit h-4 mb-1 mr-2 spin-button-down"
            ></SvgIcon>
          </div>
        </div>
      </div>
    );
  },
);
