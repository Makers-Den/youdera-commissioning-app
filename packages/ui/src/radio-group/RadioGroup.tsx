import { RadioGroup as Radio } from '@headlessui/react';

import { BodyText } from '../typography/Typography';
import clsxm from '../utils/clsxm';

type Option = { name: string; value: string };

type RadioGroupProps = {
  className?: string;
  label?: string;
  options: Option[];
  defaultOption?: Option;
  onChange: (value: Option) => void;
  selected: Option | undefined;
};

const RadioButton = ({ checked }: { checked: boolean }) => (
  <div
    className={clsxm(
      'h-6 w-6 border border-gray-500 bg-gray-100',
      'rounded-full',
      checked && 'border-brand-one-400  border-[0.375rem] ',
    )}
  />
);

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  label,
  onChange,
  selected,
}) => (
  <div className="w-full max-w-md px-4 py-16">
    <Radio value={selected} onChange={(value: Option) => onChange(value)}>
      <Radio.Label className="sr-only">{label}</Radio.Label>
      <div className="space-y-2">
        {options.map(option => (
          <Radio.Option
            key={option.name}
            value={option.value}
            className={({ checked }) =>
              clsxm(
                'relative flex cursor-pointer rounded-md border border-gray-600 px-5 py-4 focus:outline-none',
                checked && 'border-brand-one-400 border',
              )
            }
          >
            {({ checked }) => (
              <div className="flex w-full items-center gap-3">
                <RadioButton checked={checked} />
                <BodyText className="text-gray-1000">{option.name}</BodyText>
              </div>
            )}
          </Radio.Option>
        ))}
      </div>
    </Radio>
  </div>
);
