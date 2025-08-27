import React, { useEffect, useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { Product } from '../types';
import { apiFetch } from '../lib/api';

const Shop: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortBy, setSortBy] = useState('popularity');
  const [serverProducts, setServerProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await apiFetch('/api/products');
        const normalized: Product[] = data.map((p: any) => ({
          id: p.id || p._id,
          name: p.name,
          category: p.category || 'general',
          price: Number(p.price) || 0,
          image: p.image || p.imageUrl || 'https://via.placeholder.com/400x400?text=Product',
          description: p.description || '',
          popularity: 0
        }));
        setServerProducts(normalized);
      } catch (e) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const categories = ['shirts', 'pants', 'dresses', 'shoes'];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = serverProducts.filter((product) => {
      const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      return categoryMatch && priceMatch;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'popularity':
        default:
          return b.popularity - a.popularity;
      }
    });

    return filtered;
  }, [serverProducts, selectedCategory, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Shop</h1>
          <p className="text-gray-600 mt-2">
            Discover our complete collection of premium clothing
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {filteredAndSortedProducts.length} product{filteredAndSortedProducts.length !== 1 ? 's' : ''}
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12 text-gray-500">Loading products…</div>
            ) : error ? (
              <div className="text-center py-12 text-red-600">{error}</div>
            ) : filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange([0, 200]);
                    setSortBy('popularity');
                  }}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;