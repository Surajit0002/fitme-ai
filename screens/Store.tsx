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
  const [searchTerm, setSearchTerm] = useState('');

  const categories: (ProductCategory | 'All')[] = ['All', ...Object.values(ProductCategory)];

  const filteredProducts = MOCK_PRODUCTS
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const featuredProduct = MOCK_PRODUCTS[1]; // Static featured product for demo

  return (
    <div className="flex flex-col h-full">
      <Header 
        title="Store"
      />
      <div className="p-4 overflow-y-auto pb-24 space-y-6">
        {/* Search Bar */}
        <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"/>
            <input 
                type="text"
                placeholder="Search for items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700/50 rounded-full py-3 pl-11 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
        </div>

        {/* Featured Banner */}
        <div className="relative bg-slate-800/50 rounded-2xl p-6 flex items-center gap-5 overflow-hidden">
            <div className="flex-shrink-0">
                <img src={featuredProduct.imageUrl} alt={featuredProduct.name} className="w-24 h-24 object-cover rounded-lg"/>
            </div>
            <div>
                <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">Deal of the Day</span>
                <h3 className="font-bold text-xl text-white mt-1">{featuredProduct.name}</h3>
                <button 
                    onClick={() => onAddToTryOn(featuredProduct)}
                    className="mt-3 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
                >
                    Try Now
                </button>
            </div>
        </div>

        {/* Category Filters */}
        <div>
          <div className="flex space-x-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
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
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-5">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onTryOn={onAddToTryOn} />
            ))
          ) : (
            <div className="col-span-2 text-center py-10">
              <p className="text-slate-400">No products found for "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Store;
