import React, { useState } from 'react';
import Dots from './Dots';
import SliderContent from './SliderContent';
import './Slider.css';

type Props = {
  images: string[] | undefined | null;
  imageHeight?: number;
  imageWidth?: number;
};

export default function Slider({ images, imageHeight, imageWidth }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="slider-container">
      <SliderContent
        activeIndex={activeIndex}
        sliderImages={images}
        imageHeight={imageHeight}
        imageWidth={imageWidth}
        onClick={(activeIndex) => setActiveIndex(activeIndex)}
      />
      <Dots
        activeIndex={activeIndex}
        sliderImages={images}
        onClick={(activeIndex) => setActiveIndex(activeIndex)}
      />
    </div>
  );
}
