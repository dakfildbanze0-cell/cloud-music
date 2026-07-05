import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAudio } from '../context/AudioContext';

export const OptionMenuModal: React.FC = () => {
  const {
    optionModalSong,
    closeSongOptions,
    toggleFavorite,
    toggleDownload,
    uploadSongsToCloud,
    playlists,
    addSongToPlaylist,
    showToast,
  } = useApp();
  const { playSong, addToQueue } = useAudio();

  const [playlistSubmenu, setPlaylistSubmenu] = useState(false);

  if (!optionModalSong) return null;

  const handlePlayNow = () => {
    playSong(optionModalSong);
    closeSongOptions();
  };

  const handleAddToQueue = () => {
    addToQueue(optionModalSong);
    showToast(`"${optionModalSong.title}" adicionada à fila`);
    closeSongOptions();
  };

  const handleFavorite = () => {
    toggleFavorite(optionModalSong.id);
    closeSongOptions();
  };

  const handleDownload = () => {
    toggleDownload(optionModalSong.id);
    closeSongOptions();
  };

  const handleUploadCloud = () => {
    uploadSongsToCloud([optionModalSong.id]);
    closeSongOptions();
  };

  const handleShare = () => {
    showToast('Link de compartilhamento em nuvem copiado!');
    closeSongOptions();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center sm:items-center p-0 sm:p-4"
      onClick={closeSongOptions}
    >
      <div
        className="w-full max-w-md bg-[#211e28] border border-[#494455]/50 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl space-y-4 animate-in fade-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Drag Handle */}
        <div className="w-12 h-1 bg-[#494455] rounded-full mx-auto mb-2"></div>

        {/* Song Info Preview */}
        <div className="flex items-center gap-3 pb-3 border-b border-[#36333e]">
          <img
            src={optionModalSong.coverUrl}
            alt={optionModalSong.title}
            className="w-12 h-12 rounded-xl object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white text-base truncate">
              {optionModalSong.title}
            </h3>
            <p className="text-xs text-[#cac3d8] truncate">
              {optionModalSong.artist} • {optionModalSong.format} ({optionModalSong.fileSizeFormatted})
            </p>
          </div>
          <button
            onClick={closeSongOptions}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2b2833] text-[#cac3d8]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Submenu for Adding to Playlist */}
        {playlistSubmenu ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white text-sm">Selecione a Playlist</span>
              <button
                onClick={() => setPlaylistSubmenu(false)}
                className="text-xs text-[#cdbdff]"
              >
                Voltar
              </button>
            </div>
            <div className="max-h-48 overflow-y-auto space-y-1">
              {playlists.map((pl) => (
                <button
                  key={pl.id}
                  onClick={() => {
                    addSongToPlaylist(pl.id, optionModalSong.id);
                    closeSongOptions();
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#2a2a2a] hover:bg-[#36333e] text-left transition-colors"
                >
                  <img src={pl.coverUrl} alt={pl.name} className="w-8 h-8 rounded-lg object-cover" />
                  <span className="text-sm text-white font-medium truncate">{pl.name}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Main Action List */
          <div className="space-y-1 text-sm text-[#e6e0ee]">
            <button
              onClick={handlePlayNow}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#2b2833] active:scale-98 transition-all"
            >
              <span className="material-symbols-outlined text-[#cdbdff]">play_arrow</span>
              <span>Reproduzir agora</span>
            </button>

            <button
              onClick={handleAddToQueue}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#2b2833] active:scale-98 transition-all"
            >
              <span className="material-symbols-outlined text-[#cdbdff]">queue_music</span>
              <span>Adicionar à fila</span>
            </button>

            <button
              onClick={handleFavorite}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#2b2833] active:scale-98 transition-all"
            >
              <span
                className={`material-symbols-outlined ${
                  optionModalSong.isFavorite ? 'text-[#ffb688] icon-filled' : 'text-[#cdbdff]'
                }`}
              >
                favorite
              </span>
              <span>
                {optionModalSong.isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
              </span>
            </button>

            <button
              onClick={() => setPlaylistSubmenu(true)}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#2b2833] active:scale-98 transition-all"
            >
              <span className="material-symbols-outlined text-[#cdbdff]">playlist_add</span>
              <span>Adicionar à playlist</span>
            </button>

            <button
              onClick={handleDownload}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#2b2833] active:scale-98 transition-all"
            >
              <span className="material-symbols-outlined text-[#cdbdff]">
                {optionModalSong.isDownloaded ? 'delete' : 'download_for_offline'}
              </span>
              <span>
                {optionModalSong.isDownloaded ? 'Excluir download' : 'Baixar para offline'}
              </span>
            </button>

            {!optionModalSong.isUploaded && (
              <button
                onClick={handleUploadCloud}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#2b2833] active:scale-98 transition-all"
              >
                <span className="material-symbols-outlined text-[#cdbdff]">cloud_upload</span>
                <span>Fazer backup no Supabase</span>
              </button>
            )}

            <button
              onClick={handleShare}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#2b2833] active:scale-98 transition-all"
            >
              <span className="material-symbols-outlined text-[#cdbdff]">share</span>
              <span>Compartilhar faixa</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
