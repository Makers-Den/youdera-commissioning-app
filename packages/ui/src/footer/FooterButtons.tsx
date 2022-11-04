import React from 'react';

import { Button, ButtonProps } from '../buttons/Button';
import clsxm from '../utils/clsxm';

export type ButtonsFooterProps = {
  buttons?: Array<ButtonProps & { content: string }>;
};

export const FooterButtons: React.FC<ButtonsFooterProps> = ({ buttons }) => (
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
);
