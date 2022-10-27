import React from 'react'
import { CompassArrow } from './CompassArrow'
import { CompassBackground } from './CompassBackground'
import clsxm from '../../lib/clsxm';
type CompassProps = {
  rotationAngle: number;
  className?: string;
}
export const Compass: React.FC<CompassProps> = ({ rotationAngle, className }) => (
  <CompassBackground className={className}>
    <CompassArrow rotationAngle={rotationAngle} />
  </CompassBackground>
)
