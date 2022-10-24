import { Menu, Transition } from '@headlessui/react';
import { ReactNode } from 'react';
import clsxm from '../../lib/clsxm';
import { RoundImage } from '../image/RoundImage';
import { SvgIcon } from '../svg-icons/SvgIcon';
import { Typography } from '../typography/Typography';

export type ProfileDropdownItemProps = {
  children: ReactNode;
  key: string;
};

export type ProfileDropdownProps = {
  items: ProfileDropdownItemProps[];
  imgSrc: string;
  imgAlt: string;
  title: string;
  subTitle: string;
};

export function ProfileDropdown({
  items,
  imgSrc,
  imgAlt,
  title,
  subTitle,
}: ProfileDropdownProps) {
  return (
    <Menu as={'div'} className="relative w-max">
      {({ open }) => (
        <>
          <Menu.Button className={'flex items-center space-x-3 pr-7 pl-1'}>
            <RoundImage src={imgSrc} alt={imgAlt} wrapperClassName="w-9" />
            <div className="flex flex-col items-start">
              <Typography
                weight="bold"
                className="text-darkerGray flex text-sm"
              >
                {title}
                <SvgIcon
                  name="ChevronDown"
                  className={clsxm(
                    'text-inherit transition-transform w-3 ml-2',
                    open && 'rotate-180',
                  )}
                />
              </Typography>
              <Typography className="text-gray text-sm">{subTitle}</Typography>
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
              as="div"
              className={
                'absolute bg-white rounded-xl drop-shadow-large w-full'
              }
            >
              <div className="bg-inherit w-5 aspect-square absolute rotate-45 -top-2 rounded right-6" />
              <ul className="px-6 py-5">
                {items?.map(({ key, children }) => {
                  return (
                    <Menu.Item as="li" key={key}>
                      {children}
                    </Menu.Item>
                  );
                })}
              </ul>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
