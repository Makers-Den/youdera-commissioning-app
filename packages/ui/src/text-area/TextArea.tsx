import * as React from 'react';

import { IconName } from '../svg-icons/SvgIcon';
import { Label } from '../typography/Typography';
import clsxm from '../utils/clsxm';
import { validityStyle } from '../utils/constants';

export type TextAreaProps = {
  label?: string;
  value?: string;
  placeholder?: string;
  icon?: IconName;
  units?: string;
  validity?: 'valid' | 'invalid';
  isRequired?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClickRightElement?: () => void;
} & React.ComponentPropsWithRef<'textarea'>;

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
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
        <textarea
          disabled={disabled}
          value={value}
          onChange={onChange}
          ref={ref}
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
            'h-60 resize-none',
          )}
          {...rest}
          data-cy={label?.toLowerCase().replace(' ', '-') || 'textarea'}
        />
      </div>
    </div>
  ),
);
