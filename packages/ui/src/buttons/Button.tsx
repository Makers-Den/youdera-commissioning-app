import * as React from 'react';
// import { ImSpinner2 } from 'react-icons/im';
import LoadingIcon from '../loadingIcon/LoadingIcon'
import clsxm from '../../lib/clsxm';

export enum ButtonVariant {
  'main-orange',
  'main-green',
  'main-gray',
  'additional-gray',
  'additional-white',
  'danger'
}

export const buttonVariantStyles: {
  [key in keyof typeof ButtonVariant]: string[];
} = {
  'main-orange': [
    'bg-orange text-white',
    'border border-orange',
    'filter drop-shadow-button',
    'hover:drop-shadow-buttonOnAction',
    'active:bg-orange-secondary',
  ],
  'main-green': [
    'bg-green text-white',
    'border border-green',
    'filter drop-shadow-button',
    'hover:drop-shadow-buttonOnAction',
    'active:bg-green-secondary',
  ],
  'main-gray': [
    'bg-darkGray text-white',
    'border border-darkGray',
    'filter drop-shadow-button',
    'hover:drop-shadow-buttonOnAction',
    'active:bg-darkGray-secondary',
  ],
  'additional-gray': [
    'bg-gray text-darkGray',
    'border border-gray',
    'hover:bg-gray-secondary',
    'active:bg-[#CDD2E0]',
  ],
  'additional-white': [
    'bg-white-secondary text-darkGray',
    'border-2 border-[#C0C9DF]',
    'hover:bg-darkGray',
    'active:bg-darkGray-secondary',
  ],
  'danger': [
    'bg-pink text-white',
    'border border-orange',
    'filter drop-shadow-button',
    'hover:drop-shadow-buttonOnAction',
    'active:bg-pink-secondary',
  ]
};

type ButtonProps = {
  isLoading?: boolean;
  icon?: SVGElement
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
    ref
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
        className={clsxm(
          'inline-flex items-center rounded px-4 py-2 font-semibold',
          'focus:outline-none focus-visible:ring focus-visible:ring-primary-500',
          'transition-colors duration-75',
          buttonVariantStyles[variant],
          'disabled:cursor-not-allowed',
          isLoading &&
          'relative text-transparent transition-none hover:text-transparent disabled:cursor-wait',
          className
        )}
        {...rest}
      >
        {icon && icon}
        {isLoading && (
          <div
            className={clsxm(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
              {
                'text-white': ['primary', 'dark'].includes(variant),
                'text-black': ['light'].includes(variant),
                'text-primary-500': ['outline', 'ghost'].includes(variant),
              }
            )}
          >
            <LoadingIcon color={['additional-white', 'additional-gray'].includes(variant) ? 'darkGray' : 'white'} />
          </div>
        )}
        {children}
      </button>
    );
  }
);
