import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PublicHeader from '../../components/ui/PublicHeader';
import PrototypeHeader from './components/PrototypeHeader';
import PrototypeViewer from './components/PrototypeViewer';
import BreadcrumbNavigation from './components/BreadcrumbNavigation';
import PrototypeInfo from './components/PrototypeInfo';

const FigmaPrototypeDisplay = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Mock prototype data - in real app this would come from admin configuration
  const prototypeData = {
    title: "Enterprise UX Design System",
    description: "Interactive prototype showcasing our comprehensive design system with components, patterns, and user flows for enterprise applications.",
    url: "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FsamplePrototype",
    lastUpdated: "2025-10-03",
    version: "v2.1",
    status: "Live"
  };

  const handleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        const element = document.documentElement;
        if (element?.requestFullscreen) {
          await element?.requestFullscreen();
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

  const handleOpenExternal = () => {
    if (prototypeData?.url) {
      // Extract the actual Figma URL from embed URL
      const figmaUrl = prototypeData?.url?.includes('embed') 
        ? decodeURIComponent(prototypeData?.url?.split('url=')?.[1] || prototypeData?.url)
        : prototypeData?.url;
      window.open(figmaUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleFullscreenChange = (fullscreenState) => {
    setIsFullscreen(fullscreenState);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e?.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isFullscreen]);

  return (
    <>
      <Helmet>
        <title>Vision - Interactive Prototype | Enterprise UX</title>
        <meta name="description" content="Explore our interactive Figma prototype showcasing enterprise UX design patterns, components, and user experience flows." />
        <meta name="keywords" content="UX design, prototype, Figma, enterprise, design system, user experience" />
        <meta property="og:title" content="Vision - Interactive Prototype | Enterprise UX" />
        <meta property="og:description" content="Explore our interactive Figma prototype showcasing enterprise UX design patterns and user experience flows." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {!isFullscreen && <PublicHeader />}
        
        <div className={`flex flex-col ${isFullscreen ? 'h-screen' : 'min-h-screen pt-16'}`}>
          {!isFullscreen && <BreadcrumbNavigation />}
          
          {!isFullscreen && (
            <PrototypeHeader
              title={prototypeData?.title}
              description={prototypeData?.description}
              onFullscreen={handleFullscreen}
              isFullscreen={isFullscreen}
              onOpenExternal={handleOpenExternal}
              prototypeUrl={prototypeData?.url}
            />
          )}
          
          <PrototypeViewer
            prototypeUrl={prototypeData?.url}
            title={prototypeData?.title}
            isFullscreen={isFullscreen}
            onFullscreenChange={handleFullscreenChange}
          />
          
          {!isFullscreen && (
            <PrototypeInfo
              lastUpdated={prototypeData?.lastUpdated}
              version={prototypeData?.version}
              status={prototypeData?.status}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default FigmaPrototypeDisplay;