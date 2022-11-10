import { ReactNode } from 'react';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { BodyText, H2 } from 'ui/typography/Typography';

export type SuccessPageContentProps = {
  title: string;
  subTitle?: string;
  children?: ReactNode;
};

export function SuccessPageContent({
  title,
  subTitle,
  children,
}: SuccessPageContentProps) {
  return (
    <div className="my-auto flex max-w-fit flex-col items-center">
      <SvgIcon name="ThumbsUp" className="w-18 mb-5 h-16 fill-gray-400" />
      <H2 className="mb-2 font-medium">{title}</H2>
      {subTitle && (
        <BodyText className="mb-8 w-80 text-center">{subTitle}</BodyText>
      )}
      {children && <div className="mb-3">{children}</div>}
    </div>
  );
}
