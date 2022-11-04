import { SVGProps } from 'react';

export function Profile(props: SVGProps<SVGSVGElement>) {
  return (
    <svg version="1.1" viewBox="0 0 1000 1000" {...props}>
      <g>
        <path 
          fill="currentColor"
          d="M500,10C229.4,10,10,229.4,10,500c0,270.6,219.4,490,490,490c270.6,0,490-219.4,490-490C990,229.4,770.6,10,500,10z M500,156.5c89.5,0,162.1,72.6,162.1,162.1c0,89.5-72.6,162.1-162.1,162.1c-89.5,0-162.1-72.6-162.1-162.1C337.9,229.1,410.5,156.5,500,156.5z M499.9,861.9c-89.3,0-171.1-32.5-234.2-86.3c-15.4-13.1-24.2-32.3-24.2-52.5c0-90.8,73.5-163.4,164.3-163.4h188.6c90.8,0,164,72.6,164,163.4c0,20.2-8.8,39.4-24.2,52.5C671,829.3,589.2,861.9,499.9,861.9z"
        />
      </g>
    </svg>
  )
}