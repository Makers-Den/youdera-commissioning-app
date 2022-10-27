import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Compass } from 'ui/compass/Compass';
import { CenterWrapper } from './utils/CenterWrapper';

export default {
  component: Compass,
  title: 'Components/Compass',
  argTypes: {
    rotationAngle: {
      control: { type: 'range', min: '0', max: '359', step: '1' },
    },
  },
} as ComponentMeta<typeof Compass>;

type StoryType = ComponentStory<typeof Compass>;

const Template: ComponentStory<typeof Compass> = args => (
  <CenterWrapper>
    <Compass {...args} />
  </CenterWrapper>
);

export const Playground: StoryType = Template.bind({});
