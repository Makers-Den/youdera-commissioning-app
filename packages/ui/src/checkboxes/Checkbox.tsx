import * as React from "react";
import { SvgIcon } from "../svg-icons/SvgIcon";

type CheckboxProps = {
  isChecked: boolean;
  disabled?: boolean;
  label?: string;
  onClick: () => void;
};

export const Checkbox: React.FC<CheckboxProps> = (
  {
    isChecked,
    label,
    onClick
  }) => {
  return (
    <div className="flex items-center">
      <label className="flex relative items-center hover:cursor-pointer">
        <input type="checkbox" onClick={onClick} className='hidden' />
        <div
          aria-hidden="true"
          className={`w-4 h-4 rounded-sm ${isChecked ? "bg-green" : "border-2 border-gray-secondary"}`}
        />
        {isChecked &&
          <SvgIcon
            name="Check"
            aria-hidden="true"
            className="fill-white absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-3 h-3"
          />
        }
      </label>
      {label &&
        <label className="text-gray-secondary ml-2">
          {label}
        </label>
      }
    </div>
  );
}
