import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ExternalUrlConfig = ({ url, onUrlChange, onPreview, isPreviewLoading, previewError }) => {
  const [urlError, setUrlError] = useState('');

  const validateUrl = (inputUrl) => {
    if (!inputUrl) {
      setUrlError('URL is required');
      return false;
    }

    try {
      const urlObj = new URL(inputUrl);
      if (!['http:', 'https:']?.includes(urlObj?.protocol)) {
        setUrlError('URL must use HTTP or HTTPS protocol');
        return false;
      }
      setUrlError('');
      return true;
    } catch {
      setUrlError('Please enter a valid URL');
      return false;
    }
  };

  const handleUrlChange = (e) => {
    const newUrl = e?.target?.value;
    onUrlChange(newUrl);
    if (newUrl) {
      validateUrl(newUrl);
    } else {
      setUrlError('');
    }
  };

  const handlePreview = () => {
    if (validateUrl(url)) {
      onPreview();
    }
  };

  const suggestedUrls = [
    {
      label: 'Figma Prototype Example',
      url: 'https://www.figma.com/proto/example/prototype',
      description: 'Interactive Figma prototype'
    },
    {
      label: 'Design System Demo',
      url: 'https://storybook.example.com',
      description: 'Component library showcase'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="ExternalLink" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">External URL Configuration</h2>
          <p className="text-sm text-muted-foreground">Configure external content integration</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* URL Input */}
        <div>
          <Input
            label="External URL"
            type="url"
            placeholder="https://www.figma.com/proto/your-prototype-url"
            value={url}
            onChange={handleUrlChange}
            error={urlError}
            description="Enter the full URL to your external content (Figma prototype, website, etc.)"
            required
          />
        </div>

        {/* URL Validation Status */}
        {url && !urlError && (
          <div className="flex items-center space-x-2 p-3 bg-success/10 rounded-lg border border-success/20">
            <Icon name="CheckCircle" size={16} color="var(--color-success)" />
            <span className="text-sm text-success">Valid URL format</span>
          </div>
        )}

        {/* Preview Section */}
        <div className="border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-foreground">URL Preview</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreview}
              disabled={!url || !!urlError || isPreviewLoading}
              loading={isPreviewLoading}
              iconName="Eye"
              iconPosition="left"
            >
              Preview
            </Button>
          </div>

          {previewError && (
            <div className="flex items-center space-x-2 p-3 bg-error/10 rounded-lg border border-error/20">
              <Icon name="AlertCircle" size={16} color="var(--color-error)" />
              <span className="text-sm text-error">{previewError}</span>
            </div>
          )}

          {!url && (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="Globe" size={48} className="mx-auto mb-3 opacity-50" />
              <p className="text-sm">Enter a URL above to preview the content</p>
            </div>
          )}
        </div>

        {/* URL Suggestions */}
        <div>
          <h3 className="font-medium text-foreground mb-3">Quick Examples</h3>
          <div className="space-y-2">
            {suggestedUrls?.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted/10 rounded-lg border border-border cursor-pointer hover:bg-muted/20 transition-smooth"
                onClick={() => onUrlChange(suggestion?.url)}
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{suggestion?.label}</p>
                  <p className="text-xs text-muted-foreground">{suggestion?.description}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <Icon name="Copy" size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Configuration Tips */}
        <div className="bg-accent/10 rounded-lg p-4 border border-border">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Configuration Tips</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Figma prototypes work best when shared with "Anyone with the link can view"</li>
                <li>• Ensure external URLs support iframe embedding</li>
                <li>• Test URLs in an incognito window to verify public accessibility</li>
                <li>• Some websites may block iframe embedding for security reasons</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExternalUrlConfig;