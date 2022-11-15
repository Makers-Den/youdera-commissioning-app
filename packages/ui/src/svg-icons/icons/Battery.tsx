import { SVGProps } from 'react';

export function Bettery(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" {...props}>
      <rect x="0.5" y="0.5" width="24" height="24" rx="3.97826" fill="white" />
      <rect x="0.5" y="0.5" width="24" height="24" rx="3.97826" fill="#5CB85C" fillOpacity="0.2" />
      <rect x="0.5" y="0.5" width="24" height="24" rx="3.97826" stroke="#5CB85C" />
    </svg>
  )
}