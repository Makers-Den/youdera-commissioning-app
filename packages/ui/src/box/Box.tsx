import React, { ReactNode } from 'react';

import { Typography } from '../typography/Typography';
import clsxm from '../utils/clsxm';

export type BoxTitleProps = {
  title: string;
};

export const BoxTitle = ({ title }: BoxTitleProps) => (
  <Typography variant="h3" weight="medium" as="h3">
    {title}
  </Typography>
);

export type BoxHeaderProps = {
  children: ReactNode;
  className?: string;
};

export const BoxHeader = ({ className, children }: BoxHeaderProps) => (
  <div className={clsxm('flex items-center pr-8', className)}>
    <div className="bg-brand-one-400 relative mr-7 h-full min-h-[28px] w-1 rounded-r-full" />
    {children}
  </div>
);

export type BoxContentProps = {
  children: ReactNode;
  className?: string;
};

export const BoxContent = ({ className, children }: BoxHeaderProps) => (
  <div className={clsxm('mt-6 px-8', className)}>{children}</div>
);

export type BoxProps = {
  children: ReactNode;
  className?: string;
};

export const Box = ({ className, children }: BoxProps) => (
  <div
    className={clsxm(
      'drop-shadow-large w-max rounded-xl bg-white py-5',
      className,
    )}
  >
    {children}
  </div>
);
