import React from 'react';
import { ActiveTab, TabItem } from '../types';

interface TabBarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  tabs: TabItem[];
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-gray-900/70 backdrop-blur-lg border-t border-slate-700/50 max-w-lg mx-auto z-50">
      <div className="flex justify-around items-center h-full">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex flex-col items-center justify-center gap-1 w-full h-full transition-all duration-300 ${
              activeTab === tab.id ? 'text-purple-400' : 'text-slate-400 hover:text-white'
            }`}
            aria-label={tab.label}
          >
            <tab.icon className="w-6 h-6" />
            <span className="text-xs font-medium">{tab.label}</span>
            {activeTab === tab.id && (
              <div className="w-2 h-2 bg-purple-500 rounded-full absolute top-2 right-[calc(50%-1.25rem)] transition-all duration-300"></div>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default TabBar;