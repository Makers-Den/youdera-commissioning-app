import { Combobox, Transition } from '@headlessui/react';
import React, { FocusEvent, Fragment, useEffect, useState } from 'react';

import { Action, Idle, useAsync } from '../hooks/useAsync';
import LoadingIcon from '../loading-icon/LoadingIcon';
import { IconName, SvgIcon } from '../svg-icons/SvgIcon';
import { Label } from '../typography/Typography';
import clsxm from '../utils/clsxm';
import { validityStyle } from '../utils/constants';

export type AsyncAutoCompleteSelectOption<T = undefined> = {
  key: string;
  label: string;
  icon?: IconName;
  value?: T;
};

export type AsyncAutoCompleteSelectProps = {
  label: string;
  placeholder: string;
  fetchOptions: (query: string) => Promise<AsyncAutoCompleteSelectOption[]>;
  noOptionsString: string;
  errorString: string;
  idleText?: string;
  className?: string;
  value?: AsyncAutoCompleteSelectOption | undefined;
  initialOptions?: AsyncAutoCompleteSelectOption[];
  validity?: 'invalid' | 'valid';
  isRequired?: boolean;
  onChange?: (value: AsyncAutoCompleteSelectOption | undefined) => void;
} & Omit<React.ComponentPropsWithRef<'input'>, 'value' | 'onChange'>;

export const AsyncAutoCompleteSelect = React.forwardRef<
  HTMLInputElement,
  AsyncAutoCompleteSelectProps
>(
  (
    {
      label,
      value,
      onChange,
      placeholder,
      fetchOptions,
      className,
      validity,
      isRequired,
      noOptionsString = 'Nothing found.',
      initialOptions = [],
      errorString,
      idleText,
      ...rest
    },
    ref,
  ) => {
    const [query, setQuery] = useState('');

    const {
      data: filteredOptions,
      runAsync,
      status,
    } = useAsync<AsyncAutoCompleteSelectOption[]>(initialOptions || []);

    useEffect(() => {
      const timeout = setTimeout(() => {
        if (query.length > 3) {
          runAsync(fetchOptions(query));
        }
      }, 500);

      return () => clearTimeout(timeout);
    }, [fetchOptions, query, runAsync]);

    return (
      <div className={className}>
        <Label className={validity && validityStyle[validity].label}>
          {label}
          <span>{isRequired && '*'}</span>
        </Label>
        <Combobox value={value} onChange={onChange}>
          {({ open }) => (
            <div className="relative mt-1">
              <div>
                {/* Hack to improve bad UX of Headless UI,
                 * https://github.com/tailwindlabs/headlessui/discussions/1236#discussioncomment-2970969 */}
                <Combobox.Button as="div">
                  <Combobox.Input
                    className={clsxm(
                      'inline-flex items-center justify-center rounded-md px-3 py-2',
                      'bg-gray-100 font-medium text-gray-800',
                      'placeholder:font-normal',
                      'border-[1px] border-gray-500',
                      'focus-visible:border-brand-one-400 focus:outline-none focus-visible:bg-white',
                      'transition-colors duration-75',
                      'w-full',
                      'disabled:cursor-not-allowed disabled:border-gray-500 disabled:bg-gray-400 disabled:placeholder:font-medium disabled:placeholder:text-gray-800',
                      validity && validityStyle[validity].input,
                    )}
                    // @ts-ignore
                    displayValue={(option: AsyncAutoCompleteSelectOption) =>
                      option?.label
                    }
                    placeholder={placeholder}
                    onChange={event => setQuery(event.target.value)}
                    onFocus={(e: FocusEvent<HTMLInputElement>) => {
                      e.target.select();
                    }}
                    ref={ref}
                    data-cy={
                      label?.toLowerCase().replace(' ', '-') ||
                      'autocomplete-input'
                    }
                    {...rest}
                  />
                </Combobox.Button>

                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <SvgIcon
                    name="ChevronDown"
                    className={clsxm(
                      'ml-4 w-3 transition-all',
                      open && 'rotate-180',
                      validity && validityStyle[validity].icon,
                    )}
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery('')}
              >
                <Combobox.Options
                  static
                  className={clsxm(
                    'absolute overflow-auto',
                    'z-10 mt-1 max-h-44 w-full py-2',
                    'drop-shadow-large rounded-md bg-white',
                  )}
                >
                  {Idle.idle === status && (
                    <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                      {idleText}
                    </div>
                  )}
                  {Action.pending === status && (
                    <div className="relative h-16 w-full">
                      <LoadingIcon color="darkGray" />
                    </div>
                  )}
                  {Action.rejected === status && (
                    <div className="text-danger-400 relative cursor-default select-none px-4 py-2">
                      {errorString}
                    </div>
                  )}
                  {Action.resolved === status && (
                    <div>
                      {filteredOptions?.length === 0 && query !== '' ? (
                        <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                          {noOptionsString}
                        </div>
                      ) : (
                        filteredOptions?.map(option => (
                          <Combobox.Option
                            key={option.key}
                            value={option}
                            className={({ active }) =>
                              clsxm(
                                'flex items-center justify-between py-2 pl-4 pr-4',
                                'cursor-pointer select-none hover:bg-gray-100',
                                active && 'bg-gray-100',
                              )
                            }
                            data-cy={
                              `${label
                                ?.toLowerCase()
                                .replace(' ', '-')}-option` ||
                              'autocomplete-option'
                            }
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={`flex items-center truncate ${
                                    selected ? 'font-medium' : 'font-normal'
                                  }`}
                                >
                                  {option.icon && (
                                    <span className="mr-3 flex w-4 items-center justify-center">
                                      <SvgIcon
                                        name={option.icon}
                                        className="h-[14px]"
                                      />
                                    </span>
                                  )}
                                  {option.label}
                                </span>
                                {selected && (
                                  <span
                                    className={`flex items-center pl-3 ${
                                      active ? 'text-white' : 'text-teal-600'
                                    }`}
                                  >
                                    <SvgIcon
                                      name="Check"
                                      className="text-brand-two-400 w-4"
                                    />
                                  </span>
                                )}
                              </>
                            )}
                          </Combobox.Option>
                        ))
                      )}
                    </div>
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          )}
        </Combobox>
      </div>
    );
  },
);
