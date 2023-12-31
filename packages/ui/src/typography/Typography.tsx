import React, { CSSProperties } from 'react';

import clsxm from '../utils/clsxm';

export type TypographyVariant =
  | 'note'
  | 'body'
  | 'bodySmall'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'label';

export type TypographyWeight = 'normal' | 'medium' | 'bold';

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
    | 'li'
    | 'label';
  className?: string;
  children?: React.ReactNode;
  id?: string;
  style?: CSSProperties | undefined;
  weight?: 'normal' | 'medium' | 'bold';
}

export const variantToClasses: { [key in TypographyVariant]: string[] } = {
  note: ['text-xs', 'text-current', 'font-primary'],
  body: ['text-base', 'text-current', 'font-primary'],
  bodySmall: ['text-sm', 'text-current', 'font-primary'],
  h1: ['text-3xl md:text-2xl', 'text-current', 'font-primary'],
  h2: ['text-2xl md:text-xl', 'text-current', 'font-primary'],
  h3: ['text-lg', 'text-current', 'font-primary'],
  label: ['text-[14px]', 'text-current', 'font-primary'],
};

export const weightToClasses: { [key in TypographyWeight]: string[] } = {
  normal: ['font-normal'],
  medium: ['font-medium'],
  bold: ['font-bold'],
};

/**
 * Simple typography component
 */
export function Typography({
  variant = 'body',
  as = 'p',
  weight = 'normal',
  className,
  children,
  ...rest
}: TypographyProps) {
  return React.createElement(
    as,
    {
      className: clsxm(
        'text-gray-700',
        variantToClasses[variant],
        weightToClasses[weight],
        className,
      ),
      ...rest,
    },
    children,
  );
}

export type TypographyPropsWithoutVariant = Omit<TypographyProps, 'variant'>;

/** Equivalent to "Paragraph" in Design System */
export const BodyText = (props: TypographyPropsWithoutVariant) => (
  <Typography variant="body" as="p" {...props} />
);

export const BodySmallText = (props: TypographyPropsWithoutVariant) => (
  <Typography variant="bodySmall" as="p" {...props} />
);

export const NoteText = (props: TypographyPropsWithoutVariant) => (
  <Typography variant="note" as="p" {...props} />
);

/** There should only be one instance of an H1 tag on the page */
export const H1 = (props: TypographyPropsWithoutVariant) => (
  <Typography variant="h1" as="h1" {...props} />
);

export const H2 = (props: TypographyPropsWithoutVariant) => (
  <Typography variant="h2" as="h2" {...props} />
);

export const H3 = (props: TypographyPropsWithoutVariant) => (
  <Typography variant="h3" as="h3" {...props} />
);

export const Label = (props: TypographyPropsWithoutVariant) => (
  <Typography variant="label" as="label" {...props} />
);

/** For big statistics numbers. Looks like h1 style, but isn't a semantic h1 */
export const Stat = ({
  className,
  ...restProps
}: TypographyPropsWithoutVariant) => (
  <Typography
    variant="h1"
    as="span"
    className={clsxm('block', className)}
    {...restProps}
  />
);

/** For bullet list items. Styled like bodyLarge  */
export const Bullet = (props: TypographyPropsWithoutVariant) => (
  <Typography variant="body" as="li" {...props} />
);
