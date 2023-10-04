import { Meta } from '@storybook/react';
import React from 'react';
import { H3 } from 'ui/typography/Typography';

import { CenterWrapper } from './utils/CenterWrapper';

export default {
  title: 'Theme/Colors',
} as Meta;

export const Overview = () => (
  <CenterWrapper>
    <div className="flex items-start space-x-6">
      <div className="flex flex-col items-center justify-center gap-2">
        <H3>Orange</H3>
        <div className="bg-brand-one-100 flex h-10 w-10 items-center justify-center">
          100
        </div>
        <div className="bg-brand-one-300 flex h-10 w-10 items-center justify-center">
          300
        </div>
        <div className="bg-brand-one-400 flex h-10 w-10 items-center justify-center">
          400
        </div>
        <div className="bg-brand-one-600 flex h-10 w-10 items-center justify-center">
          600
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <H3>Green</H3>
        <div className="bg-brand-two-100 flex h-10 w-10 items-center justify-center">
          100
        </div>
        <div className="bg-brand-two-200 flex h-10 w-10 items-center justify-center">
          200
        </div>
        <div className="bg-brand-two-300 flex h-10 w-10 items-center justify-center">
          300
        </div>
        <div className="bg-brand-two-400 flex h-10 w-10 items-center justify-center">
          400
        </div>
        <div className="bg-brand-two-600 flex h-10 w-10 items-center justify-center">
          600
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <H3>Gray</H3>
        <div className="flex h-10 w-10 items-center justify-center bg-gray-100">
          100
        </div>
        <div className="flex h-10 w-10 items-center justify-center bg-gray-300">
          300
        </div>
        <div className="flex h-10 w-10 items-center justify-center bg-gray-400">
          400
        </div>
        <div className="flex h-10 w-10 items-center justify-center bg-gray-500">
          500
        </div>
        <div className="flex h-10 w-10 items-center justify-center bg-gray-600 text-white">
          600
        </div>
        <div className="flex h-10 w-10 items-center justify-center bg-gray-700 text-white">
          700
        </div>
        <div className="flex h-10 w-10 items-center justify-center bg-gray-800 text-white">
          800
        </div>
        <div className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white">
          900
        </div>
        <div className="bg-gray-1000 flex h-10 w-10 items-center justify-center text-white">
          1000
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <H3>Yellow</H3>
        <div className="flex h-10 w-10 items-center justify-center bg-yellow-400">
          400
        </div>
        <div className="flex h-10 w-10 items-center justify-center bg-yellow-600">
          600
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <H3>Blue</H3>
        <div className="flex h-10 w-10 items-center justify-center bg-blue-200">
          200
        </div>
        <div className="flex h-10 w-10 items-center justify-center bg-blue-400 text-white">
          400
        </div>
        <div className="flex h-10 w-10 items-center justify-center bg-blue-700 text-white">
          700
        </div>
        <div className="flex h-10 w-10 items-center justify-center bg-blue-800 text-white">
          800
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <H3>Red</H3>
        <div className="bg-danger-100 flex h-10 w-10 items-center justify-center">
          100
        </div>
        <div className="bg-danger-300 flex h-10 w-10 items-center justify-center">
          300
        </div>
        <div className="bg-danger-400 flex h-10 w-10 items-center justify-center">
          400
        </div>
        <div className="bg-danger-600 flex h-10 w-10 items-center justify-center">
          600
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <H3>Purple</H3>
        <div className="flex h-10 w-10 items-center justify-center bg-purple-200">
          200
        </div>
        <div className="flex h-10 w-10 items-center justify-center bg-purple-400 text-white">
          400
        </div>
        <div className="flex h-10 w-10 items-center justify-center bg-purple-600 text-white">
          600
        </div>
        <div className="flex h-10 w-10 items-center justify-center bg-purple-800 text-white">
          800
        </div>
      </div>
    </div>
  </CenterWrapper>
);
