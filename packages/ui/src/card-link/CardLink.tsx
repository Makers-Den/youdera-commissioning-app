import { ReactNode } from 'react';
import clsxm from '../../lib/clsxm';
import { SvgIcon } from '../svg-icons/SvgIcon';
import { Typography } from '../typography/Typography';

export type CardLinkProps = {
  href: string;
  title: string;
  icon: ReactNode;
  disabled?: boolean;
};

export function CardLink({ href, title, icon, disabled }: CardLinkProps) {
  return (
    <a
      className={clsxm(
        'flex flex-col p-5 bg-gray-100 rounded-md aspect-square w-52',
        disabled ? 'pointer-events-none' : 'cursor-pointer',
      )}
      href={href}
    >
      <Typography
        variant="body"
        as="h3"
        className={clsxm(
          'flex justify-between items-center font-medium',
          disabled && 'text-gray-500',
        )}
      >
        {title}

        <SvgIcon name="ChevronRight" className="h-4 text-inherit" />
      </Typography>
      <div
        className={clsxm(
          'flex-1 flex w-full justify-center items-center',
          disabled && 'grayscale',
        )}
      >
        {icon}
      </div>
    </a>
  );
}
