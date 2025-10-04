import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/ui/AdminHeader';
import PageSelector from './components/PageSelector';
import ContentTypeSelector from './components/ContentTypeSelector';
import ExternalUrlConfig from './components/ExternalUrlConfig';
import CustomPageConfig from './components/CustomPageConfig';
import PageMetadata from './components/PageMetadata';
import SaveActions from './components/SaveActions';
import Icon from '../../components/AppIcon';

const EditPageContent = () => {
  const navigate = useNavigate();
  
  // Page selection state
  const [selectedPage, setSelectedPage] = useState('');
  const [isLoadingPages, setIsLoadingPages] = useState(false);
  
  // Content configuration state
  const [contentType, setContentType] = useState('external');
  const [externalUrl, setExternalUrl] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [componentName, setComponentName] = useState('');
  const [customProps, setCustomProps] = useState([]);
  
  // Page metadata state
  const [pageTitle, setPageTitle] = useState('');
  const [pageDescription, setPageDescription] = useState('');
  
  // UI state
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Mock data for pages
  const mockPages = [
    {
      id: 'home-video-gallery',
      name: 'Home Video Gallery',
      type: 'custom',
      title: 'Enterprise UX Showcase',
      description: 'Main video gallery showcasing UX portfolio content',
      lastModified: 'October 3, 2025 at 2:30 PM',
      modifiedBy: 'admin@enterprise-ux.com'
    },
    {
      id: 'figma-prototype-display',
      name: 'Figma Prototype Display',
      type: 'external',
      title: 'Interactive Prototypes',
      description: 'Showcase of interactive Figma prototypes and design systems',
      url: 'https://www.figma.com/proto/example/prototype',
      lastModified: 'October 2, 2025 at 4:15 PM',
      modifiedBy: 'admin@enterprise-ux.com'
    },
    {
      id: 'full-screen-video-player',
      name: 'Full Screen Video Player',
      type: 'custom',
      title: 'Video Showcase',
      description: 'Immersive full-screen video player for detailed UX presentations',
      template: 'video-gallery',
      lastModified: 'October 1, 2025 at 11:45 AM',
      modifiedBy: 'admin@enterprise-ux.com'
    }
  ];

  // Load page data when page is selected
  useEffect(() => {
    if (selectedPage) {
      const pageData = mockPages?.find(page => page?.id === selectedPage);
      if (pageData) {
        setContentType(pageData?.type);
        setPageTitle(pageData?.title);
        setPageDescription(pageData?.description);
        setExternalUrl(pageData?.url || '');
        setSelectedTemplate(pageData?.template || '');
        setComponentName(pageData?.componentName || '');
        setCustomProps(pageData?.customProps || []);
        setHasUnsavedChanges(false);
        setSaveSuccess(false);
        setSaveError('');
      }
    }
  }, [selectedPage]);

  // Track unsaved changes
  useEffect(() => {
    if (selectedPage) {
      setHasUnsavedChanges(true);
      setSaveSuccess(false);
    }
  }, [contentType, externalUrl, selectedTemplate, componentName, customProps, pageTitle, pageDescription]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e?.ctrlKey || e?.metaKey) {
        if (e?.key === 's') {
          e?.preventDefault();
          handleSave();
        } else if (e?.key === 'p') {
          e?.preventDefault();
          handleSaveAndPreview();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [hasUnsavedChanges]);

  const handlePageChange = (pageId) => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to switch pages?');
      if (!confirmLeave) return;
    }
    setSelectedPage(pageId);
  };

  const handlePreview = async () => {
    setIsPreviewLoading(true);
    setPreviewError('');
    
    try {
      // Simulate preview loading
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock validation
      if (!externalUrl?.includes('figma.com') && !externalUrl?.includes('prototype')) {
        throw new Error('URL may not support iframe embedding. Please verify the link works in an incognito window.');
      }
      
      // Open preview in new tab
      window.open(externalUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      setPreviewError(error?.message);
    } finally {
      setIsPreviewLoading(false);
    }
  };

  const handleSave = async () => {
    if (!hasUnsavedChanges) return;
    
    setIsSaving(true);
    setSaveError('');
    setSaveSuccess(false);
    
    try {
      // Simulate save operation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock validation
      if (!pageTitle?.trim()) {
        throw new Error('Page title is required');
      }
      
      if (contentType === 'external' && !externalUrl?.trim()) {
        throw new Error('External URL is required');
      }
      
      if (contentType === 'custom' && selectedTemplate === 'custom-component' && !componentName?.trim()) {
        throw new Error('Component name is required for custom components');
      }
      
      // Success
      setHasUnsavedChanges(false);
      setSaveSuccess(true);
      
      // Auto-hide success message
      setTimeout(() => setSaveSuccess(false), 5000);
      
    } catch (error) {
      setSaveError(error?.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAndPreview = async () => {
    await handleSave();
    if (!saveError) {
      // Navigate to preview page
      if (contentType === 'external') {
        navigate('/figma-prototype-display');
      } else {
        navigate(`/${selectedPage}`);
      }
    }
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      const confirmCancel = window.confirm('You have unsaved changes. Are you sure you want to cancel?');
      if (!confirmCancel) return;
    }
    navigate('/home-video-gallery');
  };

  const currentPageData = mockPages?.find(page => page?.id === selectedPage);

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Edit" size={24} color="var(--color-primary)" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Edit Page Content</h1>
                <p className="text-muted-foreground">
                  Modify existing pages and configure content types for your portfolio
                </p>
              </div>
            </div>
            
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Admin</span>
              <Icon name="ChevronRight" size={16} />
              <span>Content Management</span>
              <Icon name="ChevronRight" size={16} />
              <span className="text-foreground">Edit Page Content</span>
            </nav>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="xl:col-span-2 space-y-8">
              {/* Page Selection */}
              <PageSelector
                selectedPage={selectedPage}
                onPageChange={handlePageChange}
                pages={mockPages}
                isLoading={isLoadingPages}
              />

              {selectedPage && (
                <>
                  {/* Content Type Selection */}
                  <ContentTypeSelector
                    contentType={contentType}
                    onContentTypeChange={setContentType}
                    disabled={isSaving}
                  />

                  {/* Content Configuration */}
                  {contentType === 'external' ? (
                    <ExternalUrlConfig
                      url={externalUrl}
                      onUrlChange={setExternalUrl}
                      onPreview={handlePreview}
                      isPreviewLoading={isPreviewLoading}
                      previewError={previewError}
                    />
                  ) : (
                    <CustomPageConfig
                      selectedTemplate={selectedTemplate}
                      onTemplateChange={setSelectedTemplate}
                      componentName={componentName}
                      onComponentNameChange={setComponentName}
                      customProps={customProps}
                      onCustomPropsChange={setCustomProps}
                    />
                  )}
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {selectedPage && (
                <>
                  {/* Page Metadata */}
                  <PageMetadata
                    pageTitle={pageTitle}
                    onPageTitleChange={setPageTitle}
                    pageDescription={pageDescription}
                    onPageDescriptionChange={setPageDescription}
                    lastModified={currentPageData?.lastModified}
                    modifiedBy={currentPageData?.modifiedBy}
                  />

                  {/* Save Actions */}
                  <SaveActions
                    onSave={handleSave}
                    onSaveAndPreview={handleSaveAndPreview}
                    onCancel={handleCancel}
                    isSaving={isSaving}
                    hasUnsavedChanges={hasUnsavedChanges}
                    saveError={saveError}
                    saveSuccess={saveSuccess}
                  />
                </>
              )}

              {/* Help Section */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Icon name="HelpCircle" size={20} color="var(--color-primary)" />
                  <h3 className="font-semibold text-foreground">Need Help?</h3>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    Use this page to modify existing content and configure how pages display information.
                  </p>
                  <ul className="space-y-1 text-xs">
                    <li>• External URLs work best with Figma prototypes</li>
                    <li>• Custom pages offer unlimited design flexibility</li>
                    <li>• Always preview changes before publishing</li>
                    <li>• Use keyboard shortcuts to save time</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditPageContent;