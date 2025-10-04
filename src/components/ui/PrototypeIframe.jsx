import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const PrototypeIframe = ({ 
  src, 
  title = "Figma Prototype", 
  description,
  allowFullscreen = true,
  showHeader = true,
  className = ""
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [scale, setScale] = useState(1);
  
  const iframeRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const toggleFullscreen = async () => {
    if (!containerRef?.current) return;

    try {
      if (!isFullscreen) {
        if (containerRef?.current?.requestFullscreen) {
          await containerRef?.current?.requestFullscreen();
        } else if (containerRef?.current?.webkitRequestFullscreen) {
          await containerRef?.current?.webkitRequestFullscreen();
        } else if (containerRef?.current?.msRequestFullscreen) {
          await containerRef?.current?.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen();
        }
      }
    } catch (error) {
      console.error('Fullscreen toggle failed:', error);
    }
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

  const openInNewTab = () => {
    if (src) {
      window.open(src, '_blank', 'noopener,noreferrer');
    }
  };

  if (!src) {
    return (
      <div className={`bg-card border border-border rounded-lg p-8 text-center ${className}`}>
        <Icon name="AlertCircle" size={48} className="mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Prototype URL</h3>
        <p className="text-muted-foreground">Please provide a valid Figma prototype URL to display.</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`bg-card border border-border rounded-lg overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-300 rounded-none' : ''
      } ${className}`}
    >
      {/* Header */}
      {showHeader && (
        <div className="flex items-center justify-between p-4 border-b border-border bg-card">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Zoom Controls */}
            <div className="flex items-center space-x-1 bg-muted/20 rounded-md p-1">
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

            {/* Action Buttons */}
            <Button
              variant="ghost"
              size="icon"
              onClick={openInNewTab}
              className="h-8 w-8"
              title="Open in new tab"
            >
              <Icon name="ExternalLink" size={16} />
            </Button>

            {allowFullscreen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                className="h-8 w-8"
                title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                <Icon name={isFullscreen ? "Minimize" : "Maximize"} size={16} />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Iframe Container */}
      <div className={`relative ${isFullscreen ? 'h-screen' : 'h-96 md:h-[600px]'} bg-background`}>
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-sm text-muted-foreground">Loading prototype...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-background">
            <div className="text-center p-8">
              <Icon name="AlertTriangle" size={48} className="mx-auto mb-4 text-warning" />
              <h4 className="text-lg font-semibold text-foreground mb-2">Failed to Load Prototype</h4>
              <p className="text-muted-foreground mb-4">
                The prototype could not be loaded. This might be due to:
              </p>
              <ul className="text-sm text-muted-foreground text-left mb-4 space-y-1">
                <li>• Invalid or expired Figma URL</li>
                <li>• Network connectivity issues</li>
                <li>• Prototype privacy settings</li>
              </ul>
              <Button
                variant="outline"
                onClick={openInNewTab}
                iconName="ExternalLink"
                iconPosition="left"
              >
                Open in New Tab
              </Button>
            </div>
          </div>
        )}

        {/* Iframe */}
        <iframe
          ref={iframeRef}
          src={src}
          title={title}
          className={`w-full h-full border-0 transition-transform duration-200 ${
            isLoading || hasError ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
          onLoad={handleLoad}
          onError={handleError}
          allow="fullscreen"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />

        {/* Touch/Mobile Overlay */}
        <div className="absolute inset-0 pointer-events-none md:hidden">
          <div className="absolute top-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded">
            Tap and drag to interact
          </div>
        </div>
      </div>

      {/* Footer Info */}
      {!isFullscreen && (
        <div className="px-4 py-2 bg-muted/10 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Interactive Figma Prototype</span>
            <span>Use mouse/touch to navigate</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrototypeIframe;