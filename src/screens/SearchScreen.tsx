import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAudio } from '../context/AudioContext';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { MiniPlayer } from '../components/MiniPlayer';

export const SearchScreen: React.FC = () => {
  const { songs, artists, albums, playlists, openSongOptions, setScreen, setSelectedPlaylist } =
    useApp();
  const { playSong } = useAudio();

  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<
    'Tudo' | 'Nome' | 'Artista' | 'Álbum' | 'Gênero' | 'Playlist'
  >('Tudo');

  const categories = ['Tudo', 'Nome', 'Artista', 'Álbum', 'Gênero', 'Playlist'] as const;

  const filteredSongs = songs.filter((s) => {
    if (!query) return true;
    const q = query.toLowerCase();
    if (activeCategory === 'Nome') return s.title.toLowerCase().includes(q);
    if (activeCategory === 'Artista') return s.artist.toLowerCase().includes(q);
    if (activeCategory === 'Álbum') return s.album.toLowerCase().includes(q);
    if (activeCategory === 'Gênero') return s.genre.toLowerCase().includes(q);

    return (
      s.title.toLowerCase().includes(q) ||
      s.artist.toLowerCase().includes(q) ||
      s.album.toLowerCase().includes(q) ||
      s.genre.toLowerCase().includes(q)
    );
  });

  const filteredPlaylists = playlists.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#14121c] text-[#e6e0ee] pb-32">
      <Header title="Pesquisa" />

      <main className="px-4 space-y-4 pt-3">
        {/* Search Bar Input */}
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#cac3d8] text-[20px]">
            search
          </span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar por nome, artista, álbum..."
            className="w-full h-12 bg-[#2b2833] border border-[#494455]/40 rounded-xl pl-11 pr-10 text-sm text-white placeholder-[#cac3d8]/50 focus:outline-none focus:border-[#7c4dff]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#cac3d8]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#7c4dff] text-white shadow-sm'
                    : 'bg-[#2b2833] text-[#cac3d8] hover:bg-[#36333e]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Recent Searches Tags */}
        {!query && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#cac3d8] uppercase tracking-wider">
              Pesquisas Recentes
            </h3>
            <div className="flex flex-wrap gap-2">
              {['The Weeknd', 'Synthwave', 'Dua Lipa', 'Pistas de Dança', 'Lo-Fi Chill'].map(
                (tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 bg-[#2a2a2a] hover:bg-[#333333] rounded-full text-xs text-white border border-[#494455]/20 flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[14px] text-[#cdbdff]">
                      history
                    </span>
                    <span>{tag}</span>
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Playlists Results */}
        {activeCategory === 'Playlist' || (activeCategory === 'Tudo' && query) ? (
          filteredPlaylists.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-[#cac3d8] uppercase tracking-wider">
                Playlists
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {filteredPlaylists.map((pl) => (
                  <div
                    key={pl.id}
                    onClick={() => {
                      setSelectedPlaylist(pl);
                      setScreen('playlist-detail');
                    }}
                    className="bg-[#2a2a2a] p-2.5 rounded-2xl border border-[#494455]/20 flex items-center gap-3 cursor-pointer hover:bg-[#323232]"
                  >
                    <img
                      src={pl.coverUrl}
                      alt={pl.name}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate">{pl.name}</p>
                      <p className="text-[10px] text-[#cac3d8]">{pl.songIds.length} músicas</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ) : null}

        {/* Songs Results */}
        <div className="space-y-[5px]">
          <h3 className="text-xs font-bold text-[#cac3d8] uppercase tracking-wider mb-2">
            Músicas Encontradas ({filteredSongs.length})
          </h3>
          {filteredSongs.length === 0 ? (
            <div className="text-center py-12 text-xs text-[#cac3d8]">
              Nenhum resultado encontrado para "{query}".
            </div>
          ) : (
            filteredSongs.map((song) => (
              <div
                key={song.id}
                onClick={() => playSong(song, filteredSongs)}
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
                      {song.artist} • {song.genre}
                    </p>
                  </div>
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
            ))
          )}
        </div>
      </main>

      <MiniPlayer />
      <BottomNav />
    </div>
  );
};
