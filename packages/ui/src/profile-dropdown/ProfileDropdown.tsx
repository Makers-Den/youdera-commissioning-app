import { Menu, Transition } from '@headlessui/react';
import { ReactNode } from 'react';

import { RoundImage } from '../image/RoundImage';
import { Profile } from '../svg-icons/icons/Profile';
import { SvgIcon } from '../svg-icons/SvgIcon';
import { Typography } from '../typography/Typography';
import clsxm from '../utils/clsxm';

export type ProfileDropdownItemProps = {
  children: ReactNode;
  key: string;
};

export type ProfileDropdownProps = {
  items: ProfileDropdownItemProps[];
  user: {
    firstName: string;
    lastName: string;
    role: string;
    imgSrc: string | null;
  };
};

export function ProfileDropdown({
  items,
  user: { imgSrc, firstName, lastName, role },
}: ProfileDropdownProps) {
  return (
    <Menu as="div" className="relative w-max">
      {({ open }) => (
        <>
          <Menu.Button className="flex items-center space-x-3 pr-7 pl-1" data-cy='profile-dropdown'>
            {imgSrc && (
              <RoundImage src={imgSrc} alt="avatar" wrapperClassName="w-9" />
            )}
            {!imgSrc && <Profile className="w-9" />}
            <div className="flex flex-col items-start">
              <Typography weight="bold" className="flex text-sm text-gray-600">
                {firstName} {lastName}
                <SvgIcon
                  name="ChevronDown"
                  className={clsxm(
                    'ml-2 w-3 text-inherit transition-transform',
                    open && 'rotate-180',
                  )}
                />
              </Typography>
              <Typography className="text-sm text-gray-500">{role}</Typography>
            </div>
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
              className="drop-shadow-large absolute w-full rounded-xl bg-white"
            >
              <div className="absolute -top-2 right-6 aspect-square w-5 rotate-45 rounded bg-inherit" />
              <ul className="px-6 py-5">
                {items?.map(({ key, children }) => (
                  <Menu.Item as="li" key={key}>
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
