import React, { useEffect } from 'react';
import VideoPlayer from './VideoPlayer';

const VideoModal = ({ 
  isOpen, 
  onClose, 
  videoSrc, 
  title, 
  description 
}) => {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      
      // Focus management for accessibility
      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabIndex="-1"])'
      );
      const firstElement = focusableElements?.[0];
      const lastElement = focusableElements?.[focusableElements?.length - 1];

      const handleTabKey = (e) => {
        if (e?.key === 'Tab') {
          if (e?.shiftKey) {
            if (document.activeElement === firstElement) {
              e?.preventDefault();
              lastElement?.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e?.preventDefault();
              firstElement?.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      
      return () => {
        document.removeEventListener('keydown', handleTabKey);
      };
    } else {
      // Restore body scroll when modal is closed
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-300 bg-black flex items-center justify-center animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "video-title" : undefined}
      aria-describedby={description ? "video-description" : undefined}
    >
      {/* Screen reader content */}
      <div className="sr-only">
        {title && <h1 id="video-title">{title}</h1>}
        {description && <p id="video-description">{description}</p>}
      </div>

      {/* Video Player */}
      <div className="w-full h-full">
        <VideoPlayer
          videoSrc={videoSrc}
          title={title}
          description={description}
          onClose={onClose}
          autoPlay
        />
      </div>

      {/* Loading Fallback */}
      {!videoSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg">Loading video...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoModal;