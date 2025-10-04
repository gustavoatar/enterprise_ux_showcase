import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PublicHeader from '../../components/ui/PublicHeader';
import AdminHeader from '../../components/ui/AdminHeader';
import VideoPlayerModal from '../../components/ui/VideoPlayerModal';
import HeroSection from './components/HeroSection';
import FilterBar from './components/FilterBar';
import VideoGrid from './components/VideoGrid';
import LayoutSelector from './components/LayoutSelector';
import Icon from '../../components/AppIcon';

const HomeVideoGallery = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [layoutType, setLayoutType] = useState('standard');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVideos, setFilteredVideos] = useState([]);

  // Mock video data
  const mockVideos = [
    {
      id: 1,
      title: "Built to Deliver - EDX Future Vision",
      description: "Comprehensive design system implementation for large-scale enterprise applications with focus on accessibility and scalability.",
      thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      category: "Design Systems",
      duration: "12:45",
      date: "Oct 2025",
      views: "2.1K",
      isNew: true,
      isFeatured: true
    },
    {
      id: 2,
      title: "Mobile Banking App Redesign",
      description: "Complete mobile banking application redesign focusing on user experience improvements and modern interface design.",
      thumbnail: "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?w=800&h=600&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
      category: "Mobile UX",
      duration: "8:30",
      date: "Sep 2025",
      views: "1.8K",
      isNew: true
    },
    {
      id: 3,
      title: "E-commerce Platform Optimization",
      description: "Data-driven UX optimization for e-commerce platform resulting in 40% increase in conversion rates.",
      thumbnail: "https://images.pixabay.com/photo/2016/11/29/06/15/plans-1867745_1280.jpg?w=800&h=600&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      category: "E-commerce",
      duration: "15:20",
      date: "Aug 2025",
      views: "3.2K"
    },
    {
      id: 4,
      title: "Healthcare Dashboard Interface",
      description: "Intuitive dashboard design for healthcare professionals with complex data visualization and workflow optimization.",
      thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
      category: "Healthcare",
      duration: "10:15",
      date: "Jul 2025",
      views: "1.5K"
    },
    {
      id: 5,
      title: "SaaS Product Onboarding Flow",
      description: "Streamlined onboarding experience for SaaS platform reducing user drop-off by 60% in first week.",
      thumbnail: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?w=800&h=600&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      category: "SaaS",
      duration: "7:45",
      date: "Jun 2025",
      views: "2.7K"
    },
    {
      id: 6,
      title: "Accessibility-First Web Design",
      description: "Web application redesign with accessibility as primary focus, achieving WCAG 2.1 AA compliance.",
      thumbnail: "https://images.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg?w=800&h=600&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
      category: "Accessibility",
      duration: "11:30",
      date: "May 2025",
      views: "1.9K"
    }
  ];

  const categories = [
    { id: 'design-systems', name: 'Design Systems' },
    { id: 'mobile-ux', name: 'Mobile UX' },
    { id: 'e-commerce', name: 'E-commerce' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'saas', name: 'SaaS' },
    { id: 'accessibility', name: 'Accessibility' }
  ];

  // Check admin status on mount
  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdminLoggedIn') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  // Filter and sort videos
  useEffect(() => {
    let filtered = [...mockVideos];

    // Apply category filter
    if (selectedCategory !== 'all') {
      const categoryName = categories?.find(c => c?.id === selectedCategory)?.name;
      filtered = filtered?.filter(video => video?.category === categoryName);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(video =>
        video?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        video?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        video?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'title':
          return a?.title?.localeCompare(b?.title);
        case 'popular':
          return parseFloat(b?.views) - parseFloat(a?.views);
        default: // newest
          return new Date(b.date) - new Date(a.date);
      }
    });

    setFilteredVideos(filtered);
  }, [selectedCategory, sortBy, searchQuery]);

  const handleVideoPlay = (video) => {
    setSelectedVideo(video);
    setIsPlayerOpen(true);
  };

  const handleClosePlayer = () => {
    setIsPlayerOpen(false);
    setSelectedVideo(null);
  };

  const handleLayoutChange = (newLayout) => {
    setLayoutType(newLayout);
  };

  const featuredVideo = mockVideos?.find(video => video?.isFeatured);

  return (
    <>
      <Helmet>
        <title>Home Video Gallery - Enterprise UX Showcase</title>
        <meta name="description" content="Explore our comprehensive UX portfolio showcasing enterprise design systems, mobile applications, and innovative user experience solutions." />
        <meta name="keywords" content="UX design, enterprise UX, design systems, mobile UX, user experience portfolio" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header */}
        {isAdmin ? <AdminHeader /> : <PublicHeader />}

        {/* Main Content */}
        <main>
          <div className="w-full">
            {/* Hero Section */}
            {featuredVideo && (
              <HeroSection
                featuredVideo={featuredVideo}
                onPlay={handleVideoPlay}
              />
            )}

            {/* Video Gallery Content */}
            <div id="video-gallery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-16">
              {/* Filter Bar */}
              <FilterBar
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                sortBy={sortBy}
                onSortChange={setSortBy}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                totalVideos={filteredVideos?.length}
              />

              {/* Section Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Portfolio Gallery</h2>
                  <p className="text-muted-foreground mt-1">
                    Discover our latest UX design projects and case studies
                  </p>
                </div>
                
                {/* View Toggle for Mobile */}
                <div className="flex items-center space-x-2 md:hidden">
                  <button
                    onClick={() => setLayoutType(layoutType === 'standard' ? 'compact' : 'standard')}
                    className="p-2 rounded-md bg-muted/20 text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
                  >
                    <Icon name={layoutType === 'standard' ? 'LayoutGrid' : 'Grid3X3'} size={20} />
                  </button>
                </div>
              </div>

              {/* Video Grid */}
              <VideoGrid
                videos={filteredVideos}
                layoutType={layoutType}
                onVideoPlay={handleVideoPlay}
              />

              {/* Empty State */}
              {filteredVideos?.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Search" size={32} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">No Videos Found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Try adjusting your search criteria or browse all categories to discover our portfolio.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Layout Selector for Admin */}
        <LayoutSelector
          currentLayout={layoutType}
          onLayoutChange={handleLayoutChange}
          isVisible={isAdmin}
        />

        {/* Video Player Modal */}
        <VideoPlayerModal
          isOpen={isPlayerOpen}
          onClose={handleClosePlayer}
          videoSrc={selectedVideo?.videoUrl}
          title={selectedVideo?.title}
          description={selectedVideo?.description}
        />
      </div>
    </>
  );
};

export default HomeVideoGallery;