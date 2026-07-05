import React from 'react';
import { useApp } from '../context/AppContext';
import { useAudio } from '../context/AudioContext';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { MiniPlayer } from '../components/MiniPlayer';

export const PlaylistDetailScreen: React.FC = () => {
  const {
    selectedPlaylist,
    songs,
    setScreen,
    removeSongFromPlaylist,
    openSongOptions,
  } = useApp();
  const { playSong, toggleShuffle } = useAudio();

  if (!selectedPlaylist) {
    return (
      <div className="min-h-screen bg-[#14121c] text-white p-6">
        <p>Playlist não encontrada.</p>
        <button onClick={() => setScreen('playlists')} className="text-[#cdbdff] underline mt-4">
          Voltar para Playlists
        </button>
      </div>
    );
  }

  const playlistSongs = songs.filter((s) => selectedPlaylist.songIds.includes(s.id));

  const handlePlayAll = () => {
    if (playlistSongs.length > 0) {
      playSong(playlistSongs[0], playlistSongs);
    }
  };

  const handleShufflePlay = () => {
    if (playlistSongs.length > 0) {
      toggleShuffle();
      const randomSong = playlistSongs[Math.floor(Math.random() * playlistSongs.length)];
      playSong(randomSong, playlistSongs);
    }
  };

  return (
    <div className="min-h-screen bg-[#14121c] text-[#e6e0ee] pb-32">
      <Header title={selectedPlaylist.name} showBack onBack={() => setScreen('playlists')} />

      <main className="px-4 space-y-5 pt-3">
        {/* Playlist Hero Info */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-40 h-40 rounded-3xl overflow-hidden shadow-2xl border border-[#494455]/30">
            <img
              src={selectedPlaylist.coverUrl}
              alt={selectedPlaylist.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-xl font-bold text-white">{selectedPlaylist.name}</h2>
              {selectedPlaylist.isPrivate && (
                <span className="material-symbols-outlined text-xs text-[#cdbdff]">lock</span>
              )}
            </div>
            <p className="text-xs text-[#cac3d8] max-w-xs">{selectedPlaylist.description}</p>
            <p className="text-[11px] text-[#cdbdff] font-semibold">
              {playlistSongs.length} músicas • Atualizado {selectedPlaylist.updatedAt}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-1 w-full max-w-xs">
            <button
              onClick={handlePlayAll}
              className="flex-1 h-12 bg-[#7c4dff] text-[#fcf6ff] font-bold text-sm rounded-2xl shadow-lg shadow-[#7c4dff]/30 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px] icon-filled">
                play_arrow
              </span>
              <span>Reproduzir</span>
            </button>

            <button
              onClick={handleShufflePlay}
              className="w-12 h-12 bg-[#2b2833] text-white rounded-2xl border border-[#494455]/40 flex items-center justify-center active:scale-95 transition-all hover:bg-[#36333e]"
              title="Ordem Aleatória"
            >
              <span className="material-symbols-outlined text-[22px]">shuffle</span>
            </button>
          </div>
        </div>

        {/* Songs in Playlist */}
        <div className="space-y-[5px]">
          <h3 className="text-xs font-bold text-[#cac3d8] uppercase tracking-wider mb-2">
            Músicas da Playlist
          </h3>

          {playlistSongs.length === 0 ? (
            <p className="text-xs text-[#cac3d8] text-center py-8">
              Esta playlist ainda não contém músicas.
            </p>
          ) : (
            playlistSongs.map((song) => (
              <div
                key={song.id}
                onClick={() => playSong(song, playlistSongs)}
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
                      removeSongFromPlaylist(selectedPlaylist.id, song.id);
                    }}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-[#cac3d8] hover:text-red-400 hover:bg-[#36333e]"
                    title="Remover da Playlist"
                  >
                    <span className="material-symbols-outlined text-[18px]">remove_circle</span>
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
