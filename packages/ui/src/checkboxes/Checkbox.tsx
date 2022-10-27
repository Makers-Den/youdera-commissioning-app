import * as React from 'react';
import { SvgIcon } from '../svg-icons/SvgIcon';
import { Label } from '../typography/Typography';

type CheckboxProps = {
  isChecked: boolean;
  label?: string;
  onClick: () => void;
} & React.ComponentPropsWithRef<'input'>;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, isChecked, onClick, ...rest }, ref) => {
    return (
      <div className="flex items-center">
        <label className="flex relative items-center hover:cursor-pointer">
          <input
            ref={ref}
            type="checkbox"
            onClick={onClick}
            className="hidden"
          />
          {isChecked ? (
            <span
              aria-hidden="true"
              className={`w-4 h-4 rounded-sm border-2 border-gray-500`}
            />
          ) : (
            <span className="bg-green-400 w-4 h-4 rounded-sm">
              <SvgIcon
                name="Check"
                aria-hidden="true"
                className="fill-white absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-3 h-3 "
              />
            </span>
          )}
        </label>

        {label && (
          <Label className="text-gray-500 ml-2 font-medium">{label}</Label>
        )}
      </div>
    );
  },
);
