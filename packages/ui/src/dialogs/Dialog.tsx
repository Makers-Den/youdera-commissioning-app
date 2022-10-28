import { Dialog as HeadlessDialog, Transition } from '@headlessui/react'
import React, { Fragment, ReactNode } from 'react';

import { Typography } from '../typography/Typography';
import clsxm from '../../lib/clsxm';

export type DialogTitleProps = {
  title: string;
};

export const DialogTitle = ({ title }: DialogTitleProps) => (
  <Typography variant="h3" weight="medium" as="h3">
    {title}
  </Typography>
)

export type DialogHeaderProps = {
  children: ReactNode;
  className?: string;
};

export const DialogHeader = ({ className, children }: DialogHeaderProps) => (
  <div className={clsxm('pr-8 flex items-center', className)}>
    <div className="bg-orange-400 h-full min-h-[28px] w-1 rounded-r-full relative mr-7" />
    {children}
  </div>
);

export type DialogContentProps = {
  children: ReactNode;
  className?: string;
};

export const DialogContent = ({ className, children }: DialogHeaderProps) => (
  <div className={clsxm('px-8 mt-6', className)}>{children}</div>
);

export type DialogProps = {
  children: ReactNode;
  className?: string;
  open: boolean;
  onClose: () => void;
};

export const Dialog = ({ className, children, open, onClose }: DialogProps) => (
  <Transition appear show={open} as={Fragment}>
    <HeadlessDialog as="div" className="relative z-10" onClose={onClose}>
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
            <HeadlessDialog.Panel className="w-full max-w-fit transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all">
              <div className={clsxm('bg-white pt-5 pb-8', className)}>
                {children}
              </div>
            </HeadlessDialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </HeadlessDialog>
  </Transition>
);
