import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import VideoModal from './components/VideoModal';
import VideoError from './components/VideoError';

const FullScreenVideoPlayer = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [videoData, setVideoData] = useState({
    src: '',
    title: '',
    description: ''
  });
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock video data - in a real app, this would come from an API or state management
  const mockVideos = [
    {
      id: 'ux-research-methodology',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      title: 'UX Research Methodology Deep Dive',
      description: `Comprehensive exploration of user research methodologies including ethnographic studies, usability testing, and behavioral analytics.\n\nThis presentation covers advanced techniques for gathering meaningful user insights and translating them into actionable design decisions.`
    },
    {
      id: 'design-system-evolution',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      title: 'Design System Evolution at Scale',
      description: `Journey through the development and scaling of enterprise design systems across multiple product lines.\n\nLearn how we maintained consistency while enabling innovation across distributed design teams.`
    },
    {
      id: 'accessibility-first-design',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      title: 'Accessibility-First Design Approach',
      description: `Implementing inclusive design principles from the ground up to create experiences that work for everyone.\n\nCase studies demonstrating how accessibility constraints drive innovative design solutions.`
    },
    {
      id: 'data-driven-personalization',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      title: 'Data-Driven Personalization Strategy',
      description: `Leveraging user data and machine learning to create personalized experiences that adapt to individual user needs.\n\nExploring the balance between personalization and privacy in modern UX design.`
    },
    {
      id: 'mobile-first-transformation',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      title: 'Mobile-First Digital Transformation',
      description: `Complete redesign of legacy enterprise applications using mobile-first principles and progressive enhancement.\n\nReal-world challenges and solutions in modernizing complex business workflows.`
    }
  ];

  useEffect(() => {
    const videoId = searchParams?.get('id');
    const customSrc = searchParams?.get('src');
    const customTitle = searchParams?.get('title');
    const customDescription = searchParams?.get('description');

    setIsLoading(true);
    setHasError(false);

    // Simulate loading delay
    const loadTimeout = setTimeout(() => {
      if (customSrc) {
        // Custom video from URL parameters
        setVideoData({
          src: decodeURIComponent(customSrc),
          title: customTitle ? decodeURIComponent(customTitle) : 'Custom Video',
          description: customDescription ? decodeURIComponent(customDescription) : ''
        });
      } else if (videoId) {
        // Find video from mock data
        const video = mockVideos?.find(v => v?.id === videoId);
        if (video) {
          setVideoData(video);
        } else {
          setHasError(true);
        }
      } else {
        // Default video if no parameters
        setVideoData(mockVideos?.[0]);
      }
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(loadTimeout);
  }, [searchParams]);

  const handleClose = () => {
    navigate('/home-video-gallery');
  };

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    
    // Retry loading after a short delay
    setTimeout(() => {
      setIsLoading(false);
      if (!videoData?.src) {
        setHasError(true);
      }
    }, 1000);
  };

  // Show error state
  if (hasError) {
    return (
      <VideoError
        onClose={handleClose}
        onRetry={handleRetry}
        errorMessage="The requested video could not be found or loaded"
      />
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-300 bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Preparing video...</p>
          <p className="text-sm text-gray-400 mt-2">Please wait while we load your content</p>
        </div>
      </div>
    );
  }

  return (
    <VideoModal
      isOpen={true}
      onClose={handleClose}
      videoSrc={videoData?.src}
      title={videoData?.title}
      description={videoData?.description}
    />
  );
};

export default FullScreenVideoPlayer;