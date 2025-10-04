import React from 'react';

import Button from '../../../components/ui/Button';

const PrototypeHeader = ({ 
  title, 
  description, 
  onFullscreen, 
  isFullscreen, 
  onOpenExternal,
  prototypeUrl 
}) => {
  return (
    <div className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {title || "Interactive Prototype"}
          </h1>
          {description && (
            <p className="text-muted-foreground text-sm leading-relaxed">
              {description}
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-3 ml-6">
          <Button
            variant="outline"
            size="sm"
            iconName="ExternalLink"
            iconPosition="left"
            onClick={onOpenExternal}
            disabled={!prototypeUrl}
          >
            Open in Figma
          </Button>
          
          <Button
            variant="secondary"
            size="sm"
            iconName={isFullscreen ? "Minimize" : "Maximize"}
            iconPosition="left"
            onClick={onFullscreen}
          >
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrototypeHeader;