import React, { ReactNode } from 'react';
import {
  ProfileDropdown,
  ProfileDropdownProps,
} from '../profile-dropdown/ProfileDropdown';
import { Image } from '../image/Image';
// import Image from 'next/image';
import Logo from '../logo.png';
import { H1 } from '../typography/Typography';
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
        <>
          <Button />
          <H1>{header}</H1>
        </>
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
