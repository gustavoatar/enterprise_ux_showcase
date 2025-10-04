import React from 'react';
import Icon from '../../../components/AppIcon';

const ContentTypeSelection = ({ 
  selectedContentType, 
  setSelectedContentType, 
  errors 
}) => {
  const contentTypes = [
    {
      id: 'video-template',
      title: 'Video Template',
      description: 'Create a gallery-style page with video thumbnails and player functionality',
      icon: 'Play',
      features: [
        'Grid layout with video thumbnails',
        'Full-screen video player modal',
        'Multiple layout options',
        'Auto-muted playback',
        'Mobile responsive design'
      ],
      example: 'Perfect for showcasing UX process videos, case studies, or demo recordings'
    },
    {
      id: 'prototype-template',
      title: 'Prototype Template',
      description: 'Embed external prototypes and interactive designs from Figma or other tools',
      icon: 'Monitor',
      features: [
        'Iframe embedding support',
        'Responsive scaling',
        'Full-screen viewing',
        'External link integration',
        'Touch-friendly controls'
      ],
      example: 'Ideal for displaying Figma prototypes, interactive mockups, or live demos'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
          <Icon name="Layout" size={20} color="var(--color-secondary)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Content Type</h2>
          <p className="text-sm text-muted-foreground">Choose the template that best fits your content</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {contentTypes?.map((type) => (
          <div
            key={type?.id}
            className={`relative border-2 rounded-lg p-6 cursor-pointer transition-smooth ${
              selectedContentType === type?.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-muted-foreground hover:bg-muted/5'
            }`}
            onClick={() => setSelectedContentType(type?.id)}
          >
            {/* Radio Button */}
            <div className="absolute top-4 right-4">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedContentType === type?.id
                  ? 'border-primary bg-primary' :'border-muted-foreground'
              }`}>
                {selectedContentType === type?.id && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="pr-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  selectedContentType === type?.id
                    ? 'bg-primary/20' :'bg-muted/20'
                }`}>
                  <Icon 
                    name={type?.icon} 
                    size={24} 
                    color={selectedContentType === type?.id ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} 
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{type?.title}</h3>
                  <p className="text-sm text-muted-foreground">{type?.description}</p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-foreground mb-2">Key Features:</h4>
                <ul className="space-y-1">
                  {type?.features?.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="Check" size={14} color="var(--color-success)" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Example */}
              <div className="p-3 bg-muted/10 rounded-md">
                <p className="text-xs text-muted-foreground">
                  <strong>Use Case:</strong> {type?.example}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {errors?.contentType && (
        <p className="text-sm text-error mt-4">{errors?.contentType}</p>
      )}
    </div>
  );
};

export default ContentTypeSelection;