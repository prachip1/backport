import React, { useState } from 'react';
import { FaChevronLeft,FaChevronRight } from "react-icons/fa";

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
          className="h-72 w-full object-cover rounded"
        />
      )}

      {/* Left Arrow */}
      {images.length > 1 && (
        <button
          onClick={goToPreviousImage}
          className="absolute top-36 left-2 transform -translate-y-1/2 bg-gray-400 opacity-45 text-gray-800 p-4 rounded-full w-10 h-10 border border-gray-200 flex justify-center items-center hover:opacity-100"
        >
        <FaChevronLeft className='text-xl'  />
        </button>
      )}

      {/* Right Arrow */}
      {images.length > 1 && (
        <button
          onClick={goToNextImage}
          className="absolute top-36 right-2 transform -translate-y-1/2 bg-gray-400 opacity-45 text-gray-800 p-4 rounded-full w-10 h-10 border border-gray-200 flex justify-center items-center hover:opacity-100"
        >
       <FaChevronRight />
        </button>
      )}
    </div>
  );
}
