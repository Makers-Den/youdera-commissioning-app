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
    'bg-brand-one-400 text-white',
    'border border-brand-one-400',
    'filter',
    'data-[size=md]:drop-shadow-medium',
    'data-[loading=false]:hover:drop-shadow-small',
    'data-[loading=false]:enabled:active:bg-brand-one-600',
  ],
  'main-green': [
    'bg-brand-two-400 text-white',
    'border border-brand-two-400',
    'filter',
    'data-[size=md]:drop-shadow-medium',
    'data-[loading=false]:hover:drop-shadow-small',
    'data-[loading=false]:enabled:active:bg-brand-two-600',
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
    'bg-danger-400 text-white',
    'border border-danger-400',
    'filter drop-shadow-medium',
    'data-[loading=false]:hover:drop-shadow-small',
    'data-[loading=false]:enabled:active:bg-danger-600 data-[loading=false]:active:border-danger-600',
  ],
};

export enum ButtonSize {
  'sm',
  'md',
}

export const buttonSizeStyles: {
  [key in keyof typeof ButtonSize]: string[];
} = {
  sm: ['text-xs leading-[10px] mb-[-1px] px-4 h-[28px]'],
  md: ['text-sm px-4 h-[40px]'],
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
          'rounded-button inline-flex items-center justify-center',
          'font-black tracking-[1px]',
          'focus-visible:ring-primary-500 focus:outline-none focus-visible:ring',
          'transition-colors duration-150',
          'transition-[filter] will-change-[filter]',
          'antialiased',
          buttonSizeStyles[size],
          buttonVariantStyles[variant],
          'disabled:cursor-not-allowed disabled:border-0 disabled:bg-gray-300 disabled:text-gray-500 disabled:drop-shadow-none',
          isLoading &&
            `text is-loading relative cursor-wait text-transparent transition-none hover:text-transparent`,
          className,
        )}
        {...rest}
      >
        <div className="flex items-center uppercase">
          {icon && <SvgIcon name={icon} className="h-6" />}
          {icon && children && <div className="pr-2" />}
          {children}
        </div>
      </button>
    );
  },
);
