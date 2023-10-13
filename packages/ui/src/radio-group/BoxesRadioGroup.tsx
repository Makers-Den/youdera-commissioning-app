import { RadioGroup as Radio } from '@headlessui/react';
import React from 'react';

import { BodyText, NoteText } from '../typography/Typography';
import clsxm from '../utils/clsxm';

export type Option<T> = { name: string; value: T; element?: React.ReactNode };

export type RadioGroupProps<T> = {
  className?: string;
  optionClassName?: (checked: boolean) => string;
  labelClassName?: string;
  label?: string;
  options: Option<T>[];
  onChange?: (value: T) => void;
  defaultValue?: T;
};

export const BoxesRadioGroup = <T extends string>({
  options,
  label,
  onChange,
  className,
  optionClassName,
  labelClassName,
  defaultValue,
}: RadioGroupProps<T>) => (
  <div className="max-w-container z-10 w-full">
    {label && <BodyText className="text-gray-1000 mb-6">{label}</BodyText>}
    <Radio
      onChange={(value: T) => onChange?.(value)}
      defaultValue={defaultValue}
    >
      <Radio.Label className="sr-only">{label}</Radio.Label>
      <div className={clsxm('grid grid-cols-3 gap-4', className)}>
        {options.map(option => (
          <Radio.Option
            key={option.name}
            value={option.value}
            className={({ checked }) =>
              clsxm(
                'relative col-span-1 w-full  cursor-pointer rounded-md border border-gray-600 px-5 py-4 focus:outline-none',
                'text-gray-1000 flex flex-col items-center justify-between gap-2',
                'transition-colors duration-300 ease-in-out [&>svg]:transition-colors [&>svg]:duration-300 [&>svg]:ease-in-out',
                checked &&
                  'border-brand-one-400 [&>svg]:text-brand-one-400 border',
                optionClassName?.(checked),
              )
            }
          >
            {option.element}
            <NoteText className={clsxm('text-center', labelClassName)}>
              {option.name}
            </NoteText>
          </Radio.Option>
        ))}
      </div>
    </Radio>
  </div>
);
