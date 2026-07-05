import React from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { MiniPlayer } from '../components/MiniPlayer';

export const ArtistsScreen: React.FC = () => {
  const { artists, setSelectedArtist, setScreen } = useApp();

  return (
    <div className="min-h-screen bg-[#14121c] text-[#e6e0ee] pb-32">
      <Header title="Artistas" showBack onBack={() => setScreen('library')} />

      <main className="px-4 space-y-4 pt-3">
        <h2 className="text-xs font-bold text-[#cac3d8] uppercase tracking-wider">
          Todos os Artistas ({artists.length})
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {artists.map((artist) => (
            <div
              key={artist.id}
              onClick={() => {
                setSelectedArtist(artist);
                setScreen('artist-detail');
              }}
              className="bg-[#2a2a2a] p-4 rounded-2xl border border-[#494455]/20 flex flex-col items-center text-center space-y-2.5 cursor-pointer hover:bg-[#323232] transition-all active:scale-95"
            >
              <img
                src={artist.imageUrl}
                alt={artist.name}
                className="w-20 h-20 rounded-full object-cover shadow-md border border-[#494455]/30"
              />
              <div className="min-w-0 w-full">
                <h3 className="font-bold text-sm text-white truncate">{artist.name}</h3>
                <p className="text-[11px] text-[#cac3d8] font-medium">
                  {artist.songCount} música(s) • {artist.albumCount} álbum(ns)
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
