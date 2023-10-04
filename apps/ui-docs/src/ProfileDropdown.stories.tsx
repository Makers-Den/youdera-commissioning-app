import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { ProfileDropdown } from 'ui/profile-dropdown/ProfileDropdown';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Typography } from 'ui/typography/Typography';

import { CenterWrapper } from './utils/CenterWrapper';

export default {
  component: ProfileDropdown,
  title: 'Components/ProfileDropdown',
} as ComponentMeta<typeof ProfileDropdown>;

const Template: ComponentStory<typeof ProfileDropdown> = args => (
  <CenterWrapper>
    <ProfileDropdown {...args} />
  </CenterWrapper>
);

export const Overview = Template.bind({});

const user = {
  imgSrc:
    'https://v.wpimg.pl/MTkyNjg0YjUKGzhZSEtvIElDbAMOEmF2Hlt0SEgIfWQTVigDC1U_MRsWYA0VRT01HAlgGgsfLCQCVjhbSFQkJxsVLxNIVSA2Dh1hCFNSdGxbSXtHBgB6MkZNelwDHXUwD0BjWF4FdWcPSyoOAVEudhY',
  firstName: 'John',
  lastName: 'Rambo',
  role: 'Roofer',
};

Overview.args = {
  user,
  items: [
    {
      key: 'set',
      children: (
        <button type="button">
          <Typography className="flex py-1 text-sm">
            <SvgIcon name="Settings" className="text-brand-one-400 mr-3 w-5" />
            Setting
          </Typography>
        </button>
      ),
    },
    {
      key: 'log',
      children: (
        <button type="button">
          <Typography className="flex py-1 text-sm">
            <SvgIcon
              name="LogOut"
              className="text-brand-one-400 mr-3 w-5"
              color="rgb(245 126 2 / 1)"
            />
            Logout
          </Typography>
        </button>
      ),
    },
  ],
};
