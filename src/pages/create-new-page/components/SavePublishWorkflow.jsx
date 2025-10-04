import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SavePublishWorkflow = ({ 
  onSaveDraft, 
  onPublish, 
  onPreview, 
  isLoading, 
  canPublish, 
  validationErrors 
}) => {
  const [showValidationDetails, setShowValidationDetails] = useState(false);

  const hasErrors = validationErrors && Object.keys(validationErrors)?.length > 0;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Save" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Save & Publish</h2>
          <p className="text-sm text-muted-foreground">Review and publish your new page</p>
        </div>
      </div>
      {/* Validation Status */}
      <div className={`p-4 rounded-lg border mb-6 ${
        hasErrors 
          ? 'bg-error/5 border-error/20' :'bg-success/5 border-success/20'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon 
              name={hasErrors ? "AlertCircle" : "CheckCircle"} 
              size={20} 
              color={hasErrors ? "var(--color-error)" : "var(--color-success)"} 
            />
            <div>
              <h4 className={`text-sm font-medium ${
                hasErrors ? 'text-error' : 'text-success'
              }`}>
                {hasErrors ? 'Validation Issues Found' : 'Page Ready to Publish'}
              </h4>
              <p className="text-xs text-muted-foreground">
                {hasErrors 
                  ? 'Please fix the issues below before publishing' 
                  : 'All required fields are completed and valid'
                }
              </p>
            </div>
          </div>
          {hasErrors && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowValidationDetails(!showValidationDetails)}
              iconName={showValidationDetails ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
            >
              Details
            </Button>
          )}
        </div>

        {/* Validation Details */}
        {hasErrors && showValidationDetails && (
          <div className="mt-4 pt-4 border-t border-error/20">
            <ul className="space-y-2">
              {Object.entries(validationErrors)?.map(([field, error]) => (
                <li key={field} className="flex items-start space-x-2 text-sm">
                  <Icon name="X" size={14} color="var(--color-error)" className="mt-0.5" />
                  <div>
                    <span className="font-medium text-error capitalize">
                      {field?.replace(/([A-Z])/g, ' $1')?.trim()}:
                    </span>
                    <span className="text-muted-foreground ml-1">{error}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* Action Buttons */}
      <div className="space-y-4">
        {/* Primary Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="default"
            onClick={onPublish}
            disabled={!canPublish || hasErrors || isLoading}
            loading={isLoading}
            iconName="Globe"
            iconPosition="left"
            className="flex-1"
          >
            {isLoading ? 'Publishing...' : 'Publish Page'}
          </Button>
          
          <Button
            variant="outline"
            onClick={onSaveDraft}
            disabled={isLoading}
            iconName="FileText"
            iconPosition="left"
            className="flex-1"
          >
            Save as Draft
          </Button>
        </div>

        {/* Secondary Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="secondary"
            onClick={onPreview}
            disabled={hasErrors || isLoading}
            iconName="Eye"
            iconPosition="left"
            className="flex-1"
          >
            Preview Page
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => window.history?.back()}
            disabled={isLoading}
            iconName="ArrowLeft"
            iconPosition="left"
            className="flex-1"
          >
            Cancel & Go Back
          </Button>
        </div>
      </div>
      {/* Publishing Info */}
      <div className="mt-6 p-4 bg-muted/10 rounded-lg border border-border">
        <h4 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Info" size={16} />
          <span>Publishing Information</span>
        </h4>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={14} />
            <span>Created: {new Date()?.toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="User" size={14} />
            <span>Author: Admin User</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Tag" size={14} />
            <span>Version: 1.0.0</span>
          </div>
        </div>
      </div>
      {/* Success Message */}
      {canPublish && !hasErrors && (
        <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-2 text-sm text-success">
            <Icon name="CheckCircle" size={16} />
            <span>Your page is ready to be published and will be immediately available to users.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavePublishWorkflow;