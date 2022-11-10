import React from 'react';

import { Button, ButtonProps } from '../buttons/Button';
import clsxm from '../utils/clsxm';

export type ButtonsFooterProps = {
  buttons?: Array<ButtonProps & { content: string }>;
};

export const FooterButtons: React.FC<ButtonsFooterProps> = ({ buttons }) => (
  <>
  {/** 
   * This will occupy the same space as the footer that is 
   * fixed to the bottom, so if you have little viewport height, 
   * you'll be able to scroll down to view the content under the footer.
   */}
  <div className='h-[96px] mt-10' />
  <footer className={clsxm(
    'fixed bottom-0',
    'w-screen px-10 py-7',
    'bg-white drop-shadow-lg',
    'flex items-center justify-end space-x-5'
  )}>
    {buttons?.map((button, idx) => (
      <Button key={idx} {...button}>
        {button.content}
      </Button>
    ))}
  </footer>
  </>
);
