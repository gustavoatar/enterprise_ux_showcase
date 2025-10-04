import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/ui/AdminHeader';
import PageSetupSection from './components/PageSetupSection';
import ContentTypeSelection from './components/ContentTypeSelection';
import TemplateConfiguration from './components/TemplateConfiguration';
import NavigationIntegration from './components/NavigationIntegration';
import AdvancedOptions from './components/AdvancedOptions';
import SavePublishWorkflow from './components/SavePublishWorkflow';
import Icon from '../../components/AppIcon';

const CreateNewPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Page Setup State
  const [pageTitle, setPageTitle] = useState('');
  const [urlSlug, setUrlSlug] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  // Content Type State
  const [selectedContentType, setSelectedContentType] = useState('');

  // Template Configuration State
  const [templateConfig, setTemplateConfig] = useState({
    gridLayout: 'grid-3',
    hoverPreview: false,
    autoMute: true,
    showDuration: false,
    thumbnailHeight: '200',
    aspectRatio: '16:9',
    prototypeUrl: '',
    scaling: 'responsive',
    showControls: true,
    allowFullscreen: true,
    showExternalLink: false,
    containerHeight: '600',
    mobileHeight: '400'
  });

  // Navigation Integration State
  const [navigationConfig, setNavigationConfig] = useState({
    menuPosition: 'main-nav',
    parentPage: '',
    navLabel: '',
    menuOrder: 0,
    menuIcon: '',
    showInNav: true,
    showInSitemap: true,
    requireAuth: false
  });

  // Advanced Options State
  const [advancedConfig, setAdvancedConfig] = useState({
    status: 'draft',
    publishDate: '',
    publishTime: '',
    accessLevel: 'public',
    customRoute: '',
    routeParams: '',
    allowIndexing: true,
    enableAnalytics: true,
    socialPreviews: false,
    lazyLoading: true,
    preloadResources: false,
    enableCaching: true,
    customClasses: ''
  });

  // Mock existing pages for validation
  const existingPages = [
    'home-video-gallery',
    'full-screen-video-player',
    'figma-prototype-display',
    'edit-page-content'
  ];

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Page Setup validation
    if (!pageTitle?.trim()) {
      newErrors.pageTitle = 'Page title is required';
    }

    if (!urlSlug?.trim()) {
      newErrors.urlSlug = 'URL slug is required';
    } else if (existingPages?.includes(urlSlug)) {
      newErrors.urlSlug = 'This URL slug already exists';
    } else if (!/^[a-z0-9-]+$/?.test(urlSlug)) {
      newErrors.urlSlug = 'URL slug can only contain lowercase letters, numbers, and hyphens';
    }

    if (metaDescription?.length > 160) {
      newErrors.metaDescription = 'Meta description must be 160 characters or less';
    }

    // Content Type validation
    if (!selectedContentType) {
      newErrors.contentType = 'Please select a content type';
    }

    // Template Configuration validation
    if (selectedContentType === 'video-template') {
      if (!templateConfig?.gridLayout) {
        newErrors.gridLayout = 'Grid layout selection is required';
      }
    }

    if (selectedContentType === 'prototype-template') {
      if (!templateConfig?.prototypeUrl) {
        newErrors.prototypeUrl = 'Prototype URL is required';
      } else {
        try {
          new URL(templateConfig.prototypeUrl);
        } catch {
          newErrors.prototypeUrl = 'Please enter a valid URL';
        }
      }
    }

    // Advanced Options validation
    if (advancedConfig?.status === 'scheduled') {
      if (!advancedConfig?.publishDate) {
        newErrors.publishDate = 'Publish date is required for scheduled pages';
      }
      if (!advancedConfig?.publishTime) {
        newErrors.publishTime = 'Publish time is required for scheduled pages';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  // Check if form can be published
  const canPublish = pageTitle && urlSlug && selectedContentType && 
    (selectedContentType !== 'prototype-template' || templateConfig?.prototypeUrl);

  // Handle save as draft
  const handleSaveDraft = async () => {
    if (!pageTitle || !urlSlug) {
      setErrors({
        pageTitle: !pageTitle ? 'Page title is required' : '',
        urlSlug: !urlSlug ? 'URL slug is required' : ''
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const pageData = {
        title: pageTitle,
        slug: urlSlug,
        metaDescription,
        contentType: selectedContentType,
        templateConfig,
        navigationConfig,
        advancedConfig: { ...advancedConfig, status: 'draft' },
        createdAt: new Date()?.toISOString(),
        updatedAt: new Date()?.toISOString()
      };

      console.log('Saving draft:', pageData);
      
      // Navigate to edit page or show success message
      navigate('/edit-page-content', { 
        state: { 
          message: `Page "${pageTitle}" saved as draft successfully!`,
          pageData 
        }
      });
    } catch (error) {
      console.error('Error saving draft:', error);
      setErrors({ general: 'Failed to save draft. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle publish
  const handlePublish = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const pageData = {
        title: pageTitle,
        slug: urlSlug,
        metaDescription,
        contentType: selectedContentType,
        templateConfig,
        navigationConfig,
        advancedConfig: { ...advancedConfig, status: 'published' },
        createdAt: new Date()?.toISOString(),
        updatedAt: new Date()?.toISOString(),
        publishedAt: new Date()?.toISOString()
      };

      console.log('Publishing page:', pageData);
      
      // Navigate to the new page or show success message
      navigate('/home-video-gallery', { 
        state: { 
          message: `Page "${pageTitle}" published successfully!`,
          newPageUrl: `/portfolio/${urlSlug}`
        }
      });
    } catch (error) {
      console.error('Error publishing page:', error);
      setErrors({ general: 'Failed to publish page. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle preview
  const handlePreview = () => {
    if (!validateForm()) {
      return;
    }

    // Open preview in new tab
    const previewData = {
      title: pageTitle,
      slug: urlSlug,
      contentType: selectedContentType,
      templateConfig,
      isPreview: true
    };

    // Store preview data in sessionStorage
    sessionStorage.setItem('previewPageData', JSON.stringify(previewData));
    
    // Open preview window
    window.open(`/preview/${urlSlug}`, '_blank', 'width=1200,height=800');
  };

  // Auto-save draft periodically
  useEffect(() => {
    if (pageTitle && urlSlug) {
      const autoSaveTimer = setTimeout(() => {
        // Auto-save logic here
        console.log('Auto-saving draft...');
      }, 30000); // Auto-save every 30 seconds

      return () => clearTimeout(autoSaveTimer);
    }
  }, [pageTitle, urlSlug, selectedContentType, templateConfig]);

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Plus" size={24} color="var(--color-primary)" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Create New Page</h1>
                <p className="text-muted-foreground">
                  Add a new page to your portfolio with customizable content and navigation
                </p>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center space-x-2 text-sm">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                pageTitle && urlSlug ? 'bg-success/20 text-success' : 'bg-muted/20 text-muted-foreground'
              }`}>
                <Icon name={pageTitle && urlSlug ? "CheckCircle" : "Circle"} size={14} />
                <span>Setup</span>
              </div>
              <div className="w-8 h-px bg-border"></div>
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                selectedContentType ? 'bg-success/20 text-success' : 'bg-muted/20 text-muted-foreground'
              }`}>
                <Icon name={selectedContentType ? "CheckCircle" : "Circle"} size={14} />
                <span>Content</span>
              </div>
              <div className="w-8 h-px bg-border"></div>
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                canPublish ? 'bg-success/20 text-success' : 'bg-muted/20 text-muted-foreground'
              }`}>
                <Icon name={canPublish ? "CheckCircle" : "Circle"} size={14} />
                <span>Publish</span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {errors?.general && (
            <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
              <div className="flex items-center space-x-2 text-error">
                <Icon name="AlertCircle" size={20} />
                <span className="font-medium">{errors?.general}</span>
              </div>
            </div>
          )}

          {/* Form Sections */}
          <div className="space-y-8">
            {/* Page Setup */}
            <PageSetupSection
              pageTitle={pageTitle}
              setPageTitle={setPageTitle}
              urlSlug={urlSlug}
              setUrlSlug={setUrlSlug}
              metaDescription={metaDescription}
              setMetaDescription={setMetaDescription}
              errors={errors}
            />

            {/* Content Type Selection */}
            <ContentTypeSelection
              selectedContentType={selectedContentType}
              setSelectedContentType={setSelectedContentType}
              errors={errors}
            />

            {/* Template Configuration */}
            <TemplateConfiguration
              selectedContentType={selectedContentType}
              templateConfig={templateConfig}
              setTemplateConfig={setTemplateConfig}
              errors={errors}
            />

            {/* Navigation Integration */}
            <NavigationIntegration
              navigationConfig={navigationConfig}
              setNavigationConfig={setNavigationConfig}
              errors={errors}
            />

            {/* Advanced Options */}
            <AdvancedOptions
              advancedConfig={advancedConfig}
              setAdvancedConfig={setAdvancedConfig}
              errors={errors}
            />

            {/* Save & Publish */}
            <SavePublishWorkflow
              onSaveDraft={handleSaveDraft}
              onPublish={handlePublish}
              onPreview={handlePreview}
              isLoading={isLoading}
              canPublish={canPublish}
              validationErrors={errors}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPage;