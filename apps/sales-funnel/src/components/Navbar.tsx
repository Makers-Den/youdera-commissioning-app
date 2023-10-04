import React from 'react';
import { LogoSvg } from 'ui/LogoSvg';
import { NoteText } from 'ui/typography/Typography';

export const Navbar = () => (
  <nav className="bg-gray-1000 w-full">
    <div className="mx-auto flex w-full max-w-5xl justify-between p-4">
      <LogoSvg />
      <div className="flex flex-col items-end">
        <NoteText>Savings</NoteText>
        <NoteText>- €</NoteText>
      </div>
    </div>
  </nav>
);
