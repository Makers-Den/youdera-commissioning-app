import * as React from 'react';

import { IconName, SvgIcon } from '../svg-icons/SvgIcon';
import clsxm from '../utils/clsxm';

export enum ButtonVariant {
  'main-orange',
  'main-green',
  'main-gray',
  'additional-gray',
  'additional-white',
  'danger',
}

export const buttonVariantStyles: {
  [key in keyof typeof ButtonVariant]: string[];
} = {
  'main-orange': [
    'bg-orange-400 text-white',
    'border border-orange-400',
    'filter',
    'data-[size=md]:drop-shadow-medium',
    'data-[loading=false]:hover:drop-shadow-small',
    'data-[loading=false]:enabled:active:bg-orange-600',
  ],
  'main-green': [
    'bg-green-400 text-white',
    'border border-green-400',
    'filter',
    'data-[size=md]:drop-shadow-medium',
    'data-[loading=false]:hover:drop-shadow-small',
    'data-[loading=false]:enabled:active:bg-green-600',
  ],
  'main-gray': [
    'bg-gray-600 text-white',
    'border border-gray-600',
    'filter drop-shadow-medium',
    'data-[loading=false]:hover:drop-shadow-small',
    'data-[loading=false]:enabled:active:bg-gray-700',
  ],
  'additional-gray': [
    'bg-gray-300 text-gray-600',
    'border border-gray-300',
    'data-[loading=false]:hover:bg-gray-400 data-[loading=false]:hover:border-gray-400',
    'data-[loading=false]:enabled:active:bg-[#CDD2E0] data-[loading=false]:active:border-[#CDD2E0]',
  ],
  'additional-white': [
    'bg-gray-100 text-gray-600',
    'border border-gray-500',
    'data-[loading=false]:hover:bg-gray-600 data-[loading=false]:hover:text-white data-[loading=false]:hover:border-gray-600',
    'data-[loading=false]:enabled:active:bg-gray-700 data-[loading=false]:active:text-white data-[loading=false]:active:border-gray-700',
  ],
  danger: [
    'bg-red-400 text-white',
    'border border-red-400',
    'filter drop-shadow-medium',
    'data-[loading=false]:hover:drop-shadow-small',
    'data-[loading=false]:enabled:active:bg-red-600 data-[loading=false]:active:border-red-600',
  ],
};

export enum ButtonSize {
  'sm',
  'md'
};

export const buttonSizeStyles: {
  [key in keyof typeof ButtonSize]: string[];
} = {
  'sm': ['text-xs leading-[10px] mb-[-1px] px-4 h-[28px]'],
  'md': ['text-sm px-4 h-[40px]']
};

export type ButtonProps = {
  isLoading?: boolean;
  icon?: IconName;
  size?: keyof typeof ButtonSize;
  variant?: keyof typeof ButtonVariant;
} & React.ComponentPropsWithRef<'button'>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading = false,
      icon,
      variant = 'main-orange',
      size = 'md',
      ...rest
    },
    ref,
  ) => {
    const disabled = buttonDisabled && !isLoading;

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        data-loading={isLoading}
        data-size={size}
        className={clsxm(
          'inline-flex items-center justify-center rounded',
          'tracking-[1px] font-black',
          'focus:outline-none focus-visible:ring focus-visible:ring-primary-500',
          'transition-colors duration-150',
          'transition-[filter] will-change-[filter]',
          'antialiased',
          buttonSizeStyles[size],
          buttonVariantStyles[variant],
          'disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:border-0 disabled:drop-shadow-none',
          isLoading &&
          `relative text-transparent text transition-none hover:text-transparent cursor-wait is-loading`,
          className,
        )}
        {...rest}
      >
        <div className="flex items-center uppercase">
          {icon && <SvgIcon name={icon} className='h-6' />}
          {icon && children && <div className="pr-2" />}
          {children}
        </div>
      </button>
    );
  },
);
