import React from 'react';
import Header from '../components/Header';
import { MOCK_SAVED_OUTFITS } from '../constants';
import { TrashIcon, ChevronRightIcon } from '../components/Icons';

interface SavedOutfitsProps {
  onBack: () => void;
}

const SavedOutfits: React.FC<SavedOutfitsProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full">
      <Header
        title="Saved Outfits"
        actions={
          <button onClick={onBack} className="flex items-center gap-1 text-purple-400 font-semibold">
            <ChevronRightIcon className="w-5 h-5 transform rotate-180" />
            Back
          </button>
        }
      />
      <div className="p-4 overflow-y-auto pb-24 space-y-4">
        {MOCK_SAVED_OUTFITS.map(outfit => (
          <div key={outfit.id} className="bg-slate-800/50 rounded-xl p-3 flex items-center gap-4">
            <img src={outfit.imageUrl} alt={`Outfit ${outfit.id}`} className="w-24 h-32 object-cover rounded-lg" />
            <div className="flex-grow">
              <p className="font-bold text-white">Look #{outfit.id}</p>
              <p className="text-sm text-slate-400">Saved {outfit.createdAt}</p>
            </div>
            <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
              <TrashIcon className="w-5 h-5"/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedOutfits;
