import React from 'react';

interface FilterSidebarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="w-64 bg-white p-6 border-r">
      <h3 className="text-lg font-semibold mb-6">Filters</h3>
      
      {/* Category Filter */}
      <div className="mb-8">
        <h4 className="text-md font-medium mb-4">Category</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              checked={selectedCategory === 'all'}
              onChange={() => onCategoryChange('all')}
              className="mr-2"
            />
            All Categories
          </label>
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === category}
                onChange={() => onCategoryChange(category)}
                className="mr-2"
              />
              <span className="capitalize">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-8">
        <h4 className="text-md font-medium mb-4">Price Range</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Min Price</label>
            <input
              type="range"
              min="0"
              max="200"
              value={priceRange[0]}
              onChange={(e) => onPriceRangeChange([parseInt(e.target.value), priceRange[1]])}
              className="w-full"
            />
            <span className="text-sm text-gray-500">${priceRange[0]}</span>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Max Price</label>
            <input
              type="range"
              min="0"
              max="200"
              value={priceRange[1]}
              onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
            <span className="text-sm text-gray-500">${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <h4 className="text-md font-medium mb-4">Sort By</h4>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="popularity">Popularity</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSidebar;