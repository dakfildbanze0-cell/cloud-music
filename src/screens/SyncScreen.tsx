import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { MiniPlayer } from '../components/MiniPlayer';

export const SyncScreen: React.FC = () => {
  const { syncStatus, songs, setScreen, syncNow, isOfflineMode, toggleOfflineMode } =
    useApp();
  const [isSyncingLocal, setIsSyncingLocal] = useState(false);

  const uploadedSongs = songs.filter((s) => s.isUploaded);

  const handleManualSync = () => {
    setIsSyncingLocal(true);
    syncNow();
    setTimeout(() => {
      setIsSyncingLocal(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#14121c] text-[#e6e0ee] pb-32">
      <Header title="Status da Sincronização" showBack onBack={() => setScreen('home')} />

      <main className="px-4 space-y-4 pt-3 max-w-md mx-auto">
        {/* Status Hero Card */}
        <div className="bg-[#2a2a2a] p-5 rounded-3xl border border-[#494455]/30 shadow-xl space-y-4 text-center relative overflow-hidden">
          <div className="ambient-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

          <div className="w-20 h-20 rounded-full bg-[#7c4dff]/20 border border-[#7c4dff] flex items-center justify-center mx-auto text-[#7c4dff]">
            <span
              className={`material-symbols-outlined text-[42px] ${
                isSyncingLocal ? 'animate-spin' : ''
              }`}
            >
              {isOfflineMode ? 'cloud_off' : isSyncingLocal ? 'sync' : 'cloud_done'}
            </span>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">
              {isOfflineMode
                ? 'Modo Offline Ativo'
                : isSyncingLocal
                ? 'Sincronizando com o Supabase...'
                : 'Sua biblioteca está sincronizada!'}
            </h2>
            <p className="text-xs text-[#cac3d8] mt-1">
              Última sincronização realizada {syncStatus.lastSyncFormatted}
            </p>
          </div>

          <button
            onClick={handleManualSync}
            disabled={isSyncingLocal || isOfflineMode}
            className="w-full h-12 bg-[#7c4dff] disabled:opacity-50 text-[#fcf6ff] font-bold text-sm rounded-2xl shadow-lg active:scale-98 transition-all hover:brightness-110 flex items-center justify-center gap-2"
          >
            <span className={`material-symbols-outlined ${isSyncingLocal ? 'animate-spin' : ''}`}>
              sync
            </span>
            <span>{isSyncingLocal ? 'Sincronizando...' : 'Sincronizar Agora'}</span>
          </button>
        </div>

        {/* Offline Toggle */}
        <div className="bg-[#2a2a2a] p-4 rounded-2xl border border-[#494455]/20 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-white">Modo Offline</h3>
            <p className="text-xs text-[#cac3d8]">Desativa a conexão de rede do app</p>
          </div>
          <input
            type="checkbox"
            checked={isOfflineMode}
            onChange={toggleOfflineMode}
            className="w-5 h-5 accent-[#7c4dff] rounded"
          />
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#2a2a2a] p-4 rounded-2xl border border-[#494455]/20 space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#cac3d8] tracking-wider">
              Músicas na Nuvem
            </span>
            <p className="text-xl font-bold text-white">
              {uploadedSongs.length} / {songs.length}
            </p>
          </div>

          <div className="bg-[#2a2a2a] p-4 rounded-2xl border border-[#494455]/20 space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#cac3d8] tracking-wider">
              Banco de Dados
            </span>
            <p className="text-xl font-bold text-[#cdbdff]">Supabase SQL</p>
          </div>
        </div>

        {/* Sync Logs */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-[#cac3d8] uppercase tracking-wider">
            Histórico de Sincronização
          </h3>
          <div className="bg-[#2a2a2a] rounded-2xl border border-[#494455]/20 divide-y divide-[#36333e]">
            {[
              { text: 'Backup automático de 12 músicas concluído', time: 'Há 2 min' },
              { text: 'Playlist "Favoritas do Verão" sincronizada', time: 'Há 1 hora' },
              { text: 'Login em um novo dispositivo reconhecido', time: 'Ontem às 18:30' },
              { text: 'Conexão segura estabelecida com Supabase', time: '12 de Maio' },
            ].map((log, i) => (
              <div key={i} className="p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#7c4dff] text-[18px]">
                    check_circle
                  </span>
                  <span className="text-white font-medium">{log.text}</span>
                </div>
                <span className="text-[#cac3d8] font-mono text-[10px]">{log.time}</span>
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
