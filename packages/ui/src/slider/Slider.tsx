import React, { ReactNode } from 'react';
import ReactSlider from 'react-slider';

import { NoteText } from '../typography/Typography';
import clsxm from '../utils/clsxm';

export type SliderProps = {
  onChange?: (value: number) => void;
  value?: number;
  label?: ReactNode;
  min: number;
  max: number;
};
export const Slider = ({ onChange, value, label, min, max }: SliderProps) => (
  <div className="flex flex-col">
    {label && <div>{label}</div>}
    <div className="mb-2 mt-1">
      <ReactSlider
        value={value}
        min={min}
        max={max}
        className={clsxm('flex h-5 w-full items-center')}
        onChange={onChange}
        renderThumb={props => (
          <div
            {...props}
            className={clsxm(
              props.className,
              'bg-brand-one-400 h-5 w-5 rounded-full',
              'bottom-1/2 translate-y-1/2',
              'focus-visible:outline-none',
              'relative cursor-pointer',
              `before:text-brand-one-400 before:h-[5px] before:w-[1px] before:rounded-[1px] before:content-['']`,
            )}
          >
            <span
              className={clsxm(
                'absolute',
                'h-[5px] w-[2px] rounded-full',
                'bg-brand-one-400',
                'mx-auto',
                'left-0 right-0 top-[-5px]',
              )}
            />
          </div>
        )}
        renderTrack={props => (
          <div
            {...props}
            className={clsxm(props.className, 'h-1 w-auto bg-gray-500')}
          />
        )}
      />
      <div className={clsxm('flex justify-between', 'text-gray-500')}>
        <NoteText>{min}</NoteText>
        <NoteText>{max}</NoteText>
      </div>
    </div>
  </div>
);
