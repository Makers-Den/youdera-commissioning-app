import { SVGProps } from 'react';

export function CompassArrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="52"
      height="79"
      viewBox="0 0 52 79"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_d_331_925)">
        <path d="M26.3999 25C18.8888 25 12.7998 31.089 12.7998 38.6001C12.7998 41.1528 13.5031 43.5412 14.7264 45.5821L25.7882 64.762C26.1774 65.437 27.1549 65.4271 27.5306 64.7444L38.0734 45.5821C39.2967 43.5412 40 41.1528 40 38.6001C40 31.089 33.911 25 26.3999 25Z" fill="#CE6A00" />
      </g>
      <g filter="url(#filter1_d_331_925)">
        <path d="M26.3999 51.7996C33.911 51.7996 40 45.7106 40 38.1995C40 35.6468 39.2967 33.2584 38.0734 31.2174L27.0116 12.0376C26.6224 11.3626 25.6449 11.3725 25.2692 12.0552L14.7264 31.2174C13.5031 33.2584 12.7998 35.6468 12.7998 38.1995C12.7998 45.7106 18.8888 51.7996 26.3999 51.7996Z" fill="#F57E02" />
      </g>
      <ellipse cx="26.5" cy="38.5" rx="5.5" ry="5.5" transform="rotate(-90 26.5 38.5)" fill="#F6F7FA" />
      <defs>
        <filter id="filter0_d_331_925" x="0.799805" y="14" width="51.2002" height="64.2624" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="6" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.960784 0 0 0 0 0.494118 0 0 0 0 0.00784314 0 0 0 0.3 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_331_925" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_331_925" result="shape" />
        </filter>
        <filter id="filter1_d_331_925" x="0.799805" y="0.537201" width="51.2002" height="64.2624" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="6" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.960784 0 0 0 0 0.494118 0 0 0 0 0.00784314 0 0 0 0.3 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_331_925" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_331_925" result="shape" />
        </filter>
      </defs>
    </svg>

  );
}
