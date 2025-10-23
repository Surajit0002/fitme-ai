import React, { useState } from 'react';
import { UserIcon, SparklesIcon, SettingsIcon, BookmarkIcon, ClockIcon, LifebuoyIcon, ChevronRightIcon } from '../components/Icons';
import Header from '../components/Header';
import SavedOutfits from './SavedOutfits';
import TryOnHistory from './TryOnHistory';

type ProfileView = 'main' | 'saved' | 'history';

const Profile: React.FC = () => {
  const [view, setView] = useState<ProfileView>('main');

  const goBack = () => setView('main');

  if (view === 'saved') {
    return <SavedOutfits onBack={goBack} />;
  }

  if (view === 'history') {
    return <TryOnHistory onBack={goBack} />;
  }

  return (
    <div className="flex flex-col h-full">
      <Header 
        title="Profile"
        actions={
          <button className="p-2 rounded-full text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <SettingsIcon className="w-6 h-6" />
          </button>
        }
      />
      <div className="p-4 space-y-6 overflow-y-auto pb-24">
        {/* User Info Card */}
        <div className="bg-slate-800/50 rounded-2xl p-5 flex items-center gap-5">
          <img
            src="https://picsum.photos/id/237/200/200"
            alt="User Avatar"
            className="w-20 h-20 rounded-full object-cover border-2 border-purple-500"
          />
          <div>
            <h2 className="text-2xl font-bold">Alex Doe</h2>
            <p className="text-slate-400 text-sm">alex.doe@example.com</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-3 text-center">
            <StatCard value="12" label="Outfits Created"/>
            <StatCard value="84" label="Items Tried"/>
            <StatCard value="23" label="Favorites"/>
        </div>

        {/* Menu Section */}
        <div className="space-y-2">
            <h3 className="px-4 text-sm font-bold text-slate-500 uppercase tracking-wider">My Style</h3>
            <MenuItem icon={<BookmarkIcon className="w-6 h-6"/>} label="Saved Outfits" onClick={() => setView('saved')} />
            <MenuItem icon={<ClockIcon className="w-6 h-6"/>} label="Try-On History" onClick={() => setView('history')} />
        </div>

        <div className="space-y-2">
            <h3 className="px-4 text-sm font-bold text-slate-500 uppercase tracking-wider">General</h3>
            <MenuItem icon={<UserIcon className="w-6 h-6"/>} label="Account Settings" />
            <MenuItem icon={<LifebuoyIcon className="w-6 h-6"/>} label="Help & Support" />
        </div>


        {/* Subscription Section */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-6 rounded-2xl text-center space-y-4 shadow-xl shadow-purple-500/20">
          <h3 className="text-2xl font-bold flex items-center justify-center gap-2"><SparklesIcon className="w-6 h-6"/> Go Premium!</h3>
          <p className="text-purple-100">Unlock unlimited AI try-ons, HD downloads, and an ad-free experience.</p>
          <button className="w-full py-3 text-lg font-bold text-purple-600 bg-white rounded-xl hover:opacity-90 transition-opacity duration-300">
            Upgrade Now
          </button>
        </div>

        <div className="text-center pt-4">
          <button className="w-full py-3 font-bold bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-colors duration-200">
              Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ value: string; label: string }> = ({ value, label }) => (
    <div className="bg-slate-800/50 p-4 rounded-xl">
        <p className="text-2xl font-bold text-purple-400">{value}</p>
        <p className="text-xs text-slate-400">{label}</p>
    </div>
);

const MenuItem: React.FC<{ icon: React.ReactNode, label: string, onClick?: () => void }> = ({ icon, label, onClick }) => (
    <button onClick={onClick} className="w-full text-left p-4 bg-slate-800/50 rounded-xl flex justify-between items-center hover:bg-slate-700/50 transition-colors duration-200 group">
        <div className="flex items-center gap-4 text-slate-200">
            <div className="text-purple-400">{icon}</div>
            <span className="font-semibold">{label}</span>
        </div>
        <ChevronRightIcon className="w-5 h-5 text-slate-500 group-hover:translate-x-1 transition-transform" />
    </button>
);

export default Profile;
