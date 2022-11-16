import React from 'react';
import { Meta } from '@storybook/react';
import { H3 } from 'ui/typography/Typography';
import { CenterWrapper } from './utils/CenterWrapper';

export default {
  title: 'Theme/Colors',
} as Meta;

export const Overview = () => (
  <CenterWrapper>
    <div className="flex items-start space-x-6">
      <div className="flex flex-col justify-center items-center gap-2">
        <H3>Orange</H3>
        <div className="flex items-center justify-center w-10 h-10 bg-orange-100">
          100
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-orange-300">
          300
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-orange-400">
          400
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-orange-600">
          600
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <H3>Green</H3>
        <div className="flex items-center justify-center w-10 h-10 bg-green-100">
          100
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-green-200">
          200
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-green-300">
          300
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-green-400">
          400
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-green-600">
          600
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <H3>Gray</H3>
        <div className="flex items-center justify-center w-10 h-10 bg-gray-100">
          100
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-gray-300">
          300
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-gray-400">
          400
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-gray-500">
          500
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-gray-600 text-white">
          600
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-gray-700 text-white">
          700
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-gray-800 text-white">
          800
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-gray-900 text-white">
          900
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-gray-1000 text-white">
          1000
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <H3>Yellow</H3>
        <div className="flex items-center justify-center w-10 h-10 bg-yellow-400">
          400
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-yellow-600">
          600
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <H3>Blue</H3>
        <div className="flex items-center justify-center w-10 h-10 bg-blue-200">
          200
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-blue-400 text-white">
          400
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-blue-700 text-white">
          700
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-blue-800 text-white">
          800
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <H3>Red</H3>
        <div className="flex items-center justify-center w-10 h-10 bg-red-100">
          100
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-red-300">
          300
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-red-400">
          400
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-red-600">
          600
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <H3>Purple</H3>
        <div className="flex items-center justify-center w-10 h-10 bg-purple-200">
          200
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-purple-400 text-white">
          400
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-purple-600 text-white">
          600
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-purple-800 text-white">
          800
        </div>
      </div>
    </div>
  </CenterWrapper>
);
