import { SVGProps } from 'react';

export function ChevronDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 11 8"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.46875 7.03125C5.75 7.3125 6.21875 7.3125 6.5 7.03125L10.75 2.78125C11.0625 2.46875 11.0625 2 10.75 1.71875L10.0625 1C9.75 0.71875 9.28125 0.71875 9 1L5.96875 4.03125L2.96875 1C2.6875 0.71875 2.21875 0.71875 1.90625 1L1.21875 1.71875C0.90625 2 0.90625 2.46875 1.21875 2.78125L5.46875 7.03125Z"
      />
    </svg>
  );
}
