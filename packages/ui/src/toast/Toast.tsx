import { Transition } from '@headlessui/react';
import toast, { resolveValue, Toaster, ToastOptions } from 'react-hot-toast';

import { SvgIcon } from '../svg-icons/SvgIcon';
import { Typography } from '../typography/Typography';
import clsxm from '../utils/clsxm';

export const Toast = () => (
  <Toaster>
    {t => (
      <Transition
        as="div"
        static
        show={t.visible}
        className={clsxm(
          'drop-shadow-large z-50 flex  transform justify-between gap-4 rounded-md p-4',
          t.type === 'success' && 'bg-green-400',
          t.type === 'error' && 'bg-red-400',
        )}
        enter="transition-all duration-150"
        enterFrom="opacity-0 scale-50"
        enterTo="opacity-100 scale-100"
        leave="transition-all duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-75"
        data-cy="toast"
      >
        <Typography className="px-2 text-white">
          {resolveValue(t.message, t)}
        </Typography>
        <SvgIcon
          onClick={() => {
            toast.dismiss(t.id);
          }}
          name="Cross"
          className="text-white"
        />
      </Transition>
    )}
  </Toaster>
);

const defaultConfig: ToastOptions = {
  position: 'top-right',
  duration: 3000,
};

export function useToast() {
  return {
    success: (message: string, config?: ToastOptions) =>
      toast.success(message, {
        ...defaultConfig,
        ...config,
      }),
    error: (message: string, config?: ToastOptions) =>
      toast.error(message, {
        ...defaultConfig,
        ...config,
      }),
    toast,
  };
}
