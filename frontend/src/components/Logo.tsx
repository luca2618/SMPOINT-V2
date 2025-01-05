import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src="./public/logo.png" 
        alt="S/M-KID Logo" 
        className="h-8 w-auto"
      />
    </Link>
  );
};

export default Logo;