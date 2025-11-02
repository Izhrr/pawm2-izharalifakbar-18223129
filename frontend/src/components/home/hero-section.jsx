import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import heroimg from '../../assets/hero-bg.svg'

const Hero = () => {
  return (
    <section className="max-w-7xl min-h-screen md:min-h-[960px] gap-8 flex flex-col text-center justify-center items-center pb-8 md:pb-32">
        <h1 className="text-[36px] md:text-[64px] font-bold leading-tight">
          Forge Your Path to <br />
          <span
            className="bg-gradient-to-b from-white to-[#969E9C] bg-clip-text text-transparent"
          >
            SQL Mastery.
          </span>
        </h1>
        <p className="text-gray-300 text-[16px] md:text-[24px] max-w-[1280px]">
          Stop wrestling with complex documentation. SQLForge provides an interactive arena to build your query skills from the ground up. Write, test, and master SQL—all within your browser.
        </p>
        <Link to="/learn">
          <Button>Start Forging</Button>
        </Link>
    </section>
  );
};

export default Hero;