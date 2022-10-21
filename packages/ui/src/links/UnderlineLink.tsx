import * as React from 'react';

import clsxm from '../../lib/clsxm';

import {
  UnstyledLink,
  UnstyledLinkProps,
} from './UnstyledLink';

export const UnderlineLink = React.forwardRef<
  HTMLAnchorElement,
  UnstyledLinkProps
>(({ children, className, ...rest }, ref) => {
  return (
    <UnstyledLink
      ref={ref}
      {...rest}
      className={clsxm(
        'text-orange font-normal',
        'animated-underline custom-link inline-flex items-center',
        'focus:outline-none focus-visible:rounded focus-visible:ring focus-visible:ring-orange focus-visible:ring-offset-2',
        'border-b-[1.5px] border-orange hover:border-black/0',
        className
      )}
    >
      {children}
    </UnstyledLink>
  );
});
