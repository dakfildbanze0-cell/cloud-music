import React from 'react';
import { useApp } from '../context/AppContext';
import { useAudio } from '../context/AudioContext';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { MiniPlayer } from '../components/MiniPlayer';

export const ArtistDetailScreen: React.FC = () => {
  const { selectedArtist, songs, setScreen, openSongOptions } = useApp();
  const { playSong } = useAudio();

  if (!selectedArtist) {
    return (
      <div className="min-h-screen bg-[#14121c] text-white p-6">
        <p>Artista não encontrado.</p>
        <button onClick={() => setScreen('artists')} className="text-[#cdbdff] underline mt-4">
          Voltar para Artistas
        </button>
      </div>
    );
  }

  const artistSongs = songs.filter(
    (s) => s.artist.toLowerCase() === selectedArtist.name.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-[#14121c] text-[#e6e0ee] pb-32">
      <Header title={selectedArtist.name} showBack onBack={() => setScreen('artists')} />

      <main className="px-4 space-y-5 pt-3">
        {/* Artist Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <img
            src={selectedArtist.imageUrl}
            alt={selectedArtist.name}
            className="w-32 h-32 rounded-full object-cover shadow-2xl border-2 border-[#7c4dff]/50"
          />
          <div>
            <h2 className="text-2xl font-bold text-white">{selectedArtist.name}</h2>
            <p className="text-xs text-[#cac3d8] font-medium">
              {artistSongs.length} música(s) na biblioteca
            </p>
          </div>

          <button
            onClick={() => artistSongs.length > 0 && playSong(artistSongs[0], artistSongs)}
            className="h-11 px-6 bg-[#7c4dff] text-[#fcf6ff] font-bold text-sm rounded-2xl shadow-lg shadow-[#7c4dff]/30 active:scale-95 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined icon-filled">play_arrow</span>
            <span>Tocar Músicas</span>
          </button>
        </div>

        {/* Songs */}
        <div className="space-y-[5px]">
          <h3 className="text-xs font-bold text-[#cac3d8] uppercase tracking-wider mb-2">
            Músicas de {selectedArtist.name}
          </h3>

          {artistSongs.map((song) => (
            <div
              key={song.id}
              onClick={() => playSong(song, artistSongs)}
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
                  <p className="text-xs text-[#cac3d8] truncate font-medium">{song.album}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#cac3d8] font-mono font-medium">
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
          ))}
        </div>
      </main>

      <MiniPlayer />
      <BottomNav />
    </div>
  );
};
