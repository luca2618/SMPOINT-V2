import React, { useState } from 'react';
import { Menu, X, Home, Search, Trophy, Mail, CheckCircle, PlusCircle, LogIn, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import NavLink from './navigation/NavLink';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/login');
  };

  const commonNavItems = [
    { name: 'Home', icon: <Home className="w-5 h-5" />, path: '/' },
    { name: 'Search', icon: <Search className="w-5 h-5" />, path: '/search' },
    { name: 'Leaderboard', icon: <Trophy className="w-5 h-5" />, path: '/leaderboard' },
    { name: 'Contact', icon: <Mail className="w-5 h-5" />, path: '/contact' },
    { name: 'Check Ind', icon: <CheckCircle className="w-5 h-5" />, path: '/check-ind' },
    { name: 'Add Points', icon: <PlusCircle className="w-5 h-5" />, path: '/add-points' },
  ];

  const adminNavItems = [
    { name: 'Admin Dashboard', icon: <Settings className="w-5 h-5" />, path: '/admin' },
  ];

  const navItems = [...commonNavItems, ...(isAuthenticated ? adminNavItems : [])];

  return (
    <nav className="bg-card shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <NavLink key={item.name} href={item.path} icon={item.icon}>
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Login/Logout button */}
          <div className="hidden md:flex items-center">
            {!isAuthenticated ? (
              <NavLink href="/login" icon={<LogIn className="w-5 h-5" />}>
                Login
              </NavLink>
            ) : (
              <button
                onClick={handleLogout}
                className="nav-link flex items-center space-x-2 text-accent"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                href={item.path}
                icon={item.icon}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
            {!isAuthenticated ? (
              <NavLink
                href="/login"
                icon={<LogIn className="w-5 h-5" />}
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>
            ) : (
              <button
                onClick={handleLogout}
                className="nav-link flex items-center space-x-2 text-accent w-full"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;