import dynamic from "next/dynamic";

/**
 * Opts out of server side rendering. 
 */
// eslint-disable-next-line react/jsx-no-useless-fragment
export const NoSsr = dynamic(() => Promise.resolve(({ children }: { children?: React.ReactNode }): JSX.Element => <>{children}</>), {
ssr: false
}) as (props: any) => JSX.Element;
  