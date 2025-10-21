import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onTryOn?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onTryOn }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleTryOnClick = () => {
    if (onTryOn && !isAdded) {
      onTryOn(product);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  return (
    <div className="bg-slate-800/50 rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-1.5 transition-transform duration-300 group">
      <div className="overflow-hidden">
        <img className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" src={product.imageUrl} alt={product.name} />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-md truncate text-white">{product.name}</h3>
        <div className="flex items-baseline gap-2 mt-2">
          <p className="text-lg font-semibold text-purple-400">
            ${product.discount ? (product.price * (1 - product.discount / 100)).toFixed(2) : product.price.toFixed(2)}
          </p>
          {product.discount && (
            <p className="text-sm text-slate-400 line-through">${product.price.toFixed(2)}</p>
          )}
        </div>
        {onTryOn && (
          <button
            onClick={handleTryOnClick}
            disabled={isAdded}
            className={`w-full mt-4 font-bold py-2.5 px-4 rounded-xl transition-all duration-300 ${
              isAdded
                ? 'bg-green-500 text-white cursor-default'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            {isAdded ? 'Added ✓' : 'Try-On'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;