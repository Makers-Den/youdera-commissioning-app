import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Button } from 'ui/buttons/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'ui/dialogs/Dialog';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { H2 } from 'ui/typography/Typography';

import { CenterWrapper } from './utils/CenterWrapper';

export default {
  component: Dialog,
  title: 'Components/Dialog',
} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof Dialog> = args => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  return (
    <CenterWrapper>
      <Button type='button' onClick={() => setIsOpen(true)}>Click me for dialog to open!</Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogHeader>
          <DialogTitle title="Example" />
          <SvgIcon name='Close' className='ml-auto h-4 hover:cursor-pointer' onClick={() => setIsOpen(false)} />
        </DialogHeader>
        <DialogContent>
          <H2 className="mb-4">Example content put a list or something else</H2>
          <Button>BUTTON</Button>
        </DialogContent>
      </Dialog>
    </CenterWrapper>
  )
};

export const Overview = Template.bind({});

