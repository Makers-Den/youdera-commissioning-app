/* eslint-disable no-alert */
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Button } from 'ui/buttons/Button';
import { Gallery, GalleryImage } from 'ui/gallery/Gallery';

import { CenterWrapper } from './utils/CenterWrapper';

export default {
  component: Gallery,
  title: 'Components/Gallery',
} as ComponentMeta<typeof Gallery>;

const IMG1 = '/string_layout.png';
const IMG2 = '/string_layout2.png';
const IMG3 = '/string_layout3.png';

function createImage(id: string, url: string) {
  return {
    id,
    url
  }
}

const threeImages: GalleryImage[] = [
  createImage('1', IMG1),
  createImage('2', IMG2),
  createImage('3', IMG3),
];

const oneImage: GalleryImage[] = [
  createImage('1', IMG1),
];

const manyImages: GalleryImage[] = [
  createImage('1', IMG1),
  createImage('2', IMG2),
  createImage('3', IMG3),
  createImage('4', IMG1),
  createImage('5', IMG2),
  createImage('6', IMG3),
  createImage('7', IMG1),
  createImage('8', IMG2),
  createImage('9', IMG3),
  createImage('10', IMG1),
  createImage('11', IMG2),
  createImage('12', IMG3),
];

const Template: ComponentStory<typeof Gallery> = (args) => {

  const {open, onClose, title, onDelete, images, ...restArgs} = args;
  
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [mutableImages, setMutableImages] = React.useState<GalleryImage[]>(images);

  const deleteImg = (id: string) => {
    setMutableImages(imgs => imgs.filter(img => img.id !== id));
  };

  return (
    <CenterWrapper>
      <Button type='button' onClick={() => setIsOpen(true)}>Click me for Gallery to open!</Button>
      <Gallery
        open={isOpen} 
        onDelete={deleteImg} 
        onClose={() => setIsOpen(false)}
        title="Example Gallery" 
        images={mutableImages}
        {...restArgs}
      />
    </CenterWrapper>
  )
};

export const Overview = Template.bind({});
Overview.args = {
  images: threeImages,
}

export const ManyImages = Template.bind({});
ManyImages.args = {
  images: manyImages,
}

export const OneImage = Template.bind({});
OneImage.args = {
  images: oneImage,
}