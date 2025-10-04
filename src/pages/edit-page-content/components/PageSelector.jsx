import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const PageSelector = ({ selectedPage, onPageChange, pages, isLoading }) => {
  const pageOptions = pages?.map(page => ({
    value: page?.id,
    label: page?.name,
    description: page?.type === 'external' ? 'External URL' : 'Custom React Page'
  }));

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="FileText" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Select Page to Edit</h2>
          <p className="text-sm text-muted-foreground">Choose a page to modify its content and settings</p>
        </div>
      </div>

      <Select
        label="Page Selection"
        placeholder="Choose a page to edit..."
        options={pageOptions}
        value={selectedPage}
        onChange={onPageChange}
        searchable
        loading={isLoading}
        description="Select from existing pages in your portfolio"
        className="w-full"
      />

      {selectedPage && (
        <div className="mt-4 p-4 bg-muted/10 rounded-lg border border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={16} color="var(--color-primary)" />
            <span className="text-sm font-medium text-foreground">Page Selected</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            You can now modify the content type and settings for this page below.
          </p>
        </div>
      )}
    </div>
  );
};

export default PageSelector;