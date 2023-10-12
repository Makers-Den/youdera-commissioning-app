import { RadioGroup as Radio } from '@headlessui/react';
import React, { ReactNode } from 'react';

import { BodyText, NoteText } from '../typography/Typography';
import clsxm from '../utils/clsxm';

export type Option<T> = { name: string; value: T };

export type RadioGroupProps<T> = {
  className?: string;
  optionClassName?: string;
  label?: ReactNode;
  options: Option<T>[];
  onChange?: (value: T) => void;
  defaultValue?: T;
};

export const PillsRadioGroup = <T extends string>({
  options,
  label,
  onChange,
  className,
  optionClassName,
  defaultValue,
}: RadioGroupProps<T>) => (
  <div className="z-10 w-full max-w-md">
    {label && <BodyText className="text-gray-1000 mb-2">{label}</BodyText>}
    <Radio
      onChange={(value: T) => onChange?.(value)}
      defaultValue={defaultValue}
    >
      <Radio.Label className="sr-only">{label}</Radio.Label>
      <div className={clsxm('flex flex-wrap gap-2', className)}>
        {options.map(option => (
          <Radio.Option
            key={option.name}
            value={option.value}
            className={({ checked }) =>
              clsxm(
                'relative w-max min-w-[75px] cursor-pointer rounded-2xl border border-gray-200 px-2 py-1 focus:outline-none',
                'transition-colors duration-300 ease-in-out',
                'text-gray-800',
                checked &&
                  'bg-brand-one-400 border-brand-one-400 border-none text-white',
                optionClassName,
              )
            }
          >
            <p className="font-primary text-center text-[11px] font-black uppercase text-current">
              {option.name}
            </p>
          </Radio.Option>
        ))}
      </div>
    </Radio>
  </div>
);
