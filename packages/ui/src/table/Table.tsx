import { ReactNode } from 'react';

import clsxm from '../utils/clsxm';

export type TheadProps = {
  className?: string;
  children: ReactNode;
};

export function Thead({ className, children }: TheadProps) {
  return <thead className={clsxm(className)}>{children}</thead>;
}

export type TbodyProps = {
  className?: string;
  children: ReactNode;
};

export function Tbody({ className, children }: TbodyProps) {
  return <tbody className={clsxm(className)}>{children}</tbody>;
}

export type TrProps = {
  className?: string;
  onClick?: (value?: any) => void
  children: ReactNode;
} & React.ComponentPropsWithRef<'tr'>;

export function Tr({ className, children, ...props }: TrProps) {
  return (
    <tr {...props} className={clsxm(className)}>
      {children}
    </tr>
  );
}

export type ThProps = {
  className?: string;
  children: ReactNode;
  colSpan?: number;
};

export function Th({ className, children, colSpan }: ThProps) {
  return (
    <th colSpan={colSpan} className={clsxm(className, 'pr-4 text-sm font-normal text-gray-700')}>
      {children}
    </th>
  );
}

export type TdProps = {
  className?: string;
  children: ReactNode;
  colSpan?: number;
};

export function Td({ className, children, colSpan }: TdProps) {
  return (
    <td
      colSpan={colSpan}
      className={clsxm(
        className,
        'bg-gray-100 py-4 pr-4 text-left  text-sm font-medium text-gray-700',
        'border-y border-gray-400',
        'first:rounded-l-md first:border-l first:pl-3',
        'last:rounded-r-md last:border-r',
      )}
    >
      {children}
    </td>
  );
}

export type TableProps = {
  className?: string;
  children: ReactNode;
};

export function Table({ className, children }: TableProps) {
  return (
    <table className={clsxm(className, 'table-spacing table-auto text-left')}>
      {children}
    </table>
  );
}
