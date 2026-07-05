import React from 'react';
import { useApp } from '../context/AppContext';
import { useAudio } from '../context/AudioContext';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { MiniPlayer } from '../components/MiniPlayer';

export const DownloadsScreen: React.FC = () => {
  const {
    songs,
    openSongOptions,
    toggleDownload,
    isOfflineMode,
    toggleOfflineMode,
    showToast,
  } = useApp();
  const { playSong } = useAudio();

  const downloadedSongs = songs.filter((s) => s.isDownloaded);

  const handleRedownloadAll = () => {
    showToast('Re-baixando todas as músicas offline...');
  };

  return (
    <div className="min-h-screen bg-[#14121c] text-[#e6e0ee] pb-32">
      <Header title="Downloads & Offline" />

      <main className="px-4 space-y-4 pt-3">
        {/* Offline Mode Switch Card */}
        <div className="bg-[#2a2a2a] p-4 rounded-2xl border border-[#494455]/30 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#7c4dff] text-[28px]">
              {isOfflineMode ? 'wifi_off' : 'download_for_offline'}
            </span>
            <div>
              <h3 className="font-bold text-sm text-white">Modo Offline</h3>
              <p className="text-xs text-[#cac3d8]">Tocar apenas músicas baixadas</p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isOfflineMode}
              onChange={toggleOfflineMode}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#36333e] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7c4dff]"></div>
          </label>
        </div>

        {/* Quick Action Bar */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#cac3d8] uppercase tracking-wider">
            Músicas Baixadas ({downloadedSongs.length})
          </span>
          <button
            onClick={handleRedownloadAll}
            className="text-xs font-bold text-[#cdbdff] hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">refresh</span>
            <span>Baixar tudo novamente</span>
          </button>
        </div>

        {/* Downloaded Songs List with 5px gap */}
        <div className="space-y-[5px]">
          {downloadedSongs.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <span className="material-symbols-outlined text-4xl text-[#494455]">
                download_done
              </span>
              <p className="text-sm text-[#cac3d8]">Nenhuma música baixada para offline.</p>
            </div>
          ) : (
            downloadedSongs.map((song) => (
              <div
                key={song.id}
                onClick={() => playSong(song, downloadedSongs)}
                className="bg-[#2a2a2a] rounded-2xl p-2.5 flex items-center justify-between hover:bg-[#323232] transition-colors cursor-pointer border border-[#494455]/15"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <img
                    src={song.coverUrl}
                    alt={song.title}
                    className="w-11 h-11 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white truncate">{song.title}</p>
                    <p className="text-xs text-[#cac3d8] truncate font-medium">
                      {song.artist} • {song.fileSizeFormatted}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#7c4dff] text-[18px]">
                    download_done
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDownload(song.id);
                    }}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-[#cac3d8] hover:text-red-400 hover:bg-[#36333e]"
                    title="Excluir Download"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openSongOptions(song);
                    }}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-[#cac3d8] hover:bg-[#36333e]"
                  >
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <MiniPlayer />
      <BottomNav />
    </div>
  );
};
