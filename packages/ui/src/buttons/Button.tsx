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
    'bg-orange text-white',
    'border border-orange',
    'filter drop-shadow-medium',
    'hover:drop-shadow-small hover:',
    'active:bg-orange-secondary',
  ],
  'main-green': [
    'bg-green text-white',
    'border border-green',
    'filter drop-shadow-medium',
    'hover:drop-shadow-small',
    'active:bg-green-secondary',
  ],
  'main-gray': [
    'bg-darkGray text-white',
    'border border-darkGray',
    'filter drop-shadow-medium',
    'hover:drop-shadow-small',
    'active:bg-darkGray-secondary',
  ],
  'additional-gray': [
    'bg-gray text-darkGray',
    'border border-gray',
    'hover:bg-gray-secondary hover:border-gray-secondary',
    'active:bg-[#CDD2E0] active:border-[#CDD2E0]',
  ],
  'additional-white': [
    'bg-white-secondary text-darkGray',
    'border-2 border-[#C0C9DF]',
    'hover:bg-darkGray hover:text-white hover:border-darkGray',
    'active:bg-darkGray-secondary active:border-darkGray-secondary',
  ],
  danger: [
    'bg-pink text-white',
    'border border-orange',
    'filter drop-shadow-medium',
    'hover:drop-shadow-small',
    'active:bg-pink-secondary',
  ],
};

type ButtonProps = {
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
    const disabled = isLoading || buttonDisabled;

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
          'disabled:cursor-not-allowed',
          isLoading &&
            `relative text-transparent text  transition-none hover:text-transparent disabled:cursor-wait`,
          className,
        )}
        {...rest}
      >
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
      </button>
    );
  },
);
