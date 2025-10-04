import React from 'react';
import VideoThumbnail from './VideoThumbnail';
import Icon from '../../../components/AppIcon';


const VideoGrid = ({ videos, layoutType, onVideoPlay }) => {
  const getGridClasses = () => {
    const baseClasses = "grid gap-6 w-full";
    
    switch (layoutType) {
      case 'compact':
        return `${baseClasses} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`;
      case 'detailed':
        return `${baseClasses} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`;
      default: // standard
        return `${baseClasses} grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`;
    }
  };

  if (!videos || videos?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center mb-4">
          <Icon name="Video" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No Videos Available</h3>
        <p className="text-muted-foreground max-w-md">
          There are currently no videos in the gallery. Check back later or contact the administrator.
        </p>
      </div>
    );
  }

  return (
    <div className={getGridClasses()}>
      {videos?.map((video) => (
        <VideoThumbnail
          key={video?.id}
          video={video}
          layoutType={layoutType}
          onPlay={onVideoPlay}
        />
      ))}
    </div>
  );
};

export default VideoGrid;