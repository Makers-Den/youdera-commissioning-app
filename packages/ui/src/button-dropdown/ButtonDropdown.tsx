import { Menu, Transition } from '@headlessui/react';
import { ReactNode } from 'react';

import { Button, ButtonProps } from '../buttons/Button';
import { SvgIcon } from '../svg-icons/SvgIcon';
import clsxm from '../utils/clsxm';

export type ButtonDropdownItemProps = {
  children: ReactNode;
  key: string;
};

export type ButtonDropdownProps = {
  items: ButtonDropdownItemProps[];
  buttonProps: ButtonProps;
  className?: string;
};

export function ButtonDropdown({
  items,
  buttonProps: { children, ...restButtonProps },
  className,
}: ButtonDropdownProps) {
  return (
    <Menu as="div" className={clsxm('relative w-max', className)}>
      {({ open }) => (
        <>
          <Menu.Button as="div">
            <Button {...restButtonProps}>
              {children}
              <SvgIcon
                name="ChevronDown"
                className={clsxm(
                  'ml-2 w-3 text-inherit transition-transform',
                  !open && 'rotate-180',
                )}
              />
            </Button>
          </Menu.Button>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Menu.Items
              static
              as="div"
              className="drop-shadow-large absolute mt-2 w-full rounded-xl bg-white"
            >
              <ul className="px-5 py-5">
                {items?.map(({ key, children }, index) => (
                  <Menu.Item
                    as="li"
                    className={clsxm(index > 0 && 'mt-3')}
                    key={key}
                  >
                    {children}
                  </Menu.Item>
                ))}
              </ul>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
