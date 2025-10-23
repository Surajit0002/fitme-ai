import React from 'react';
// Fix: IconProps is now exported from Icons.tsx, so it can be imported.
import type { IconProps } from '../components/Icons';
import { ActiveTab, ProductCategory } from '../types';
import { MOCK_PRODUCTS } from '../constants';
import { 
  SparklesIcon, 
  SearchIcon, 
  BellIcon,
  ShirtIcon,
  ShoesIcon,
  GlassesIcon,
  AccessoriesIcon
} from '../components/Icons';
import Header from '../components/Header';

interface HomeProps {
  setActiveTab: (tab: ActiveTab) => void;
}

const Home: React.FC<HomeProps> = ({ setActiveTab }) => {
  const trendingOutfits = MOCK_PRODUCTS.slice(0, 4);
  const suggestions = MOCK_PRODUCTS.slice(4, 8);

  // Fix: Update type from React.FC<IconProps> to a function returning a React.ReactElement to match updated icon components
  const categoryIcons: { [key in ProductCategory]: (props: IconProps) => React.ReactElement } = {
    [ProductCategory.SHIRT]: ShirtIcon,
    [ProductCategory.SHOES]: ShoesIcon,
    [ProductCategory.GLASSES]: GlassesIcon,
    [ProductCategory.ACCESSORIES]: AccessoriesIcon,
  };

  return (
    <div className="flex flex-col h-full">
      <Header 
        title="FitMe AI" 
        actions={
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
              <SearchIcon className="w-6 h-6" />
            </button>
            <button className="p-2 rounded-full text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
              <BellIcon className="w-6 h-6" />
            </button>
          </div>
        }
      />
      <div className="p-4 space-y-10 overflow-y-auto pb-24">
        {/* Hero Section */}
        <div className="relative text-center rounded-3xl overflow-hidden p-8 flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/30 to-slate-900 border border-slate-800/50 shadow-2xl shadow-purple-500/10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%239C27B0%22%20fill-opacity%3D%220.1%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M0%2040L40%200H20L0%2020M40%2040V20L20%2040%22/%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
            <h1 className="text-4xl font-extrabold text-white z-10">Visualize Your Style</h1>
            <p className="text-slate-300 mt-2 text-lg max-w-sm z-10">Instantly try on clothes and accessories with the power of AI.</p>
            <button 
                onClick={() => setActiveTab(ActiveTab.TRY_ON)}
                className="mt-6 z-10 w-full max-w-xs py-3.5 text-lg font-bold text-white rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-all duration-300 shadow-lg shadow-purple-500/30 transform hover:scale-105 flex items-center justify-center gap-2"
            >
                <SparklesIcon className="w-6 h-6"/>
                Start Your Try-On
            </button>
        </div>
        
        {/* Trending Outfits Carousel */}
        <div>
          <h2 className="text-2xl font-bold mb-4 px-2">Trending Now</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {trendingOutfits.map((product) => (
              <div key={product.id} className="relative flex-shrink-0 w-64 h-80 rounded-3xl overflow-hidden shadow-lg group transition-all duration-300 ease-in-out transform hover:scale-105">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="inline-block bg-pink-500/80 text-white text-xs font-semibold px-2.5 py-1 rounded-full mb-2 backdrop-blur-sm">Trending</span>
                    <h3 className="font-bold text-lg text-white drop-shadow-md">{product.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Suggestions */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 px-2">
              <SparklesIcon className="w-7 h-7 text-purple-400" />
              AI Suggestions For You
          </h2>
          <div className="grid grid-cols-2 gap-4">
              {suggestions.map(product => (
                  <div key={product.id} className="relative bg-slate-800/50 rounded-2xl overflow-hidden shadow-lg group transform hover:-translate-y-1.5 transition-all duration-300 hover:ring-2 hover:ring-purple-500 hover:ring-offset-2 hover:ring-offset-gray-900">
                      <SparklesIcon className="absolute top-2 right-2 w-5 h-5 text-purple-500 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                      <img className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" src={product.imageUrl} alt={product.name} />
                      <div className="p-3">
                          <h3 className="font-semibold text-sm truncate text-white">{product.name}</h3>
                          <p className="text-xs text-slate-400">{product.category}</p>
                      </div>
                  </div>
              ))}
          </div>
        </div>

        {/* Category Shortcuts */}
        <div>
          <h2 className="text-2xl font-bold mb-4 px-2">Categories</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.values(ProductCategory).map(cat => {
              const Icon = categoryIcons[cat];
              return (
                <button 
                  key={cat} 
                  onClick={() => setActiveTab(ActiveTab.STORE)} 
                  className="group p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-3 text-center font-bold text-lg text-slate-200 hover:bg-purple-500/10 hover:text-purple-300 transition-all duration-300 transform hover:scale-105"
                >
                    <Icon className="w-10 h-10 text-purple-400 group-hover:scale-110 transition-transform"/>
                    <span>{cat}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;