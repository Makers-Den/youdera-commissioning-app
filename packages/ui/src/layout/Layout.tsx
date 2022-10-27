import React from 'react';

import { ButtonsFooterProps, FooterButtons } from '../footer/FooterButtons';
import clsxm from '../../lib/clsxm';
import { Footer, PrimaryFooterProps } from '../footer/Footer';

type LayoutProps = {
  children: JSX.Element;
  footerType?: 'primary' | 'buttons';
  className?: string;
} & PrimaryFooterProps &
  ButtonsFooterProps;

export const Layout: React.FC<LayoutProps> = ({
  children,
  footerType,
  className,
  buttons,
  links,
}) => (
  <div className={clsxm("min-h-screen w-screen flex flex-col items-center justify-center", className)}>
    {children}
    {footerType === 'buttons' ? (
      <FooterButtons buttons={buttons} />
    ) : (
      <Footer links={links} />
    )}
  </div>
);
