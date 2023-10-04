import { Listbox, Transition } from '@headlessui/react';
import { Fragment, ReactNode, SVGProps } from 'react';

import { SvgIcon } from '../svg-icons/SvgIcon';
import { Typography } from '../typography/Typography';
import clsxm from '../utils/clsxm';
import { validityStyle } from '../utils/constants';

export interface MultiSelectValue {
  label: string;
  key: string;
}
export type MultiSelectOptionProps<T extends MultiSelectValue> = {
  value: T;
  children: (args: {
    active: boolean;
    selected: boolean;
    disabled: boolean;
  }) => ReactNode;
};

export const MultiSelectOption = <T extends MultiSelectValue>({
  value,
  children,
}: MultiSelectOptionProps<T>) => (
  <Listbox.Option
    className="Multiselect-none flex cursor-pointer items-center justify-between py-2 pl-3 pr-4 hover:bg-gray-100"
    value={value}
    data-cy="multi-select-option"
  >
    {args => (
      <>
        <Typography as="div" variant="body">
          {children(args)}
        </Typography>
        {args.selected && (
          <SvgIcon name="Check" className="text-brand-two-400 w-4" />
        )}
      </>
    )}
  </Listbox.Option>
);

type SelectedOptionsProps = {
  label: ReactNode;
  onDelete: SVGProps<SVGSVGElement>['onClick'];
};

function SelectedOptions({ label, onDelete }: SelectedOptionsProps) {
  return (
    <div className="bg-brand-one-400 flex items-center justify-between rounded-md py-1 px-2 text-white">
      <Typography variant="label" className="text-inherit">
        {label}
      </Typography>
      <SvgIcon
        name="Cross"
        className="ml-2 w-2 cursor-pointer hover:text-gray-400"
        onClick={onDelete}
      />
    </div>
  );
}

type SelectedOptionsCountProps = {
  count: number;
};

function SelectedOptionsCount({ count }: SelectedOptionsCountProps) {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onClick={e => e.stopPropagation()}
      className={clsxm(
        'flex aspect-square items-center justify-center rounded-full px-2 text-sm transition-all',
        count > 0 ? 'bg-brand-one-400 text-white' : 'bg-gray-300 text-gray-800',
      )}
    >
      {count}
    </div>
  );
}

export type MultiSelectProps<Value extends MultiSelectValue> = {
  label: string;
  placeholder: string;
  name?: string;
  defaultValue?: Value[];
  value: Value[];
  onChange: (value: Value[]) => void;
  isRequired?: boolean;
  wrapperClassName?: string;
  validity?: 'valid' | 'invalid';
  children: ReactNode;
};

export function MultiSelect<Value extends MultiSelectValue>({
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
}: MultiSelectProps<Value>) {
  return (
    <div>
      <Typography variant="label">
        {label}
        <span className="text-brand-two-400">{isRequired && '*'}</span>
      </Typography>
      <Listbox
        value={value}
        onChange={onChange}
        name={name}
        defaultValue={defaultValue}
        multiple
        by="key"
        data-cy={`${label?.toLowerCase().replace(' ', '-')}` || 'multiselect'}
      >
        {({ open }) => (
          <div className={clsxm('relative mt-1', wrapperClassName)}>
            <Listbox.Button
              className={clsxm(
                'w-full py-2 pl-3 pr-4',
                'drop-shadow-large rounded-md border text-left',
                'cursor-pointer',
                'flex items-center justify-between gap-2',
                'transition-all',
                open
                  ? 'border-brand-one-400 bg-white'
                  : 'border-gray-500 bg-gray-100',
                validity && validityStyle[validity].input,
              )}
            >
              <Typography
                variant="body"
                className="flex w-full flex-wrap gap-1"
              >
                {value?.length > 0
                  ? value.map(({ label, key }) => (
                      <SelectedOptions
                        key={key}
                        label={label}
                        onDelete={event => {
                          event.stopPropagation();
                          const filteredOptions = value.filter(
                            val => val.key !== key,
                          );
                          onChange(filteredOptions);
                        }}
                      />
                    ))
                  : placeholder}
              </Typography>
              <div className="flex">
                <SelectedOptionsCount count={value?.length || 0} />
                <SvgIcon
                  name="ChevronDown"
                  className={clsxm(
                    'ml-2 w-3 transition-all',
                    open && 'rotate-180',
                    validity && validityStyle[validity].icon,
                  )}
                />
              </div>
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
                {children}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
}
