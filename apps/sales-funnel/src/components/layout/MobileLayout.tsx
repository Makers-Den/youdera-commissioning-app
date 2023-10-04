import React, { ReactNode } from 'react';
import { H2 } from 'ui/typography/Typography';
import clsxm from 'ui/utils/clsxm';

import styles from './MobileLayout.module.css';

import { Navbar } from '../Navbar';

export const MobileLayout = ({
  title,
  children,
  clipped,
}: {
  title: string;
  children: ReactNode;
  clipped?: boolean;
}) => (
  <body className="flex min-h-screen flex-col bg-white">
    <Navbar />
    <main className="flex h-0 min-h-[calc(100vh-4rem)] flex-col bg-white">
      <div
        className={clsxm(
          'bg-brand-one-400 w-full p-4',
          clipped && 'pb-7',
          clipped && styles.roundedClip,
        )}
      >
        <H2 as="h1" weight="medium">
          {title}
        </H2>
      </div>
      {children}
    </main>
    {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
    <ClipPaths />
  </body>
);

// TODO ? refactor clip paths
const ClipPaths = () => (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 390 71"
      fill="none"
      className="absolute top-0 w-full"
    >
      <clipPath id="roundedClip">
        <path
          d="M0 0H390V71C279.5 59.3987 107.5 59.3987 0 71V0Z"
          fill="#EA7A04"
        />
      </clipPath>
    </svg>
    <svg
      className="absolute top-0 w-full"
      xmlns="http://www.w3.org/2000/svg"
      height="75"
      viewBox="0 0 640 75"
      fill="none"
    >
      <clipPath id="roundedClipLarge">
        <path
          d="M0 0H640V75C458.667 62.7451 176.41 62.7451 0 75V0Z"
          fill="#EA7A04"
        />
      </clipPath>
    </svg>
  </>
);
