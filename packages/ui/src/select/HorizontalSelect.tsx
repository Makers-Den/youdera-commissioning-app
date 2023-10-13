import React from 'react';

import { BodyText, Label } from '../typography/Typography';
import clsxm from '../utils/clsxm';

export type OptionType<T> = { name: string; value: T };

export type HorizontalSelectProps<T> = {
  label?: string;
  options: OptionType<T>[];
  onChange?: (value: OptionType<T>[]) => void;
  defaultValue?: OptionType<T>[];
};

export const HorizontalSelect = <T extends string>({
  options,
  label,
  onChange,
  defaultValue = [],
}: HorizontalSelectProps<T>) => {
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
    <div className="w-full flex flex-col gap-2">
      {label && <Label className="max-w-container">{label}</Label>}
      <div className="flex w-full">
        {options.map(option => (
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          <Option
            key={option.value}
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
        'w-9 h-10 relative flex items-center justify-center cursor-pointer text-gray-1000',
        'first:rounded-l-md last:rounded-r-md border border-gray-500 focus:outline-none border-r-0 last:border-r',
        isChecked && 'border-brand-one-400 text-brand-one-400',
      )}
      onClick={onClick}
    >
      <BodyText>{label}</BodyText>
    </button>
  ),
);
