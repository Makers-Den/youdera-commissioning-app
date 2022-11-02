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
)

export type BoxHeaderProps = {
  children: ReactNode;
  className?: string;
};

export const BoxHeader = ({ className, children }: BoxHeaderProps) => (
  <div className={clsxm('pr-8 flex items-center', className)}>
    <div className="bg-orange-400 h-full min-h-[28px] w-1 rounded-r-full relative mr-7" />
    {children}
  </div>
);

export type BoxContentProps = {
  children: ReactNode;
  className?: string;
};

export const BoxContent = ({ className, children }: BoxHeaderProps) => (
  <div className={clsxm('px-8 mt-6', className)}>{children}</div>
);

export type BoxProps = {
  children: ReactNode;
  className?: string;
};

export const Box = ({ className, children }: BoxProps) => (
  <div
    className={clsxm(
      'bg-white rounded-xl py-8 drop-shadow-large w-max',
      className,
    )}
  >
    {children}
  </div>
);

