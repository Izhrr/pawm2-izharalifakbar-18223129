import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png'
import Button from '../Button'

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md py-6">
      <nav className="max-w-7xl mx-auto px-16 flex justify-between items-center">
        <Link to="/">
          <img src={logo} alt="SQLForge Logo" className="h-10" />
        </Link>
        <ul className="flex gap-8 list-none">
          <li>
            <Link 
              to="/problems" 
              className="group text-gray-100 font-semibold px-2 py-1 relative transition-colors hover:text-white"
            >
              Problems
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link 
              to="/learn" 
              className="group text-gray-100 font-semibold px-2 py-1 relative transition-colors hover:text-white"
            >
              Learn
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link 
              to="/quiz" 
              className="group text-gray-100 font-semibold px-2 py-1 relative transition-colors hover:text-white"
            >
              Quiz
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        </ul>

        <Button>Login</Button>
      </nav>
    </header>
  );
};

export default Navbar;