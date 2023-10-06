import React from 'react';
import clsxm from '../utils/clsxm';
import { BodyText } from '../typography/Typography';
import { SvgIcon } from '../svg-icons/SvgIcon';

type Option = { name: string; value: string };

type CheckboxGroupProps = {
  className?: string;
  label?: string;
  options: Option[];
  defaultOption?: Option;
  onChange: (value: Option) => void;
  selected: Option[] | undefined;
};

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  label,
  selected,
  onChange,
}) => {
  return (
    <div className="w-full p-4 ">
      {label && <BodyText className="mb-4">{label}</BodyText>}
      <div className="mx-auto flex w-full max-w-md flex-col gap-2">
        {options.map(option => (
          <Option
            key={option.name}
            option={option}
            label={option.name}
            isChecked={
              selected?.find(item => item.value === option.value) !== undefined
            }
            onClick={() => onChange(option)}
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
  option: Option;
};
const Option = React.forwardRef<HTMLInputElement, OptionProps>(
  ({ label, isChecked, onClick }, ref) => (
    <div
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
    </div>
  ),
);
