import React from 'react';
import Header from '../components/Header';
import { MOCK_HISTORY_ITEMS } from '../constants';
import { ChevronRightIcon } from '../components/Icons';

interface TryOnHistoryProps {
  onBack: () => void;
}

const TryOnHistory: React.FC<TryOnHistoryProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full">
      <Header
        title="Try-On History"
        actions={
          <button onClick={onBack} className="flex items-center gap-1 text-purple-400 font-semibold">
            <ChevronRightIcon className="w-5 h-5 transform rotate-180" />
            Back
          </button>
        }
      />
      <div className="p-4 overflow-y-auto pb-24 space-y-3">
        {MOCK_HISTORY_ITEMS.map(item => (
          <div key={item.id} className="bg-slate-800/50 rounded-xl p-3 flex items-center gap-4">
            <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg" />
            <div className="flex-grow">
              <p className="font-bold text-white">{item.product.name}</p>
              <p className="text-sm text-slate-400">Tried on {item.triedOn}</p>
            </div>
             <p className="text-sm font-semibold text-purple-400">${item.product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TryOnHistory;
