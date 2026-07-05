import React from 'react';
import { useApp } from '../context/AppContext';
import { MainTab } from '../types';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const tabs: { id: MainTab; label: string; icon: string }[] = [
    { id: 'home', label: 'Início', icon: 'home' },
    { id: 'library', label: 'Biblioteca', icon: 'library_music' },
    { id: 'search', label: 'Pesquisar', icon: 'search' },
    { id: 'downloads', label: 'Downloads', icon: 'download_for_offline' },
    { id: 'settings', label: 'Ajustes', icon: 'settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-2 py-2 bg-[#211e28] rounded-t-2xl border-t border-[#494455]/40 shadow-xl">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-90 py-1 px-3 ${
              isActive
                ? 'bg-[#7c4dff] text-[#fcf6ff] rounded-full shadow-md font-semibold'
                : 'text-[#cac3d8] hover:text-white'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[22px] ${
                isActive ? 'icon-filled' : ''
              }`}
            >
              {tab.icon}
            </span>
            <span className="text-[11px] mt-0.5 tracking-tight font-medium">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
