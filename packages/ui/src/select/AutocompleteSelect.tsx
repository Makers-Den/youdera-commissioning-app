import { Combobox, Transition } from '@headlessui/react';
import { Fragment, ReactNode, useState } from 'react';

import { SvgIcon } from '../svg-icons/SvgIcon';
import { Label } from '../typography/Typography';
import clsxm from '../utils/clsxm';

const people = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' },
];

export type AutocompleteSelectOption = {
  key: string;
  label: ReactNode;
};

export type AutocompleteSelectProps = {
  label: string;
  placeholder: string;
  options: AutocompleteSelectOption[];
  value?: string;
  defaultValue?: AutocompleteSelectOption;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.ComponentPropsWithRef<'input'>;

export const AutocompleteSelect = ({
  label,
  value,
  placeholder,
  defaultValue,
}: AutocompleteSelectProps) => {
  const [selected, setSelected] = useState(people[0]);
  const [query, setQuery] = useState('');

  const filteredPeople =
    query === ''
      ? people
      : people.filter(person =>
        person.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, '')),
      );

  return (
    <div>
      <Label>
        {label}
      </Label>
      <Combobox
        value={selected}
        onChange={setSelected}
      >
        {({ open }) => (
          <div className="relative mt-1">
            <div className="">
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
                )}
                displayValue={person => person?.name}
                onChange={event => setQuery(event.target.value)}
              />

              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-4">
                <SvgIcon
                  name="ChevronDown"
                  className={clsxm(
                    'ml-4 w-3 transition-all',
                    open && 'rotate-180',
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
                  'mt-1 max-h-44 w-full py-2',
                  'rounded-md bg-white drop-shadow-large',
                )}>
                {filteredPeople.length === 0 && query !== '' ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredPeople.map(person => (
                    <Combobox.Option
                      key={person.id}
                      className='cursor-pointer select-none py-2 pl-4 pr-4 flex justify-between items-center hover:bg-gray-100'
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                              }`}
                          >
                            {person.name}
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
      </Combobox >
    </div >
  );
};
