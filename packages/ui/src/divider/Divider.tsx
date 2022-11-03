import clsxm from '../utils/clsxm';

export type DividerProps = {
  className?: string;
};

export function Divider({ className }: DividerProps) {
  return <hr className={clsxm('h-[1px] border-0 bg-gray-400', className)} />;
}
