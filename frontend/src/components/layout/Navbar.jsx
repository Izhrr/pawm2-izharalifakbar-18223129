import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabaseClient';
import logo from '../../assets/logo.png';
import Button from '../Button';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { session, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getLinkClass = (path) => {
    return location.pathname === path ? 'opacity-100' : 'opacity-0';
  };

  return (
    <>
      <header 
        className="
          fixed top-0 w-full z-50 
        backdrop-blur-md py-6
        "
      >
        <nav className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex justify-between items-center">
          <Link to="/">
            <img src={logo} alt="SQLForge Logo" className="h-8 md:h-10" />
          </Link>

          <ul className="hidden md:flex gap-8 list-none">
            <li>
              <Link 
                to="/" 
                className="group text-gray-100 font-semibold px-2 py-1 relative transition-colors hover:text-white"
              >
                Home
                <span 
                  className={`
                    absolute left-1/2 -translate-x-1/2 bottom-[-8px] 
                    w-1.5 h-1.5 bg-white rounded-full
                    transition-opacity duration-300
                    ${getLinkClass('/')}
                    group-hover:opacity-100
                  `}
                ></span>
              </Link>
            </li>
            <li className="relative group/nav">
              <Link 
                to="/learn" 
                className="group text-gray-100 font-semibold px-2 py-1 relative transition-colors hover:text-white"
              >
                <span className="inline-flex items-center">
                  Learn
                  <svg className="ml-1 w-4 h-4 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </span>
                <span 
                  className={`
                    absolute left-1/2 -translate-x-1/2 bottom-[-8px] 
                    w-1.5 h-1.5 bg-white rounded-full
                    transition-opacity duration-300
                    ${getLinkClass('/learn')}
                    group-hover:opacity-100
                  `}
                ></span>
              </Link>
              {/* Dropdown */}
              <ul
                className="absolute left-0 top-full mt-2 w-44 bg-gray-900 border border-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible group-focus-within/nav:opacity-100 group-focus-within/nav:visible transition-all duration-200 z-50"
                onMouseEnter={e => e.currentTarget.classList.add('opacity-100','visible')}
                onMouseLeave={e => e.currentTarget.classList.remove('opacity-100','visible')}
              >
                <li>
                  <Link to="/learn?topic=select-topic" className="block px-4 py-2 text-gray-100 hover:bg-[#0059FF] hover:text-white rounded-t-lg transition-colors">SQL SELECT</Link>
                </li>
                <li>
                  <Link to="/learn?topic=where-topic" className="block px-4 py-2 text-gray-100 hover:bg-[#0059FF] hover:text-white rounded-b-lg transition-colors">SQL WHERE</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link 
                to="/quiz" 
                className="group text-gray-100 font-semibold px-2 py-1 relative transition-colors hover:text-white"
              >
                Quiz
                <span 
                  className={`
                    absolute left-1/2 -translate-x-1/2 bottom-[-8px] 
                    w-1.5 h-1.5 bg-white rounded-full
                    transition-opacity duration-300
                    ${getLinkClass('/quiz')}
                    group-hover:opacity-100
                  `}
                ></span>
              </Link>
            </li>
          </ul>

          {/* Desktop Authentication Section */}
          <div className="hidden md:flex items-center gap-4">
            {loading ? (
              <div className="text-gray-300">Loading...</div>
            ) : session ? (
              <>
                <span className="text-gray-100 font-medium">
                  Hello, {session.user.user_metadata?.full_name || session.user.email}!
                </span>
                <Button onClick={handleLogout} variant="outline">
                  Logout
                </Button>
              </>
            ) : (
              <Button onClick={handleLogin}>Login</Button>
            )}
          </div>

          {/* Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col gap-1.5 w-6 h-6 justify-center items-center z-50"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-gray-100 transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-gray-100 transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-gray-100 transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            ></span>
          </button>
        </nav>
      </header>

      {/* Backdrop Blur Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      ></div>

      {/* Mobile Sidebar Menu */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-gray-900 z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-6">
          {/* Mobile Menu Links */}
          <ul className="flex flex-col gap-6 list-none">
            <li>
              <Link 
                to="/problems" 
                className="text-gray-100 font-semibold text-lg hover:text-emerald-400 transition-colors block"
              >
                Problems
              </Link>
            </li>
            <li>
              <Link 
                to="/learn" 
                className="text-gray-100 font-semibold text-lg hover:text-emerald-400 transition-colors block"
              >
                Learn
              </Link>
            </li>
            <li>
              <Link 
                to="/quiz" 
                className="text-gray-100 font-semibold text-lg hover:text-emerald-400 transition-colors block"
              >
                Quiz
              </Link>
            </li>
          </ul>

          {/* Mobile Authentication Section */}
          <div className="mt-auto mb-8">
            <div className="border-t border-gray-700 pt-6">
              {loading ? (
                <div className="text-gray-300">Loading...</div>
              ) : session ? (
                <>
                  <span className="text-gray-100 font-medium block mb-4">
                    Hello, {session.user.user_metadata?.full_name || session.user.email}!
                  </span>
                  <Button onClick={handleLogout} variant="outline" className="w-full">
                    Logout
                  </Button>
                </>
              ) : (
                <Button onClick={handleLogin} className="w-full">
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;