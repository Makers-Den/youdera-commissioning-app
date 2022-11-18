import { SVGProps } from 'react';

export function BatteryRect(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" {...props}>
      <rect x="0.5" y="0.5" width="21" height="21" rx="3.97826" fill="#D3D5DA" stroke="#D3D5DA" />
      <line x1="7.64004" y1="4.9999" x2="7.64004" y2="16.9999" stroke="#6D7381" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="16.4398" y1="4.9999" x2="16.4398" y2="16.9999" stroke="#6D7381" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="13.7997" y1="7.64004" x2="13.7997" y2="14.36" stroke="#6D7381" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="4.9999" y1="7.64004" x2="4.9999" y2="14.36" stroke="#6D7381" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="4.78003" y1="11.0601" x2="2.26003" y2="11.0601" stroke="#6D7381" strokeLinecap="round" />
      <line x1="19.74" y1="11.0601" x2="17.22" y2="11.0601" stroke="#6D7381" strokeLinecap="round" />
      <line x1="11.8201" y1="11.0601" x2="9.30007" y2="11.0601" stroke="#6D7381" strokeLinecap="round" strokeDasharray="1 1.6" />
    </svg>
  );
}
