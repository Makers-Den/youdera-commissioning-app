import * as React from 'react';

import { IconName, SvgIcon } from '../svg-icons/SvgIcon';
import { Label } from '../typography/Typography';
import clsxm from '../utils/clsxm';

export type InputProps = {
  label?: string;
  value?: string;
  placeholder?: string;
  icon?: IconName;
  units?: string;
  validity?: 'valid' | 'invalid';
  isRequired?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickRightElement?: () => void;
} & React.ComponentPropsWithRef<'input'>;

const validityStyle = {
  valid: {
    label: 'text-green-400',
    icon: 'fill-green-400 h-4 w-4',
    units: 'text-green-400',
    input: 'focus-visible:ring-0 border-green-400',
  },
  invalid: {
    label: 'text-red-400',
    icon: 'fill-red-400 h-4 w-4',
    units: 'text-red-400',
    input: 'focus-visible:ring-0 border-red-400',
  },
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      value,
      label,
      disabled,
      validity,
      units,
      icon,
      placeholder,
      isRequired,
      onChange,
      onClickRightElement,
      ...rest
    },
    ref,
  ) => {
    const [rightElementColor, setRightElementColor] = React.useState<string>(
      'text-gray-600 fill-gray-500',
    );

    let computedIcon: IconName | undefined = icon;

    if (!units && validity === 'valid') {
      computedIcon = 'Check';
    }

    if (!units && validity === 'invalid') {
      computedIcon = 'Cross';
    }

    const handleRightColorChange = (color: string) => {
      if (!validity) {
        setRightElementColor(color);
      }
    };

    return (
      <div className={clsxm(className)}>
        {label && (
          <Label className={validity && validityStyle[validity].label}>
            {label}
            {isRequired && '*'}
          </Label>
        )}
        <div className="relative w-full mt-1">
          <input
            disabled={disabled}
            value={value}
            onChange={onChange}
            ref={ref}
            type="input"
            placeholder={placeholder}
            onFocus={() =>
              handleRightColorChange('text-orange-400 fill-orange-400')
            }
            onBlur={() => handleRightColorChange('text-gray-600 fill-gray-500')}
            className={clsxm(
              'inline-flex w-full items-center justify-center rounded px-3 py-2',
              'bg-gray-100 font-medium text-gray-800',
              'placeholder:font-normal',
              'border-[1px] border-gray-500',
              'focus:outline-none focus-visible:border-orange-400',
              'transition-colors duration-75',
              validity && validityStyle[validity].input,
              'disabled:cursor-not-allowed disabled:border-gray-500 disabled:bg-gray-400 disabled:placeholder:font-medium disabled:placeholder:text-gray-800',
            )}
            {...rest}
          />
          <button
            type="button"
            className={`absolute inset-y-0 right-0 flex items-center pr-3 text-sm ${rightElementColor} ${!onClickRightElement ? 'hover:cursor-default' : ''
              }`}
            onClick={onClickRightElement}
          >
            {computedIcon && (
              <SvgIcon
                name={computedIcon}
                className={
                  validity
                    ? validityStyle[validity].icon
                    : 'h-4 w-4 fill-inherit'
                }
              />
            )}
            {units && (
              <span
                className={
                  validity ? validityStyle[validity].units : 'text-inherit'
                }
              >
                {units}
              </span>
            )}
          </button>
        </div>
      </div>
    );
  },
);
