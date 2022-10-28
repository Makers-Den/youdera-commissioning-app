/* eslint-disable react/require-default-props */
/* eslint-disable import/prefer-default-export */

import React from 'react';

import { Footer, PrimaryFooterProps } from '../footer/Footer';
import { ButtonsFooterProps, FooterButtons } from '../footer/FooterButtons';
import { NavHeader, NavHeaderProps } from '../nav-header/NavHeader';

type LayoutProps = {
  nav?: NavHeaderProps;
  footer?: PrimaryFooterProps | ButtonsFooterProps;
  children: JSX.Element;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  footer,
  nav
}) => (
  <div className="min-h-screen w-screen flex flex-col items-center justify-center">
    {nav &&
      <NavHeader
        variant={nav.variant}
        header={nav.header}
        items={nav.items}
        imgSrc={nav.imgSrc}
        imgAlt={nav.imgAlt}
        title={nav.title}
        subTitle={nav.subTitle}
      />
    }
    {children}
    {footer && 'buttons' in footer && <FooterButtons buttons={footer.buttons} />}
    {footer && 'links' in footer && <Footer links={footer.links} />}

  </div>
);
