import * as React from "react";
import { SvgIcon } from "../svg-icons/SvgIcon";

type CheckboxProps = {
  checked: boolean;
  disabled?: boolean;
  label?: string;
  onClick: () => void;
};

export const Checkbox: React.FC<CheckboxProps> = (
  {
    checked,
    label,
    onClick
  }) => {
  return (
    <div className="flex items-center">
      <div className="flex relative items-center hover:cursor-pointer" onClick={onClick}>
        <div
          className={`appearance-none w-4 h-4 rounded-sm hover:cursor-pointer ${checked ? "bg-green" : "border-2 border-gray-secondary"}`}
        />
        {checked &&
          <SvgIcon
            name="Check"
            className="fill-white absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-3 h-3"
          />
        }
      </div>
      {label &&
        <span className="text-gray-secondary ml-2">
          {label}
        </span>}
    </div>
  );
}
