import React from 'react';
import { SparklesIcon } from './Icons';

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = "Generating Your Look..." }) => {
  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-md flex flex-col items-center justify-center z-50">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-28 h-28 rounded-full border-4 border-t-purple-500 border-slate-700 animate-spin"></div>
        <div className="absolute w-24 h-24 rounded-full border-4 border-t-pink-500 border-slate-700 animate-spin [animation-direction:reverse]"></div>
        <SparklesIcon className="w-12 h-12 text-purple-400" />
      </div>
      <p className="mt-8 text-lg font-semibold text-white animate-pulse tracking-wider">{message}</p>
    </div>
  );
};

export default Loader;