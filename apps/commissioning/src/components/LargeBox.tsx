import { ReactNode } from 'react';
import { Box } from 'ui/box/Box';

export type LargeBoxProps = {
  children: ReactNode;
};

export function LargeBox({ children }: LargeBoxProps) {
  return (
    <Box className="mx-3 mb-auto w-full md:mx-auto md:w-0 md:min-w-[700px]">
      {children}
    </Box>
  );
}
