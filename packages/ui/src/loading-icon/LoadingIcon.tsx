import React from 'react'

interface LoadingIconProps {
  color?: 'white' | 'darkGray'
}

const LoadingIcon: React.FC<LoadingIconProps> = ({ color }) => {
  const iconColor = (color && color === 'darkGray') ? 'bg-darkGray' : 'bg-white'
  return (
    <div className='relative top-1/2 left-1/2 w-7 flex self-baseline'>
      <div className={`absolute ${iconColor} opacity-30 w-7 h-7 rounded-full z-0  -translate-x-1/2 -translate-y-1/2 animate-pulse`} />
      <div className={`absolute ${iconColor} w-[14px] h-[14px] rounded-full z-10  -translate-x-1/2 -translate-y-1/2`} />
    </div>
  )
}

export default LoadingIcon