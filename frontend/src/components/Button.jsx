import React from 'react';

const Button = ({ children, className = '', style = {}, ...props }) => {
  return (
    <button
      className={`
        text-[16px]
        inline-block px-4 py-2
        text-white
        rounded-full
        font-semibold
        cursor-pointer
        transition-all duration-300
        hover:-translate-y-0.5
        ${className}
      `}
      style={{
        background: 'linear-gradient(90deg, #0059FF 0%, #003599 100%)',
        ...style
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;