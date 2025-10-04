import React from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const NavigationIntegration = ({ 
  navigationConfig, 
  setNavigationConfig, 
  errors 
}) => {
  const menuPositions = [
    { value: 'main-nav', label: 'Main Navigation', description: 'Appears in primary header menu' },
    { value: 'footer', label: 'Footer Menu', description: 'Shows in footer navigation' },
    { value: 'hidden', label: 'Hidden', description: 'Accessible by direct URL only' }
  ];

  const parentPages = [
    { value: '', label: 'None (Top Level)', description: 'Standalone page' },
    { value: 'portfolio', label: 'Portfolio', description: 'Under portfolio section' },
    { value: 'case-studies', label: 'Case Studies', description: 'Under case studies section' },
    { value: 'about', label: 'About', description: 'Under about section' }
  ];

  const updateConfig = (key, value) => {
    setNavigationConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
          <Icon name="Navigation" size={20} color="var(--color-success)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Navigation Integration</h2>
          <p className="text-sm text-muted-foreground">Configure how this page appears in site navigation</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Menu Position */}
        <Select
          label="Menu Position"
          description="Where should this page appear in navigation?"
          options={menuPositions}
          value={navigationConfig?.menuPosition || 'main-nav'}
          onChange={(value) => updateConfig('menuPosition', value)}
          error={errors?.menuPosition}
          required
        />

        {/* Parent Page */}
        <Select
          label="Parent Page"
          description="Group this page under another section"
          options={parentPages}
          value={navigationConfig?.parentPage || ''}
          onChange={(value) => updateConfig('parentPage', value)}
        />

        {/* Navigation Label */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Navigation Label
            <span className="text-muted-foreground ml-1">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder="Custom menu text (defaults to page title)"
            value={navigationConfig?.navLabel || ''}
            onChange={(e) => updateConfig('navLabel', e?.target?.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Leave empty to use page title as navigation text
          </p>
        </div>

        {/* Menu Order */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Menu Order
            </label>
            <input
              type="number"
              placeholder="0"
              value={navigationConfig?.menuOrder || ''}
              onChange={(e) => updateConfig('menuOrder', parseInt(e?.target?.value) || 0)}
              min="0"
              max="100"
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Lower numbers appear first (0 = first)
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Menu Icon
              <span className="text-muted-foreground ml-1">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="FileText"
              value={navigationConfig?.menuIcon || ''}
              onChange={(e) => updateConfig('menuIcon', e?.target?.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Lucide icon name (e.g., FileText, Play, Monitor)
            </p>
          </div>
        </div>

        {/* Visibility Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Visibility Settings</h4>
          <div className="space-y-3">
            <Checkbox
              label="Show in navigation"
              description="Display this page in the selected menu"
              checked={navigationConfig?.showInNav !== false}
              onChange={(e) => updateConfig('showInNav', e?.target?.checked)}
            />
            <Checkbox
              label="Show in sitemap"
              description="Include in XML sitemap for search engines"
              checked={navigationConfig?.showInSitemap !== false}
              onChange={(e) => updateConfig('showInSitemap', e?.target?.checked)}
            />
            <Checkbox
              label="Require authentication"
              description="Restrict access to logged-in users only"
              checked={navigationConfig?.requireAuth || false}
              onChange={(e) => updateConfig('requireAuth', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Preview */}
        <div className="p-4 bg-muted/10 rounded-lg border border-border">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
            <Icon name="Eye" size={16} />
            <span>Navigation Preview</span>
          </h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Icon name="MapPin" size={14} color="var(--color-muted-foreground)" />
              <span className="text-muted-foreground">Position:</span>
              <span className="text-foreground font-medium">
                {menuPositions?.find(p => p?.value === navigationConfig?.menuPosition)?.label || 'Main Navigation'}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Icon name="Hash" size={14} color="var(--color-muted-foreground)" />
              <span className="text-muted-foreground">Order:</span>
              <span className="text-foreground font-medium">
                {navigationConfig?.menuOrder || 0}
              </span>
            </div>
            {navigationConfig?.menuIcon && (
              <div className="flex items-center space-x-2 text-sm">
                <Icon name={navigationConfig?.menuIcon} size={14} color="var(--color-muted-foreground)" />
                <span className="text-muted-foreground">Icon:</span>
                <span className="text-foreground font-medium">{navigationConfig?.menuIcon}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationIntegration;