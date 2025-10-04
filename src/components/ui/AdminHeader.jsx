import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Select from './Select';

const AdminHeader = () => {
  const [selectedPage, setSelectedPage] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { label: 'Edit Pages', path: '/edit-page-content', icon: 'Edit' },
    { label: 'Create New', path: '/create-new-page', icon: 'Plus' },
    { label: 'Edit Navigation', path: '/edit-navigation', icon: 'Navigation' },
  ];

  const pageOptions = [
    { value: 'home', label: 'Home Video Gallery' },
    { value: 'player', label: 'Full Screen Video Player' },
    { value: 'prototype', label: 'Figma Prototype Display' },
    { value: 'about', label: 'About Page' },
    { value: 'contact', label: 'Contact Page' },
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const handlePageChange = (value) => {
    setSelectedPage(value);
  };

  const handleLogout = () => {
    // Clear admin authentication
    localStorage.removeItem('isAdminLoggedIn');
    // Close dropdown
    setIsUserMenuOpen(false);
    // Redirect to public home page
    navigate('/');
  };

  const handleViewLive = () => {
    // Open the live public site in a new tab
    window.open('/', '_blank');
    setIsUserMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Admin Badge */}
          <div className="flex items-center space-x-4">
            <Link to="/home-video-gallery" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                <Icon name="Zap" size={20} color="white" />
              </div>
              <span className="text-lg font-semibold text-foreground">
                Enterprise UX
              </span>
            </Link>
            <div className="hidden sm:flex items-center space-x-2 px-2 py-1 bg-warning/20 rounded-md">
              <Icon name="Shield" size={14} color="var(--color-warning)" />
              <span className="text-xs font-medium text-warning">Admin</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted/10'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </nav>

          {/* Page Selector & User Menu */}
          <div className="flex items-center space-x-4">
            {/* View Live Button */}
            <Button
              variant="outline"
              size="sm"
              iconName="ExternalLink"
              onClick={handleViewLive}
              className="hidden lg:flex"
            >
              View Live
            </Button>

            {/* Page Selector */}
            <div className="hidden lg:block w-48">
              <Select
                placeholder="Select page to edit"
                options={pageOptions}
                value={selectedPage}
                onChange={handlePageChange}
                searchable
              />
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/10 transition-smooth"
                aria-label="User menu"
              >
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} />
                </div>
                <Icon name="ChevronDown" size={16} />
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-elevation-2 z-150 animate-fade-in">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-sm font-medium text-foreground">Admin User</p>
                      <p className="text-xs text-muted-foreground">admin@enterprise-ux.com</p>
                    </div>
                    <button
                      onClick={handleViewLive}
                      className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/10 transition-smooth flex items-center space-x-2"
                    >
                      <Icon name="ExternalLink" size={16} />
                      <span>View Live Site</span>
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/10 transition-smooth flex items-center space-x-2">
                      <Icon name="Settings" size={16} />
                      <span>Settings</span>
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/10 transition-smooth flex items-center space-x-2">
                      <Icon name="HelpCircle" size={16} />
                      <span>Help</span>
                    </button>
                    <div className="border-t border-border">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error/10 transition-smooth flex items-center space-x-2"
                      >
                        <Icon name="LogOut" size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className="md:hidden bg-card border-t border-border">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2 px-2 py-1 bg-warning/20 rounded-md">
              <Icon name="Shield" size={12} color="var(--color-warning)" />
              <span className="text-xs font-medium text-warning">Admin Mode</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              iconName="ExternalLink"
              onClick={handleViewLive}
            >
              View Live
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex flex-col items-center space-y-1 p-3 rounded-md text-xs font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted/10'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;