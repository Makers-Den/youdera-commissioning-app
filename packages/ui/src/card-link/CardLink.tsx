import React, { ReactNode } from 'react';

import { SvgIcon } from '../svg-icons/SvgIcon';
import { Typography } from '../typography/Typography';
import clsxm from '../utils/clsxm';

export type CardLinkProps = {
  href?: string;
  title: string;
  icon: ReactNode;
  disabled?: boolean;
};

export const CardLink = React.forwardRef<HTMLAnchorElement, CardLinkProps>(
  // eslint-disable-next-line react/prop-types
  ({ href, title, icon, disabled }, ref) => (
    <a
      ref={ref}
      className={clsxm(
        'flex aspect-square w-52 flex-col rounded-md bg-gray-100 p-5',
        disabled ? 'pointer-events-none' : 'cursor-pointer',
      )}
      href={href}
    >
      <Typography
        variant="body"
        as="h3"
        className={clsxm(
          'flex items-center justify-between font-medium',
          disabled && 'text-gray-500',
        )}
      >
        {title}

        <SvgIcon name="ChevronRight" className="h-[0.9rem] text-inherit" />
      </Typography>
      <div
        className={clsxm(
          'flex w-full flex-1 items-center justify-center',
          disabled && 'grayscale opacity-30',
        )}
      >
        {icon}
      </div>
    </a>
  ),
);
