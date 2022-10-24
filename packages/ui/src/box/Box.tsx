import { ReactNode } from 'react';
import clsxm from '../../lib/clsxm';
import { Typography } from '../typography/Typography';

export type BoxTitleProps = {
  title: string;
};

export function BoxTitle({ title }: BoxTitleProps) {
  return (
    <Typography variant="h3" weight="medium" as="h3">
      {title}
    </Typography>
  );
}

export type BoxHeaderProps = {
  children: ReactNode;
  className?: string;
};

export function BoxHeader({ className, children }: BoxHeaderProps) {
  return (
    <div className={clsxm('pr-8 flex items-center', className)}>
      <div className="bg-orange h-full min-h-[28px] w-1 rounded-r-full relative mr-7" />
      {children}
    </div>
  );
}

export type BoxContentProps = {
  children: ReactNode;
  className?: string;
};

export function BoxContent({ className, children }: BoxHeaderProps) {
  return <div className={clsxm('px-8 mt-6', className)}>{children}</div>;
}

export type BoxProps = {
  children: ReactNode;
  className?: string;
};

export function Box({ className, children }: BoxProps) {
  return (
    <div
      className={clsxm(
        'bg-white rounded-xl py-8 drop-shadow-large w-max',
        className,
      )}
    >
      {children}
    </div>
  );
}
