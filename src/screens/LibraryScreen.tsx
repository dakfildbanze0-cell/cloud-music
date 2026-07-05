import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAudio } from '../context/AudioContext';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { MiniPlayer } from '../components/MiniPlayer';

export const LibraryScreen: React.FC = () => {
  const { songs, openSongOptions, setCreatePlaylistOpen, setScreen } = useApp();
  const { playSong, currentSong, isPlaying } = useAudio();

  const [activeFilter, setActiveFilter] = useState<
    'Todas' | 'Artistas' | 'Álbuns' | 'Pastas' | 'Favoritas' | 'Offline'
  >('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = ['Todas', 'Artistas', 'Álbuns', 'Pastas', 'Favoritas', 'Offline'] as const;

  let filteredSongs = songs.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.album.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'Favoritas') return s.isFavorite;
    if (activeFilter === 'Offline') return s.isDownloaded;
    return true;
  });

  const handleTabChange = (tab: (typeof filterTabs)[number]) => {
    setActiveFilter(tab);
    if (tab === 'Artistas') setScreen('artists');
    if (tab === 'Álbuns') setScreen('albums');
  };

  return (
    <div className="min-h-screen bg-[#14121c] text-[#e6e0ee] pb-32">
      <Header title="Biblioteca" />

      <main className="px-4 space-y-4 pt-3">
        {/* Title and Top Actions */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Músicas</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setScreen('import')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#7c4dff] text-white font-bold text-xs active:scale-95 transition-transform shadow-md shadow-[#7c4dff]/20"
              title="Extrair Músicas do Dispositivo"
            >
              <span className="material-symbols-outlined text-[18px]">smartphone</span>
              <span>Extrair Áudios</span>
            </button>

            <button
              onClick={() => setCreatePlaylistOpen(true)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2b2833] text-[#cac3d8] active:scale-95 transition-transform"
              title="Criar Playlist"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#cac3d8] text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar músicas..."
            className="w-full h-11 bg-[#2b2833] border border-[#494455]/30 rounded-xl pl-11 pr-4 text-sm text-white placeholder-[#cac3d8]/50 focus:outline-none focus:border-[#7c4dff]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#cac3d8]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        {/* Horizontal Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-1">
          {filterTabs.map((tab) => {
            const isTabActive = activeFilter === tab;
            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-4 py-2 rounded-full font-semibold text-xs whitespace-nowrap active:scale-95 transition-all shadow-sm ${
                  isTabActive
                    ? 'bg-[#7c4dff] text-[#fcf6ff]'
                    : 'bg-[#2b2833] text-[#cac3d8] hover:bg-[#36333e]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Folder view if Pastas is selected */}
        {activeFilter === 'Pastas' ? (
          <div className="space-y-2 pt-2">
            <button
              onClick={() => setScreen('import')}
              className="w-full flex items-center justify-center gap-2 p-3.5 bg-[#2b2833] hover:bg-[#36333e] text-[#cdbdff] border border-dashed border-[#7c4dff] rounded-2xl font-bold text-xs active:scale-98 transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">create_new_folder</span>
              <span>Escanear Pasta do Dispositivo / SD Card</span>
            </button>

            {['/storage/emulated/0/Music/Pop', '/storage/emulated/0/Music/HiRes', '/storage/emulated/0/Music/Indie', '/storage/emulated/0/Downloads', '/storage/emulated/0/WhatsApp/Media/Audio'].map((folder) => (
              <div
                key={folder}
                onClick={() => setScreen('import')}
                className="flex items-center gap-3 p-3 bg-[#2a2a2a] rounded-2xl border border-[#494455]/20 cursor-pointer hover:bg-[#323232]"
              >
                <span className="material-symbols-outlined text-[#7c4dff]">folder</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{folder}</p>
                  <p className="text-xs text-[#cac3d8]">Músicas locais extraídas</p>
                </div>
                <span className="material-symbols-outlined text-[#cac3d8] text-[18px]">chevron_right</span>
              </div>
            ))}
          </div>
        ) : (
          /* Songs List with 5px gap requirement */
          <div className="space-y-[5px] pt-1">
            {filteredSongs.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <span className="material-symbols-outlined text-4xl text-[#494455]">
                  music_off
                </span>
                <p className="text-sm text-[#cac3d8]">Nenhuma música encontrada nesta categoria.</p>
              </div>
            ) : (
              filteredSongs.map((song) => {
                const isCurrent = currentSong?.id === song.id;
                return (
                  <div
                    key={song.id}
                    onClick={() => playSong(song, filteredSongs)}
                    className={`flex items-center p-2.5 rounded-2xl transition-all active:scale-[0.99] cursor-pointer group border ${
                      isCurrent
                        ? 'bg-[#2b2833] border-[#7c4dff]/60 shadow-md'
                        : 'bg-[#2a2a2a] border-[#494455]/15 hover:bg-[#323232]'
                    }`}
                  >
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={song.coverUrl}
                        alt={song.title}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${
                          isCurrent ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                      >
                        <span className="material-symbols-outlined text-white text-[28px] icon-filled">
                          {isCurrent && isPlaying ? 'equalizer' : 'play_arrow'}
                        </span>
                      </div>
                    </div>

                    <div className="ml-3 flex-grow min-w-0">
                      <h3 className="font-semibold text-sm text-white truncate">{song.title}</h3>
                      <p className="text-xs text-[#cac3d8] truncate font-medium">
                        {song.artist} • <span className="text-[#cdbdff]">{song.format}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#cac3d8] font-mono">
                        {song.durationFormatted}
                      </span>
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
                );
              })
            )}
          </div>
        )}
      </main>

      <MiniPlayer />
      <BottomNav />
    </div>
  );
};
