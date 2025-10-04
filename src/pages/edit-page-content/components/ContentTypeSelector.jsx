import React from 'react';
import Icon from '../../../components/AppIcon';

const ContentTypeSelector = ({ contentType, onContentTypeChange, disabled }) => {
  const contentTypes = [
    {
      id: 'external',
      label: 'External URL',
      description: 'Link to external content like Figma prototypes',
      icon: 'ExternalLink',
      features: ['Figma prototype embedding', 'External website integration', 'Iframe rendering']
    },
    {
      id: 'custom',
      label: 'Custom React Page',
      description: 'Create custom React components and layouts',
      icon: 'Code',
      features: ['Custom React components', 'Interactive elements', 'Full design control']
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
          <Icon name="Settings" size={20} color="var(--color-secondary)" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Content Type Configuration</h2>
          <p className="text-sm text-muted-foreground">Choose how this page should display content</p>
        </div>
      </div>
      <div className="space-y-4">
        {contentTypes?.map((type) => (
          <div
            key={type?.id}
            className={`relative border rounded-lg p-4 cursor-pointer transition-smooth ${
              contentType === type?.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/5'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => !disabled && onContentTypeChange(type?.id)}
          >
            <div className="flex items-start space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="contentType"
                  value={type?.id}
                  checked={contentType === type?.id}
                  onChange={() => onContentTypeChange(type?.id)}
                  disabled={disabled}
                  className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    contentType === type?.id ? 'bg-primary/20' : 'bg-muted/20'
                  }`}>
                    <Icon 
                      name={type?.icon} 
                      size={16} 
                      color={contentType === type?.id ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} 
                    />
                  </div>
                  <h3 className="font-semibold text-foreground">{type?.label}</h3>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{type?.description}</p>
                
                <div className="space-y-1">
                  {type?.features?.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="Check" size={12} color="var(--color-success)" />
                      <span className="text-xs text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {contentType && (
        <div className="mt-4 p-4 bg-accent/10 rounded-lg border border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Lightbulb" size={16} color="var(--color-warning)" />
            <span className="text-sm font-medium text-foreground">Configuration Tip</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {contentType === 'external' ?'External URLs are perfect for showcasing Figma prototypes and interactive demos.' :'Custom React pages offer unlimited flexibility for creating unique user experiences.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ContentTypeSelector;