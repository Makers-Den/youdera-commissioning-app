import { Dispatch, useCallback, useLayoutEffect, useRef } from 'react';

export const useSafeDispatch = <T extends Dispatch<any>>(dispatch: T) => {
  const mountedRef = useRef(false);

  useLayoutEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      //@ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      mountedRef.current && dispatch(...args);
    },
    [dispatch],
  );
};
