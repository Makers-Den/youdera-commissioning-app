import { RadioGroup as Radio } from '@headlessui/react';

import { BodyText } from '../typography/Typography';
import clsxm from '../utils/clsxm';

export type Option<T> = { name: string; value: T; description?: string };

export type RadioGroupProps<T> = {
  label?: string;
  options: Option<T>[];
  onChange?: (value: T) => void;
  defaultValue?: T;
  className?: string;
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

export const RadioGroup = <T extends string>({
  options,
  label,
  onChange,
  defaultValue,
  className,
}: RadioGroupProps<T>) => (
  <div className={clsxm('max-w-container w-full', className)}>
    <Radio
      defaultValue={defaultValue}
      onChange={(value: T) => onChange?.(value)}
      className="flex flex-col"
    >
      {label && <Radio.Label className="mb-6">{label}</Radio.Label>}
      <div className="flex flex-col gap-2">
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
              <div className="flex flex-col gap-2">
                <div className="flex w-full items-center gap-3">
                  <RadioButton checked={checked} />
                  <BodyText
                    className={clsxm(
                      'text-gray-1000',
                      option?.description && 'font-bold',
                    )}
                  >
                    {option.name}
                  </BodyText>
                </div>
                {option?.description && (
                  <BodyText className="ml-9">{option.description}</BodyText>
                )}
              </div>
            )}
          </Radio.Option>
        ))}
      </div>
    </Radio>
  </div>
);
