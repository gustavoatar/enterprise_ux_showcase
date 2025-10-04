import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CustomPageConfig = ({ 
  selectedTemplate, 
  onTemplateChange, 
  componentName, 
  onComponentNameChange,
  customProps,
  onCustomPropsChange 
}) => {
  const templateOptions = [
    {
      value: 'video-gallery',
      label: 'Video Gallery Template',
      description: 'Grid layout for video content with thumbnails'
    },
    {
      value: 'prototype-display',
      label: 'Prototype Display Template',
      description: 'Full-screen iframe for interactive prototypes'
    },
    {
      value: 'content-showcase',
      label: 'Content Showcase Template',
      description: 'Flexible layout for mixed content types'
    },
    {
      value: 'custom-component',
      label: 'Custom React Component',
      description: 'Build your own component from scratch'
    }
  ];

  const handleAddProp = () => {
    const newProps = [...customProps, { key: '', value: '', type: 'string' }];
    onCustomPropsChange(newProps);
  };

  const handleRemoveProp = (index) => {
    const newProps = customProps?.filter((_, i) => i !== index);
    onCustomPropsChange(newProps);
  };

  const handlePropChange = (index, field, value) => {
    const newProps = [...customProps];
    newProps[index][field] = value;
    onCustomPropsChange(newProps);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
          <Icon name="Code" size={20} color="var(--color-secondary)" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Custom React Page Configuration</h2>
          <p className="text-sm text-muted-foreground">Configure custom React components and templates</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Template Selection */}
        <div>
          <Select
            label="Page Template"
            placeholder="Choose a template..."
            options={templateOptions}
            value={selectedTemplate}
            onChange={onTemplateChange}
            description="Select a pre-built template or create a custom component"
            searchable
          />
        </div>

        {/* Component Name (for custom components) */}
        {selectedTemplate === 'custom-component' && (
          <div>
            <Input
              label="Component Name"
              type="text"
              placeholder="MyCustomComponent"
              value={componentName}
              onChange={(e) => onComponentNameChange(e?.target?.value)}
              description="Enter the name for your custom React component (PascalCase recommended)"
              required
            />
          </div>
        )}

        {/* Template Preview */}
        {selectedTemplate && selectedTemplate !== 'custom-component' && (
          <div className="border border-border rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-3">Template Preview</h3>
            <div className="bg-muted/10 rounded-lg p-6 text-center">
              <Icon name="Layout" size={48} className="mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {templateOptions?.find(t => t?.value === selectedTemplate)?.description}
              </p>
            </div>
          </div>
        )}

        {/* Custom Props Configuration */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-foreground">Component Properties</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddProp}
              iconName="Plus"
              iconPosition="left"
            >
              Add Property
            </Button>
          </div>

          {customProps?.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground border border-dashed border-border rounded-lg">
              <Icon name="Settings" size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No custom properties configured</p>
              <p className="text-xs">Add properties to customize your component</p>
            </div>
          ) : (
            <div className="space-y-3">
              {customProps?.map((prop, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-muted/10 rounded-lg border border-border">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Input
                      placeholder="Property name"
                      value={prop?.key}
                      onChange={(e) => handlePropChange(index, 'key', e?.target?.value)}
                      className="text-sm"
                    />
                    <Input
                      placeholder="Default value"
                      value={prop?.value}
                      onChange={(e) => handlePropChange(index, 'value', e?.target?.value)}
                      className="text-sm"
                    />
                    <Select
                      placeholder="Type"
                      options={[
                        { value: 'string', label: 'String' },
                        { value: 'number', label: 'Number' },
                        { value: 'boolean', label: 'Boolean' },
                        { value: 'array', label: 'Array' },
                        { value: 'object', label: 'Object' }
                      ]}
                      value={prop?.type}
                      onChange={(value) => handlePropChange(index, 'type', value)}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveProp(index)}
                    className="text-error hover:bg-error/10"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Development Tips */}
        <div className="bg-accent/10 rounded-lg p-4 border border-border">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={16} color="var(--color-warning)" className="mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Development Tips</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Use PascalCase for component names (e.g., MyCustomComponent)</li>
                <li>• Properties will be passed as props to your React component</li>
                <li>• Templates provide pre-built layouts that you can customize</li>
                <li>• Custom components offer complete creative control</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPageConfig;