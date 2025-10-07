import React from 'react';
import footerimg from '../../assets/footer.svg';

const Footer = () => {
  return (
    <footer className="mt-20 border-t-2 border-transparent bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-border">
      <div className="bg-gray-900 w-full py-8 flex justify-center items-center">
        <img src={footerimg} alt="footer" className="h-4 w-auto" />
      </div>
    </footer>
  );
};

export default Footer;