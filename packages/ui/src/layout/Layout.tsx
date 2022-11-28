import React, { ReactNode } from 'react';

import { Footer, PrimaryFooterProps } from '../footer/Footer';
import { ButtonsFooterProps, FooterButtons } from '../footer/FooterButtons';
import { NavHeader, NavHeaderProps } from '../nav-header/NavHeader';

type LayoutProps = {
  nav?: NavHeaderProps;
  footer?: PrimaryFooterProps | ButtonsFooterProps;
  children: ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children, footer, nav }) => (
  <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-gray-50" data-cy='main'>
    {nav && <NavHeader {...nav} />}
    {children}
    {footer && 'buttons' in footer && (
      <FooterButtons buttons={footer.buttons} />
    )}
    {footer && 'links' in footer && <Footer links={footer.links} />}
  </div>
);
