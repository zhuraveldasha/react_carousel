import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
}

export const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [offset, setOffset] = useState(0);
  const frameWidth = frameSize * itemWidth;

  const maxOffset = (images.length - frameSize) * itemWidth;
  const isPrevDisabled = !infinite && offset === 0;
  const isNextDisabled = !infinite && offset >= maxOffset;

  const handleNextClick = () => {
    const newOffset = offset + step * itemWidth;

    if (infinite) {
      setOffset(newOffset > maxOffset ? 0 : newOffset);
    } else {
      setOffset(Math.min(newOffset, maxOffset));
    }
  };

  const handlePrevClick = () => {
    const newOffset = offset - step * itemWidth;

    if (infinite) {
      setOffset(newOffset < 0 ? maxOffset : newOffset);
    } else {
      setOffset(Math.max(newOffset, 0));
    }
  };

  return (
    <div className="Carousel">
      <div className="Carousel-frame" style={{ width: `${frameWidth}px` }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${offset}px)`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {images.map((imageUrl, index) => (
            <li
              key={index}
              className="carousel-item"
              style={{ width: `${itemWidth}px` }}
            >
              <img
                src={imageUrl}
                alt={`Image ${index + 1}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <button type="button" onClick={handlePrevClick} disabled={isPrevDisabled}>
        Prev
      </button>
      <button
        type="button"
        data-cy="next"
        onClick={handleNextClick}
        disabled={isNextDisabled}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
