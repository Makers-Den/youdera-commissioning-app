import { ReactNode } from 'react';

export type CenterWrapperProps = {
  children: ReactNode;
};

export function CenterWrapper({ children }: CenterWrapperProps) {
  return (
    <div className="flex justify-center py-10 items-center w-full h-full">
      {children}
    </div>
  );
}
