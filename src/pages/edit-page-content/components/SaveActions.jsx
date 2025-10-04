import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SaveActions = ({ 
  onSave, 
  onSaveAndPreview, 
  onCancel, 
  isSaving, 
  hasUnsavedChanges,
  saveError,
  saveSuccess 
}) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
          <Icon name="Save" size={20} color="var(--color-success)" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Save Changes</h2>
          <p className="text-sm text-muted-foreground">Review and save your page configuration</p>
        </div>
      </div>

      {/* Status Messages */}
      {saveError && (
        <div className="mb-4 p-4 bg-error/10 rounded-lg border border-error/20">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} color="var(--color-error)" />
            <span className="text-sm font-medium text-error">Save Failed</span>
          </div>
          <p className="text-sm text-error mt-1">{saveError}</p>
        </div>
      )}

      {saveSuccess && (
        <div className="mb-4 p-4 bg-success/10 rounded-lg border border-success/20">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} color="var(--color-success)" />
            <span className="text-sm font-medium text-success">Changes Saved Successfully</span>
          </div>
          <p className="text-sm text-success mt-1">Your page configuration has been updated.</p>
        </div>
      )}

      {/* Unsaved Changes Warning */}
      {hasUnsavedChanges && !saveSuccess && (
        <div className="mb-4 p-4 bg-warning/10 rounded-lg border border-warning/20">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} color="var(--color-warning)" />
            <span className="text-sm font-medium text-warning">Unsaved Changes</span>
          </div>
          <p className="text-sm text-warning mt-1">You have unsaved changes that will be lost if you navigate away.</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          onClick={onSave}
          loading={isSaving}
          disabled={!hasUnsavedChanges}
          iconName="Save"
          iconPosition="left"
          className="flex-1"
        >
          Save Changes
        </Button>

        <Button
          variant="outline"
          onClick={onSaveAndPreview}
          loading={isSaving}
          disabled={!hasUnsavedChanges}
          iconName="Eye"
          iconPosition="left"
          className="flex-1"
        >
          Save & Preview
        </Button>

        <Button
          variant="ghost"
          onClick={onCancel}
          disabled={isSaving}
          iconName="X"
          iconPosition="left"
        >
          Cancel
        </Button>
      </div>

      {/* Save Information */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={14} color="var(--color-muted-foreground)" />
            <span className="text-muted-foreground">Auto-save: Disabled</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="History" size={14} color="var(--color-muted-foreground)" />
            <span className="text-muted-foreground">Version control: Enabled</span>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts */}
      <div className="mt-4 p-3 bg-muted/10 rounded-lg">
        <h4 className="text-sm font-medium text-foreground mb-2">Keyboard Shortcuts</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div className="flex justify-between">
            <span>Save changes:</span>
            <kbd className="px-2 py-1 bg-muted/20 rounded text-xs">Ctrl + S</kbd>
          </div>
          <div className="flex justify-between">
            <span>Save & preview:</span>
            <kbd className="px-2 py-1 bg-muted/20 rounded text-xs">Ctrl + P</kbd>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveActions;