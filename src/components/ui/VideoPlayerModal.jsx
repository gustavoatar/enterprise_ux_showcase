import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const VideoPlayerModal = ({ isOpen, onClose, videoSrc, title, description }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  const videoRef = useRef(null);
  const modalRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    if (isOpen && videoSrc) {
      setIsLoading(true);
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [isOpen, videoSrc]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isOpen) return;
      
      switch (e?.key) {
        case 'Escape':
          handleClose();
          break;
        case ' ':
          e?.preventDefault();
          togglePlayPause();
          break;
        case 'f': case'F':
          toggleFullscreen();
          break;
        case 'm': case'M':
          toggleMute();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, isPlaying]);

  const handleClose = () => {
    if (videoRef?.current) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    }
    onClose();
  };

  const togglePlayPause = () => {
    if (!videoRef?.current) return;
    
    if (isPlaying) {
      videoRef?.current?.pause();
    } else {
      videoRef?.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (videoRef?.current) {
      setCurrentTime(videoRef?.current?.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef?.current) {
      setDuration(videoRef?.current?.duration);
      setIsLoading(false);
    }
  };

  const handleSeek = (e) => {
    if (!videoRef?.current) return;
    
    const rect = e?.currentTarget?.getBoundingClientRect();
    const clickX = e?.clientX - rect?.left;
    const newTime = (clickX / rect?.width) * duration;
    
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e?.target?.value);
    setVolume(newVolume);
    if (videoRef?.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (!videoRef?.current) return;
    
    if (isMuted) {
      videoRef.current.volume = volume;
      setIsMuted(false);
    } else {
      videoRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    if (!modalRef?.current) return;
    
    if (!isFullscreen) {
      if (modalRef?.current?.requestFullscreen) {
        modalRef?.current?.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (time) => {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-300 bg-black/95 flex items-center justify-center animate-fade-in">
      <div
        ref={modalRef}
        className="relative w-full h-full max-w-6xl max-h-screen flex flex-col"
        onMouseMove={handleMouseMove}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className={`absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-smooth ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Close video player"
        >
          <Icon name="X" size={24} />
        </button>

        {/* Video Container */}
        <div className="flex-1 flex items-center justify-center relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}
          
          <video
            ref={videoRef}
            src={videoSrc}
            className="w-full h-full object-contain"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            onClick={togglePlayPause}
          />

          {/* Play/Pause Overlay */}
          {!isLoading && (
            <button
              onClick={togglePlayPause}
              className={`absolute inset-0 flex items-center justify-center transition-smooth ${
                showControls && !isPlaying ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="p-4 bg-black/50 rounded-full">
                <Icon name={isPlaying ? 'Pause' : 'Play'} size={48} color="white" />
              </div>
            </button>
          )}
        </div>

        {/* Video Controls */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-smooth ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Video Info */}
          {(title || description) && (
            <div className="mb-4">
              {title && <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>}
              {description && <p className="text-sm text-gray-300">{description}</p>}
            </div>
          )}

          {/* Progress Bar */}
          <div className="mb-4">
            <div
              className="w-full h-2 bg-white/20 rounded-full cursor-pointer"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-primary rounded-full relative"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlayPause}
                className="text-white hover:bg-white/20"
              >
                <Icon name={isPlaying ? 'Pause' : 'Play'} size={20} />
              </Button>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  className="text-white hover:bg-white/20"
                >
                  <Icon name={isMuted ? 'VolumeX' : 'Volume2'} size={20} />
                </Button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-white/20 rounded-full appearance-none slider"
                />
              </div>

              <div className="text-sm text-white">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="text-white hover:bg-white/20"
            >
              <Icon name={isFullscreen ? 'Minimize' : 'Maximize'} size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerModal;