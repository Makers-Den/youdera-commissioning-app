import { SVGProps } from 'react';

export function BatteryRect(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" {...props}>
      <rect x="1.27832" y="1.06714" width="24" height="24" rx="4.5" stroke="#5CB85C" />
      <line x1="10.0283" y1="7.73389" x2="10.0283" y2="19.2339" stroke="#5CB85C" strokeLinecap="round" />
      <line x1="18.7783" y1="7.73389" x2="18.7783" y2="19.2339" stroke="#5CB85C" strokeLinecap="round" />
      <line x1="16.6953" y1="10.6504" x2="16.6953" y2="16.3171" stroke="#5CB85C" strokeLinecap="round" />
      <line x1="7.94531" y1="10.6504" x2="7.94531" y2="16.3171" stroke="#5CB85C" strokeLinecap="round" />
      <line x1="7.86133" y1="13.5671" x2="0.777995" y2="13.5671" stroke="#5CB85C" />
      <line x1="25.3613" y1="13.5671" x2="18.6947" y2="13.5671" stroke="#5CB85C" />
      <rect x="1.27832" y="1.06714" width="24" height="24" rx="4.5" stroke="#5CB85C" />
      <line x1="25.3613" y1="13.5671" x2="18.6947" y2="13.5671" stroke="#5CB85C" />
      <line x1="15.7783" y1="13.5671" x2="10.3617" y2="13.5671" stroke="#5CB85C" strokeDasharray="4 4" />
    </svg>
  );
}
