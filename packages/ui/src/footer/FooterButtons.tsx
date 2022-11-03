import React from 'react';

import { Button, ButtonProps } from '../buttons/Button';

export type ButtonsFooterProps = {
  buttons?: Array<ButtonProps & { content: string }>;
};

export const FooterButtons: React.FC<ButtonsFooterProps> = ({ buttons }) => (
  <footer className="mt-10 flex w-screen items-center justify-end space-x-5 bg-white px-10 py-7 drop-shadow-lg">
    {buttons?.map((button, idx) => (
      <Button
        variant={button.variant}
        isLoading={button.isLoading}
        icon={button.icon}
        key={idx}
      >
        {button.content}
      </Button>
    ))}
  </footer>
);
