import React from 'react';
import Icon from '../../../components/AppIcon';


const LayoutSelector = ({ currentLayout, onLayoutChange, isVisible }) => {
  const layouts = [
    {
      id: 'standard',
      name: 'Standard Grid',
      icon: 'Grid3X3',
      description: '3x4 aspect ratio cards'
    },
    {
      id: 'compact',
      name: 'Compact View',
      icon: 'LayoutGrid',
      description: 'Video aspect ratio cards'
    },
    {
      id: 'detailed',
      name: 'Detailed View',
      icon: 'Columns',
      description: '4x5 aspect ratio with more info'
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-4 z-50 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-lg animate-fade-in">
      <div className="flex items-center space-x-2 mb-3">
        <Icon name="Settings" size={16} className="text-primary" />
        <span className="text-sm font-medium text-foreground">Layout Options</span>
      </div>
      <div className="space-y-2">
        {layouts?.map((layout) => (
          <button
            key={layout?.id}
            onClick={() => onLayoutChange(layout?.id)}
            className={`w-full flex items-center space-x-3 p-3 rounded-md text-left transition-all duration-200 ${
              currentLayout === layout?.id
                ? 'bg-primary/10 border border-primary text-primary' :'bg-muted/10 hover:bg-muted/20 text-muted-foreground hover:text-foreground border border-transparent'
            }`}
          >
            <Icon name={layout?.icon} size={18} />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">{layout?.name}</div>
              <div className="text-xs opacity-80">{layout?.description}</div>
            </div>
            {currentLayout === layout?.id && (
              <Icon name="Check" size={16} />
            )}
          </button>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Admin-only layout controls
        </p>
      </div>
    </div>
  );
};

export default LayoutSelector;