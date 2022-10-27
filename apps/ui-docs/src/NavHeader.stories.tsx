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

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof NavHeader> = args => (
  <NavHeader {...args} />
);

//👇 Each story then reuses that template
export const Overview = () => (
  <div className="flex flex-col items-start gap-2">
    <H3>Logo Variant</H3>
    <NavHeader
      variant="logo"
      items={[
        {
          key: 'set',
          children: (
            <Typography className="flex text-sm py-1">
              <SvgIcon name="Settings" className="text-orange-400 w-5 mr-3" />
              Setting
            </Typography>
          ),
        },
        {
          key: 'log',
          children: (
            <Typography className="flex text-sm py-1">
              <SvgIcon
                name="LogOut"
                className="text-orange-400 w-5 mr-3"
                color="rgb(245 126 2 / 1)"
              />
              Logout
            </Typography>
          ),
        },
      ]}
      imgSrc="https://v.wpimg.pl/MTkyNjg0YjUKGzhZSEtvIElDbAMOEmF2Hlt0SEgIfWQTVigDC1U_MRsWYA0VRT01HAlgGgsfLCQCVjhbSFQkJxsVLxNIVSA2Dh1hCFNSdGxbSXtHBgB6MkZNelwDHXUwD0BjWF4FdWcPSyoOAVEudhY"
      imgAlt="avatar"
      title="Johny Joe"
      subTitle="Roofer"
    />
    <div className="w-screen border-t-[1px] mb-2" />
    <H3>Primary Variant</H3>
    <NavHeader
      header="Project 1"
      items={[
        {
          key: 'set',
          children: (
            <Typography className="flex text-sm py-1">
              <SvgIcon name="Settings" className="text-orange-400 w-5 mr-3" />
              Setting
            </Typography>
          ),
        },
        {
          key: 'log',
          children: (
            <Typography className="flex text-sm py-1">
              <SvgIcon
                name="LogOut"
                className="text-orange-400 w-5 mr-3"
                color="rgb(245 126 2 / 1)"
              />
              Logout
            </Typography>
          ),
        },
      ]}
      imgSrc="https://v.wpimg.pl/MTkyNjg0YjUKGzhZSEtvIElDbAMOEmF2Hlt0SEgIfWQTVigDC1U_MRsWYA0VRT01HAlgGgsfLCQCVjhbSFQkJxsVLxNIVSA2Dh1hCFNSdGxbSXtHBgB6MkZNelwDHXUwD0BjWF4FdWcPSyoOAVEudhY"
      imgAlt="avatar"
      title="Johny Joe"
      subTitle="Roofer"
    />
  </div>
);

export const Playground: StoryType = Template.bind({});
Playground.args = {
  variant: 'primary',
  header: 'Header',
  items: [
    {
      key: 'set',
      children: (
        <button>
          <Typography className="flex text-sm py-1">
            <SvgIcon name="Settings" className="text-orange-400 w-5 mr-3" />
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
              className="text-orange-400 w-5 mr-3"
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
