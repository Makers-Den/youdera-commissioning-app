import React, { SVGProps } from 'react';

export const MeterAlt = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    {...props}
  >
    <mask id="path-1-inside-1_392_6950" fill="white">
      <path d="M32 16C32 11.7565 30.3143 7.68687 27.3137 4.68629C24.3131 1.68571 20.2435 3.20373e-07 16 0C11.7565 -3.20373e-07 7.68687 1.68571 4.68629 4.68629C1.68571 7.68687 6.40745e-07 11.7565 0 16L16 16H32Z" />
    </mask>
    <path
      d="M32 16C32 11.7565 30.3143 7.68687 27.3137 4.68629C24.3131 1.68571 20.2435 3.20373e-07 16 0C11.7565 -3.20373e-07 7.68687 1.68571 4.68629 4.68629C1.68571 7.68687 6.40745e-07 11.7565 0 16L16 16H32Z"
      stroke="currentColor"
      strokeWidth="2"
      mask="url(#path-1-inside-1_392_6950)"
    />
    <path
      d="M31.183 11.3249C31.183 11.3249 17.6608 16.2876 15.8706 16.4365C14.0803 16.5853 13.7468 14.4921 15.2382 13.8472C16.7296 13.2022 31.183 11.3249 31.183 11.3249Z"
      fill="currentColor"
    />
  </svg>
);
