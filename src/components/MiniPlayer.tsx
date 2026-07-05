import React from 'react';
import { useAudio } from '../context/AudioContext';
import { useApp } from '../context/AppContext';

export const MiniPlayer: React.FC = () => {
  const { currentSong, isPlaying, togglePlay, nextSong, currentTime, duration } = useAudio();
  const { setScreen, currentScreen } = useApp();

  if (!currentSong || currentScreen === 'player' || currentScreen === 'splash' || currentScreen === 'login' || currentScreen === 'register') {
    return null;
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-[68px] left-3 right-3 z-30">
      <div
        onClick={() => setScreen('player')}
        className="relative bg-[#2a2a2a] border border-[#494455]/30 rounded-2xl p-2 flex items-center justify-between shadow-2xl glass-card cursor-pointer hover:bg-[#333333] transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 bg-[#36333e]">
            <img
              src={
                currentSong.coverUrl ||
                'https://lh3.googleusercontent.com/aida-public/AB6AXuBGdZwIS0dyYKpMw2YckjeHO7KMice_WBYrxdNM1YY8K2A6AEWj_uzSIPC1lTOLuTieBwGkc3HzZ3xNoC7Gz4Gzs1WruVIeetF59gOzwMDc6CivjqecJe7gzZbNhuIseGHLhGa-skoK0dv5XlbXumT5duKIeOGrok-IEf-rby1P8-sQAUfUXlWzNzTEt7ggaralRHLcawtQfAQy_v0GRRRRGqtXehkLqpGCyurvubHcDxJd9Ui65E64VQ'
              }
              alt={currentSong.title}
              className={`w-full h-full object-cover ${isPlaying ? 'animate-spin-slow' : ''}`}
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-[#e6e0ee] truncate">{currentSong.title}</span>
            <span className="text-[11px] text-[#cac3d8] truncate font-medium">
              {currentSong.artist}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 pr-1" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-[#7c4dff] text-[#fcf6ff] flex items-center justify-center active:scale-90 transition-transform shadow-md"
            aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
          >
            <span className="material-symbols-outlined text-[24px] icon-filled">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
          <button
            onClick={nextSong}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#cdbdff] active:scale-90 transition-transform hover:bg-[#36333e]/50"
            aria-label="Próxima música"
          >
            <span className="material-symbols-outlined text-[24px]">skip_next</span>
          </button>
        </div>

        {/* Dynamic Progress Line */}
        <div
          className="absolute bottom-0 left-0 h-[2.5px] bg-[#7c4dff] rounded-b-2xl transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};
