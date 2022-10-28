import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Box, BoxContent, BoxHeader, BoxTitle } from 'ui/box/Box';
import { Button } from 'ui/buttons/Button';
import { H2 } from 'ui/typography/Typography';

import { CenterWrapper } from './utils/CenterWrapper';

export default {
  component: Box,
  title: 'Components/Box',
} as ComponentMeta<typeof Box>;

const Template: ComponentStory<typeof Box> = args => (
  <CenterWrapper>
    <Box {...args} />
  </CenterWrapper>
);

export const Overview = Template.bind({});

Overview.args = {
  children: (
    <>
      <BoxHeader>
        <BoxTitle title="Example" />
      </BoxHeader>
      <BoxContent>
        <H2 className="mb-4">Example content put a list or something else</H2>
        <Button>Button</Button>
      </BoxContent>
    </>
  ),
};

export const WithButtonInHeader = Template.bind({});

WithButtonInHeader.args = {
  children: (
    <>
      <BoxHeader>
        <BoxTitle title="Example" />
        <Button className="ml-auto">Header Button</Button>
      </BoxHeader>
      <BoxContent>
        <H2 className="mb-4">Example content put a list or something else</H2>
        <Button>Button</Button>
      </BoxContent>
    </>
  ),
};
