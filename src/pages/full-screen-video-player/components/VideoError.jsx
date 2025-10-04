import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VideoError = ({ 
  onClose, 
  onRetry, 
  errorMessage = "Failed to load video",
  showRetry = true 
}) => {
  return (
    <div className="fixed inset-0 z-300 bg-black flex items-center justify-center">
      <div className="text-center text-white max-w-md mx-auto px-6">
        {/* Error Icon */}
        <div className="mb-6">
          <Icon name="AlertTriangle" size={64} className="mx-auto text-warning" />
        </div>

        {/* Error Message */}
        <h2 className="text-2xl font-semibold mb-4">Video Unavailable</h2>
        <p className="text-gray-300 mb-2">{errorMessage}</p>
        <p className="text-sm text-gray-400 mb-8">
          This could be due to network issues, an invalid video URL, or the video file may no longer be available.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {showRetry && (
            <Button
              variant="default"
              onClick={onRetry}
              iconName="RotateCcw"
              iconPosition="left"
              className="min-w-[120px]"
            >
              Try Again
            </Button>
          )}
          <Button
            variant="outline"
            onClick={onClose}
            iconName="ArrowLeft"
            iconPosition="left"
            className="min-w-[120px]"
          >
            Go Back
          </Button>
        </div>

        {/* Troubleshooting Tips */}
        <div className="mt-8 text-left bg-gray-900/50 rounded-lg p-4">
          <h3 className="text-sm font-semibold mb-3 flex items-center">
            <Icon name="HelpCircle" size={16} className="mr-2" />
            Troubleshooting Tips
          </h3>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• Check your internet connection</li>
            <li>• Refresh the page and try again</li>
            <li>• Ensure the video URL is valid and accessible</li>
            <li>• Try a different browser if the issue persists</li>
          </ul>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-3 bg-black/70 hover:bg-black/90 rounded-full text-white transition-all duration-200"
          aria-label="Close video player"
        >
          <Icon name="X" size={24} />
        </button>
      </div>
    </div>
  );
};

export default VideoError;