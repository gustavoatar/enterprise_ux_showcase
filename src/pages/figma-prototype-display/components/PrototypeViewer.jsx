import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PrototypeViewer = ({ 
  prototypeUrl, 
  title,
  isFullscreen,
  onFullscreenChange 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [scale, setScale] = useState(1);
  
  const iframeRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (prototypeUrl) {
      setIsLoading(true);
      setHasError(false);
    }
  }, [prototypeUrl]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      if (onFullscreenChange) {
        onFullscreenChange(isCurrentlyFullscreen);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [onFullscreenChange]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleResetZoom = () => {
    setScale(1);
  };

  const toggleFullscreen = async () => {
    if (!containerRef?.current) return;

    try {
      if (!isFullscreen) {
        if (containerRef?.current?.requestFullscreen) {
          await containerRef?.current?.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (error) {
      console.error('Fullscreen toggle failed:', error);
    }
  };

  if (!prototypeUrl) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center p-8">
          <Icon name="FileText" size={64} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No Prototype Available</h3>
          <p className="text-muted-foreground max-w-md">
            This page is configured to display a Figma prototype, but no URL has been provided yet. 
            Please contact the administrator to add prototype content.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`flex-1 relative bg-background ${
        isFullscreen ? 'fixed inset-0 z-300' : ''
      }`}
    >
      {/* Zoom Controls */}
      {!isFullscreen && (
        <div className="absolute top-4 right-4 z-10 flex items-center space-x-1 bg-card/90 backdrop-blur-sm border border-border rounded-md p-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomOut}
            disabled={scale <= 0.5}
            className="h-8 w-8"
          >
            <Icon name="ZoomOut" size={16} />
          </Button>
          <span className="text-xs font-mono text-muted-foreground px-2 min-w-[3rem] text-center">
            {Math.round(scale * 100)}%
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomIn}
            disabled={scale >= 2}
            className="h-8 w-8"
          >
            <Icon name="ZoomIn" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleResetZoom}
            className="h-8 w-8"
          >
            <Icon name="RotateCcw" size={16} />
          </Button>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background z-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading prototype...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-background z-20">
          <div className="text-center p-8 max-w-md">
            <Icon name="AlertTriangle" size={64} className="mx-auto mb-4 text-warning" />
            <h4 className="text-xl font-semibold text-foreground mb-3">Failed to Load Prototype</h4>
            <p className="text-muted-foreground mb-4">
              The prototype could not be loaded. This might be due to:
            </p>
            <ul className="text-sm text-muted-foreground text-left mb-6 space-y-2">
              <li className="flex items-start space-x-2">
                <Icon name="Dot" size={16} className="mt-0.5 flex-shrink-0" />
                <span>Invalid or expired Figma URL</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="Dot" size={16} className="mt-0.5 flex-shrink-0" />
                <span>Network connectivity issues</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="Dot" size={16} className="mt-0.5 flex-shrink-0" />
                <span>Prototype privacy settings</span>
              </li>
            </ul>
            <Button
              variant="outline"
              onClick={() => window.open(prototypeUrl, '_blank')}
              iconName="ExternalLink"
              iconPosition="left"
            >
              Try Opening Directly
            </Button>
          </div>
        </div>
      )}

      {/* Iframe */}
      <iframe
        ref={iframeRef}
        src={prototypeUrl}
        title={title || "Figma Prototype"}
        className={`w-full h-full border-0 transition-all duration-300 ${
          isLoading || hasError ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ 
          transform: `scale(${scale})`, 
          transformOrigin: 'top left',
          minHeight: isFullscreen ? '100vh' : '600px'
        }}
        onLoad={handleLoad}
        onError={handleError}
        allow="fullscreen"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />

      {/* Mobile Touch Indicator */}
      <div className="absolute bottom-4 left-4 md:hidden">
        <div className="bg-black/70 text-white text-xs px-3 py-2 rounded-md flex items-center space-x-2">
          <Icon name="Hand" size={14} />
          <span>Tap and drag to interact</span>
        </div>
      </div>

      {/* Fullscreen Toggle for Mobile */}
      {!isFullscreen && (
        <div className="absolute bottom-4 right-4 md:hidden">
          <Button
            variant="secondary"
            size="icon"
            onClick={toggleFullscreen}
            className="bg-card/90 backdrop-blur-sm"
          >
            <Icon name="Maximize" size={20} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PrototypeViewer;