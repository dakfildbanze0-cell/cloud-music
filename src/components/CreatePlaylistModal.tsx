import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const CreatePlaylistModal: React.FC = () => {
  const { createPlaylistOpen, setCreatePlaylistOpen, createPlaylist, songs } = useApp();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedSongIds, setSelectedSongIds] = useState<string[]>([]);

  if (!createPlaylistOpen) return null;

  const handleToggleSong = (id: string) => {
    setSelectedSongIds((prev) =>
      prev.includes(id) ? prev.filter((sId) => sId !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createPlaylist({
      name: name.trim(),
      description: description.trim(),
      isPrivate,
      songIds: selectedSongIds,
    });

    setName('');
    setDescription('');
    setIsPrivate(false);
    setSelectedSongIds([]);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={() => setCreatePlaylistOpen(false)}
    >
      <div
        className="w-full max-w-md bg-[#211e28] border border-[#494455]/50 rounded-3xl p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-[#36333e]">
          <h2 className="font-bold text-lg text-white">Criar Nova Playlist</h2>
          <button
            onClick={() => setCreatePlaylistOpen(false)}
            className="w-8 h-8 rounded-full bg-[#2b2833] flex items-center justify-center text-[#cac3d8]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#cac3d8] mb-1">
              Nome da Playlist *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Minhas Músicas Favoritas"
              className="w-full h-12 px-4 rounded-xl bg-[#2a2a2a] border border-[#494455]/40 text-white placeholder-[#948ea1] focus:outline-none focus:border-[#7c4dff]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#cac3d8] mb-1">
              Descrição (opcional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Adicione uma breve descrição para esta playlist"
              className="w-full h-20 p-3 rounded-xl bg-[#2a2a2a] border border-[#494455]/40 text-white placeholder-[#948ea1] focus:outline-none focus:border-[#7c4dff] text-sm resize-none"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-[#2a2a2a] rounded-xl border border-[#494455]/30">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#cdbdff]">lock</span>
              <div>
                <p className="text-sm font-semibold text-white">Playlist Privada</p>
                <p className="text-xs text-[#cac3d8]">Visível apenas para você na nuvem</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="w-5 h-5 rounded accent-[#7c4dff]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#cac3d8] mb-2">
              Adicionar Músicas ({selectedSongIds.length} selecionadas)
            </label>
            <div className="max-h-40 overflow-y-auto space-y-1 pr-1">
              {songs.map((song) => {
                const isSelected = selectedSongIds.includes(song.id);
                return (
                  <div
                    key={song.id}
                    onClick={() => handleToggleSong(song.id)}
                    className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-colors ${
                      isSelected ? 'bg-[#3b3743] border border-[#7c4dff]/50' : 'bg-[#2a2a2a]'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={song.coverUrl}
                        alt={song.title}
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-white truncate">{song.title}</p>
                        <p className="text-[10px] text-[#cac3d8] truncate">{song.artist}</p>
                      </div>
                    </div>
                    <span
                      className={`material-symbols-outlined text-[20px] ${
                        isSelected ? 'text-[#7c4dff]' : 'text-[#948ea1]'
                      }`}
                    >
                      {isSelected ? 'check_box' : 'checkbox_outline_blank'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-[#7c4dff] text-[#fcf6ff] font-semibold rounded-xl active:scale-98 transition-all hover:brightness-110 shadow-lg mt-2"
          >
            Salvar Playlist
          </button>
        </form>
      </div>
    </div>
  );
};
