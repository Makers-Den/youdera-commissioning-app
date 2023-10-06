import { RadioGroup as Radio } from '@headlessui/react';

import { NoteText } from '../typography/Typography';
import clsxm from '../utils/clsxm';

type Option = { name: string; value: string; element?: React.ReactNode };

type RadioGroupProps = {
  className?: string;
  optionClassName?: string;
  label?: string;
  options: Option[];
  defaultOption?: Option;
  onChange: (value: Option) => void;
  selected: Option | undefined;
};

export const CustomRadioGroup: React.FC<RadioGroupProps> = ({
  options,
  label,
  onChange,
  selected,
  className,
  optionClassName,
}) => (
  <div className="w-full px-4 py-16">
    <div className="mx-auto w-full max-w-md">
      <Radio value={selected} onChange={(value: Option) => onChange(value)}>
        <Radio.Label className="sr-only">{label}</Radio.Label>
        <div className={clsxm('grid grid-cols-3 gap-4', className)}>
          {options.map(option => (
            <Radio.Option
              key={option.name}
              value={option.value}
              className={({ checked }) =>
                clsxm(
                  'relative col-span-1 w-full  cursor-pointer rounded-md border border-gray-600 px-5 py-4 focus:outline-none',
                  'text-gray-1000 flex flex-col items-center justify-center gap-2',
                  checked && 'border-brand-one-400 border',
                  optionClassName,
                )
              }
            >
              {option.element}
              <Radio.Label as="p" className="text-sm">
                <NoteText>{option.name}</NoteText>
              </Radio.Label>
            </Radio.Option>
          ))}
        </div>
      </Radio>
    </div>
  </div>
);
