import * as React from 'react';

import { UnstyledLink, UnstyledLinkProps } from './UnstyledLink';
import clsxm from '../utils/clsxm';

export const PrimaryLink = React.forwardRef<
  HTMLAnchorElement,
  UnstyledLinkProps
>(({ className, children, ...rest }, ref) => (
  <UnstyledLink
    ref={ref}
    {...rest}
    className={clsxm(
      'inline-flex items-center',
      'font-medium text-primary-600 hover:text-primary-500',
      'focus:outline-none focus-visible:rounded focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-offset-2',
      className,
    )}
  >
    {children}
  </UnstyledLink>
));
