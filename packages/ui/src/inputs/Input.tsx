import * as React from 'react';
import clsxm from '../../lib/clsxm';
import { BodyText } from '../typography/Typography';
import { Combobox } from '@headlessui/react';
import { SvgIcon, IconName } from '../svg-icons/SvgIcon';

export type InputProps = {
  label: string;
  value: string;
  placeholder?: string;
  icon?: IconName;
  units?: string;
  validity?: 'valid' | 'invalid';
  mandatory?: boolean;
  width?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickRightElement?: () => void;
} & React.ComponentPropsWithRef<'input'>;

const validityStyle = {
  valid: {
    icon: 'fill-green-400 h-4 w-4',
    units: 'text-green-400',
    input: 'focus-visible:ring-0 border-green-400',
  },
  invalid: {
    icon: 'fill-red-400 h-4 w-4',
    units: 'text-red-400',
    input: 'focus-visible:ring-0 border-red-400',
  },
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      children,
      className,
      value,
      label,
      disabled,
      validity,
      units,
      icon = !units
        ? validity === 'valid'
          ? 'Check'
          : validity === 'invalid'
          ? 'Cross'
          : undefined
        : undefined,
      placeholder,
      mandatory,
      width,
      onChange,
      onClickRightElement,
      ...rest
    },
    ref,
  ) => {
    const [rightElementColor, setRightElementColor] = React.useState<string>(
      'text-gray-600 fill-gray-500',
    );

    const handleRightColorChange = (color: string) => {
      !validity && setRightElementColor(color);
    };

    return (
      <div className={className}>
        <BodyText className="mb-2 text-gray-700 text-sm">
          {label}
          {mandatory && '*'}
        </BodyText>
        <div className="relative max-w-fit">
          <Combobox value={value} disabled={disabled}>
            <Combobox.Input
              onChange={onChange}
              ref={ref}
              type="input"
              placeholder={placeholder}
              onFocus={() =>
                handleRightColorChange('text-orange-400 fill-orange-400')
              }
              onBlur={() =>
                handleRightColorChange('text-gray-600 fill-gray-500')
              }
              className={clsxm(
                'inline-flex items-center justify-center rounded px-3 py-2',
                'font-medium text-gray-800 bg-gray-100',
                'placeholder:font-normal',
                'border-[1px] border-gray-400',
                'focus:outline-none focus-visible:ring-1 focus-visible:ring-orange-400',
                'transition-colors duration-75',
                validity && validityStyle[validity].input,
                'disabled:cursor-not-allowed disabled:bg-gray-400 disabled:border-gray-500 disabled:placeholder:text-gray-800 disabled:placeholder:font-medium',
                `w-${width}`,
              )}
              {...rest}
            />
            <Combobox.Button
              className={`absolute inset-y-0 right-0 flex items-center pr-2 text-sm ${rightElementColor} ${
                !onClickRightElement ? 'hover:cursor-default' : ''
              }`}
              onClick={onClickRightElement}
            >
              {icon && (
                <SvgIcon
                  name={icon}
                  className={
                    validity
                      ? validityStyle[validity].icon
                      : 'fill-inherit h-4 w-4'
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
            </Combobox.Button>
          </Combobox>
        </div>
      </div>
    );
  },
);
