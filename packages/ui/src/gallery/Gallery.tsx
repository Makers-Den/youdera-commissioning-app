/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react';

import { SvgIcon } from '../svg-icons/SvgIcon';
import { H2 } from '../typography/Typography';
import clsxm from '../utils/clsxm';

export type GalleryImage = {
  /** some sort of id we can give to parent in callback in case they delete the image */
  id: string;
  url: string;
}

export type GalleryProps = {
  className?: string;
  open: boolean;
  onClose: () => void;
  onDelete?: (id: string) => void;

  title: string;
  images: GalleryImage[];
};

export const Gallery = ({ className, open, onClose, onDelete, title, images }: GalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const currentImage = images[currentImageIndex];

  // Ensure currentImageIndex is never out of bounds
  useEffect(() => {
    if (images.length === -1) {
      onClose();
      return;
    }

    if (currentImageIndex >= images.length - 1) {
      setCurrentImageIndex(images.length - 1);
    }

  }, [images, currentImageIndex, onClose]);

  if (!currentImage) {
    return null;
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <HeadlessDialog as="div" className="relative z-10" onClose={() => undefined}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur" />
        </Transition.Child>


        <div className="fixed inset-0 overflow-y-auto">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <HeadlessDialog.Panel id="gallery-container"
              className={clsxm(
                'fixed inset h-full w-full p-4',
                'grid grid-rows-[minmax(20px,auto)_minmax(1fr,max-content)_120px] gap-5',
                'text-center',
              )}>
              <SvgIcon
                name='Cross'
                className={clsxm('text-white cursor-pointer', 'absolute top-5 right-5 w-[24px] h-[24px]')}
                onClick={onClose}
              />
              <div className='flex items-center justify-center' onClick={onClose}>
                <H2
                  className='text-white'
                >
                  {title}
                </H2>
              </div>

              <div
                className={clsxm(
                  'relative w-full transform overflow-hidden rounded-xl bg-white shadow-xl transition-all',
                  'p-6 flex items-center justify-center',
                  className
                )}
              >
                <img className={clsxm('object-contain max-h-full')} src={currentImage.url} />
                {onDelete &&
                  <SvgIcon
                    name='Trashbin'
                    onClick={() => onDelete(currentImage.id)}
                    className="cursor-pointer absolute top-5 right-5 text-gray-600"
                  />
                }
              </div>

              <div className='flex items-end justify-start gap-5 overflow-x-auto w-max-full'>
                {images.map((img, index) =>
                  <img
                    key={img.id}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentImageIndex(index)
                      return false;
                    }}
                    className={clsxm(
                      'w-[112px] h-[112px] object-cover rounded',
                      'cursor-pointer',
                      currentImageIndex === index
                        ? 'border-orange-400 border-2'
                        : 'opacity-50'
                    )}
                    src={img.url}
                  />
                )}
              </div>
            </HeadlessDialog.Panel>
          </Transition.Child>
        </div>
      </HeadlessDialog>
    </Transition>
  );
}
