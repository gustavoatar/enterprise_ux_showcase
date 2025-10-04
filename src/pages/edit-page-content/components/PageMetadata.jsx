import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const PageMetadata = ({ 
  pageTitle, 
  onPageTitleChange, 
  pageDescription, 
  onPageDescriptionChange,
  lastModified,
  modifiedBy 
}) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="FileText" size={20} color="var(--color-accent-foreground)" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Page Metadata</h2>
          <p className="text-sm text-muted-foreground">Configure page title, description, and SEO settings</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Page Title */}
        <div>
          <Input
            label="Page Title"
            type="text"
            placeholder="Enter page title..."
            value={pageTitle}
            onChange={(e) => onPageTitleChange(e?.target?.value)}
            description="This title will appear in the browser tab and navigation"
            required
            maxLength={60}
          />
          <div className="mt-1 text-xs text-muted-foreground text-right">
            {pageTitle?.length}/60 characters
          </div>
        </div>

        {/* Page Description */}
        <div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-foreground mb-1">
              Page Description
            </label>
            <textarea
              placeholder="Enter a brief description of this page..."
              value={pageDescription}
              onChange={(e) => onPageDescriptionChange(e?.target?.value)}
              maxLength={160}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Used for SEO and page previews. Recommended length: 120-160 characters.
            </p>
            <div className="text-xs text-muted-foreground text-right">
              {pageDescription?.length}/160 characters
            </div>
          </div>
        </div>

        {/* Version Information */}
        {(lastModified || modifiedBy) && (
          <div className="border-t border-border pt-4">
            <h3 className="font-medium text-foreground mb-3">Version Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lastModified && (
                <div className="flex items-center space-x-3 p-3 bg-muted/10 rounded-lg">
                  <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Last Modified</p>
                    <p className="text-xs text-muted-foreground">{lastModified}</p>
                  </div>
                </div>
              )}
              
              {modifiedBy && (
                <div className="flex items-center space-x-3 p-3 bg-muted/10 rounded-lg">
                  <Icon name="User" size={16} color="var(--color-muted-foreground)" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Modified By</p>
                    <p className="text-xs text-muted-foreground">{modifiedBy}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SEO Preview */}
        <div>
          <h3 className="font-medium text-foreground mb-3">SEO Preview</h3>
          <div className="border border-border rounded-lg p-4 bg-muted/5">
            <div className="space-y-2">
              <div className="text-primary text-sm hover:underline cursor-pointer">
                {pageTitle || 'Page Title'}
              </div>
              <div className="text-xs text-success">
                https://enterprise-ux.com/{pageTitle?.toLowerCase()?.replace(/\s+/g, '-') || 'page-url'}
              </div>
              <div className="text-sm text-muted-foreground">
                {pageDescription || 'Page description will appear here...'}
              </div>
            </div>
          </div>
        </div>

        {/* Metadata Tips */}
        <div className="bg-accent/10 rounded-lg p-4 border border-border">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">SEO Best Practices</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Keep titles under 60 characters for optimal display</li>
                <li>• Write compelling descriptions between 120-160 characters</li>
                <li>• Use relevant keywords naturally in both title and description</li>
                <li>• Make titles and descriptions unique for each page</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageMetadata;