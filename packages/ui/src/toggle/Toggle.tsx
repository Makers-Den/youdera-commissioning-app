import { Switch } from '@headlessui/react';
import clsxm from '../../lib/clsxm';

export type ToggleProps = {
  checked?: boolean | undefined;
  defaultChecked?: boolean | undefined;
  onChange?(checked: boolean): void;
  name?: string | undefined;
  value?: string | undefined;
  label?: string;
  className?: string;
};

/**
 * API is based on the HeadlessUI Switch
 * https://headlessui.com/react/switch
 */
export const Toggle = function Toggle({
  label,
  checked,
  onChange,
  className,
  ...rest
}: ToggleProps) {
  return (
    <Switch.Group as="div" className={clsxm('flex items-center', className)}>
      <Switch
        checked={checked}
        onChange={onChange}
        className={clsxm(
          checked ? 'bg-green-400' : 'bg-gray-600',
          'relative inline-flex h-5 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
          className,
        )}
        {...rest}
      >
        <span
          aria-hidden="true"
          className={clsxm(
            checked ? 'translate-x-6' : 'translate-x-0',
            'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
          )}
        />
      </Switch>
      {label && (
        <Switch.Label as="span" className="ml-3">
          <span className="text-lg font-medium text-gray-600">{label}</span>
        </Switch.Label>
      )}
    </Switch.Group>
  );
};
