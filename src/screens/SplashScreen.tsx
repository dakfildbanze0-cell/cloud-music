import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';

export const SplashScreen: React.FC = () => {
  const { setScreen, user } = useApp();
  const [loadingText, setLoadingText] = useState('Carregando biblioteca...');

  useEffect(() => {
    const textTimer1 = setTimeout(() => {
      setLoadingText('Verificando conta Supabase...');
    }, 1000);

    const textTimer2 = setTimeout(() => {
      setLoadingText('Sincronizando nuvem e arquivos...');
    }, 1800);

    const finishTimer = setTimeout(() => {
      if (user) {
        setScreen('home');
      } else {
        setScreen('login');
      }
    }, 2800);

    return () => {
      clearTimeout(textTimer1);
      clearTimeout(textTimer2);
      clearTimeout(finishTimer);
    };
  }, [user, setScreen]);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12 text-center bg-[#14121c] text-[#e6e0ee]">
      {/* Ambient glowing background effect */}
      <div className="ambient-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

      {/* Main Branding Container */}
      <div className="relative z-10 flex flex-col items-center mb-12">
        <div className="w-24 h-24 bg-[#7c4dff] rounded-3xl flex items-center justify-center shadow-2xl mb-6 shadow-[#7c4dff]/40 transform transition-transform hover:scale-105">
          <span className="material-symbols-outlined text-[#fcf6ff] text-[52px] icon-filled">
            music_note
          </span>
        </div>
        <h1 className="font-bold text-3xl sm:text-4xl text-white tracking-tight mb-2">
          Cloud Music
        </h1>
        <p className="text-xs text-[#cac3d8] max-w-[260px] leading-relaxed">
          Sua biblioteca de música com backup inteligente no Supabase
        </p>
      </div>

      {/* Loading Indicator */}
      <div className="relative z-10 flex flex-col items-center space-y-4">
        <div className="w-48 h-1.5 bg-[#36333e] rounded-full overflow-hidden relative">
          <div className="h-full bg-[#7c4dff] rounded-full w-2/5 animate-[pulse_1.5s_infinite] shadow-[0_0_12px_#7c4dff]"></div>
        </div>
        <p className="text-xs font-semibold text-[#cac3d8] tracking-widest uppercase transition-all">
          {loadingText}
        </p>
      </div>

      {/* Quick Skip button */}
      <button
        onClick={() => setScreen(user ? 'home' : 'login')}
        className="mt-12 text-xs text-[#7c4dff] hover:underline font-medium opacity-80 hover:opacity-100 transition-opacity"
      >
        Entrar imediatamente →
      </button>
    </div>
  );
};
