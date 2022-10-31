import { SVGProps } from 'react';

export function Problem(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18.7812 14.7812L11.2812 1.75C10.7188 0.78125 9.25 0.75 8.6875 1.75L1.1875 14.7812C0.625 15.75 1.34375 17 2.5 17H17.4688C18.625 17 19.3438 15.7812 18.7812 14.7812ZM10 12.0625C10.7812 12.0625 11.4375 12.7188 11.4375 13.5C11.4375 14.3125 10.7812 14.9375 10 14.9375C9.1875 14.9375 8.5625 14.3125 8.5625 13.5C8.5625 12.7188 9.1875 12.0625 10 12.0625ZM8.625 6.90625C8.59375 6.6875 8.78125 6.5 9 6.5H10.9688C11.1875 6.5 11.375 6.6875 11.3438 6.90625L11.125 11.1562C11.0938 11.375 10.9375 11.5 10.75 11.5H9.21875C9.03125 11.5 8.875 11.375 8.84375 11.1562L8.625 6.90625Z"
        fill="currentColor"
      />
    </svg>
  );
}
