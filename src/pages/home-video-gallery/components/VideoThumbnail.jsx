import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const VideoThumbnail = ({ video, onPlay, layoutType }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getCardClasses = () => {
    const baseClasses = "relative group cursor-pointer overflow-hidden rounded-lg bg-card border border-border transition-all duration-300 hover:scale-105 hover:shadow-lg";
    
    switch (layoutType) {
      case 'compact':
        return `${baseClasses} aspect-video`;
      case 'detailed':
        return `${baseClasses} aspect-[4/5]`;
      default: // standard
        return `${baseClasses} aspect-[3/4]`;
    }
  };

  const handleClick = () => {
    onPlay(video);
  };

  return (
    <div 
      className={getCardClasses()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Thumbnail Image */}
      <div className="relative w-full h-full">
        <Image
          src={video?.thumbnail}
          alt={video?.title}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        
        {/* Play Button Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Icon name="Play" size={24} color="white" />
          </div>
        </div>
        
        {/* Duration Badge */}
        {video?.duration && (
          <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
            {video?.duration}
          </div>
        )}
        
        {/* New Badge */}
        {video?.isNew && (
          <div className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 rounded font-medium">
            NEW
          </div>
        )}
      </div>
      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="font-semibold text-lg mb-1 line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {video?.title}
        </h3>
        
        {layoutType !== 'compact' && (
          <>
            <p className="text-sm text-gray-300 mb-2 line-clamp-2">
              {video?.description}
            </p>
            
            {/* Metadata */}
            <div className="flex items-center space-x-4 text-xs text-gray-400">
              {video?.category && (
                <span className="flex items-center space-x-1">
                  <Icon name="Tag" size={12} />
                  <span>{video?.category}</span>
                </span>
              )}
              {video?.views && (
                <span className="flex items-center space-x-1">
                  <Icon name="Eye" size={12} />
                  <span>{video?.views}</span>
                </span>
              )}
              {video?.date && (
                <span className="flex items-center space-x-1">
                  <Icon name="Calendar" size={12} />
                  <span>{video?.date}</span>
                </span>
              )}
            </div>
          </>
        )}
      </div>
      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
    </div>
  );
};

export default VideoThumbnail;