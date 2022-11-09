import { Listbox, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

import { SvgIcon } from '../svg-icons/SvgIcon';
import { Typography } from '../typography/Typography';
import clsxm from '../utils/clsxm';

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
};

const validityStyle = {
  valid: {
    icon: 'fill-green-400',
    input: 'focus-visible:ring-0 border-green-400',
  },
  invalid: {
    icon: 'fill-red-400',
    input: 'focus-visible:ring-0 border-red-400',
  },
};

export function Select({
  label,
  name,
  placeholder,
  value,
  onChange,
  options,
  defaultValue,
  isRequired,
  wrapperClassName,
  validity
}: SelectProps) {
  return (
    <div className={wrapperClassName}>
      <Typography variant="label">
        {label}
        <span className="text-green-400">{isRequired && '*'}</span>
      </Typography>
      <Listbox
        value={value}
        onChange={onChange}
        name={name}
        defaultValue={defaultValue}
        by="key"
      >
        {({ open }) => (
          <div className={clsxm('relative z-10')}>
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
                  'mt-1 max-h-44 w-full py-3',
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
  );
}
