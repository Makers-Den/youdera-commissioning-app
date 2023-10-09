import React, { ReactNode } from 'react';
import { H1, H2 } from 'ui/typography/Typography';
import clsxm from 'ui/utils/clsxm';

import styles from './Container.module.css';

export const Container = ({
  title,
  subTitle,
  children,
  clippedTitle,
  leftSection,
  className,
}: {
  title: string;
  subTitle?: string;
  children: ReactNode;
  clippedTitle?: boolean;
  leftSection?: ReactNode;
  className?: string;
}) => (
  <>
    <main className="row-span-full grid h-full min-h-[calc(100vh-4rem)] grid-cols-1 bg-white md:grid-cols-2">
      <div className="relative col-span-1 hidden h-full bg-red-400 md:flex">
        {leftSection}
      </div>
      <div className="relative col-span-1 flex w-full flex-col ">
        <div
          className={clsxm(
            'bg-brand-one-400 p-4 text-white md:px-12 lg:px-24',
            clippedTitle && 'pb-6',
            clippedTitle && styles.roundedClip,
          )}
        >
          <H1 weight="medium" className="max-w-xs">
            {title}
          </H1>
        </div>
        {subTitle && (
          <div className="-mt-3 w-full bg-gray-300 px-4 pb-6 pt-8 md:px-12 lg:px-24">
            <H2 weight="medium" className="max-w-xs">
              {subTitle}
            </H2>
          </div>
        )}
        <div
          className={clsxm(
            'relative flex flex-1 flex-col justify-between gap-16 overflow-hidden bg-white p-5 md:px-12 md:py-7 lg:px-24',
            className,
          )}
        >
          {children}
        </div>
      </div>
    </main>
    {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
    <ClipPaths />
  </>
);

const ClipPaths = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 390 71"
    fill="none"
    className="absolute top-0 h-0 w-0"
  >
    <clipPath id="roundedClip" clipPathUnits="objectBoundingBox">
      <path
        transform="scale(0.0025641,0.0140845)"
        d="M0 0H390V71C279.5 59.3987 107.5 59.3987 0 71V0Z"
        fill="#EA7A04"
      />
    </clipPath>
  </svg>
);
