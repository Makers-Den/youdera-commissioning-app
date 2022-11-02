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
  children: ReactNode;
};

export function Tr({ className, children }: TrProps) {
  return <tr className={clsxm(className)}>{children}</tr>;
}

export type ThProps = {
  className?: string;
  children: ReactNode;
};

export function Th({ className, children }: ThProps) {
  return (
    <th className={clsxm(className, 'text-sm text-gray-700 font-normal pr-4')}>
      {children}
    </th>
  );
}

export type TdProps = {
  className?: string;
  children: ReactNode;
};

export function Td({ className, children }: TdProps) {
  return (
    <td
      className={clsxm(
        className,
        'text-sm text-gray-700 text-left font-medium  bg-gray-100 py-4 pr-4',
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
    <table className={clsxm(className, 'table-auto text-left table-spacing')}>
      {children}
    </table>
  );
}
