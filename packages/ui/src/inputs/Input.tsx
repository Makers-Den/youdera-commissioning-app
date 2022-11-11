import * as React from 'react';

import { IconName, SvgIcon } from '../svg-icons/SvgIcon';
import { Label } from '../typography/Typography';
import clsxm from '../utils/clsxm';
import { validityStyle } from '../utils/constants';

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
   

    let computedIcon: IconName | undefined = icon;

    if (!units && validity === 'valid') {
      computedIcon = 'Check';
    }

    if (!units && validity === 'invalid') {
      computedIcon = 'Cross';
    }

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
            className={clsxm(
              'peer/input',
              'inline-flex w-full items-center justify-center rounded px-3 py-2',
              'bg-gray-100 font-medium text-gray-800',
              'placeholder:font-normal',
              'border-[1px] border-gray-500',
              'focus:outline-none focus-visible:border-orange-400',
              validity && validityStyle[validity].input,
              'transition-colors duration-75',
              'disabled:cursor-not-allowed disabled:border-gray-500 disabled:bg-gray-400 disabled:placeholder:font-medium disabled:placeholder:text-gray-800',
            )}
            {...rest}
          />
          <button
            type="button"
            className={clsxm(
              'text-gray-500 fill-gray-500',
              'peer-focus/input:text-orange-400 peer-focus/input:fill-orange-400',
              `absolute inset-y-0 right-0 flex items-center pr-3 text-sm`,
              !onClickRightElement && 'hover:cursor-default'
            )}
            onClick={onClickRightElement}
          >
            {computedIcon && (
              <SvgIcon
                name={computedIcon}
                className={clsxm(
                  'h-4 w-4 fill-inherit text-inherit',
                  validity && validityStyle[validity].icon,
                )}
              />
            )}
            {units && (
              <span
                className={clsxm(
                  'text-inherit',
                  validity && validityStyle[validity].units
                )}
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
