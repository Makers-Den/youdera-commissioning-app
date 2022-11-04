import { Box, BoxContent, BoxHeader } from 'ui/box/Box';

// export type LargeBoxSkeletonProps = {};

export function LargeBoxSkeleton() {
  return (
    <Box className="mx-3 mb-auto w-full animate-pulse md:mx-auto md:w-0 md:min-w-[700px]">
      <BoxHeader>
        <div className="h-10 w-full bg-gray-200" />
      </BoxHeader>
      <BoxContent>
        <div className="h-[450px] bg-gray-200" />
      </BoxContent>
    </Box>
  );
}
