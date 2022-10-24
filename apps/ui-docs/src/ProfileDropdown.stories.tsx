import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProfileDropdown } from 'ui/profile-dropdown/ProfileDropdown';
import { Typography } from 'ui/typography/Typography';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';

export default {
  component: ProfileDropdown,
  title: 'Components/ProfileDropdown',
} as ComponentMeta<typeof ProfileDropdown>;

const Template: ComponentStory<typeof ProfileDropdown> = args => (
  <ProfileDropdown {...args} />
);

export const Default = Template.bind({});

Default.args = {
  items: [
    {
      key: 'set',
      children: (
        <button>
          <Typography className="flex text-sm py-1">
            <SvgIcon name="Settings" className="text-orange w-5 mr-3" />
            Setting
          </Typography>
        </button>
      ),
    },
    {
      key: 'log',
      children: (
        <button>
          <Typography className="flex text-sm py-1">
            <SvgIcon
              name="LogOut"
              className="text-orange w-5 mr-3"
              color="rgb(245 126 2 / 1)"
            />
            Logout
          </Typography>
        </button>
      ),
    },
  ],
  imgSrc:
    'https://v.wpimg.pl/MTkyNjg0YjUKGzhZSEtvIElDbAMOEmF2Hlt0SEgIfWQTVigDC1U_MRsWYA0VRT01HAlgGgsfLCQCVjhbSFQkJxsVLxNIVSA2Dh1hCFNSdGxbSXtHBgB6MkZNelwDHXUwD0BjWF4FdWcPSyoOAVEudhY',
  imgAlt: 'avatar',
  title: 'Johny Joe',
  subTitle: 'Roofer',
};
