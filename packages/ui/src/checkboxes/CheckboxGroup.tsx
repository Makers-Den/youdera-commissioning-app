import React from 'react';

import { SvgIcon } from '../svg-icons/SvgIcon';
import { BodyText } from '../typography/Typography';
import clsxm from '../utils/clsxm';

export type OptionType<T> = { name: string; value: T };

export type CheckboxGroupProps<T> = {
  label?: string;
  options: OptionType<T>[];
  onChange?: (value: OptionType<T>[]) => void;
  defaultValue?: OptionType<T>[];
};

export const CheckboxGroup = <T extends string>({
  options,
  label,
  onChange,
  defaultValue = [],
}: CheckboxGroupProps<T>) => {
  const [selected, setSelected] = React.useState<OptionType<T>[]>(defaultValue);

  const handleClick = (e: OptionType<T>) => {
    if (selected?.find(item => item.value === e.value)) {
      const filteredSelection = selected.filter(item => item.value !== e.value);

      setSelected(filteredSelection);
      onChange?.(filteredSelection);
      return;
    }
    onChange?.([...selected, e]);
    setSelected([...selected, e]);
  };

  return (
    <div className="w-full">
      {label && <BodyText className="mb-4 max-w-container">{label}</BodyText>}
      <div className="flex w-full max-w-container flex-col gap-2">
        {options.map(option => (
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          <Option
            key={option.name}
            label={option.name}
            isChecked={
              selected?.find(item => item.value === option.value) !== undefined
            }
            onClick={() => handleClick(option)}
          />
        ))}
      </div>
    </div>
  );
};

type OptionProps = {
  label?: string;
  isChecked: boolean;
  onClick: () => void;
};

const Option = React.forwardRef<HTMLInputElement, OptionProps>(
  ({ label, isChecked, onClick }, ref) => (
    <button
      type="button"
      className={clsxm(
        'relative flex cursor-pointer rounded-md border border-gray-600 px-5 py-4 focus:outline-none',
        isChecked && 'border-brand-one-400 border',
      )}
      onClick={onClick}
    >
      <div className="flex w-full items-center gap-3">
        <div className="flex items-center">
          <label className="relative flex items-center hover:cursor-pointer">
            <input ref={ref} type="checkbox" className="hidden" />
            {isChecked ? (
              <span className="bg-brand-one-400 h-4 w-4 rounded-sm">
                <SvgIcon
                  name="Check"
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 fill-white "
                />
              </span>
            ) : (
              <span
                aria-hidden="true"
                className={clsxm('h-4 w-4 rounded-sm border-2 border-gray-800')}
              />
            )}
          </label>

          <BodyText className={clsxm('text-gray-1000 ml-3')}>{label}</BodyText>
        </div>
      </div>
    </button>
  ),
);
