import { SVGProps } from 'react';

import { Image, ImageProps } from '../image/Image';
import { SvgIcon } from '../svg-icons/SvgIcon';

type ImagePreviewerProps = {
  // eslint-disable-next-line react/require-default-props
  onDeleteClick: SVGProps<SVGSVGElement>['onClick'];
} & ImageProps;

export function ImagePreviewer({
  onDeleteClick,
  ...imageProps
}: ImagePreviewerProps) {
  return (
    <div className="flex items-start gap-6">
      <div>
        <Image
          objectFit="cover"
          objectPosition="center"
          className="aspect-[2/1] w-full rounded-md"
          {...imageProps}
        />
      </div>
      <div className="flex flex-col items-center gap-5">
        <SvgIcon
          onClick={onDeleteClick}
          name="Trashbin"
          className="w-5 cursor-pointer text-gray-600 hover:text-gray-300"
        />
      </div>
    </div>
  );
}

function isImage(fileType: string) {
  return fileType.startsWith('image');
}

export type FilePreviewerProps = {
  url: string;
  name: string;
  type: string;
  onDeleteClick: SVGProps<SVGSVGElement>['onClick'];
  imageProps?: ImageProps;
  wrapperClassName?: string;
};

export function FilePreviewer({
  url,
  name,
  type,
  onDeleteClick,
  imageProps,
  wrapperClassName,
}: FilePreviewerProps) {
  if (isImage(type)) {
    return (
      <div className={wrapperClassName}>
        <ImagePreviewer
          onDeleteClick={onDeleteClick}
          src={url}
          alt={name}
          {...imageProps}
        />
      </div>
    );
  }

  return null;
}
