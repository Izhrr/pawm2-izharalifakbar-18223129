import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = () => {
  const location = useLocation();
  const isLearnPage = location.pathname === '/learn';

  return (
    <div className="min-h-screen bg-[#01040E] text-white ">
      <Navbar />
      <main className='relative z-10 flex w-full flex-col gap-16 overflow-x-hidden'>
        <Outlet />
      </main>
      {!isLearnPage && <Footer />}
    </div>
  );
};

export default MainLayout;