import { SVGProps } from 'react';

export function Close(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 11 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.14453 5.125L9.68359 2.58594C10.0137 2.28125 10.0137 1.77344 9.68359 1.46875L9.125 0.910156C8.82031 0.580078 8.3125 0.580078 8.00781 0.910156L5.46875 3.44922L2.9043 0.910156C2.59961 0.580078 2.0918 0.580078 1.78711 0.910156L1.22852 1.46875C0.898438 1.77344 0.898438 2.28125 1.22852 2.58594L3.76758 5.125L1.22852 7.68945C0.898438 7.99414 0.898438 8.50195 1.22852 8.80664L1.78711 9.36523C2.0918 9.69531 2.59961 9.69531 2.9043 9.36523L5.46875 6.82617L8.00781 9.36523C8.3125 9.69531 8.82031 9.69531 9.125 9.36523L9.68359 8.80664C10.0137 8.50195 10.0137 7.99414 9.68359 7.68945L7.14453 5.125Z"
        fill="currentColor"
      />
    </svg>
  );
}