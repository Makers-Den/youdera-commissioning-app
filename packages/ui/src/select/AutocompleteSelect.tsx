import { Combobox, Transition } from '@headlessui/react';
import { FocusEvent, Fragment, useState } from 'react';

import { IconName, SvgIcon } from '../svg-icons/SvgIcon';
import { Label } from '../typography/Typography';
import clsxm from '../utils/clsxm';
import { validityStyle } from '../utils/constants';

export type AutocompleteSelectOption = {
  key: string;
  label: string;
  icon?: IconName;
};

export type AutocompleteSelectAction = {
  label: string;
  icon?: IconName;
  onClick: () => void;
};

export type AutocompleteSelectProps = {
  label: string;
  placeholder: string;
  options: AutocompleteSelectOption[];
  noOptionsString: string;
  className?: string;
  value?: AutocompleteSelectOption | undefined;
  validity?: 'invalid' | 'valid';
  action?: AutocompleteSelectAction;
  isRequired?: boolean;
  onChange?: (value: AutocompleteSelectOption | undefined) => void
} & Omit<React.ComponentPropsWithRef<'input'>, 'value' | 'onChange'>;

export const AutocompleteSelect = ({
  label,
  value,
  onChange,
  placeholder,
  options,
  className,
  action,
  validity,
  isRequired,
  noOptionsString = 'Nothing found.',
  ...rest
}: AutocompleteSelectProps) => {
  const [query, setQuery] = useState('');

  const filteredOptions =
    query === ''
      ? options
      : options.filter(option =>
        option.label
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, '')),
      );

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
              <Combobox.Button as='div'>
                <Combobox.Input
                  className={clsxm(
                    'inline-flex items-center justify-center rounded-md px-3 py-2',
                    'bg-gray-100 font-medium text-gray-800',
                    'placeholder:font-normal',
                    'border-[1px] border-gray-500',
                    'focus:outline-none focus-visible:border-orange-400 focus-visible:bg-white',
                    'transition-colors duration-75',
                    'w-full',
                    'disabled:cursor-not-allowed disabled:border-gray-500 disabled:bg-gray-400 disabled:placeholder:font-medium disabled:placeholder:text-gray-800',
                    validity && validityStyle[validity].input,
                  )}
                  displayValue={(option: AutocompleteSelectOption) => option?.label}
                  placeholder={placeholder}
                  onChange={event => setQuery(event.target.value)}
                  {...rest}
                  onFocus={(e: FocusEvent<HTMLInputElement>) => {
                    e.target.select();
                  }}
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
                  'mt-1 max-h-44 w-full py-2 z-10',
                  'drop-shadow-large rounded-md bg-white',
                )}
              >
                {action && (
                  // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
                  <div
                    className="flex cursor-pointer select-none items-center py-2 pl-4 pr-4 font-medium hover:bg-gray-100"
                    onClick={action.onClick}
                  >
                    {action.icon && (
                      <SvgIcon name={action.icon} className="mr-3 h-[14px]" />
                    )}
                    {action.label}
                  </div>
                )}
                {filteredOptions.length === 0 && query !== '' ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    {noOptionsString}
                  </div>
                ) : (
                  filteredOptions.map(option => (
                    <Combobox.Option
                      key={option.label}
                      value={option}
                      className={({ active }) =>
                        clsxm(
                          'flex items-center justify-between py-2 pl-4 pr-4',
                          'cursor-pointer select-none hover:bg-gray-100',
                          active && 'bg-gray-100',
                        )
                      }
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`flex items-center truncate ${selected ? 'font-medium' : 'font-normal'
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
                          {selected ? (
                            <span
                              className={`flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                }`}
                            >
                              <SvgIcon
                                name="Check"
                                className="w-4 text-green-400"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        )}
      </Combobox>
    </div>
  );
};
