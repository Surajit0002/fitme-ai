import React, { useState, useRef } from 'react';
import { ActiveTab, Product } from '../types';
import { generateTryOnImage } from '../services/geminiService';
import Loader from '../components/Loader';
import { CameraIcon, PlusIcon, SparklesIcon, TrashIcon, XIcon, DownloadIcon, ShareIcon, RefreshIcon } from '../components/Icons';
import Header from '../components/Header';

// Helper to convert data URL to File for sharing
const dataURLtoFile = (dataurl: string, filename: string): File | null => {
  const arr = dataurl.split(',');
  if (arr.length < 2) return null;
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) return null;
  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}

// Helper to convert Image URL to File
const urlToFile = async (url: string, filename: string, mimeType?: string): Promise<File> => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new File([blob], filename, { type: mimeType || blob.type });
};


interface TryOnMeProps {
    setActiveTab: (tab: ActiveTab) => void;
    productsFromStore: Product[];
    setProductsFromStore: React.Dispatch<React.SetStateAction<Product[]>>;
}

const TryOnMe: React.FC<TryOnMeProps> = ({ setActiveTab, productsFromStore, setProductsFromStore }) => {
  const [userImage, setUserImage] = useState<File | null>(null);
  const [userImageUrl, setUserImageUrl] = useState<string | null>(null);
  const [productImages, setProductImages] = useState<File[]>([]);
  const [productImageUrls, setProductImageUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const userImageInputRef = useRef<HTMLInputElement>(null);
  const productImageInputRef = useRef<HTMLInputElement>(null);

  const handleUserImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUserImage(file);
      setUserImageUrl(URL.createObjectURL(file));
      setGeneratedImage(null); // Reset generated image when a new user photo is uploaded
    }
  };

  const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProductImages(prev => [...prev, file]);
      setProductImageUrls(prev => [...prev, URL.createObjectURL(file)]);
    }
  };
  
  const removeProductImage = (index: number) => {
    setProductImages(prev => prev.filter((_, i) => i !== index));
    setProductImageUrls(prev => prev.filter((_, i) => i !== index));
  }
  
  const removeProductFromStore = (productId: number) => {
    setProductsFromStore(prev => prev.filter(p => p.id !== productId));
  };

  const handleReset = () => {
    setUserImage(null);
    setUserImageUrl(null);
    setProductImages([]);
    setProductImageUrls([]);
    setProductsFromStore([]);
    setGeneratedImage(null);
    setError(null);
  }

  const handleGenerate = async () => {
    const totalProducts = productImages.length + productsFromStore.length;
    if (!userImage || totalProducts === 0) {
      setError('Please add your photo and at least one product image.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setGeneratedImage(null);

    try {
      const storeProductFiles = await Promise.all(
        productsFromStore.map(p => urlToFile(p.imageUrl, `${p.id}-${p.name}.png`))
      );
      
      const allProductFiles = [...productImages, ...storeProductFiles];
      const result = await generateTryOnImage(userImage, allProductFiles);
      setGeneratedImage(result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `fitme_ai_look_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (!generatedImage) return;
    const file = dataURLtoFile(generatedImage, `fitme_ai_look_${Date.now()}.png`);
    if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: 'My AI-Generated Look!',
          text: 'Check out this outfit I created with FitMe AI!',
        });
      } catch (error) {
        console.error('Sharing failed:', error);
        setError("Sharing failed or was cancelled.");
      }
    } else {
      setError('Sharing is not supported on your browser.');
    }
  };

  const totalProductsCount = productImages.length + productsFromStore.length;
  const isGenerateDisabled = !userImage || totalProductsCount === 0 || isLoading;
  const showReset = userImage || totalProductsCount > 0;

  return (
    <div className="h-full flex flex-col">
      {isLoading && <Loader />}
      
      <Header 
        title="Virtual Try-On"
        actions={
          showReset && (
            <button onClick={handleReset} className="p-2 rounded-full text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-colors">
              <TrashIcon className="w-6 h-6" />
            </button>
          )
        }
      />

      <div className="flex-grow overflow-y-auto p-4 space-y-6 pb-24">
        <div className="bg-slate-800/50 rounded-3xl relative aspect-[4/5] overflow-hidden flex items-center justify-center">
          {generatedImage ? (
              <img src={generatedImage} alt="Generated Look" className="w-full h-full object-contain" />
          ) : userImageUrl ? (
            <img src={userImageUrl} alt="User" className="w-full h-full object-contain" />
          ) : (
            <div className="text-center text-slate-400 p-8 flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-full bg-slate-700/50 flex items-center justify-center">
                  <CameraIcon className="w-12 h-12 text-slate-500" />
              </div>
              <p className="font-semibold text-lg">Add Your Photo to Start</p>
              <button
                  onClick={() => userImageInputRef.current?.click()}
                  className="bg-purple-600 text-white font-bold py-2 px-6 rounded-full hover:bg-purple-700 transition-colors"
              >
                  Upload Image
              </button>
            </div>
          )}
          {error && <div className="absolute bottom-4 left-4 right-4 bg-red-500/80 text-white p-3 rounded-lg text-center text-sm z-10 animate-pulse" onClick={() => setError(null)}>{error}</div>}
        </div>

        <div>
            <h3 className="font-semibold mb-3 px-2">Items to Try-On ({totalProductsCount})</h3>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                {productsFromStore.map((product) => (
                    <div key={`store-${product.id}`} className="relative flex-shrink-0 group">
                        <img src={product.imageUrl} alt={product.name} className="w-24 h-24 rounded-xl object-cover border-2 border-purple-500/50" />
                        <div className="absolute inset-0 bg-black/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <button onClick={() => removeProductFromStore(product.id)} className="absolute -top-2 -right-2 bg-red-500 p-1 rounded-full text-white shadow-md transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200">
                            <XIcon className="w-4 h-4"/>
                        </button>
                    </div>
                ))}
                {productImageUrls.map((url, index) => (
                    <div key={`manual-${index}`} className="relative flex-shrink-0 group">
                        <img src={url} alt={`Product ${index + 1}`} className="w-24 h-24 rounded-xl object-cover border-2 border-slate-700" />
                        <div className="absolute inset-0 bg-black/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <button onClick={() => removeProductImage(index)} className="absolute -top-2 -right-2 bg-red-500 p-1 rounded-full text-white shadow-md transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200">
                            <XIcon className="w-4 h-4"/>
                        </button>
                    </div>
                ))}
            </div>
        </div>
        
        {/* Action Buttons */}
        <div className="pt-2">
            {generatedImage ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button onClick={() => setGeneratedImage(null)} className="flex items-center justify-center gap-2 bg-slate-700/80 hover:bg-slate-700 text-white font-semibold py-3.5 px-4 rounded-xl transition-colors duration-300">
                        <RefreshIcon className="w-5 h-5" /> Try Another
                    </button>
                    <button onClick={handleSave} className="flex items-center justify-center gap-2 bg-slate-700/80 hover:bg-slate-700 text-white font-semibold py-3.5 px-4 rounded-xl transition-colors duration-300">
                        <DownloadIcon className="w-5 h-5" /> Save
                    </button>
                    <button onClick={handleShare} className="flex items-center justify-center gap-2 bg-slate-700/80 hover:bg-slate-700 text-white font-semibold py-3.5 px-4 rounded-xl transition-colors duration-300">
                        <ShareIcon className="w-5 h-5" /> Share
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => productImageInputRef.current?.click()}
                        className="py-4 text-md font-bold text-purple-300 rounded-2xl bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <PlusIcon className="w-6 h-6" /> Add Item
                    </button>
                    <button
                        onClick={handleGenerate}
                        disabled={isGenerateDisabled}
                        className={`py-4 text-lg font-bold text-white rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 ${
                            isGenerateDisabled 
                                ? 'bg-slate-600 cursor-not-allowed' 
                                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 shadow-lg shadow-purple-500/30'
                        }`}
                    >
                        <SparklesIcon className="w-6 h-6" /> Generate
                    </button>
                </div>
            )}
            <input type="file" accept="image/*" ref={userImageInputRef} onChange={handleUserImageUpload} className="hidden" />
            <input type="file" accept="image/*" ref={productImageInputRef} onChange={handleProductImageUpload} className="hidden" />
        </div>
      </div>
    </div>
  );
};

export default TryOnMe;
