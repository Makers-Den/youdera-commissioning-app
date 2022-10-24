import * as React from 'react';
import clsxm from '../../lib/clsxm';
import { BodyText } from '../typography/Typography';
import { Combobox } from '@headlessui/react';
import { SvgIcon, IconName } from '../svg-icons/SvgIcon';

export type InputProps = {
  label: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
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
    icon: 'fill-green h-4 w-4',
    units: 'text-green',
    input: 'focus-visible:ring-0 border-green'
  },
  invalid: {
    icon: 'fill-pink h-4 w-4',
    units: 'text-pink',
    input: 'focus-visible:ring-0 border-pink'
  }
}

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
      icon = !units ? (validity === 'valid' ? 'Check' : validity === 'invalid' ? 'Cross' : undefined) : undefined,
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
      'text-gray-secondary fill-gray-secondary',
    );

    const handleRightColorChange = (color: string) => {
      !validity && setRightElementColor(color);
    };

    return (
      <div className={className}>
        <BodyText className="mb-2 text-darkGray-secondary text-sm">
          {label}{mandatory && '*'}
        </BodyText>
        <div className="relative max-w-fit">
          <Combobox value={value} >
            <Combobox.Input
              onChange={onChange}
              ref={ref}
              type="input"
              placeholder={placeholder}
              disabled={disabled}
              onFocus={() => handleRightColorChange('text-orange fill-orange')}
              onBlur={() => handleRightColorChange('text-gray-secondary fill-gray-secondary')}
              className={clsxm(
                'inline-flex items-center justify-center rounded px-3 py-2',
                'font-medium text-darkGray-secondary',
                'placeholder:font-normal',
                'border-[1px] border-gray-secondary',
                'focus:outline-none focus-visible:ring-1 focus-visible:ring-orange',
                'transition-colors duration-75',
                'disabled:cursor-not-allowed',
                validity && validityStyle[validity].input,
                `w-${width}`
              )}
              {...rest}
            />
            <Combobox.Button
              className={`absolute inset-y-0 right-0 flex items-center pr-2 text-sm text-darkGray-secondary ${rightElementColor} ${!onClickRightElement ? 'hover:cursor-default' : ''}`}
              onClick={onClickRightElement}
            >
              {icon &&
                <SvgIcon
                  name={icon}
                  className={validity ? validityStyle[validity].icon : 'fill-inherit h-4 w-4'}
                />
              }
              {units &&
                <span className={validity ? validityStyle[validity].units : 'text-inherit'}>
                  {units}
                </span>
              }
            </Combobox.Button>
          </Combobox>
        </div>
      </div >
    );
  },
);
