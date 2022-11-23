import { Listbox, Transition } from '@headlessui/react';
import React, { Fragment, ReactNode } from 'react';

import { IconName, SvgIcon } from '../svg-icons/SvgIcon';
import { Label, Typography } from '../typography/Typography';
import clsxm from '../utils/clsxm';
import { validityStyle } from '../utils/constants';

export interface SelectValue {
  label: string;
}
export type SelectOptionProps<T extends SelectValue> = {
  value: T;
  icon?: IconName;
  children: (args: {
    active: boolean;
    selected: boolean;
    disabled: boolean;
  }) => ReactNode;
};

export const SelectOption = <T extends SelectValue>({
  value,
  icon,
  children,
}: SelectOptionProps<T>) => (
  <Listbox.Option
    className="flex cursor-pointer select-none items-center justify-between py-2 pl-3 pr-4 hover:bg-gray-100"
    value={value}
  >
    {args => (
      <>
        <span
          className={`flex items-center truncate ${
            args.selected ? 'font-medium' : 'font-normal'
          }`}
        >
          {icon && (
            <span className="mr-3 flex w-4 items-center justify-center">
              <SvgIcon name={icon} className="h-[14px]" />
            </span>
          )}
          <Typography variant="body">{children(args)}</Typography>
        </span>
        {args.selected && (
          <SvgIcon name="Check" className="w-4 text-green-400" />
        )}
      </>
    )}
  </Listbox.Option>
);

export type SelectProps<Value extends SelectValue> = {
  label?: string;
  placeholder: string;
  name?: string;
  defaultValue?: Value;
  value?: Value;
  validity?: 'valid' | 'invalid';
  onChange?: (value: Value) => void;
  isRequired?: boolean;
  wrapperClassName?: string;
  compareValueBy?: string;
  children: ReactNode;
} & Omit<React.ComponentPropsWithRef<'select'>, 'onChange' | 'value'>;

const SelectInner = <T extends SelectValue>(
  {
    label,
    name,
    placeholder,
    value,
    onChange,
    defaultValue,
    isRequired,
    wrapperClassName,
    validity,
    children,
    compareValueBy,
    ...rest
  }: SelectProps<T>,
  ref: React.ForwardedRef<HTMLSelectElement>,
) => (
  <div className={wrapperClassName}>
    <Label className={validity && validityStyle[validity].label}>
      {label}
      <span>{isRequired && '*'}</span>
    </Label>
    <Listbox
      value={value}
      onChange={onChange}
      name={name}
      defaultValue={defaultValue}
      ref={ref}
      by={compareValueBy}
      {...rest}
    >
      {({ open, value }) => (
        <div className={clsxm('relative mt-1')}>
          <Listbox.Button
            className={clsxm(
              'w-full py-2 pl-3 pr-4',
              'rounded-md border text-left',
              'cursor-pointer',
              'flex items-center justify-between',
              'transition-all',
              open
                ? 'border-orange-400 bg-white'
                : 'border-gray-500 bg-gray-100',
              validity && validityStyle[validity].input,
            )}
          >
            <Typography variant="body" weight="medium">
              {value?.label || placeholder}
            </Typography>
            <SvgIcon
              name="ChevronDown"
              className={clsxm(
                'ml-4 w-3 transition-all',
                validity && validityStyle[validity].icon,
                open && 'rotate-180',
              )}
            />
          </Listbox.Button>
          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              static
              className={clsxm(
                'absolute overflow-auto',
                'z-10 mt-1 max-h-44 w-full py-3',
                'drop-shadow-large rounded-md bg-white',
              )}
            >
              {children}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  </div>
);

export const Select = React.forwardRef(SelectInner) as <T extends SelectValue>(
  props: SelectProps<T> & { ref?: React.ForwardedRef<HTMLSelectElement> },
) => ReturnType<typeof SelectInner>;
