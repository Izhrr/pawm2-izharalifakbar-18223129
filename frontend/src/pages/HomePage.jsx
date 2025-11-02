import React from 'react';
import Hero from '../components/home/hero-section';
import Features from '../components/home/feature-section';
import Carousel from '../components/home/carousel'
import heroimg from '../assets/hero-section.png'
import carouselimg from '../assets/bg-carousel.png'

const HomePage = () => {
  return (
    <div className="relative w-full min-h-screen">
      <img
        src={heroimg}
        alt=""
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 pointer-events-none md:left-1/2 md:-translate-x-1/2 md:w-screen md:h-auto"
      />
      <div className="flex flex-col gap-20 relative z-10 items-center px-10">
        <Hero />
        <Features />
        <div className="relative w-full">
          <img
            src={carouselimg}
            alt=""
            className="absolute inset-0 w-full h-full object-fit -z-10 pointer-events-none"
          />
          <Carousel />
        </div>
      </div>
    </div>
  );
};

export default HomePage;