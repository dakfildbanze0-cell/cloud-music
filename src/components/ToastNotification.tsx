import React from 'react';
import { useApp } from '../context/AppContext';

export const ToastNotification: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#2b2833]/95 text-white text-xs font-semibold shadow-2xl border border-[#7c4dff]/40 flex items-center gap-2 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-200">
      <span className="material-symbols-outlined text-[#7c4dff] text-[18px]">info</span>
      <span>{toastMessage}</span>
    </div>
  );
};
