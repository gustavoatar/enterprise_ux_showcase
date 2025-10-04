import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = ({ featuredVideo, onPlay }) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = true;
      videoRef?.current?.play()?.catch((error) => {
        console.log('Auto-play was prevented:', error);
      });
    }
  }, [featuredVideo]);

  const toggleMute = () => {
    if (videoRef?.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const scrollToGallery = () => {
    const galleryElement = document.getElementById('video-gallery');
    if (galleryElement) {
      galleryElement?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  if (!featuredVideo) return null;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video - Full Screen */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop"
        >
          <source src={featuredVideo?.videoUrl} type="video/mp4" />
          {/* Beach background fallback if video fails to load */}
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop)' 
            }}
          />
        </video>
        
        {/* Subtle fade to black overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </div>

      {/* Unmute Button */}
      <div className="absolute top-20 right-4 z-10">
        <button
          onClick={toggleMute}
          className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          <Icon 
            name={isMuted ? 'VolumeX' : 'Volume2'} 
            size={20} 
          />
        </button>
      </div>
      
      {/* Content */}
      <div className="relative h-full flex items-center z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 text-shadow-lg">
              Built to Deliver - EDX Future Vision
            </h1>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <Button
                size="lg"
                onClick={() => onPlay(featuredVideo)}
                iconName="Play"
                iconPosition="left"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3"
              >
                Watch Now
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                iconName="Info"
                iconPosition="left"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-3 backdrop-blur-sm"
              >
                More Info
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <button 
        onClick={scrollToGallery}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer hover:scale-110 transition-transform"
        aria-label="Scroll to video gallery"
      >
        <Icon name="ChevronDown" size={24} color="white" className="opacity-60" />
      </button>
    </div>
  );
};

export default HeroSection;