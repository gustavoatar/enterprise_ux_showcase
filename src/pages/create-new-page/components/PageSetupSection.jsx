import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const PageSetupSection = ({ 
  pageTitle, 
  setPageTitle, 
  urlSlug, 
  setUrlSlug, 
  metaDescription, 
  setMetaDescription,
  errors 
}) => {
  const generateSlug = (title) => {
    return title?.toLowerCase()?.replace(/[^a-z0-9\s-]/g, '')?.replace(/\s+/g, '-')?.replace(/-+/g, '-')?.trim();
  };

  const handleTitleChange = (e) => {
    const title = e?.target?.value;
    setPageTitle(title);
    if (!urlSlug || urlSlug === generateSlug(pageTitle)) {
      setUrlSlug(generateSlug(title));
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="FileText" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Page Setup</h2>
          <p className="text-sm text-muted-foreground">Configure basic page information and SEO settings</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Page Title */}
        <Input
          label="Page Title"
          type="text"
          placeholder="Enter page title (e.g., 'Mobile App Design')"
          value={pageTitle}
          onChange={handleTitleChange}
          error={errors?.pageTitle}
          required
          description="This will appear in navigation and browser tabs"
          className="w-full"
        />

        {/* URL Slug */}
        <div>
          <Input
            label="URL Slug"
            type="text"
            placeholder="page-url-slug"
            value={urlSlug}
            onChange={(e) => setUrlSlug(generateSlug(e?.target?.value))}
            error={errors?.urlSlug}
            required
            description="Auto-generated from title, customize if needed"
            className="w-full"
          />
          <div className="mt-2 p-3 bg-muted/20 rounded-md">
            <div className="flex items-center space-x-2 text-sm">
              <Icon name="Link" size={16} color="var(--color-muted-foreground)" />
              <span className="text-muted-foreground">Preview URL:</span>
              <code className="text-primary font-mono">
                /portfolio/{urlSlug || 'your-page-slug'}
              </code>
            </div>
          </div>
        </div>

        {/* Meta Description */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Meta Description
            <span className="text-muted-foreground ml-1">(Optional)</span>
          </label>
          <textarea
            placeholder="Brief description for search engines and social media previews..."
            value={metaDescription}
            onChange={(e) => setMetaDescription(e?.target?.value)}
            rows={3}
            maxLength={160}
            className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-muted-foreground">
              Recommended: 120-160 characters for optimal SEO
            </p>
            <span className={`text-xs ${
              metaDescription?.length > 160 ? 'text-error' : 'text-muted-foreground'
            }`}>
              {metaDescription?.length}/160
            </span>
          </div>
          {errors?.metaDescription && (
            <p className="text-sm text-error mt-1">{errors?.metaDescription}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageSetupSection;