import React, { useState } from 'react';
import Home from './screens/Home';
import TryOnMe from './screens/TryOnMe';
import Store from './screens/Store';
import Profile from './screens/Profile';
import TabBar from './components/TabBar';
import { ActiveTab, Product } from './types';
import { TABS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.HOME);
  const [tryOnProducts, setTryOnProducts] = useState<Product[]>([]);

  const handleAddToTryOn = (product: Product) => {
    // Avoid adding duplicates
    if (!tryOnProducts.find(p => p.id === product.id)) {
      setTryOnProducts(prev => [...prev, product]);
    }
    setActiveTab(ActiveTab.TRY_ON);
  };

  const renderContent = () => {
    switch (activeTab) {
      case ActiveTab.HOME:
        return <Home setActiveTab={setActiveTab} />;
      case ActiveTab.TRY_ON:
        return <TryOnMe 
          setActiveTab={setActiveTab}
          productsFromStore={tryOnProducts}
          setProductsFromStore={setTryOnProducts}
        />;
      case ActiveTab.STORE:
        return <Store 
          setActiveTab={setActiveTab} 
          onAddToTryOn={handleAddToTryOn}
        />;
      case ActiveTab.PROFILE:
        return <Profile />;
      default:
        return <Home setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 font-sans flex flex-col max-w-lg mx-auto border border-slate-800/50 shadow-2xl shadow-purple-500/10">
      <main className="flex-grow overflow-y-auto">
        {renderContent()}
      </main>
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} tabs={TABS} />
    </div>
  );
};

export default App;