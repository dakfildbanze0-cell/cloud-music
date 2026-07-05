import React from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { MiniPlayer } from '../components/MiniPlayer';

export const PlaylistsScreen: React.FC = () => {
  const { playlists, setCreatePlaylistOpen, setSelectedPlaylist, setScreen, deletePlaylist } =
    useApp();

  return (
    <div className="min-h-screen bg-[#14121c] text-[#e6e0ee] pb-32">
      <Header
        title="Playlists"
        rightAction={
          <button
            onClick={() => setCreatePlaylistOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#7c4dff] text-white active:scale-95 transition-transform shadow-md"
            title="Criar Playlist"
          >
            <span className="material-symbols-outlined text-[22px]">add</span>
          </button>
        }
      />

      <main className="px-4 space-y-4 pt-3">
        {/* Banner Create Playlist */}
        <div
          onClick={() => setCreatePlaylistOpen(true)}
          className="p-4 rounded-2xl bg-[#2a2a2a] border border-[#494455]/30 flex items-center justify-between cursor-pointer hover:bg-[#323232] transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#7c4dff]/20 border border-[#7c4dff]/40 flex items-center justify-center text-[#7c4dff]">
              <span className="material-symbols-outlined text-[28px]">add_circle</span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Criar Nova Playlist</h3>
              <p className="text-xs text-[#cac3d8]">Organize suas músicas sincronizadas</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#cac3d8]">chevron_right</span>
        </div>

        {/* Playlists Grid */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-[#cac3d8] uppercase tracking-wider">
            Suas Playlists na Nuvem ({playlists.length})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {playlists.map((pl) => (
              <div
                key={pl.id}
                onClick={() => {
                  setSelectedPlaylist(pl);
                  setScreen('playlist-detail');
                }}
                className="bg-[#2a2a2a] p-3 rounded-2xl border border-[#494455]/20 flex items-center justify-between cursor-pointer hover:bg-[#323232] transition-all active:scale-98 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={pl.coverUrl}
                    alt={pl.name}
                    className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-sm text-white truncate">{pl.name}</h4>
                      {pl.isPrivate && (
                        <span className="material-symbols-outlined text-[14px] text-[#cdbdff]">
                          lock
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#cac3d8] truncate font-medium">
                      {pl.songIds.length} músicas • {pl.updatedAt}
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Deseja excluir a playlist "${pl.name}"?`)) {
                      deletePlaylist(pl.id);
                    }
                  }}
                  className="w-8 h-8 flex items-center justify-center text-[#cac3d8] hover:text-red-400 rounded-full hover:bg-[#36333e]"
                  title="Excluir Playlist"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      <MiniPlayer />
      <BottomNav />
    </div>
  );
};
