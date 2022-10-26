import { SVGProps, useEffect, useRef } from 'react';
type CompassArrowProps = {
  rotationAngle: number;
}

export const CompassArrow: React.FC<CompassArrowProps> = ({ rotationAngle }) => (
  <g style={{ transform: `rotate(${rotationAngle}deg) `, transformOrigin: 'center' }}>
    <g filter="url(#filter0_d_331_918)">
      <path
        d="M82.3999 51C74.8888 51 68.7998 57.089 68.7998 64.6001C68.7998 67.1528 69.5031 69.5412 70.7264 71.5821L81.7882 90.762C82.1774 91.437 83.1549 91.4271 83.5306 90.7444L94.0734 71.5821C95.2967 69.5412 96 67.1528 96 64.6001C96 57.089 89.911 51 82.3999 51Z"
        fill="#CE6A00"
      />
    </g>
    <g filter="url(#filter1_d_331_918)">
      <path
        d="M82.3999 77.7996C89.911 77.7996 96 71.7106 96 64.1995C96 61.6468 95.2967 59.2584 94.0734 57.2174L83.0116 38.0376C82.6224 37.3626 81.6449 37.3725 81.2692 38.0552L70.7264 57.2174C69.5031 59.2584 68.7998 61.6468 68.7998 64.1995C68.7998 71.7106 74.8888 77.7996 82.3999 77.7996Z"
        fill="#F57E02"
      />
    </g>
    <ellipse cx="82.5" cy="64.5" rx="5.5" ry="5.5" transform="rotate(-90 82.5 64.5)" fill="#F6F7FA" />
  </g>
);
