import * as React from 'react';

import { UnstyledLink, UnstyledLinkProps } from './UnstyledLink';
import clsxm from '../utils/clsxm';

export const UnderlineLink = React.forwardRef<
  HTMLAnchorElement,
  UnstyledLinkProps
>(({ children, className, ...rest }, ref) => (
  <UnstyledLink
    ref={ref}
    {...rest}
    className={clsxm(
      'text-brand-one-400 font-normal',
      'animated-underline custom-link inline-flex items-center',
      'focus-visible:ring-brand-one-400 focus:outline-none focus-visible:rounded focus-visible:ring focus-visible:ring-offset-2',
      'border-brand-one-400 border-b-[1.5px] hover:border-black/0',
      className,
    )}
  >
    {children}
  </UnstyledLink>
));
