import React, { useState } from 'react';
import Slider from 'react-slider';

import { BodyText, Label, NoteText } from '../typography/Typography';
import clsxm from '../utils/clsxm';

const MIN = 0;
const MAX = 24;

export const TimeRangeInput = ({
  onChange,
}: {
  onChange: (value: [from: number, to: number]) => void;
}) => {
  const [values, setValues] = useState<[from: number, to: number]>([MIN, MAX]);
  const handleChange = (value: [from: number, to: number]) => {
    setValues(value);
    onChange(value);
  };
  return (
    <div className="flex flex-col">
      <Label>Opening time</Label>
      <div className="mb-4" />
      <div className="w-full flex justify-between text-gray-500">
        <NoteText>{MIN}:00</NoteText>
        <NoteText className="text-gray-1000">
          {values[1] - values[0]} hours
        </NoteText>
        <NoteText>{MAX}:00</NoteText>
      </div>
      <div className="mb-1" />
      <Slider
        value={values}
        min={MIN}
        max={MAX}
        minDistance={1}
        withTracks
        className={clsxm(
          'w-full h-5 flex items-center [&>.track-1]:bg-brand-one-400',
          '[&>.track-0]:h-[2px] [&>.track-2]:h-[2px]',
        )}
        onChange={handleChange}
        renderThumb={(props, state) => (
          <div
            {...props}
            className={clsxm(
              props.className,
              'bg-brand-one-400 w-5 h-5 rounded-full ',
              'bottom-1/2 translate-y-1/2',
              'focus-visible:outline-none',
              'cursor-pointer relative',
            )}
          >
            <BodyText
              weight="medium"
              className="absolute top-full left-1/2 -translate-x-1/2"
            >
              {state.valueNow}:00
            </BodyText>
          </div>
        )}
        renderTrack={props => (
          <div
            {...props}
            className={clsxm(
              props.className,
              'bg-gray-1000 w-auto h-1 rounded-full',
            )}
          />
        )}
      />
    </div>
  );
};
