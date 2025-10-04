import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/ui/AdminHeader';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalPages: 4,
      publishedPages: 3,
      draftPages: 1,
      totalViews: 1247,
      monthlyViews: 342,
      weeklyViews: 89
    },
    recentPages: [
      {
        id: 1,
        title: 'Home Video Gallery',
        status: 'published',
        lastModified: '2025-01-02T10:30:00Z',
        views: 523,
        url: '/home-video-gallery'
      },
      {
        id: 2,
        title: 'Figma Prototype Display',
        status: 'published',
        lastModified: '2025-01-01T15:45:00Z',
        views: 287,
        url: '/figma-prototype-display'
      },
      {
        id: 3,
        title: 'Full Screen Video Player',
        status: 'published',
        lastModified: '2024-12-30T09:20:00Z',
        views: 194,
        url: '/full-screen-video-player'
      },
      {
        id: 4,
        title: 'New Landing Page',
        status: 'draft',
        lastModified: '2025-01-01T12:00:00Z',
        views: 0,
        url: null
      }
    ],
    systemStatus: {
      health: 'healthy',
      uptime: '99.9%',
      lastBackup: '2025-01-02T02:00:00Z',
      storage: '2.3 GB / 10 GB'
    }
  });

  // Quick actions data
  const quickActions = [
    {
      title: 'Create New Page',
      description: 'Add a new page with customizable content',
      icon: 'Plus',
      color: 'primary',
      action: () => navigate('/create-new-page'),
      shortcut: 'Ctrl+N'
    },
    {
      title: 'Edit Existing Page',
      description: 'Modify content and settings for existing pages',
      icon: 'Edit',
      color: 'secondary',
      action: () => navigate('/edit-page-content'),
      shortcut: 'Ctrl+E'
    },
    {
      title: 'Media Management',
      description: 'Upload and organize videos, images, and files',
      icon: 'Image',
      color: 'success',
      action: () => alert('Media management coming soon!'),
      shortcut: 'Ctrl+M'
    },
    {
      title: 'Analytics & Reports',
      description: 'View detailed performance metrics and insights',
      icon: 'BarChart',
      color: 'warning',
      action: () => alert('Analytics dashboard coming soon!'),
      shortcut: 'Ctrl+A'
    }
  ];

  // Management cards data
  const managementCards = [
    {
      title: 'Pages',
      count: dashboardData?.stats?.totalPages,
      icon: 'FileText',
      description: `${dashboardData?.stats?.publishedPages} published, ${dashboardData?.stats?.draftPages} draft`,
      action: () => navigate('/edit-page-content'),
      trend: '+2 this month'
    },
    {
      title: 'Content',
      count: '12',
      icon: 'Layers',
      description: 'Videos, prototypes, and media files',
      action: () => alert('Content management coming soon!'),
      trend: '+5 this week'
    },
    {
      title: 'Views',
      count: dashboardData?.stats?.totalViews?.toLocaleString(),
      icon: 'Eye',
      description: `${dashboardData?.stats?.monthlyViews} this month`,
      action: () => alert('Analytics coming soon!'),
      trend: '+12% this month'
    },
    {
      title: 'Users',
      count: '1',
      icon: 'Users',
      description: 'Active admin users',
      action: () => alert('User management coming soon!'),
      trend: 'No change'
    }
  ];

  useEffect(() => {
    // Check authentication
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin-login');
      return;
    }

    // Simulate loading dashboard data
    const loadDashboard = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading dashboard:', error);
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, [navigate]);

  const handleViewLive = () => {
    window.open('/', '_blank');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'text-success bg-success/10';
      case 'draft':
        return 'text-warning bg-warning/10';
      case 'archived':
        return 'text-muted-foreground bg-muted/10';
      default:
        return 'text-muted-foreground bg-muted/10';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <AdminHeader />
        <div className="pt-16 flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
            <span className="text-muted-foreground">Loading dashboard...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Dashboard Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back! Here's what's happening with your portfolio.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="ExternalLink"
                  onClick={handleViewLive}
                >
                  View Live
                </Button>
                <Button
                  variant="outline"
                  iconName="RefreshCw"
                  onClick={() => window.location?.reload()}
                >
                  Refresh
                </Button>
                <Button
                  iconName="Plus"
                  onClick={() => navigate('/create-new-page')}
                >
                  New Page
                </Button>
              </div>
            </div>
          </div>

          {/* Management Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {managementCards?.map((card, index) => (
              <div
                key={index}
                onClick={card?.action}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-sm transition-all cursor-pointer hover:border-primary/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={card?.icon} size={20} color="var(--color-primary)" />
                  </div>
                  <span className="text-xs text-success font-medium">{card?.trend}</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-foreground">{card?.count}</h3>
                  <p className="text-sm font-medium text-foreground">{card?.title}</p>
                  <p className="text-xs text-muted-foreground">{card?.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Pages */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Recent Pages</h2>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="ExternalLink"
                  onClick={() => navigate('/edit-page-content')}
                >
                  View All
                </Button>
              </div>
              
              <div className="space-y-3">
                {dashboardData?.recentPages?.map((page) => (
                  <div key={page?.id} className="flex items-center justify-between p-3 bg-muted/5 rounded-lg hover:bg-muted/10 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium text-foreground">{page?.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(page?.status)}`}>
                          {page?.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-muted-foreground">
                          Modified {formatDate(page?.lastModified)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {page?.views} views
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {page?.url && (
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Eye"
                          onClick={() => window.open(page?.url, '_blank')}
                        />
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Edit"
                        onClick={() => navigate('/edit-page-content')}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickActions?.map((action, index) => (
                  <div
                    key={index}
                    onClick={action?.action}
                    className="p-4 border border-border rounded-lg hover:border-primary/20 hover:bg-primary/5 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-8 h-8 bg-${action?.color}/10 rounded-lg flex items-center justify-center`}>
                        <Icon name={action?.icon} size={16} color={`var(--color-${action?.color})`} />
                      </div>
                      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {action?.title}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {action?.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-mono">
                        {action?.shortcut}
                      </span>
                      <Icon name="ArrowRight" size={12} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="mt-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">System Status</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-3 h-3 bg-success rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-success">Healthy</span>
                  </div>
                  <p className="text-xs text-muted-foreground">System Status</p>
                </div>
                
                <div className="text-center">
                  <div className="text-lg font-semibold text-foreground mb-1">
                    {dashboardData?.systemStatus?.uptime}
                  </div>
                  <p className="text-xs text-muted-foreground">Uptime</p>
                </div>
                
                <div className="text-center">
                  <div className="text-lg font-semibold text-foreground mb-1">
                    {formatDate(dashboardData?.systemStatus?.lastBackup)}
                  </div>
                  <p className="text-xs text-muted-foreground">Last Backup</p>
                </div>
                
                <div className="text-center">
                  <div className="text-lg font-semibold text-foreground mb-1">
                    {dashboardData?.systemStatus?.storage}
                  </div>
                  <p className="text-xs text-muted-foreground">Storage Used</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;