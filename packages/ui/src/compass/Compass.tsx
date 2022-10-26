import React from 'react'
import { CompassArrow } from '../svg-icons/icons/CompassArrow'
import { CompassBackground } from '../svg-icons/icons/CompassBackground'
import clsxm from '../../lib/clsxm';

export const Compass = () => {
  return (
    <div className='relative border-2 border-red-300 w-20 h-20'>

      <CompassArrow className={clsxm(
        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20'
      )} />
      <CompassBackground className={clsxm(
        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0')}
      />

      {/* <div className={clsxm(
        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
        'h-[70.5px] w-[70.5px] bg-white border-[13.5px] border-gray-500 rounded-full'
      )} />
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-[1.5px] bg-white'></div>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1.5px] bg-white'></div> */}
    </div>
  )
}
