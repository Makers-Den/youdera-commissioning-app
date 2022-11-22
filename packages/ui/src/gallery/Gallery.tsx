/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';

import { SvgIcon } from '../svg-icons/SvgIcon';
import { H2 } from '../typography/Typography';
import clsxm from '../utils/clsxm';

export type GalleryImage<Id extends string | number> = {
  /** some sort of id we can give to parent in callback in case they delete the image */
  id: Id;
  url: string;
  thumbnailUrl: string;
};

export type GalleryProps<Id extends string | number> = {
  className?: string;
  open: boolean;
  onClose: () => void;
  onDelete?: (id: Id) => void;

  openImageIndex?: number;

  title: string;
  images: GalleryImage<Id>[];
};

export const Gallery = <Id extends string | number>({
  className,
  open,
  onClose,
  onDelete,
  title,
  images,
  openImageIndex,
}: GalleryProps<Id>) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(
    openImageIndex || 0,
  );
  const currentImage = images[currentImageIndex];

  useEffect(() => {
    if (openImageIndex) {
      setCurrentImageIndex(openImageIndex);
    }
  }, [openImageIndex]);

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
      <HeadlessDialog
        as="div"
        className="relative z-10"
        onClose={() => undefined}
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
            <HeadlessDialog.Panel
              id="gallery-container"
              className={clsxm(
                'inset fixed h-full w-full p-4',
                'grid grid-rows-[minmax(20px,auto)_minmax(1fr,max-content)_120px] gap-5',
                'text-center',
              )}
            >
              <SvgIcon
                name="Cross"
                className={clsxm(
                  'cursor-pointer text-white',
                  'absolute top-5 right-5 h-[24px] w-[24px]',
                )}
                onClick={onClose}
              />
              <div
                className="flex items-center justify-center"
                onClick={onClose}
              >
                <H2 className="text-white">{title}</H2>
              </div>

              <div
                className={clsxm(
                  'relative w-full transform overflow-hidden rounded-xl bg-white shadow-xl transition-all',
                  'flex items-center justify-center p-6',
                  className,
                )}
              >
                <img
                  className={clsxm('max-h-full object-contain')}
                  src={currentImage.url}
                />
                {onDelete && (
                  <SvgIcon
                    name="Trashbin"
                    onClick={() => onDelete(currentImage.id)}
                    className="absolute top-5 right-5 cursor-pointer text-gray-600"
                  />
                )}
              </div>

              <div className="w-max-full m-auto flex items-end gap-5 overflow-x-auto">
                {images.map((img, index) => (
                  <img
                    key={img.id}
                    onClick={e => {
                      e.preventDefault();
                      setCurrentImageIndex(index);
                      return false;
                    }}
                    className={clsxm(
                      'h-[112px] w-[112px] rounded object-cover',
                      'cursor-pointer',
                      currentImageIndex === index
                        ? 'border-2 border-orange-400'
                        : 'opacity-50',
                    )}
                    src={img.thumbnailUrl}
                  />
                ))}
              </div>
            </HeadlessDialog.Panel>
          </Transition.Child>
        </div>
      </HeadlessDialog>
    </Transition>
  );
};
