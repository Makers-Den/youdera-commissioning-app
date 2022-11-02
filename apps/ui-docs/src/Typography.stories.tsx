/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Meta, Story } from '@storybook/react';
import { BodyText, H1, H2, H3, Label, Typography } from 'ui/typography/Typography';
import { CenterWrapper } from './utils/CenterWrapper';

export default {
  component: Typography,
  title: 'Theme/Typography',
} as Meta;

const Template: Story = args => (
  <Typography {...args}>This is some cool text</Typography>
);


export const Overview = () => (
  <CenterWrapper>
    <div className="flex items-start space-x-6">
      <div className="flex flex-col justify-center items-center gap-2">
        <H1>H1 Headline Text</H1>
        <H2>H2 Headline Text</H2>
        <H3>H3 Headline Text</H3>
        <Label>Label</Label>
        <BodyText>Body text. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. </BodyText>
      </div>
    </div>
  </CenterWrapper>
);


export const Playground = Template.bind({});
Playground.args = { variant: 'h1' };
