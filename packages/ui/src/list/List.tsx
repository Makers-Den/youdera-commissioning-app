import { ReactNode } from 'react';

import clsxm from '../utils/clsxm';

export type ListItemProps = {
  children: ReactNode;
} & React.ComponentPropsWithRef<'li'>;

export function ListItem({ children }: ListItemProps) {
  return (
    <li className="rounded-md border border-gray-500 bg-gray-100 py-4 px-6">
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

export function List({ children, direction = 'vertical' }: ListProps) {
  return (
    <ol className={clsxm('flex', directionClassName[direction])}>{children}</ol>
  );
}
