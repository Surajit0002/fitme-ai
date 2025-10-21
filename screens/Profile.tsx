import React from 'react';
import { DownloadIcon, RefreshIcon, UserIcon, SparklesIcon, SettingsIcon } from '../components/Icons';
import Header from '../components/Header';

const Profile: React.FC = () => {
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
      <div className="p-4 space-y-8 overflow-y-auto pb-24">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <img
              src="https://picsum.photos/id/237/200/200"
              alt="User Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-purple-500 shadow-lg"
            />
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold">Alex Doe</h2>
            <p className="text-slate-400">alex.doe@example.com</p>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700">
              <span className="text-yellow-400 font-bold text-lg">✨</span>
              <span className="font-semibold text-lg">1,250 Coins</span>
          </div>
        </div>

        {/* Subscription Section */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-6 rounded-2xl text-center space-y-4 shadow-xl shadow-purple-500/20">
          <h3 className="text-2xl font-bold flex items-center justify-center gap-2"><SparklesIcon className="w-6 h-6"/> Go Premium!</h3>
          <p className="text-purple-100">Unlock unlimited AI try-ons, HD downloads, and an ad-free experience.</p>
          <button className="w-full py-3 text-lg font-bold text-purple-600 bg-white rounded-xl hover:opacity-90 transition-opacity duration-300">
            Upgrade Now
          </button>
        </div>

        {/* Menu Options */}
        <div className="space-y-3">
          <MenuItem icon={<DownloadIcon className="w-5 h-5 text-purple-400"/>} label="Saved Outfits" />
          <MenuItem icon={<RefreshIcon className="w-5 h-5 text-purple-400"/>} label="Try-On History" />
          <MenuItem icon={<UserIcon className="w-5 h-5 text-purple-400"/>} label="Account Settings" />
        </div>

        <div className="text-center pt-4">
          <button className="text-slate-400 font-semibold hover:text-red-500 transition-colors duration-200">
              Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const MenuItem: React.FC<{ icon: React.ReactNode, label: string }> = ({ icon, label }) => (
    <button className="w-full text-left p-4 bg-slate-800/50 rounded-xl flex justify-between items-center hover:bg-slate-700/50 transition-colors duration-200">
        <div className="flex items-center gap-4">
            {icon}
            <span className="font-semibold">{label}</span>
        </div>
        <span className="text-slate-500">&gt;</span>
    </button>
);

export default Profile;