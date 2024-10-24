import React, { useState } from 'react';

export default function ProjectCarousel({ images = [], title }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to go to the next image
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to go to the previous image
  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-48">
      {/* Image Display */}
      {images.length > 0 && (
        <img
          src={images[currentImageIndex]}
          alt={`Project ${title}`}
          className="h-48 w-full object-cover rounded"
        />
      )}

      {/* Left Arrow */}
      {images.length > 1 && (
        <button
          onClick={goToPreviousImage}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          &#8592;
        </button>
      )}

      {/* Right Arrow */}
      {images.length > 1 && (
        <button
          onClick={goToNextImage}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          &#8594;
        </button>
      )}
    </div>
  );
}
