import React from 'react';

const Button = ({ children, className = '', ...props }) => {
  return (
    <button 
      className={`inline-block px-6 py-2 bg-transparent text-gray-100 border border-gray-100 rounded-md cursor-pointer font-semibold transition-all duration-300 hover:text-white hover:border-emerald-400 hover:bg-emerald-400 hover:-translate-y-0.5 relative overflow-hidden group ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-emerald-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out -z-10"></span>
    </button>
  );
};

export default Button;