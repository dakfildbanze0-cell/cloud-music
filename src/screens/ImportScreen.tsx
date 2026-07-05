import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { Song } from '../types';
import { Capacitor } from '@capacitor/core';
import { AudioScanner, getSongs } from '../lib/audioScanner';

export const ImportScreen: React.FC = () => {
  const { songs, importSongs, setScreen, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>(songs.map((s) => s.id));
  const [filterUnimportedOnly, setFilterUnimportedOnly] = useState(false);

  // Scanning & Extraction state
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionProgress, setExtractionProgress] = useState<{ current: number; total: number; filename: string } | null>(null);

  const filtered = songs.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.artist.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterUnimportedOnly) return !s.isUploaded && matchesSearch;
    return matchesSearch;
  });

  const allSelected = selectedIds.length === filtered.length && filtered.length > 0;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((s) => s.id));
    }
  };

  const toggleSelectSong = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sId) => sId !== id) : [...prev, id]
    );
  };

  const scanNativeDevice = async () => {
    if (!Capacitor.isNativePlatform()) {
      showToast('O escaneamento nativo funciona apenas no app Android compilado.');
      return;
    }

    try {
      setIsExtracting(true);
      showToast('Escaneando armazenamento interno...');

      const songsResult = await getSongs();
      const rawSongs = songsResult || [];

      if (!rawSongs || rawSongs.length === 0) {
        showToast('Nenhuma música encontrada no dispositivo.');
        setIsExtracting(false);
        return;
      }

      const newSongs: Song[] = rawSongs.map((file: any, i: number) => {
        const title = file.name || file.title || 'Música Sem Título';
        const artist = file.artist || 'Artista Desconhecido';
        const album = file.album || 'Álbum Desconhecido';
        const durationMs = file.duration || 180000;
        const path = file.path || file.uri || '';
        const ext = path.split('.').pop()?.toUpperCase() || 'MP3';
        
        const durationSec = Math.round(durationMs > 1000 ? durationMs / 1000 : durationMs);
        const m = Math.floor(durationSec / 60);
        const s = Math.floor(durationSec % 60);

        return {
          id: `native_${i}_${Date.now()}`,
          title,
          artist,
          album,
          duration: durationSec,
          durationFormatted: `${m}:${s < 10 ? '0' : ''}${s}`,
          coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80',
          audioUrl: file.webPath || path,
          format: ext as any,
          genre: 'Local',
          isFavorite: false,
          isDownloaded: true,
          isUploaded: false,
          fileSizeBytes: file.size || 0,
          fileSizeFormatted: `${((file.size || 0) / (1024 * 1024)).toFixed(1)} MB`,
          year: new Date().getFullYear(),
          folderPath: path,
        };
      });

      importSongs(newSongs);
      setSelectedIds((prev) => [...prev, ...newSongs.map((s) => s.id)]);
      showToast(`Varredura concluída: ${newSongs.length} música(s) extraídas!`);
    } catch (e: any) {
      showToast('Erro ao ler músicas locais: ' + e.message);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleStartImport = () => {
    if (selectedIds.length === 0) {
      showToast('Selecione pelo menos uma música para sincronizar!');
      return;
    }
    setScreen('upload');
  };

  return (
    <div className="min-h-screen bg-[#14121c] text-[#e6e0ee] pb-28">
      <Header title="Extrair Músicas do Dispositivo" />

      <main className="px-4 space-y-4 pt-3">
        {/* Device Extraction Hub */}
        <div
          className="relative p-5 rounded-3xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center gap-3 border-[#7c4dff]/40 bg-[#23202e]"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#7c4dff]/20 flex items-center justify-center text-[#cdbdff]">
            <span className="material-symbols-outlined text-[32px]">smartphone</span>
          </div>

          <div>
            <h3 className="text-base font-bold text-white">Extrair Músicas do Aparelho</h3>
            <p className="text-xs text-[#cac3d8] mt-1 max-w-xs">
              O aplicativo irá varrer seu celular em busca de arquivos MP3, AAC, FLAC, WAV e OGG.
            </p>
          </div>

          <button
            onClick={scanNativeDevice}
            disabled={isExtracting}
            className="w-full flex items-center justify-center gap-2 py-3.5 mt-2 bg-[#7c4dff] text-white rounded-xl text-sm font-bold active:scale-98 transition-all shadow-lg shadow-[#7c4dff]/25"
          >
            <span className="material-symbols-outlined text-[20px]">search_check</span>
            <span>Escanear Músicas do Aparelho</span>
          </button>
        </div>

        {/* Extraction Progress Indicator */}
        {isExtracting && (
          <div className="p-4 bg-[#2b2833] border border-[#7c4dff]/50 rounded-2xl space-y-2 animate-pulse">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-[#cdbdff] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                Extraindo músicas do dispositivo...
              </span>
              {extractionProgress && (
                <span className="text-white">
                  {extractionProgress.current} / {extractionProgress.total}
                </span>
              )}
            </div>
            {extractionProgress && (
              <p className="text-[11px] text-[#cac3d8] truncate font-mono">
                {extractionProgress.filename}
              </p>
            )}
            <div className="w-full bg-[#14121c] rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#7c4dff] h-full transition-all duration-300"
                style={{
                  width: extractionProgress
                    ? `${(extractionProgress.current / extractionProgress.total) * 100}%`
                    : '100%',
                }}
              ></div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#cac3d8] text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar nas músicas encontradas..."
            className="w-full h-11 bg-[#2b2833] border border-[#494455]/30 rounded-xl pl-11 pr-4 text-sm text-white placeholder-[#cac3d8]/50 focus:outline-none focus:border-[#7c4dff]"
          />
        </div>

        {/* Scan Info & Controls */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#cac3d8] font-semibold">
            {selectedIds.length} músicas selecionadas ({filtered.length} no total)
          </span>
          <button
            onClick={toggleSelectAll}
            className="text-xs text-[#cdbdff] font-bold hover:underline"
          >
            {allSelected ? 'Desmarcar tudo' : 'Selecionar tudo'}
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center justify-between p-3 bg-[#1d1a24] rounded-xl cursor-pointer">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#cdbdff]">cloud_off</span>
              <span className="text-sm font-medium text-white">Apenas não enviadas para Nuvem</span>
            </div>
            <input
              type="checkbox"
              checked={filterUnimportedOnly}
              onChange={(e) => setFilterUnimportedOnly(e.target.checked)}
              className="w-5 h-5 rounded accent-[#7c4dff]"
            />
          </label>
        </div>

        {/* Songs List */}
        <div className="space-y-[5px]">
          {filtered.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <span className="material-symbols-outlined text-4xl text-[#494455]">
                library_music
              </span>
              <p className="text-sm text-[#cac3d8]">Nenhuma música local encontrada.</p>
              <p className="text-xs text-[#cac3d8]/70">Use os botões acima para extrair áudios do seu celular ou PC.</p>
            </div>
          ) : (
            filtered.map((song) => {
              const isSelected = selectedIds.includes(song.id);
              return (
                <div
                  key={song.id}
                  onClick={() => toggleSelectSong(song.id)}
                  className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-colors border ${
                    isSelected
                      ? 'bg-[#2b2833] border-[#7c4dff]/50'
                      : 'bg-[#2a2a2a] border-[#494455]/15'
                  }`}
                >
                  <img
                    src={song.coverUrl}
                    alt={song.title}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-white truncate">{song.title}</h3>
                    <p className="text-xs text-[#cac3d8] truncate">
                      {song.artist} • <span className="text-[#cdbdff]">{song.format}</span>
                    </p>
                  </div>
                  <div className="text-xs text-[#cac3d8] font-mono mr-1">
                    {song.durationFormatted}
                  </div>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelectSong(song.id)}
                    className="w-5 h-5 rounded accent-[#7c4dff]"
                  />
                </div>
              );
            })
          )}
        </div>
      </main>

      {/* Floating Import Action Bar */}
      <div className="fixed bottom-0 left-0 w-full z-40 px-4 pb-8 pt-4 bg-gradient-to-t from-[#14121c] via-[#14121c]/95 to-transparent">
        <button
          onClick={handleStartImport}
          className="w-full h-14 bg-[#7c4dff] text-[#fcf6ff] font-bold text-base rounded-2xl shadow-xl shadow-[#7c4dff]/30 active:scale-98 transition-all hover:brightness-110 flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">cloud_upload</span>
          <span>Sincronizar {selectedIds.length} Músicas na Nuvem</span>
        </button>
      </div>
    </div>
  );
};

