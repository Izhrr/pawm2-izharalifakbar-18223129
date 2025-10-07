import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import learnexample from '../assets/learn-example.svg';
import problemexample from '../assets/problem-example.svg';

const Features = () => {
  return (
    <section className="max-w-7xl mx-auto px-16 flex flex-col gap-8 text-center">
      <h1 className="text-3xl font-bold">Your Blueprint for Success</h1>
      
      {/* Feature Card 1 */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/30 rounded-2xl flex p-8 gap-8 text-left">
        <div className="w-1/2 flex flex-col gap-5 justify-center md:w-full">
          <h3 className="text-xl font-semibold">Guided Learning Path</h3>
          <p className="text-gray-300">
            Master the fundamentals with our clear, concise handbook. From your first `SELECT` statement to complex `JOIN`s, we provide the essential knowledge you need to build a solid foundation.
          </p>
          <Link to="/learn">
            <Button>Read the Handbook</Button>
          </Link>
        </div>
        <div className="w-1/2 flex justify-center items-center overflow-hidden md:w-full">
          <img src={learnexample} alt="Illustration of a book or guide"  className="h-auto w-[75%]"/>
        </div>
      </div>

      {/* Feature Card 2 */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/30 rounded-2xl flex p-8 gap-8 text-left">
        <div className="w-1/2 flex justify-center items-center overflow-hidden md:w-full md:order-first">
          <img src={problemexample} alt="Illustration of code and challenges" className="h-auto w-[75%]" />
        </div>
        <div className="w-1/2 flex flex-col gap-5 justify-center md:w-full">
          <h3 className="text-xl font-semibold">Real-World Problem Solving</h3>
          <p className="text-gray-300">
            Theory is nothing without practice. Apply your knowledge in our challenge arena, tackling a curated set of problems designed to sharpen your skills for real-world data tasks.
          </p>
          <Link to="/problems">
            <Button>View Challenges</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;