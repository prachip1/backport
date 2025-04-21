import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function ProjectSlider() {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = {
    dots: false,
    infinite: true,
    speed: 6000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const response = await axios.get('https://backport-backend.vercel.app/api/getsliderimage');
        
        if (response.data.success) {
          setSliders(response.data.sliders);
        } else {
          toast.error(response.data.error || 'Failed to load sliders.');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        toast.error('Failed to load slider images. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSliderImages();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) return <div className="text-center py-8">Loading sliders...</div>;

  if (!sliders.length) return <div className="text-center py-8">No slider images available</div>;

  return (
    <div className="w-full px-4 max-w-7xl mx-auto">
      <Slider {...settings}>
        {sliders.map((slider, index) => (
          <div key={index} className="px-0">
            <div className="h-[200px] w-full rounded-xl overflow-hidden shadow-md border border-gray-400">
              <img
                src={slider.image}
                alt={slider.title || 'Project image'}
                className="w-full h-full object-cover cursor-pointer"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}