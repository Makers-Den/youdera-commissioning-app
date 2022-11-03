import { ReactNode } from 'react';

export type ListItemProps = {
  children: ReactNode;
};

export function ListItem({ children }: ListItemProps) {
  return (
    <li className="rounded-md border border-gray-500 bg-gray-100 py-4 px-6">
      {children}
    </li>
  );
}

export type ListProps = {
  children: ReactNode;
};

export function List({ children }: ListProps) {
  return <ol className="flex flex-col gap-3">{children}</ol>;
}
