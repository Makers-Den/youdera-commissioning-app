import React, { CSSProperties } from 'react';

import clsxm from '../lib/clsxm';

export type TypographyVariant =
  | 'body'
  | 'bodyLarge'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'eyebrow'
  | 'note'
  | 'navLink';
export interface TypographyProps {
  variant?: TypographyVariant;
  // You can make this more extensible if needed
  as?:
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'span'
  | 'div'
  | 'section'
  | 'strong'
  | 'ul'
  | 'ol'
  | 'li';
  className?: string;
  children?: React.ReactNode;
  id?: string;
  style?: CSSProperties | undefined;
}

export const variantToClasses: { [key in TypographyVariant]: string[] } = {
  body: ['text-sm', 'md:text-base', 'lg:text-base', 'text-current'],
  bodyLarge: ['text-lg', 'md:text-xl', 'lg:text-xl', 'text-current'],
  h1: [
    'text-3xl',
    'md:text-6xl',
    'lg:text-6xl',
    'font-bold',
    'text-current',
    'font-headline',
  ],
  h2: [
    'text-xl',
    'md:text-3xl',
    'lg:text-3xl',
    'font-medium',
    'text-current',
    'font-headline',
  ],
  h3: [
    'text-lg',
    'md:text-xl',
    'lg:text-xl',
    'font-medium',
    'text-current',
    'font-headline',
  ],
  h4: [
    'text-sm',
    'md:text-base',
    'lg:text-base',
    'font-medium',
    'text-current',
    'font-headline',
  ],
  eyebrow: [
    'text-sm',
    'md:text-base',
    'lg:text-base',
    'font-medium',
    'text-dark',
    'uppercase',
  ],
  note: ['text-xs', 'text-dark'],
  navLink: ['text-lg', 'font-medium', 'rounded-xl', 'text-primary-800'],
};

/**
 * Simple typography component
 */
export function Typography({
  variant = 'body',
  as = 'p',
  className,
  children,
  ...rest
}: TypographyProps) {
  return React.createElement(
    as,
    {
      className: clsxm(variantToClasses[variant], className),
      ...rest,
    },
    children
  );
}

export type TypographyPropsWithoutVariant = Omit<TypographyProps, 'variant'>;

/** Equivalent to "Paragraph" in Design System */
export const BodyText = (props: TypographyPropsWithoutVariant) => (
  <Typography variant='body' as='p' {...props} />
);

/** Equivalent to "Leading Paragraph" in Design System */
export const BodyLargeText = (props: TypographyPropsWithoutVariant) => (
  <Typography variant='bodyLarge' as='p' {...props} />
);

/** There should only be one instance of an H1 tag on the page */
export const H1 = (props: TypographyPropsWithoutVariant) => (
  <Typography variant='h1' as='h1' {...props} />
);

export const H2 = (props: TypographyPropsWithoutVariant) => (
  <Typography variant='h2' as='h2' {...props} />
);

export const H3 = (props: TypographyPropsWithoutVariant) => (
  <Typography variant='h3' as='h3' {...props} />
);

export const H4 = (props: TypographyPropsWithoutVariant) => (
  <Typography variant='h4' as='h4' {...props} />
);

/** For big statistics numbers. Looks like h1 style, but isn't a semantic h1 */
export const Stat = ({
  className,
  ...restProps
}: TypographyPropsWithoutVariant) => (
  <Typography
    variant='h1'
    as='span'
    className={clsxm('block', className)}
    {...restProps}
  />
);

/** For bullet list items. Styled like bodyLarge  */
export const Bullet = (props: TypographyPropsWithoutVariant) => (
  <Typography variant='bodyLarge' as='li' {...props} />
);
