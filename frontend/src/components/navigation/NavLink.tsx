import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      onClick={onClick}
      className={`nav-link flex items-center space-x-2 ${
        isActive ? 'bg-primary/20 text-primary-foreground' : ''
      }`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
};

export default NavLink;