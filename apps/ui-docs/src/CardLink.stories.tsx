import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CardLink } from 'ui/card-link/CardLink';
import { Button } from 'ui/buttons/Button';
import { H2 } from 'ui/typography/Typography';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { CenterWrapper } from './utils/CenterWrapper';

export default {
  component: CardLink,
  title: 'Components/CardLink',
} as ComponentMeta<typeof CardLink>;

const Template: ComponentStory<typeof CardLink> = args => (
  <CenterWrapper>
    <CardLink {...args} />
  </CenterWrapper>
);

export const Overview = Template.bind({});

Overview.args = {
  title: 'Commissioning',
  href: '',
  icon: <SvgIcon name="SafetyHelmet" className="h-20 w-auto" />,
};
