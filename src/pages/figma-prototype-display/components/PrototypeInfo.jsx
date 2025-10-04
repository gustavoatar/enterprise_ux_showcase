import React from 'react';
import Icon from '../../../components/AppIcon';

const PrototypeInfo = ({ 
  lastUpdated = "2025-10-03", 
  version = "v2.1", 
  status = "Live" 
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'live':
        return 'text-success bg-success/10';
      case 'draft':
        return 'text-warning bg-warning/10';
      case 'archived':
        return 'text-muted-foreground bg-muted/10';
      default:
        return 'text-muted-foreground bg-muted/10';
    }
  };

  return (
    <div className="bg-card border-t border-border px-6 py-4">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="Calendar" size={16} />
            <span>Updated {formatDate(lastUpdated)}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="Tag" size={16} />
            <span>{version}</span>
          </div>
          
          <div className={`flex items-center space-x-2 px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(status)}`}>
            <div className="w-2 h-2 rounded-full bg-current"></div>
            <span>{status}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Icon name="Info" size={16} />
          <span>Interactive Figma Prototype</span>
        </div>
      </div>
    </div>
  );
};

export default PrototypeInfo;