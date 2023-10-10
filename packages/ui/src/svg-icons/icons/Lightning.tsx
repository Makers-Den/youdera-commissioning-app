import { SVGProps } from 'react';

export function Lightning(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="32"
      viewBox="0 0 18 32"
      fill="none"
      {...props}
    >
      <path
        d="M10.6842 2L1 18.0588H6.89474V30L17 14.3529H10.6842V2Z"
        stroke="currentColor"
      />
    </svg>
  );
}
