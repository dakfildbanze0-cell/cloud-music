import React, { useState } from 'react';
import { useAudio } from '../context/AudioContext';
import { useApp } from '../context/AppContext';

export const PlayerScreen: React.FC = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    nextSong,
    previousSong,
    seek,
    volume,
    setVolume,
    playbackRate,
    setPlaybackRate,
    isShuffle,
    toggleShuffle,
    repeatMode,
    toggleRepeat,
  } = useAudio();

  const { setScreen, toggleFavorite, openSongOptions, setCreatePlaylistOpen, showToast } =
    useApp();

  const [showVolume, setShowVolume] = useState(false);
  const rates = [1.0, 1.25, 1.5, 2.0];

  if (!currentSong) {
    return (
      <div className="min-h-screen bg-[#14121c] flex items-center justify-center text-white">
        <p>Nenhuma música selecionada</p>
      </div>
    );
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    seek(newTime);
  };

  const handleNextRate = () => {
    const currIndex = rates.indexOf(playbackRate);
    const nextIndex = (currIndex + 1) % rates.length;
    setPlaybackRate(rates[nextIndex]);
    showToast(`Velocidade: ${rates[nextIndex]}x`);
  };

  return (
    <div className="min-h-screen bg-[#14121c] text-[#e6e0ee] flex flex-col justify-between px-5 py-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="ambient-glow top-1/3 left-1/2 -translate-x-1/2"></div>

      {/* Top App Bar */}
      <header className="relative z-10 flex justify-between items-center h-12">
        <button
          onClick={() => setScreen('home')}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#36333e]/50 active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[28px] text-white">
            keyboard_arrow_down
          </span>
        </button>
        <span className="font-bold text-sm text-[#cdbdff] uppercase tracking-wider">
          Reproduzindo
        </span>
        <button
          onClick={() => openSongOptions(currentSong)}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#36333e]/50 active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-white">more_vert</span>
        </button>
      </header>

      {/* Album Cover Art */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center my-4 space-y-6">
        <div className="relative w-full max-w-[310px] aspect-square group">
          <img
            src={
              currentSong.coverUrl ||
              'https://lh3.googleusercontent.com/aida-public/AB6AXuBGdZwIS0dyYKpMw2YckjeHO7KMice_WBYrxdNM1YY8K2A6AEWj_uzSIPC1lTOLuTieBwGkc3HzZ3xNoC7Gz4Gzs1WruVIeetF59gOzwMDc6CivjqecJe7gzZbNhuIseGHLhGa-skoK0dv5XlbXumT5duKIeOGrok-IEf-rby1P8-sQAUfUXlWzNzTEt7ggaralRHLcawtQfAQy_v0GRRRRGqtXehkLqpGCyurvubHcDxJd9Ui65E64VQ'
            }
            alt={currentSong.title}
            className={`w-full h-full object-cover rounded-3xl shadow-2xl shadow-black/80 border border-[#494455]/20 ${
              isPlaying ? 'animate-spin-slow' : ''
            }`}
          />
        </div>

        {/* Song Info */}
        <div className="w-full max-w-sm flex items-center justify-between">
          <div className="text-left min-w-0 flex-1">
            <h2 className="text-2xl font-bold text-white truncate tracking-tight">
              {currentSong.title}
            </h2>
            <p className="text-sm text-[#cac3d8] truncate font-medium">{currentSong.artist}</p>
          </div>

          <button
            onClick={() => toggleFavorite(currentSong.id)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#36333e]/50 active:scale-110 transition-transform"
          >
            <span
              className={`material-symbols-outlined text-[32px] ${
                currentSong.isFavorite ? 'text-[#ffb688] icon-filled' : 'text-[#cac3d8]'
              }`}
            >
              favorite
            </span>
          </button>
        </div>

        {/* Progress Slider */}
        <div className="w-full max-w-sm space-y-1.5">
          <div
            onClick={handleProgressClick}
            className="relative w-full h-2 bg-[#36333e] rounded-full cursor-pointer overflow-hidden group"
          >
            <div
              className="absolute top-0 left-0 h-full bg-[#7c4dff] rounded-full transition-all duration-150 shadow-[0_0_10px_#7c4dff]"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-[#cac3d8] font-mono font-medium">
            <span>
              {Math.floor(currentTime / 60)}:
              {Math.floor(currentTime % 60)
                .toString()
                .padStart(2, '0')}
            </span>
            <span>{currentSong.durationFormatted}</span>
          </div>
        </div>

        {/* Playback Transport Controls */}
        <div className="w-full max-w-sm flex items-center justify-between">
          <button
            onClick={toggleShuffle}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
              isShuffle ? 'text-[#7c4dff]' : 'text-[#cac3d8] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">shuffle</span>
          </button>

          <div className="flex items-center gap-6">
            <button
              onClick={previousSong}
              className="w-12 h-12 flex items-center justify-center rounded-full text-white hover:text-[#cdbdff] active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-[36px]">skip_previous</span>
            </button>

            <button
              onClick={togglePlay}
              className="w-18 h-18 bg-[#7c4dff] text-[#fcf6ff] rounded-full flex items-center justify-center shadow-xl shadow-[#7c4dff]/40 active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-[44px] icon-filled">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>

            <button
              onClick={nextSong}
              className="w-12 h-12 flex items-center justify-center rounded-full text-white hover:text-[#cdbdff] active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-[36px]">skip_next</span>
            </button>
          </div>

          <button
            onClick={toggleRepeat}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
              repeatMode !== 'off' ? 'text-[#7c4dff]' : 'text-[#cac3d8] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">
              {repeatMode === 'one' ? 'repeat_one' : 'repeat'}
            </span>
          </button>
        </div>

        {/* Extra Toolbar (Speed, Volume, Queue) */}
        <div className="w-full max-w-sm glass-panel rounded-full p-2 px-5 flex items-center justify-between border border-[#494455]/30">
          <button
            onClick={handleNextRate}
            className="flex items-center gap-1 text-xs font-semibold text-[#cac3d8] hover:text-white"
          >
            <span className="material-symbols-outlined text-[18px]">speed</span>
            <span>{playbackRate}x</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowVolume(!showVolume)}
              className="text-[#cac3d8] hover:text-white"
            >
              <span className="material-symbols-outlined text-[20px]">
                {volume === 0 ? 'volume_off' : 'volume_up'}
              </span>
            </button>
            {showVolume && (
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-[#211e28] p-3 rounded-2xl border border-[#494455] shadow-2xl flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-24 accent-[#7c4dff]"
                />
              </div>
            )}
          </div>

          <button
            onClick={() => setCreatePlaylistOpen(true)}
            className="text-[#cac3d8] hover:text-white"
            title="Adicionar à Playlist"
          >
            <span className="material-symbols-outlined text-[20px]">playlist_add</span>
          </button>

          <button
            onClick={() => showToast('Música adicionada à fila!')}
            className="text-[#cac3d8] hover:text-white"
            title="Fila de Reprodução"
          >
            <span className="material-symbols-outlined text-[20px]">queue_music</span>
          </button>
        </div>
      </main>
    </div>
  );
};
