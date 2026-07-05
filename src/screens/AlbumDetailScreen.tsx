import React from 'react';
import { useApp } from '../context/AppContext';
import { useAudio } from '../context/AudioContext';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { MiniPlayer } from '../components/MiniPlayer';

export const AlbumDetailScreen: React.FC = () => {
  const { selectedAlbum, songs, setScreen, openSongOptions } = useApp();
  const { playSong } = useAudio();

  if (!selectedAlbum) {
    return (
      <div className="min-h-screen bg-[#14121c] text-white p-6">
        <p>Álbum não encontrado.</p>
        <button onClick={() => setScreen('albums')} className="text-[#cdbdff] underline mt-4">
          Voltar para Álbuns
        </button>
      </div>
    );
  }

  const albumSongs = songs.filter(
    (s) => s.album.toLowerCase() === selectedAlbum.title.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-[#14121c] text-[#e6e0ee] pb-32">
      <Header title={selectedAlbum.title} showBack onBack={() => setScreen('albums')} />

      <main className="px-4 space-y-5 pt-3">
        {/* Album Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-36 h-36 rounded-3xl overflow-hidden shadow-2xl border border-[#494455]/30">
            <img
              src={selectedAlbum.coverUrl}
              alt={selectedAlbum.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{selectedAlbum.title}</h2>
            <p className="text-xs text-[#cac3d8] font-medium">
              {selectedAlbum.artist} • {selectedAlbum.year}
            </p>
            <p className="text-[11px] text-[#cdbdff] font-semibold">{albumSongs.length} faixas</p>
          </div>

          <button
            onClick={() => albumSongs.length > 0 && playSong(albumSongs[0], albumSongs)}
            className="h-11 px-6 bg-[#7c4dff] text-[#fcf6ff] font-bold text-sm rounded-2xl shadow-lg shadow-[#7c4dff]/30 active:scale-95 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined icon-filled">play_arrow</span>
            <span>Tocar Álbum</span>
          </button>
        </div>

        {/* Tracklist */}
        <div className="space-y-[5px]">
          <h3 className="text-xs font-bold text-[#cac3d8] uppercase tracking-wider mb-2">
            Faixas do Álbum
          </h3>

          {albumSongs.map((song, index) => (
            <div
              key={song.id}
              onClick={() => playSong(song, albumSongs)}
              className="bg-[#2a2a2a] rounded-2xl p-2.5 flex items-center justify-between hover:bg-[#323232] transition-colors cursor-pointer border border-[#494455]/15"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <span className="text-xs font-mono font-bold text-[#cdbdff] w-5 text-center">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white truncate">{song.title}</p>
                  <p className="text-xs text-[#cac3d8] truncate font-medium">{song.artist}</p>
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
