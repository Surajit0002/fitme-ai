import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { ActiveTab, Product, ProductCategory } from '../types';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import { SearchIcon } from '../components/Icons';

interface StoreProps {
  setActiveTab: (tab: ActiveTab) => void;
  onAddToTryOn: (product: Product) => void;
}

const Store: React.FC<StoreProps> = ({ setActiveTab, onAddToTryOn }) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'All'>('All');

  const categories: (ProductCategory | 'All')[] = ['All', ...Object.values(ProductCategory)];

  const filteredProducts = activeCategory === 'All'
    ? MOCK_PRODUCTS
    : MOCK_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="flex flex-col h-full">
      <Header 
        title="Store"
        actions={
          <button className="p-2 rounded-full text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <SearchIcon className="w-6 h-6" />
          </button>
        }
      />
      <div className="p-4 overflow-y-auto pb-24">
        {/* Category Filters */}
        <div className="flex space-x-3 overflow-x-auto pb-4 mb-6 -mx-4 px-4 scrollbar-hide">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category 
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20' 
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-5">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onTryOn={onAddToTryOn} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store;