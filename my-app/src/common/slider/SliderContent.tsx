import React from 'react';

type Props = {
  activeIndex: number;
  sliderImages: string[];
  imageHeight?: number;
  imageWidth?: number;
  onClick: (index: number) => void;
};

export default function SliderContent({
  activeIndex,
  sliderImages,
  imageHeight,
  imageWidth,
  onClick,
}: Props) {
  const imageSectionStyle: React.CSSProperties = {
    height: imageHeight ? `${imageHeight}px` : '100%',
    width: imageWidth ? `${imageWidth}px` : '100%',
    position: 'relative',
  };

  const imageStyle: React.CSSProperties = {
    height: '100%',
    width: '100%',
    objectFit: 'contain',
    position: 'absolute',
  };
  return (
    <section style={imageSectionStyle}>
      {sliderImages.map((img, index) => (
        <div
          key={index}
          className={index === activeIndex ? 'slides active' : 'inactive'}
          onClick={() =>
            onClick(index === sliderImages.length - 1 ? 0 : index + 1)
          }
        >
          <img style={imageStyle} src={img} alt={img} />
        </div>
      ))}
    </section>
  );
}
