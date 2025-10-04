import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const TemplateConfiguration = ({ 
  selectedContentType, 
  templateConfig, 
  setTemplateConfig, 
  errors 
}) => {
  const gridLayoutOptions = [
    { value: 'grid-3', label: '3 Column Grid', description: 'Standard desktop layout' },
    { value: 'grid-4', label: '4 Column Grid', description: 'Compact view for many videos' },
    { value: 'masonry', label: 'Masonry Layout', description: 'Pinterest-style dynamic grid' }
  ];

  const iframeScalingOptions = [
    { value: 'responsive', label: 'Responsive Scaling', description: 'Automatically adjusts to container' },
    { value: 'fixed', label: 'Fixed Dimensions', description: 'Maintains original size' },
    { value: 'fill', label: 'Fill Container', description: 'Stretches to fill available space' }
  ];

  const updateConfig = (key, value) => {
    setTemplateConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (!selectedContentType) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center py-8">
          <Icon name="Settings" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Select Content Type First</h3>
          <p className="text-muted-foreground">Choose a template above to configure its specific settings</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Settings" size={20} color="var(--color-accent-foreground)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Template Configuration</h2>
          <p className="text-sm text-muted-foreground">
            Customize settings for your {selectedContentType === 'video-template' ? 'video gallery' : 'prototype display'}
          </p>
        </div>
      </div>
      {selectedContentType === 'video-template' && (
        <div className="space-y-6">
          {/* Grid Layout Selection */}
          <Select
            label="Grid Layout"
            description="Choose how videos will be arranged on the page"
            options={gridLayoutOptions}
            value={templateConfig?.gridLayout || 'grid-3'}
            onChange={(value) => updateConfig('gridLayout', value)}
            error={errors?.gridLayout}
            required
          />

          {/* Auto-play Settings */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Playback Settings</h4>
            <div className="space-y-3">
              <Checkbox
                label="Enable hover preview"
                description="Show video preview on thumbnail hover"
                checked={templateConfig?.hoverPreview || false}
                onChange={(e) => updateConfig('hoverPreview', e?.target?.checked)}
              />
              <Checkbox
                label="Auto-mute videos"
                description="Start videos muted by default"
                checked={templateConfig?.autoMute !== false}
                onChange={(e) => updateConfig('autoMute', e?.target?.checked)}
              />
              <Checkbox
                label="Show video duration"
                description="Display video length on thumbnails"
                checked={templateConfig?.showDuration || false}
                onChange={(e) => updateConfig('showDuration', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Thumbnail Settings */}
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Thumbnail Height"
              type="number"
              placeholder="200"
              value={templateConfig?.thumbnailHeight || ''}
              onChange={(e) => updateConfig('thumbnailHeight', e?.target?.value)}
              description="Height in pixels"
              min="150"
              max="400"
            />
            <Select
              label="Aspect Ratio"
              options={[
                { value: '16:9', label: '16:9 (Widescreen)' },
                { value: '4:3', label: '4:3 (Standard)' },
                { value: '1:1', label: '1:1 (Square)' }
              ]}
              value={templateConfig?.aspectRatio || '16:9'}
              onChange={(value) => updateConfig('aspectRatio', value)}
            />
          </div>
        </div>
      )}
      {selectedContentType === 'prototype-template' && (
        <div className="space-y-6">
          {/* Prototype URL */}
          <Input
            label="Prototype URL"
            type="url"
            placeholder="https://www.figma.com/proto/..."
            value={templateConfig?.prototypeUrl || ''}
            onChange={(e) => updateConfig('prototypeUrl', e?.target?.value)}
            error={errors?.prototypeUrl}
            required
            description="Figma prototype link or other embeddable URL"
          />

          {/* Iframe Settings */}
          <Select
            label="Scaling Behavior"
            description="How the prototype should scale within the container"
            options={iframeScalingOptions}
            value={templateConfig?.scaling || 'responsive'}
            onChange={(value) => updateConfig('scaling', value)}
          />

          {/* Display Options */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Display Options</h4>
            <div className="space-y-3">
              <Checkbox
                label="Show header controls"
                description="Display zoom and fullscreen controls"
                checked={templateConfig?.showControls !== false}
                onChange={(e) => updateConfig('showControls', e?.target?.checked)}
              />
              <Checkbox
                label="Allow fullscreen"
                description="Enable fullscreen viewing mode"
                checked={templateConfig?.allowFullscreen !== false}
                onChange={(e) => updateConfig('allowFullscreen', e?.target?.checked)}
              />
              <Checkbox
                label="Show external link"
                description="Add button to open prototype in new tab"
                checked={templateConfig?.showExternalLink || false}
                onChange={(e) => updateConfig('showExternalLink', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Custom Dimensions */}
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Container Height"
              type="number"
              placeholder="600"
              value={templateConfig?.containerHeight || ''}
              onChange={(e) => updateConfig('containerHeight', e?.target?.value)}
              description="Height in pixels"
              min="400"
              max="1200"
            />
            <Input
              label="Mobile Height"
              type="number"
              placeholder="400"
              value={templateConfig?.mobileHeight || ''}
              onChange={(e) => updateConfig('mobileHeight', e?.target?.value)}
              description="Height on mobile devices"
              min="300"
              max="800"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateConfiguration;