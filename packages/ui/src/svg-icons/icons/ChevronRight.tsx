import { SVGProps } from 'react';

export function ChevronRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.03125 6.53125C7.3125 6.25 7.3125 5.78125 7.03125 5.5L2.78125 1.25C2.46875 0.9375 2 0.9375 1.71875 1.25L1 1.9375C0.71875 2.25 0.71875 2.71875 1 3L4.03125 6.03125L1 9.03125C0.71875 9.3125 0.71875 9.78125 1 10.0937L1.71875 10.7812C2 11.0937 2.46875 11.0937 2.78125 10.7812L7.03125 6.53125Z"
        fill="currentColor"
      />
    </svg>
  );
}
