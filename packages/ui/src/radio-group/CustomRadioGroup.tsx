import { RadioGroup as Radio } from '@headlessui/react';

import { BodyText, NoteText } from '../typography/Typography';
import clsxm from '../utils/clsxm';

export type Option = { name: string; value: string; element?: React.ReactNode };

type RadioGroupProps = {
  className?: string;
  optionClassName?: string;
  label?: string;
  options: Option[];
  onChange: (value: string) => void;
  defaultValue?: string;
};

export const CustomRadioGroup: React.FC<RadioGroupProps> = ({
  options,
  label,
  onChange,
  className,
  optionClassName,
  defaultValue,
}) => (
  <div className="z-10 w-full max-w-md">
    {label && <BodyText className="text-gray-1000 mb-6">{label}</BodyText>}
    <Radio
      onChange={(value: string) => onChange(value)}
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
                optionClassName,
              )
            }
          >
            {option.element}
            <NoteText className="text-center">{option.name}</NoteText>
          </Radio.Option>
        ))}
      </div>
    </Radio>
  </div>
);
