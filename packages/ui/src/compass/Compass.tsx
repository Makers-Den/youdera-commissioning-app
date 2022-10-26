import React from 'react'
import { CompassArrow } from '../svg-icons/icons/CompassArrow'
import { CompassBackground } from '../svg-icons/icons/CompassBackground'
import clsxm from '../../lib/clsxm';
type CompassProps = {
  azimut: string;
  className?: string;
}
export const Compass: React.FC<CompassProps> = ({ azimut, className }) => {
  return (
    <div className={clsxm('relative w-32 h-32', className)}>
      <CompassArrow className={clsxm(
        'absolute h-full w-5/12 top-1/2 left-1/2 z-20 origin-center',
        '-translate-x-1/2 -translate-y-1/2'
      )}
        style={{ transform: `translate(-50%,-50%) rotate(${azimut}deg) `, transformOrigin: 'center' }}
      />
      <CompassBackground className={clsxm(
        'absolute top-1/2 left-1/2 z-0 h-full w-full',
        '-translate-x-1/2 -translate-y-1/2'
      )}
      />
    </div>
  )
}
