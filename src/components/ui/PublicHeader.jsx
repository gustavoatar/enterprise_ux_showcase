import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const PublicHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Home', path: '/home-video-gallery', icon: 'Home' },
    { label: 'Vision', path: '/figma-prototype-display', icon: 'Eye' },
    { label: 'Initiatives', path: '/full-screen-video-player', icon: 'Play' },
    { label: 'Journeys', path: '/home-video-gallery', icon: 'Map' },
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-black/70 backdrop-blur-sm border-b border-white/10">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/home-video-gallery" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                <Icon name="Zap" size={20} color="white" />
              </div>
              <span className="text-xl font-bold text-white">
                Built to Deliver - EDX Future Vision
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'text-white' : 'text-white hover:text-white/80'
                }`}
              >
                <span>{item?.label}</span>
              </Link>
            ))}
          </nav>

          {/* Admin Login & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link to="/admin-login">
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex text-white hover:text-white/80"
              >
                Admin Login
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-white hover:text-white/80 transition-smooth"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/80 border-t border-white/10 backdrop-blur-sm animate-fade-in">
          <div className="px-4 py-2 space-y-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center px-3 py-3 rounded-md text-sm font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'text-white' : 'text-white hover:text-white/80'
                }`}
              >
                <span>{item?.label}</span>
              </Link>
            ))}
            <div className="pt-2 border-t border-white/10">
              <Link to="/admin-login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant="ghost"
                  size="sm"
                  fullWidth
                  className="text-white hover:text-white/80"
                >
                  Admin Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicHeader;