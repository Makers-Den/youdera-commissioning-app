import { Listbox, Transition } from '@headlessui/react';
import { Fragment, ReactNode, SVGProps } from 'react';

import { SvgIcon } from '../svg-icons/SvgIcon';
import { Typography } from '../typography/Typography';
import clsxm from '../utils/clsxm';
import { validityStyle } from '../utils/constants';

export interface MultiSelectValue {
  label: string,
  key: string
}
export type MultiSelectOptionProps<T extends MultiSelectValue> = {
  value: T;
  children: (args: {
    active: boolean,
    selected: boolean,
    disabled: boolean
  }) => ReactNode;
};

export const MultiSelectOption = <T extends MultiSelectValue>({ value, children }: MultiSelectOptionProps<T>) => (
  <Listbox.Option
    className="cursor-pointer Multiselect-none py-2 pl-3 pr-4 flex justify-between items-center hover:bg-gray-100"
    value={value}
  >
    {(args) => (
      <>
        <Typography as='div' variant="body">{children(args)}</Typography>
        {args.selected && (
          <SvgIcon
            name="Check"
            className="w-4 text-green-400"
          />
        )}
      </>
    )}
  </Listbox.Option>
)


type SelectedOptionsProps = {
  label: ReactNode;
  onDelete: SVGProps<SVGSVGElement>['onClick'];
};

function SelectedOptions({ label, onDelete }: SelectedOptionsProps) {
  return (
    <div className="bg-orange-400 rounded-md flex justify-between items-center py-1 px-2 text-white">
      <Typography variant="label" className="text-inherit">
        {label}
      </Typography>
      <SvgIcon
        name="Cross"
        className="w-2 cursor-pointer hover:text-gray-400 ml-2"
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
        'aspect-square px-2 rounded-full flex items-center justify-center text-sm transition-all',
        count > 0 ? 'bg-orange-400 text-white' : 'text-gray-800 bg-gray-300',
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
  children
}: MultiSelectProps<Value>) {
  return (
    <div>
      <Typography variant="label">
        {label}
        <span className="text-green-400">{isRequired && '*'}</span>
      </Typography>
      <Listbox
        value={value}
        onChange={onChange}
        name={name}
        defaultValue={defaultValue}
        multiple
        by="key"
      >
        {({ open }) => (
          <div className={clsxm('relative mt-1', wrapperClassName)}>
            <Listbox.Button
              className={clsxm(
                'w-full py-2 pl-3 pr-4',
                'rounded-md text-left drop-shadow-large border',
                'cursor-pointer',
                'flex justify-between items-center gap-2',
                'transition-all',
                open
                  ? 'border-orange-400 bg-white'
                  : 'bg-gray-100 border-gray-500',
                validity && validityStyle[validity].input,
              )}
            >
              <Typography
                variant="body"
                className="flex gap-1 flex-wrap w-full"
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
                    'w-3 ml-2 transition-all',
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
                  'rounded-md bg-white drop-shadow-large',
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
