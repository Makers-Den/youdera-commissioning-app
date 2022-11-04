/* eslint-disable arrow-body-style */
import React from 'react';

import { Button } from '../buttons/Button';
import { Image } from '../image/Image';
// import Image from 'next/image';
import {
  ProfileDropdown, ProfileDropdownProps,
} from '../profile-dropdown/ProfileDropdown';
import { H2 } from '../typography/Typography';



export type NavHeaderProps = {
  variant?: 'primary' | 'logo';
  header?: string;
  logoSrc?: string;
  onClick?: () => void;
  user?: ProfileDropdownProps["user"],
  profileItems: ProfileDropdownProps["items"],
} 

export const NavHeader: React.FC<NavHeaderProps> = ({
  logoSrc,
  profileItems,
  user,
  variant,
  header,
  onClick,
}) => {
  return (
    <div className="flex w-screen justify-between items-center p-7 z-10">
      {variant === 'logo' ? (
        <Image
          alt="logo"
          src={logoSrc}
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

      {user && 
        <ProfileDropdown
          items={profileItems}
          user={user}
        />
      }
    </div>
  );
};
