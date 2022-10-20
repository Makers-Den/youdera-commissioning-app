import * as React from 'react';
import clsxm from '../../lib/clsxm';
import { BodyText } from '../typography/Typography';
import { Combobox } from '@headlessui/react';
import { SvgIcon, IconName } from '../svg-icons/SvgIcon';

type InputProps = {
  label: string;
  placeholder?: string;
  disabled?: boolean;
  icon?: IconName;
  units?: string;
  valid?: boolean;
  invalid?: boolean;
} & React.ComponentPropsWithRef<'input'>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      children,
      className,
      label,
      disabled,
      valid,
      invalid,
      icon,
      units,
      placeholder,
      ...rest
    },
    ref,
  ) => {
    const [rightElementColor, setRightElementColor] = React.useState<string>(
      'text-gray-secondary fill-gray-secondary',
    );
    const handleRightColorChange = (color: string) => {
      setRightElementColor(color);
    };
    return (
      <div>
        <BodyText className="mb-2 text-darkGray-secondary text-sm">
          {label}
        </BodyText>
        <div className="relative">
          <Combobox>
            <Combobox.Input
              onChange={() => console.log('works')}
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
                className,
              )}
              {...rest}
            />
            <Combobox.Button className={`absolute inset-y-0 right-0 flex items-center pr-2 text-sm text-darkGray-secondary ${rightElementColor}`}>
              {icon && <SvgIcon name={icon} className='fill-inherit' />}
              {units && units}
            </Combobox.Button>
          </Combobox>
        </div>
      </div>
    );
  },
);
