import { Listbox, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import clsxm from '../../lib/clsxm';
import { SvgIcon } from '../svg-icons/SvgIcon';
import { Typography } from '../typography/Typography';

export type SelectOption<Value> = {
  key: string;
  label: ReactNode;
  value: Value;
};

export type SelectProps<Value> = {
  label: string;
  placeholder: string;
  name?: string;
  options: SelectOption<Value>[];
  defaultValue?: SelectOption<Value>;
  value?: SelectOption<Value>;
  onChange?: (value: SelectOption<Value>) => void;
  mandatory?: boolean;
  wrapperClassName?: string;
};

export function Select<Value>({
  label,
  name,
  placeholder,
  value,
  onChange,
  options,
  defaultValue,
  mandatory,
  wrapperClassName,
}: SelectProps<Value>) {
  return (
    <label>
      <Typography variant="label">
        {label}
        <span className="text-green-400">{mandatory && '*'}</span>
      </Typography>
      <Listbox
        value={value}
        onChange={onChange}
        name={name}
        defaultValue={defaultValue}
      >
        {({ open }) => (
          <div className={clsxm('relative mt-1', wrapperClassName)}>
            <Listbox.Button
              className={clsxm(
                'w-full py-2 pl-3 pr-4',
                'rounded-md text-left drop-shadow-large border',
                'cursor-pointer',
                'flex justify-between items-center',
                open
                  ? 'border-orange-400 bg-white'
                  : 'bg-gray-100 border-gray-500',
              )}
            >
              {({ value }) => {
                return (
                  <>
                    <Typography variant="body">
                      {value?.label || placeholder}
                    </Typography>
                    <SvgIcon
                      name="ChevronDown"
                      className={clsxm('w-3 ml-4', open && 'rotate-180')}
                    />
                  </>
                );
              }}
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
                  'rounded-md bg-white drop-shadow-large',
                )}
              >
                {options.map(option => {
                  const { key, label } = option;
                  return (
                    <Listbox.Option
                      key={key}
                      className={`cursor-default select-none py-2 pl-3 pr-4 flex justify-between items-center hover:bg-gray-500`}
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
    </label>
  );
}
