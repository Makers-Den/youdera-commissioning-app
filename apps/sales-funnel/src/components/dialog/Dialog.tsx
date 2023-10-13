import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';
import React, { Fragment, ReactNode, useContext } from 'react';
import { Typography } from 'ui/typography/Typography';
import clsxm from 'ui/utils/clsxm';

import { CrossSvg } from '../svgs/CrossSvg';

const DialogContext = React.createContext({ onClose: () => {} });

export type DialogTitleProps = {
  title: string;
};

export const DialogTitle = ({ title }: DialogTitleProps) => (
  <Typography className="text-2xl" weight="medium" as="h3">
    {title}
  </Typography>
);

export type DialogHeaderProps = {
  children: ReactNode;
  className?: string;
};

export const DialogHeader = ({ className, children }: DialogHeaderProps) => {
  const { onClose } = useContext(DialogContext);
  return (
    <div
      className={clsxm(
        'flex items-center justify-between bg-gray-800 p-4 text-white',
        className,
      )}
    >
      {children}
      <CrossSvg onClick={onClose} className="h-auto w-7 cursor-pointer" />
    </div>
  );
};

export type DialogContentProps = {
  children: ReactNode;
  className?: string;
};

export const DialogContent = ({ className, children }: DialogHeaderProps) => (
  <div className={clsxm('mt-6 px-4 pb-7', className)}>{children}</div>
);

export type DialogProps = {
  children: ReactNode;
  className?: string;
  open: boolean;
  onClose: () => void;
};

export const Dialog = ({ className, children, open, onClose }: DialogProps) => {
  const context = React.useMemo(() => ({ onClose }), [onClose]);
  return (
    <DialogContext.Provider value={context}>
      <Transition appear show={open} as={Fragment}>
        <HeadlessDialog
          as="div"
          open={open}
          className="relative z-50"
          onClose={onClose}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <HeadlessDialog.Panel className="w-full max-w-[390px] transform bg-white text-left align-middle shadow-xl transition-all">
                  <div className={clsxm('bg-white', className)}>{children}</div>
                </HeadlessDialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </HeadlessDialog>
      </Transition>
    </DialogContext.Provider>
  );
};
