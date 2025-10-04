import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const BreadcrumbNavigation = () => {
  const location = useLocation();
  
  const breadcrumbItems = [
    { label: 'Home', path: '/home-video-gallery', icon: 'Home' },
    { label: 'Vision', path: '/figma-prototype-display', icon: 'Eye' }
  ];

  return (
    <nav className="bg-card border-b border-border px-6 py-3">
      <div className="flex items-center space-x-2 text-sm">
        {breadcrumbItems?.map((item, index) => (
          <React.Fragment key={item?.path}>
            {index > 0 && (
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            )}
            <Link
              to={item?.path}
              className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-smooth ${
                location?.pathname === item?.path
                  ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted/10'
              }`}
            >
              <Icon name={item?.icon} size={14} />
              <span>{item?.label}</span>
            </Link>
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

export default BreadcrumbNavigation;