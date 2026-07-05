import React from 'react';
import { useApp } from '../context/AppContext';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, showBack, onBack, rightAction }) => {
  const { user, currentScreen, setScreen, syncStatus, isOfflineMode } = useApp();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      setScreen('home');
    }
  };

  const isMainScreen = ['home', 'library', 'search', 'downloads', 'settings'].includes(currentScreen);

  return (
    <header className="sticky top-0 left-0 w-full z-40 flex justify-between items-center px-4 h-14 bg-[#14121c]/90 backdrop-blur-md border-b border-[#36333e]/50">
      <div className="flex items-center gap-3">
        {!isMainScreen || showBack ? (
          <button
            onClick={handleBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#36333e]/50 active:scale-95 transition-all text-[#e6e0ee]"
            aria-label="Voltar"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        ) : (
          <button
            onClick={() => setScreen('profile')}
            className="w-8 h-8 rounded-full bg-[#7c4dff] flex items-center justify-center overflow-hidden border border-[#494455] active:scale-95 transition-transform"
          >
            <img
              src={
                user?.avatarUrl ||
                'https://lh3.googleusercontent.com/aida-public/AB6AXuAMZgXj8f96akVN5CiFaDHA5zhLzojah62MLCg2vYlQ3LWO5EpbsRamDYlOpSqgXLyd2M30O_Gxzhjkk1A3xn0XMeixQNOaHSbEyXgj5y7Vj7yHJ1JwqCPm4KpJWEn_0MRye8zkasaF9A3s8NZXMDY_FuhKweswkLv6OITABsOONMMi6o1j-gkxplMb1aJlH27JKJ35p_9fsCXHN_3xSAar2lb_kFalb6oKiDxcBvE-tw5GgGKl2-auJA'
              }
              alt="Avatar do Usuário"
              className="w-full h-full object-cover"
            />
          </button>
        )}

        <h1 className="font-semibold text-lg text-[#e6e0ee] truncate max-w-[200px]">
          {title || 'Cloud Music'}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        {rightAction ? (
          rightAction
        ) : (
          <>
            <button
              onClick={() => setScreen('sync')}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#36333e]/50 active:scale-95 transition-all text-[#cdbdff]"
              title="Status da Sincronização em Nuvem"
            >
              <span className="material-symbols-outlined">
                {isOfflineMode
                  ? 'cloud_off'
                  : syncStatus.isSyncing
                  ? 'sync'
                  : 'cloud_done'}
              </span>
            </button>
            {isMainScreen && (
              <button
                onClick={() => setScreen('import')}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#36333e]/50 active:scale-95 transition-all text-[#cdbdff]"
                title="Importar Músicas"
              >
                <span className="material-symbols-outlined">add_to_photos</span>
              </button>
            )}
          </>
        )}
      </div>
    </header>
  );
};
