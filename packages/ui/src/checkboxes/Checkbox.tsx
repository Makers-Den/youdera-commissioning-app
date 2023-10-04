import * as React from 'react';

import { SvgIcon } from '../svg-icons/SvgIcon';
import { Label } from '../typography/Typography';
import clsxm from '../utils/clsxm';

type CheckboxProps = {
  isChecked: boolean;
  label?: string;
  dataCy?: string;
  onClick: () => void;
} & React.ComponentPropsWithRef<'input'>;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, isChecked, onClick, dataCy, ...rest }, ref) => (
    <div className="flex items-center">
      <label className="relative flex items-center hover:cursor-pointer">
        <input
          ref={ref}
          type="checkbox"
          onClick={onClick}
          className="hidden"
          disabled={rest.disabled}
        />
        {isChecked ? (
          <span
            aria-hidden="true"
            className={clsxm(
              'h-4 w-4 rounded-sm border-2 border-gray-800',
              rest.disabled && 'border-gray-500',
            )}
            data-cy={dataCy}
          />
        ) : (
          <span className="bg-brand-two-400 h-4 w-4 rounded-sm">
            <SvgIcon
              name="Check"
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 fill-white "
              data-cy={dataCy}
            />
          </span>
        )}
      </label>

      {label && (
        <Label
          className={clsxm(
            'ml-2 font-medium',
            rest.disabled && 'text-gray-500',
          )}
        >
          {label}
        </Label>
      )}
    </div>
  ),
);
