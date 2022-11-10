import { ReactNode } from 'react';

import clsxm from '../utils/clsxm';

export type ListItemProps = {
  children: ReactNode;
  variant: 'primary' | 'withoutPadding';
} & React.ComponentPropsWithRef<'li'>;

export function ListItem({
  children,
  className,
  variant = 'primary',
  ...props
}: ListItemProps) {
  return (
    <li
      className={clsxm(
        'rounded-md border border-gray-500 bg-gray-100',
        variant !== 'withoutPadding' && 'py-4 px-6',
        className,
      )}
      {...props}
    >
      {children}
    </li>
  );
}

export type ListDirection = 'horizontal' | 'vertical';

export type ListProps = {
  children: ReactNode;
  direction?: ListDirection;
} & React.ComponentPropsWithRef<'ol'>;

const directionClassName: Record<ListDirection, string> = {
  vertical: 'flex-col gap-3',
  horizontal: 'gap-5',
};

export function List({
  className,
  children,
  direction = 'vertical',
  ...props
}: ListProps) {
  return (
    <ol
      className={clsxm('flex', directionClassName[direction], className)}
      {...props}
    >
      {children}
    </ol>
  );
}
