import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import learnexample from '../assets/learn-example.svg';
import problemexample from '../assets/problem-example.svg';

const Features = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 flex flex-col gap-12 text-center">
      <h1 className="text-3xl font-bold">Your Blueprint for Success</h1>
      
      {/* Feature Card 1: Guided Learning Path */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/30 rounded-2xl flex flex-col md:flex-row p-6 md:p-8 gap-6 md:gap-8 text-center md:text-left">
        {/* Teks Konten */}
        <div className="w-full md:w-1/2 flex flex-col gap-4 md:gap-5 justify-center">
          <h3 className="text-xl font-semibold">Guided Learning Path</h3>
          <p className="text-gray-300">
            Master the fundamentals with our clear, concise handbook. From your first <code className="bg-white/10 p-1 rounded">SELECT</code> statement to complex <code className="bg-white/10 p-1 rounded">JOIN</code>s, we provide the essential knowledge you need to build a solid foundation.
          </p>
          <div className="mt-2 md:mt-0">
            <Link to="/learn" className="inline-block">
              <Button>Read the Handbook</Button>
            </Link>
          </div>
        </div>

        {/* Ilustrasi */}
        <div className="w-full md:w-1/2 flex justify-center items-center overflow-hidden order-first md:order-last">
          <img 
            src={learnexample} 
            alt="Illustration of a book or guide" 
            className="h-auto w-3/4 max-w-[250px] md:w-full md:max-w-none" 
          />
        </div>
      </div>
      
      {/* Feature Card 2: Real-World Problem Solving */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/30 rounded-2xl flex flex-col md:flex-row p-6 md:p-8 gap-6 md:gap-8 text-center md:text-left">
        {/* Ilustrasi */}
        <div className="w-full md:w-1/2 flex justify-center items-center overflow-hidden order-first md:order-first">
          <img 
            src={problemexample} 
            alt="Illustration of code and challenges" 
            className="h-auto w-3/4 max-w-[250px] md:w-full md:max-w-none" 
          />
        </div>

        {/* Teks Konten */}
        <div className="w-full md:w-1/2 flex flex-col gap-4 md:gap-5 justify-center order-last md:order-last">
          <h3 className="text-xl font-semibold">Real-World Problem Solving</h3>
          <p className="text-gray-300">
            Theory is nothing without practice. Apply your knowledge in our challenge arena, tackling a curated set of problems designed to sharpen your skills for real-world data tasks.
          </p>
          <div className="mt-2 md:mt-0">
            <Link to="/problems" className="inline-block">
              <Button>View Challenges</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;