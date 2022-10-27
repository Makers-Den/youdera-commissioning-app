import React from 'react';
import { Button } from '../buttons/Button';
import { ButtonProps } from '../buttons/Button';

export type ButtonsFooterProps = {
  buttons?: Array<ButtonProps & { content: string }>;
};

export const FooterButtons: React.FC<ButtonsFooterProps> = ({ buttons }) => (
  <footer className="w-screen flex items-center justify-end px-10 py-7 mt-auto bg-white drop-shadow-lg space-x-5">
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
