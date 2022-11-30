/* eslint-disable arrow-body-style */
import React from 'react';

import { Button } from '../buttons/Button';
import { Image } from '../image/Image';
// import Image from 'next/image';
import {
  ProfileDropdown,
  ProfileDropdownProps,
} from '../profile-dropdown/ProfileDropdown';
import { LanguageSelect, LanguageSelectProps } from '../select/LanguageSelect';
import { H2 } from '../typography/Typography';

export type NavHeaderProps = {
  variant?: 'primary' | 'logo';
  header?: string;
  logoSrc?: string;
  onClick?: () => void;
  user?: ProfileDropdownProps['user'];
  profileItems: ProfileDropdownProps['items'];
  languageSelectProps?: LanguageSelectProps;
};

export const NavHeader: React.FC<NavHeaderProps> = ({
  logoSrc,
  profileItems,
  user,
  variant,
  header,
  onClick,
  languageSelectProps,
}) => {
  return (
    <>
      {/**
       * This will occupy the same space as the nav header that is
       * fixed to the top, so it pushes content down from below the NavHeader.
       */}
      <div className="mt-10 h-[98px]" />
      <div
        className="fixed top-0 z-10 flex w-screen items-center justify-between bg-gray-50 p-7"
        data-cy="navbar"
      >
        {variant === 'logo' ? (
          logoSrc && (
            <Image
              alt="logo"
              src={logoSrc}
              className="h-[38px] w-[110px]"
              objectFit="contain"
            />
          )
        ) : (
          <div className="flex items-center gap-6">
            <Button
              icon="Cross"
              variant="additional-gray"
              className="h-[42px] w-[42px] rounded-[10px]"
              onClick={onClick}
            />
            <H2 className="font-medium">{header}</H2>
          </div>
        )}

        {(languageSelectProps || user) && (
          <div className="ml-auto flex items-center gap-4">
            {languageSelectProps && <LanguageSelect {...languageSelectProps} />}
            {user && <ProfileDropdown items={profileItems} user={user} />}
          </div>
        )}
      </div>
    </>
  );
};
