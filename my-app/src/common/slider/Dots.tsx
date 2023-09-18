import React from 'react';

type Props = {
  activeIndex: number;
  sliderImages: string[];
  onClick: (index: number) => void;
};

export default function Dots({ activeIndex, sliderImages, onClick }: Props) {
  if (sliderImages.length === 1) {
    return null;
  }

  return (
    <div className="all-dots">
      {sliderImages.map((img, index) => (
        <span
          key={index}
          className={`dot ${activeIndex === index ? 'active' : ''}`}
          onClick={() => onClick(index)}
        />
      ))}
    </div>
  );
}
