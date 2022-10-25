import * as React from 'react';
// import { ImSpinner2 } from 'react-icons/im';
import LoadingIcon from '../loading-icon/LoadingIcon';
import clsxm from '../../lib/clsxm';

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
    'filter drop-shadow-medium',
    'hover:drop-shadow-small hover:',
    'active:bg-orange-600',
  ],
  'main-green': [
    'bg-green-400 text-white',
    'border border-green-400',
    'filter drop-shadow-medium',
    'hover:drop-shadow-small',
    'active:bg-green-600',
  ],
  'main-gray': [
    'bg-gray-600 text-white',
    'border border-gray-600',
    'filter drop-shadow-medium',
    'hover:drop-shadow-small',
    'active:bg-gray-700',
  ],
  'additional-gray': [
    'bg-gray-300 text-gray-600',
    'border border-gray-300',
    'hover:bg-gray-400 hover:border-gray-400',
    'active:bg-[#CDD2E0] active:border-[#CDD2E0]',
  ],
  'additional-white': [
    'bg-gray-100 text-gray-600',
    'border border-gray-500',
    'hover:bg-gray-600 hover:text-white hover:border-gray-600',
    'active:bg-gray-700 active:text-white active:border-gray-700',
  ],
  'danger': [
    'bg-red-400 text-white',
    'border border-red-400',
    'filter drop-shadow-medium',
    'hover:drop-shadow-small',
    'active:bg-red-600 active:border-red-600',
  ],
};

export type ButtonProps = {
  isLoading?: boolean;
  icon?: SVGElement;
  variant?: keyof typeof ButtonVariant;
} & React.ComponentPropsWithRef<'button'>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      icon,
      variant = 'main-orange',
      ...rest
    },
    ref,
  ) => {
    const disabled = buttonDisabled && !isLoading
    const disablePseudoClasses = () =>
      buttonVariantStyles[variant]
        .filter(s => !s.includes('hover'))
        .filter(s => !s.includes('active'));

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={clsxm(
          'inline-flex items-center justify-center rounded px-4 h-[40px] font-semibold',
          'focus:outline-none focus-visible:ring focus-visible:ring-primary-500',
          'transition-colors duration-150',
          'transition-[filter] will-change-[filter]',
          isLoading ? disablePseudoClasses() : buttonVariantStyles[variant],
          'disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:border-0 disabled:drop-shadow-none',
          isLoading &&
          `relative text-transparent text  transition-none hover:text-transparent disabled:cursor-wait`,
          className,
        )}
        {...rest}
      >
        <>
          {isLoading && (
            <LoadingIcon
              color={
                ['additional-white', 'additional-gray'].includes(variant)
                  ? 'darkGray'
                  : 'white'
              }
            />
          )}
          {children}
          {icon && icon}
        </>
      </button>
    );
  },
);
