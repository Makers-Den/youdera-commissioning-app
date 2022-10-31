import { SVGProps } from 'react';

export function Plus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18 9C18 9.76543 17.38 10.385 16.6154 10.385H10.3846V16.6158C10.3846 17.3813 9.76457 18 9 18C8.23543 18 7.61539 17.3813 7.61539 16.6158V10.385H1.38462C0.620048 10.385 0 9.76543 0 9C0 8.23457 0.620048 7.61582 1.38462 7.61582H7.61539V1.38505C7.61539 0.619615 8.23543 0 9 0C9.76457 0 10.3846 0.619615 10.3846 1.38505V7.61582H16.6154C17.3813 7.61538 18 8.23413 18 9Z"
        fill="currentColor"
      />
    </svg>
  );
}
