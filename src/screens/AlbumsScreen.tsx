import React from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { MiniPlayer } from '../components/MiniPlayer';

export const AlbumsScreen: React.FC = () => {
  const { albums, setSelectedAlbum, setScreen } = useApp();

  return (
    <div className="min-h-screen bg-[#14121c] text-[#e6e0ee] pb-32">
      <Header title="Álbuns" showBack onBack={() => setScreen('library')} />

      <main className="px-4 space-y-4 pt-3">
        <h2 className="text-xs font-bold text-[#cac3d8] uppercase tracking-wider">
          Todos os Álbuns ({albums.length})
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {albums.map((album) => (
            <div
              key={album.id}
              onClick={() => {
                setSelectedAlbum(album);
                setScreen('album-detail');
              }}
              className="bg-[#2a2a2a] p-3 rounded-2xl border border-[#494455]/20 space-y-2 cursor-pointer hover:bg-[#323232] transition-all active:scale-98"
            >
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-[#1d1a24] shadow-md">
                <img
                  src={album.coverUrl}
                  alt={album.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-sm text-white truncate">{album.title}</h3>
                <p className="text-xs text-[#cac3d8] truncate font-medium">{album.artist}</p>
                <p className="text-[10px] text-[#cdbdff] font-medium">
                  {album.year} • {album.songCount} faixas
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <MiniPlayer />
      <BottomNav />
    </div>
  );
};
