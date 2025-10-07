import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Carousel from '../components/Carousel';

const HomePage = () => {
  return (
    <div className="flex flex-col gap-8">
      <Hero />
      <Features />
      <Carousel />
    </div>
  );
};

export default HomePage;