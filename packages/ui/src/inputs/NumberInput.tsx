import * as React from 'react';
import clsxm from '../../lib/clsxm';
import { BodyText } from '../typography/Typography';
import { Combobox } from '@headlessui/react';
import { SvgIcon, IconName } from '../svg-icons/SvgIcon';

export type NumberInputProps = {
  label: string;
  value: number;
  placeholder?: string;
  mandatory?: boolean;
  width?: string;
  setValue: React.Dispatch<React.SetStateAction<number>>
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
      setValue,
      ...rest
    },
    ref,
  ) => {

    const [inputValue, setInputValue] = React.useState<number>()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    }

    const handleInputIncrement = (i: number) => {
      setValue(value + i)
    }
    return (
      <div className={className}>
        <BodyText className="mb-2 text-gray-700 text-sm">
          {label}{mandatory && '*'}
        </BodyText>
        <div className="relative max-w-fit">
          <Combobox value={value} disabled={disabled}>
            <Combobox.Input
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
                'disabled:cursor-not-allowed disabled:bg-gray-400 disabled:border-gray-500 disabled:placeholder:text-gray-800 disabled:placeholder:font-medium',
                `w-${width}`
              )}
              {...rest}
            />

            <Combobox.Button className={`absolute top-1/2 -translate-y-1/2 right-0 flex flex-col items-center pr-2 text-sm fill-gray-500`}>
              <SvgIcon name={'CaretUp'} className='fill-inherit h-4 mt-1' onClick={() => handleInputIncrement(1)}></SvgIcon>
              <SvgIcon name={'CaretDown'} className='fill-inherit h-4 mb-1' onClick={() => handleInputIncrement(-1)}></SvgIcon>
            </Combobox.Button>
          </Combobox>
        </div>
      </div >
    );
  },
);
