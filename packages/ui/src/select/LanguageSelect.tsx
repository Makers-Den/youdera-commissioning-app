import { Listbox, Transition } from '@headlessui/react';

import { SvgIcon } from '../svg-icons/SvgIcon';
import { Typography } from '../typography/Typography';
import clsxm from '../utils/clsxm';

export type LanguageSelectProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  wrapperClassName?: string;
  title: string;
};

export function LanguageSelect({
  options,
  value,
  onChange,
  wrapperClassName,
  title,
}: LanguageSelectProps) {
  return (
    <div className={wrapperClassName}>
      <Listbox value={value} onChange={onChange}>
        {({ open, value }) => (
          <div className={clsxm('relative mt-1')}>
            <Listbox.Button
              className={clsxm(
                'w-full py-2 pl-3 pr-4',
                'cursor-pointer',
                'flex items-center justify-between gap-3',
                'transition-all',
              )}
            >
              <SvgIcon name="Globe" className={clsxm('w-4')} />
              <Typography className="flex" variant="body" weight="bold">
                {value?.toUpperCase()}
              </Typography>
              <SvgIcon
                name="ChevronDown"
                className={clsxm('w-3 transition-all', open && 'rotate-180')}
              />
            </Listbox.Button>
            <Transition
              show={open}
              as="div"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className={clsxm(
                'absolute',
                '-right-2 z-10 mt-1 w-max p-5 py-3',
                'drop-shadow-large rounded-xl bg-white',
              )}
            >
              <div className="absolute -top-2 right-6 aspect-square w-5 rotate-45 rounded bg-inherit" />
              <Typography className="pr-5 text-gray-400">{title}</Typography>
              <div className={clsxm('scrollbar mt-2 max-h-32 overflow-y-auto')}>
                <Listbox.Options static className={clsxm('pr-2')}>
                  {options.map(language => (
                    <Listbox.Option
                      className={clsxm(
                        'flex items-center justify-between',
                        'cursor-pointer select-none',
                        'py-1 px-2',
                        'rounded-md hover:bg-gray-100 hover:text-gray-700',
                        value === language && 'bg-brand-one-400 text-white',
                      )}
                      value={language}
                      key={language}
                    >
                      <Typography weight="medium" variant="body">
                        {language}
                      </Typography>
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
}
