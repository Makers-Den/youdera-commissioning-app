import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Footer } from 'ui/footer/Footer';
import { H3 } from 'ui/typography/Typography';

export default {
  component: Footer,
  title: 'Components/Footer',
} as ComponentMeta<typeof Footer>;

type StoryType = ComponentStory<typeof Footer>;

const Template: ComponentStory<typeof Footer> = args => <Footer {...args} />;

export const Overview = () => (
  <div className="flex flex-col gap-3">
    <H3>Footer</H3>
    <Footer
      links={[
        {
          name: 'Legal Notice',
          href: 'google.com',
        },
        {
          name: 'Privacy Policy',
          href: 'google.com',
        },
      ]}
    />
  </div>
);

export const Playground: StoryType = Template.bind({});
Playground.args = {
  links: [
    {
      name: 'Legal Notice',
      href: 'google.com',
    },
    {
      name: 'Privacy Policy',
      href: 'google.com',
    },
  ],
};
