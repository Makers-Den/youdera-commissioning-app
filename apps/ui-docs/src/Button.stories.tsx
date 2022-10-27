import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Button } from 'ui/buttons/Button';
import { H3 } from 'ui/typography/Typography';
import { CenterWrapper } from './utils/CenterWrapper';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: Button,
  title: 'Components/Button',
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

type StoryType = ComponentStory<typeof Button>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Button> = args => (
  <CenterWrapper>
    <Button {...args} />
  </CenterWrapper>
);

//👇 Each story then reuses that template
export const Overview = () => (
  <div className="flex flex-col items-center w-full justify-center gap-2">
    <Button variant="main-orange">Click me</Button>
    <Button variant="main-green">Click me</Button>
    <Button variant="main-gray">Click me</Button>
    <Button variant="danger">Click me</Button>
    <H3>Additional states</H3>
    <Button variant="main-green" disabled={true}>
      Disabled
    </Button>
    <Button variant="main-green" isLoading={true}>
      Click me
    </Button>
  </div>
);

export const Playground: StoryType = Template.bind({});
Playground.args = {
  variant: 'main-orange',
  isLoading: true,
  children: 'MAIN ORANGE',
};
