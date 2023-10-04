import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { NavHeader } from 'ui/nav-header/NavHeader';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { H3, Typography } from 'ui/typography/Typography';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: NavHeader,
  title: 'Components/NavHeader',
  argTypes: {
    variant: {
      options: ['primary', 'logo'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof NavHeader>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

type StoryType = ComponentStory<typeof NavHeader>;

const user = {
  imgSrc:
    'https://v.wpimg.pl/MTkyNjg0YjUKGzhZSEtvIElDbAMOEmF2Hlt0SEgIfWQTVigDC1U_MRsWYA0VRT01HAlgGgsfLCQCVjhbSFQkJxsVLxNIVSA2Dh1hCFNSdGxbSXtHBgB6MkZNelwDHXUwD0BjWF4FdWcPSyoOAVEudhY',
  firstName: 'John',
  lastName: 'Rambo',
  role: 'Roofer',
};

const profileItems = [
  {
    key: 'set',
    children: (
      <Typography className="flex py-1 text-sm">
        <SvgIcon name="Settings" className="text-brand-one-400 mr-3 w-5" />
        Setting
      </Typography>
    ),
  },
  {
    key: 'log',
    children: (
      <Typography className="flex py-1 text-sm">
        <SvgIcon
          name="LogOut"
          className="text-brand-one-400 mr-3 w-5"
          color="rgb(245 126 2 / 1)"
        />
        Logout
      </Typography>
    ),
  },
];

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof NavHeader> = args => (
  <NavHeader {...args} />
);

//👇 Each story then reuses that template
export const Overview = () => (
  <div className="flex flex-col items-start gap-2">
    <H3>Logo Variant</H3>
    <NavHeader
      logoSrc="/logo.png"
      variant="logo"
      profileItems={profileItems}
      user={user}
    />
    <div className="mb-2 w-screen border-t-[1px]" />
    <H3>Primary Variant</H3>
    <NavHeader header="Project 1" profileItems={profileItems} user={user} />
  </div>
);

export const Playground: StoryType = Template.bind({});
Playground.args = {
  variant: 'primary',
  header: 'Header',
  profileItems,
  user,
};
