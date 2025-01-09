import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

export default function ProjectCarousel({ images = [], title }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const openCarousel = (index) => {
    setCurrentImageIndex(index);
    setIsCarouselOpen(true);
  };

  const closeCarousel = () => {
    setIsCarouselOpen(false);
  };

  return (
    <div className="relative">
      <img
        src={images[currentImageIndex]}
        alt={`Project ${title}`}
        className="w-full h-auto object-contain rounded-md aspect-video transition-transform duration-300 hover:scale-105 cursor-pointer"
        onClick={() => openCarousel(currentImageIndex)}
      />
      {images.length > 1 && (
        <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4">
          <button
            onClick={goToPreviousImage}
            className="text-gray-700 hover:text-gray-900 bg-white bg-opacity-70 p-2 rounded-full"
          >
            <FaChevronLeft size={24} />
          </button>
          <button
            onClick={goToNextImage}
            className="text-gray-700 hover:text-gray-900 bg-white bg-opacity-70 p-2 rounded-full"
          >
            <FaChevronRight size={24} />
          </button>
        </div>
      )}

      {isCarouselOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
          <button
            onClick={closeCarousel}
            className="absolute top-4 right-4 text-white text-3xl"
          >
            <FaTimes />
          </button>
          <div className="relative w-full max-w-4xl flex justify-between items-center">
            <button
              onClick={goToPreviousImage}
              className="absolute left-4 text-white text-4xl p-2 bg-gray-800 bg-opacity-70 rounded-full"
            >
              <FaChevronLeft />
            </button>
            <img
              src={images[currentImageIndex]}
              alt={`Project ${title}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <button
              onClick={goToNextImage}
              className="absolute right-4 text-white text-4xl p-2 bg-gray-800 bg-opacity-70 rounded-full"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
