import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterBar = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  sortBy, 
  onSortChange,
  searchQuery,
  onSearchChange,
  totalVideos 
}) => {
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...categories?.map(cat => ({ value: cat?.id, label: cat?.name }))
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'title', label: 'Title A-Z' },
    { value: 'popular', label: 'Most Popular' }
  ];

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Category Filter */}
          <div className="min-w-[180px]">
            <Select
              placeholder="Select category"
              options={categoryOptions}
              value={selectedCategory}
              onChange={onCategoryChange}
              className="w-full"
            />
          </div>

          {/* Sort Filter */}
          <div className="min-w-[160px]">
            <Select
              placeholder="Sort by"
              options={sortOptions}
              value={sortBy}
              onChange={onSortChange}
              className="w-full"
            />
          </div>

          {/* Clear Filters */}
          {(selectedCategory !== 'all' || searchQuery) && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onCategoryChange('all');
                onSearchChange('');
              }}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      {/* Results Count */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Video" size={16} />
          <span>
            {totalVideos} {totalVideos === 1 ? 'video' : 'videos'} 
            {selectedCategory !== 'all' && ` in ${categoryOptions?.find(c => c?.value === selectedCategory)?.label}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>
        </div>

        {/* Quick Category Pills */}
        <div className="hidden md:flex items-center space-x-2">
          {categories?.slice(0, 4)?.map((category) => (
            <button
              key={category?.id}
              onClick={() => onCategoryChange(category?.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedCategory === category?.id
                  ? 'bg-primary text-white' :'bg-muted/20 text-muted-foreground hover:bg-muted/30 hover:text-foreground'
              }`}
            >
              {category?.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;