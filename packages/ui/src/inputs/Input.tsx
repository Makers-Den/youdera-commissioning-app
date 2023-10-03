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
  ) => (
    <div className={clsxm('group', className)} data-validity={validity}>
      {label && (
        <Label className={validity && validityStyle[validity].label}>
          {label}
          {isRequired && '*'}
        </Label>
      )}
      <div className="relative mt-1 w-full">
        <input
          disabled={disabled}
          value={value}
          onChange={onChange}
          ref={ref}
          type="input"
          placeholder={placeholder}
          className={clsxm(
            'inline-flex w-full items-center justify-center rounded px-3 py-2',
            'bg-gray-100 font-medium text-gray-800',
            'placeholder:font-normal',
            'border-[1px] border-gray-500',
            'focus-visible:border-brand-one-400 focus:outline-none',
            validity && validityStyle[validity].input,
            'transition-colors duration-75',
            'disabled:cursor-not-allowed disabled:border-gray-500 disabled:bg-gray-400 disabled:placeholder:font-medium disabled:placeholder:text-gray-800',
          )}
          {...rest}
          data-cy={label?.toLowerCase().replace(' ', '-') || 'input'}
        />
        <button
          tabIndex={-1}
          type="button"
          className={clsxm(
            'fill-gray-500 text-gray-500',
            'group-data-[validity=valid]:text-brand-two-400 group-data-[validity=valid]:fill-brand-two-400',
            'group-data-[validity=invalid]:text-danger-400 group-data-[validity=invalid]:fill-danger-400',
            'group-focus-within:!fill-brand-one-400 group-focus-within:!text-brand-one-400',
            `absolute inset-y-0 right-0 flex items-center pr-3 text-sm`,
            !onClickRightElement && 'hover:cursor-default',
          )}
          onClick={onClickRightElement}
        >
          {icon && !units && (
            <SvgIcon
              name={icon}
              className={clsxm(
                'h-4 w-4 fill-inherit text-inherit',
                'group-data-[validity=invalid]:hidden group-data-[validity=valid]:hidden',
                'group-focus-within:!block',
              )}
            />
          )}
          {validity && !units && (
            <SvgIcon
              name={validity === 'valid' ? 'Check' : 'Cross'}
              className={clsxm(
                'h-4 w-4 fill-inherit text-inherit',
                'group-focus-within:hidden',
              )}
            />
          )}
          {units && <span className="text-inherit">{units}</span>}
        </button>
      </div>
    </div>
  ),
);
