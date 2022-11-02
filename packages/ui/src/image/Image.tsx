import clsxm from '../utils/clsxm';

export type ObjectFitOptions =
  | 'contain'
  | 'cover'
  | 'fill'
  | 'none'
  | 'scaleDown';

export type ObjectPositionOptions =
  | 'bottom'
  | 'center'
  | 'left'
  | 'leftBottom'
  | 'leftTop'
  | 'right'
  | 'rightBottom'
  | 'rightTop'
  | 'top';

export type ImageProps = {
  className?: string;
  src: string;
  alt: string;
  objectFit?: ObjectFitOptions;
  objectPosition?: ObjectPositionOptions;
  aspectRatio?: string;
};

const objectFitClassNameMap: Record<ObjectFitOptions, string> = {
  contain: 'object-contain',
  cover: 'object-cover',
  fill: 'object-fill',
  none: 'object-none',
  scaleDown: 'object-scale-down',
};

const objectPositionClassNameMap: Record<ObjectPositionOptions, string> = {
  bottom: 'object-bottom',
  center: 'object-center',
  left: 'object-left',
  leftBottom: 'object-left-bottom',
  leftTop: 'object-left-top',
  right: 'object-right',
  rightBottom: 'object-right-bottom',
  rightTop: 'object-right-top',
  top: 'object-top',
};

export function Image({
  className,
  objectFit,
  objectPosition,
  ...props
}: ImageProps) {
  return (
    <img
      className={clsxm(
        className,
        objectFit && objectFitClassNameMap[objectFit],
        objectPosition && objectPositionClassNameMap[objectPosition],
      )}
      {...props}
    />
  );
}
