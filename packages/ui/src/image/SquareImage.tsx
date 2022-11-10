import { Image, ImageProps } from './Image';
import clsxm from '../utils/clsxm';

export type RoundImageProps = Omit<ImageProps, 'className' | 'objectFit'> & {
  wrapperClassName?: string;
};

export function SquareImage({ wrapperClassName, ...props }: RoundImageProps) {
  return (
    <div className={clsxm(wrapperClassName, 'aspect-square overflow-hidden')}>
      <Image {...props} objectFit="cover" className="h-full w-full" />
    </div>
  );
}
