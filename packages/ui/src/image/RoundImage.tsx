import { Image, ImageProps } from './Image';
import clsxm from '../utils/clsxm';

export type RoundImageProps = Omit<ImageProps, 'className' | 'objectFit'> & {
  wrapperClassName: string;
};

export function RoundImage({ wrapperClassName, ...props }: RoundImageProps) {
  return (
    <div
      className={clsxm(
        wrapperClassName,
        'aspect-square rounded-full overflow-hidden',
      )}
    >
      <Image {...props} objectFit="cover" className="w-full h-full" />
    </div>
  );
}
