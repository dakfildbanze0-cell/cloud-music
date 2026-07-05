import React from 'react';
import { useApp } from '../context/AppContext';
import { useAudio } from '../context/AudioContext';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { MiniPlayer } from '../components/MiniPlayer';

export const FavoritesScreen: React.FC = () => {
  const { songs, openSongOptions, setScreen, toggleFavorite } = useApp();
  const { playSong } = useAudio();

  const favoriteSongs = songs.filter((s) => s.isFavorite);

  const handlePlayAll = () => {
    if (favoriteSongs.length > 0) {
      playSong(favoriteSongs[0], favoriteSongs);
    }
  };

  return (
    <div className="min-h-screen bg-[#14121c] text-[#e6e0ee] pb-32">
      <Header title="Favoritos" showBack onBack={() => setScreen('home')} />

      <main className="px-4 space-y-4 pt-3">
        {/* Hero Card */}
        <div className="bg-gradient-to-r from-[#7c4dff]/30 to-[#2a2a2a] p-4 rounded-3xl border border-[#7c4dff]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-[#7c4dff] flex items-center justify-center text-white shadow-lg shadow-[#7c4dff]/40">
              <span className="material-symbols-outlined text-[32px] icon-filled">
                favorite
              </span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Músicas Favoritas</h2>
              <p className="text-xs text-[#cac3d8] font-medium">
                {favoriteSongs.length} faixas salvas na nuvem
              </p>
            </div>
          </div>

          {favoriteSongs.length > 0 && (
            <button
              onClick={handlePlayAll}
              className="w-12 h-12 bg-[#7c4dff] text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform"
              title="Tocar tudo"
            >
              <span className="material-symbols-outlined text-[28px] icon-filled">
                play_arrow
              </span>
            </button>
          )}
        </div>

        {/* Favorite Songs List with 5px gap */}
        <div className="space-y-[5px]">
          {favoriteSongs.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <span className="material-symbols-outlined text-4xl text-[#494455]">
                favorite_border
              </span>
              <p className="text-sm text-[#cac3d8]">Você ainda não favoritou nenhuma música.</p>
            </div>
          ) : (
            favoriteSongs.map((song) => (
              <div
                key={song.id}
                onClick={() => playSong(song, favoriteSongs)}
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
                    <p className="text-xs text-[#cac3d8] truncate font-medium">{song.artist}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(song.id);
                    }}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-[#ffb688] hover:bg-[#36333e]"
                  >
                    <span className="material-symbols-outlined text-[20px] icon-filled">
                      favorite
                    </span>
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
