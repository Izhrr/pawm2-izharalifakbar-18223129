import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import heroimg from '../assets/hero-bg.svg'

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-16 pt-20 min-h-screen flex items-center gap-8 flex-col md:flex-row">
      <div className="flex flex-col justify-center text-left gap-6">
        <h1 className="text-4xl font-bold leading-tight">
          Forge Your Path to <br />
          <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
            SQL Mastery.
          </span>
        </h1>
        <p className="text-gray-300 text-lg leading-relaxed">
          Stop wrestling with complex documentation. SQLForge provides an interactive arena to build your query skills from the ground up. Write, test, and master SQL—all within your browser.
        </p>
        <Link to="/problems">
          <Button>Start Forging</Button>
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <img src={heroimg} alt="Data query illustration" className="max-w-full h-auto" />
      </div>
    </section>
  );
};

export default Hero;