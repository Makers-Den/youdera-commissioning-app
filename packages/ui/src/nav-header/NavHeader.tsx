import React, { ReactNode } from 'react';
import {
  ProfileDropdown,
  ProfileDropdownProps,
} from '../profile-dropdown/ProfileDropdown';
import { Image } from '../image/Image';
// import Image from 'next/image';
import Logo from '../logo.png';
import { H2 } from '../typography/Typography';
import { Button } from '../buttons/Button';

export type NavHeaderProps = {
  variant?: 'primary' | 'logo';
  header?: string;
  onClick?: () => void;
} & ProfileDropdownProps;

export const NavHeader: React.FC<NavHeaderProps> = ({
  items,
  imgSrc,
  imgAlt,
  title,
  subTitle,
  variant,
  header,
  onClick
}) => {
  return (
    <div className="flex w-screen justify-between items-center mb-auto p-7">
      {variant === 'logo' ? (
        <Image
          alt="logo"
          src={Logo.src}
          className="h-[38px] w-[110px]"
          objectFit="contain"
        />
      ) : (
        <div className="flex items-center gap-6">
          <Button
            icon="Cross"
            variant="additional-gray"
            className="w-[42px] h-[42px] rounded-[10px]"
            onClick={onClick}
          />
          <H2 className="font-medium">{header}</H2>
        </div>
      )}

      <ProfileDropdown
        items={items}
        imgSrc={imgSrc}
        imgAlt={imgAlt}
        title={title}
        subTitle={subTitle}
      />
    </div>
  );
};
