import React from 'react';

interface HeaderProps {
  title: string;
  actions?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, actions }) => {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between p-4 bg-gray-900/70 backdrop-blur-lg border-b border-slate-800/50">
      <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
        {title}
      </h1>
      <div className="flex items-center gap-3">
        {actions}
      </div>
    </header>
  );
};

export default Header;
