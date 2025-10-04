import React from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const AdvancedOptions = ({ 
  advancedConfig, 
  setAdvancedConfig, 
  errors 
}) => {
  const pageStatuses = [
    { value: 'draft', label: 'Draft', description: 'Not visible to public users' },
    { value: 'published', label: 'Published', description: 'Live and accessible to all users' },
    { value: 'scheduled', label: 'Scheduled', description: 'Publish at a specific date/time' }
  ];

  const accessLevels = [
    { value: 'public', label: 'Public', description: 'Anyone can view this page' },
    { value: 'authenticated', label: 'Authenticated Users', description: 'Requires login to view' },
    { value: 'admin', label: 'Admin Only', description: 'Only administrators can access' }
  ];

  const updateConfig = (key, value) => {
    setAdvancedConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
          <Icon name="Settings2" size={20} color="var(--color-warning)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Advanced Options</h2>
          <p className="text-sm text-muted-foreground">Configure publishing, access controls, and routing settings</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Page Status */}
        <Select
          label="Page Status"
          description="Control when and how this page becomes available"
          options={pageStatuses}
          value={advancedConfig?.status || 'draft'}
          onChange={(value) => updateConfig('status', value)}
          error={errors?.status}
          required
        />

        {/* Scheduled Publishing */}
        {advancedConfig?.status === 'scheduled' && (
          <div className="grid md:grid-cols-2 gap-4 p-4 bg-warning/5 border border-warning/20 rounded-lg">
            <Input
              label="Publish Date"
              type="date"
              value={advancedConfig?.publishDate || ''}
              onChange={(e) => updateConfig('publishDate', e?.target?.value)}
              error={errors?.publishDate}
              required
            />
            <Input
              label="Publish Time"
              type="time"
              value={advancedConfig?.publishTime || ''}
              onChange={(e) => updateConfig('publishTime', e?.target?.value)}
              error={errors?.publishTime}
              required
            />
          </div>
        )}

        {/* Access Control */}
        <Select
          label="Access Level"
          description="Who can view this page"
          options={accessLevels}
          value={advancedConfig?.accessLevel || 'public'}
          onChange={(value) => updateConfig('accessLevel', value)}
        />

        {/* Custom Route Parameters */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Custom Routing</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Custom Route Path"
              type="text"
              placeholder="/custom/path"
              value={advancedConfig?.customRoute || ''}
              onChange={(e) => updateConfig('customRoute', e?.target?.value)}
              description="Override default URL structure"
            />
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Route Parameters
                <span className="text-muted-foreground ml-1">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="param1,param2"
                value={advancedConfig?.routeParams || ''}
                onChange={(e) => updateConfig('routeParams', e?.target?.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Comma-separated dynamic route parameters
              </p>
            </div>
          </div>
        </div>

        {/* SEO & Analytics */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">SEO & Analytics</h4>
          <div className="space-y-3">
            <Checkbox
              label="Index in search engines"
              description="Allow search engines to index this page"
              checked={advancedConfig?.allowIndexing !== false}
              onChange={(e) => updateConfig('allowIndexing', e?.target?.checked)}
            />
            <Checkbox
              label="Enable analytics tracking"
              description="Track page views and user interactions"
              checked={advancedConfig?.enableAnalytics !== false}
              onChange={(e) => updateConfig('enableAnalytics', e?.target?.checked)}
            />
            <Checkbox
              label="Generate social media previews"
              description="Create Open Graph and Twitter Card metadata"
              checked={advancedConfig?.socialPreviews || false}
              onChange={(e) => updateConfig('socialPreviews', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Performance Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Performance</h4>
          <div className="space-y-3">
            <Checkbox
              label="Enable lazy loading"
              description="Load content as user scrolls (recommended)"
              checked={advancedConfig?.lazyLoading !== false}
              onChange={(e) => updateConfig('lazyLoading', e?.target?.checked)}
            />
            <Checkbox
              label="Preload critical resources"
              description="Load important assets immediately"
              checked={advancedConfig?.preloadResources || false}
              onChange={(e) => updateConfig('preloadResources', e?.target?.checked)}
            />
            <Checkbox
              label="Enable caching"
              description="Cache page content for faster loading"
              checked={advancedConfig?.enableCaching !== false}
              onChange={(e) => updateConfig('enableCaching', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Custom CSS/JS */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Custom Code</h4>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Custom CSS Classes
              <span className="text-muted-foreground ml-1">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="custom-class-1 custom-class-2"
              value={advancedConfig?.customClasses || ''}
              onChange={(e) => updateConfig('customClasses', e?.target?.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Space-separated CSS classes to apply to page container
            </p>
          </div>
        </div>

        {/* Preview Settings */}
        <div className="p-4 bg-muted/10 rounded-lg border border-border">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
            <Icon name="Info" size={16} />
            <span>Configuration Summary</span>
          </h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className={`font-medium ${
                  advancedConfig?.status === 'published' ? 'text-success' : 
                  advancedConfig?.status === 'scheduled' ? 'text-warning' : 'text-muted-foreground'
                }`}>
                  {pageStatuses?.find(s => s?.value === advancedConfig?.status)?.label || 'Draft'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Access:</span>
                <span className="text-foreground font-medium">
                  {accessLevels?.find(a => a?.value === advancedConfig?.accessLevel)?.label || 'Public'}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">SEO Indexing:</span>
                <span className={`font-medium ${
                  advancedConfig?.allowIndexing !== false ? 'text-success' : 'text-muted-foreground'
                }`}>
                  {advancedConfig?.allowIndexing !== false ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Analytics:</span>
                <span className={`font-medium ${
                  advancedConfig?.enableAnalytics !== false ? 'text-success' : 'text-muted-foreground'
                }`}>
                  {advancedConfig?.enableAnalytics !== false ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedOptions;