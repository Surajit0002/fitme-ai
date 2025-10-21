import React from 'react';
import { ActiveTab, ProductCategory } from '../types';
import { MOCK_PRODUCTS } from '../constants';
import { SparklesIcon, SearchIcon } from '../components/Icons';
import Header from '../components/Header';

interface HomeProps {
  setActiveTab: (tab: ActiveTab) => void;
}

const Home: React.FC<HomeProps> = ({ setActiveTab }) => {
  const trendingOutfits = MOCK_PRODUCTS.slice(0, 4);
  const suggestions = MOCK_PRODUCTS.slice(4, 8);

  return (
    <div className="flex flex-col h-full">
      <Header 
        title="FitMe AI" 
        actions={
          <button className="p-2 rounded-full text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <SearchIcon className="w-6 h-6" />
          </button>
        }
      />
      <div className="p-4 space-y-10 overflow-y-auto pb-24">
        <header className="text-center">
          <p className="text-slate-300 mt-1 text-lg">Your Personal AI Stylist</p>
        </header>
        
        {/* Trending Outfits Carousel */}
        <div>
          <h2 className="text-2xl font-bold mb-4 px-2">Trending Now</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {trendingOutfits.map((product) => (
              <div key={product.id} className="relative flex-shrink-0 w-72 h-96 rounded-3xl overflow-hidden shadow-lg group">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
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
                  <div key={product.id} className="bg-slate-800/50 rounded-2xl overflow-hidden shadow-lg group transform hover:-translate-y-1.5 transition-transform duration-300">
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
            {Object.values(ProductCategory).map(cat => (
              <button key={cat} onClick={() => setActiveTab(ActiveTab.STORE)} className="p-6 bg-slate-800/50 rounded-2xl text-center font-bold text-lg hover:bg-purple-500/20 hover:text-purple-300 transition-all duration-300 transform hover:scale-105">
                  {cat}
              </button>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <div className="flex flex-col gap-4 pt-4">
          <button 
            onClick={() => setActiveTab(ActiveTab.TRY_ON)}
            className="w-full py-4 text-xl font-bold text-white rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-opacity duration-300 shadow-lg shadow-purple-500/30 transform hover:scale-105"
          >
            Go to Try-On Me
          </button>
        </div>

      </div>
    </div>
  );
};

export default Home;