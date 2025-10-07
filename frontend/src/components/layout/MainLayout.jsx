import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = () => {
  const location = useLocation();
  const isLearnPage = location.pathname === '/learn';

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Navbar />
      <main className={`flex-grow ${isLearnPage ? 'flex-grow' : ''}`}>
        <Outlet />
      </main>
      {!isLearnPage && <Footer />}
    </div>
  );
};

export default MainLayout;