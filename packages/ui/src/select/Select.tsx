import { Listbox, Transition } from '@headlessui/react';
import React, { Fragment, ReactNode } from 'react';

import { SvgIcon } from '../svg-icons/SvgIcon';
import { Label, Typography } from '../typography/Typography';
import clsxm from '../utils/clsxm';
import { validityStyle } from '../utils/constants';

export type SelectOption = {
  key: string;
  label: ReactNode;
};

export type SelectProps = {
  label?: string;
  placeholder: string;
  name?: string;
  options: SelectOption[];
  defaultValue?: SelectOption;
  value?: SelectOption;
  validity?: 'valid' | 'invalid';
  onChange?: (value: SelectOption) => void;
  isRequired?: boolean;
  wrapperClassName?: string;
} & React.ComponentPropsWithRef<'select'>;;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>((
  {
    label,
    name,
    placeholder,
    value,
    onChange,
    options,
    defaultValue,
    isRequired,
    wrapperClassName,
    validity,
    ...rest
  },
  ref
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
      by="key"
      ref={ref}
      {...rest}
    >
      {({ open }) => (
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
              validity && validityStyle[validity].input
            )}
          >
            {({ value }) => (
              <>
                <Typography variant="body" weight='medium'>
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
              </>
            )}
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
                'mt-1 max-h-44 w-full py-3 z-10',
                'drop-shadow-large rounded-md bg-white',
              )}
            >
              {options.map(option => {
                const { key, label } = option;
                return (
                  <Listbox.Option
                    key={key}
                    className="flex cursor-pointer select-none items-center justify-between py-2 pl-3 pr-4 hover:bg-gray-100"
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <Typography variant="body">{label}</Typography>
                        {selected && (
                          <SvgIcon
                            name="Check"
                            className="w-4 text-green-400"
                          />
                        )}
                      </>
                    )}
                  </Listbox.Option>
                );
              })}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  </div>
)
);