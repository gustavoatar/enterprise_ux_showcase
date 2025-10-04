import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VideoPlayer = ({ 
  videoSrc, 
  title, 
  description, 
  onClose, 
  autoPlay = false 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  
  const videoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => {
      setIsLoading(false);
      if (autoPlay) {
        video?.play()?.catch(console.error);
      }
    };
    const handleLoadedMetadata = () => setDuration(video?.duration);
    const handleTimeUpdate = () => setCurrentTime(video?.currentTime);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleWaiting = () => setIsBuffering(true);
    const handlePlaying = () => setIsBuffering(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    video?.addEventListener('loadstart', handleLoadStart);
    video?.addEventListener('canplay', handleCanPlay);
    video?.addEventListener('loadedmetadata', handleLoadedMetadata);
    video?.addEventListener('timeupdate', handleTimeUpdate);
    video?.addEventListener('play', handlePlay);
    video?.addEventListener('pause', handlePause);
    video?.addEventListener('waiting', handleWaiting);
    video?.addEventListener('playing', handlePlaying);
    video?.addEventListener('ended', handleEnded);

    return () => {
      video?.removeEventListener('loadstart', handleLoadStart);
      video?.removeEventListener('canplay', handleCanPlay);
      video?.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video?.removeEventListener('timeupdate', handleTimeUpdate);
      video?.removeEventListener('play', handlePlay);
      video?.removeEventListener('pause', handlePause);
      video?.removeEventListener('waiting', handleWaiting);
      video?.removeEventListener('playing', handlePlaying);
      video?.removeEventListener('ended', handleEnded);
    };
  }, [autoPlay]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e?.key) {
        case ' ':
          e?.preventDefault();
          togglePlayPause();
          break;
        case 'Escape':
          onClose();
          break;
        case 'm': case'M':
          toggleMute();
          break;
        case 'f': case'F':
          toggleFullscreen();
          break;
        case 'ArrowLeft':
          e?.preventDefault();
          seekBackward();
          break;
        case 'ArrowRight':
          e?.preventDefault();
          seekForward();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [onClose]);

  const togglePlayPause = () => {
    const video = videoRef?.current;
    if (!video) return;

    if (isPlaying) {
      video?.pause();
    } else {
      video?.play()?.catch(console.error);
    }
  };

  const toggleMute = () => {
    const video = videoRef?.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume;
      video.muted = false;
      setIsMuted(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e?.target?.value);
    const video = videoRef?.current;
    if (!video) return;

    setVolume(newVolume);
    video.volume = newVolume;
    
    if (newVolume === 0) {
      setIsMuted(true);
      video.muted = true;
    } else if (isMuted) {
      setIsMuted(false);
      video.muted = false;
    }
  };

  const handleProgressClick = (e) => {
    const video = videoRef?.current;
    const progressBar = progressRef?.current;
    if (!video || !progressBar || !duration) return;

    const rect = progressBar?.getBoundingClientRect();
    const clickX = e?.clientX - rect?.left;
    const newTime = (clickX / rect?.width) * duration;
    
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const seekForward = () => {
    const video = videoRef?.current;
    if (!video) return;
    video.currentTime = Math.min(video?.currentTime + 10, duration);
  };

  const seekBackward = () => {
    const video = videoRef?.current;
    if (!video) return;
    video.currentTime = Math.max(video?.currentTime - 10, 0);
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()?.catch(console.error);
    } else {
      document.documentElement?.requestFullscreen()?.catch(console.error);
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  const showControlsTemporarily = () => {
    setShowControls(true);
    if (controlsTimeoutRef?.current) {
      clearTimeout(controlsTimeoutRef?.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const handleMouseMove = () => {
    showControlsTemporarily();
  };

  const handleVideoClick = () => {
    togglePlayPause();
    showControlsTemporarily();
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      className="relative w-full h-full bg-black flex items-center justify-center cursor-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoSrc}
        className="max-w-full max-h-full object-contain cursor-pointer"
        onClick={handleVideoClick}
        muted={isMuted}
        playsInline
      />

      {/* Loading Spinner */}
      {(isLoading || isBuffering) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-white text-sm">
              {isLoading ? 'Loading video...' : 'Buffering...'}
            </p>
          </div>
        </div>
      )}

      {/* Close Button */}
      <button
        onClick={onClose}
        className={`absolute top-6 right-6 z-50 p-3 bg-black/70 hover:bg-black/90 rounded-full text-white transition-all duration-200 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="Close video player"
      >
        <Icon name="X" size={24} />
      </button>

      {/* Mute Indicator */}
      {isMuted && !showControls && (
        <div className="absolute top-6 left-6 bg-black/70 rounded-full p-2">
          <Icon name="VolumeX" size={20} color="white" />
        </div>
      )}

      {/* Center Play/Pause Button */}
      {!isPlaying && !isLoading && (
        <button
          onClick={togglePlayPause}
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
        >
          <div className="bg-black/70 hover:bg-black/90 rounded-full p-6 transition-all duration-200">
            <Icon name="Play" size={48} color="white" />
          </div>
        </button>
      )}

      {/* Video Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 transition-all duration-300 ${
          showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {/* Video Info */}
        {(title || description) && (
          <div className="mb-6">
            {title && (
              <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
            )}
            {description && (
              <p className="text-sm text-gray-300 line-clamp-2">{description}</p>
            )}
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-4">
          <div
            ref={progressRef}
            className="w-full h-2 bg-white/20 rounded-full cursor-pointer hover:h-3 transition-all duration-200"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-primary rounded-full relative transition-all duration-100"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity duration-200"></div>
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Play/Pause */}
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlayPause}
              className="text-white hover:bg-white/20 h-12 w-12"
            >
              <Icon name={isPlaying ? 'Pause' : 'Play'} size={24} />
            </Button>

            {/* Seek Backward */}
            <Button
              variant="ghost"
              size="icon"
              onClick={seekBackward}
              className="text-white hover:bg-white/20 h-10 w-10"
            >
              <Icon name="SkipBack" size={20} />
            </Button>

            {/* Seek Forward */}
            <Button
              variant="ghost"
              size="icon"
              onClick={seekForward}
              className="text-white hover:bg-white/20 h-10 w-10"
            >
              <Icon name="SkipForward" size={20} />
            </Button>

            {/* Volume Controls */}
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="text-white hover:bg-white/20 h-10 w-10"
              >
                <Icon name={isMuted ? 'VolumeX' : volume > 0.5 ? 'Volume2' : 'Volume1'} size={20} />
              </Button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-24 h-1 bg-white/20 rounded-full appearance-none cursor-pointer slider"
              />
            </div>

            {/* Time Display */}
            <div className="text-sm text-white font-mono">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* Fullscreen Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="text-white hover:bg-white/20 h-10 w-10"
          >
            <Icon name="Maximize" size={20} />
          </Button>
        </div>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className={`absolute top-6 left-1/2 transform -translate-x-1/2 bg-black/70 rounded-lg px-4 py-2 text-white text-xs transition-all duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="flex items-center space-x-4">
          <span>Space: Play/Pause</span>
          <span>M: Mute</span>
          <span>F: Fullscreen</span>
          <span>←/→: Seek</span>
          <span>Esc: Close</span>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;