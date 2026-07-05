import React from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { MiniPlayer } from '../components/MiniPlayer';

export const SettingsScreen: React.FC = () => {
  const { user, settings, updateSettings, logout, setScreen, showToast } = useApp();

  const handleClearCache = () => {
    showToast('Cache local de 1.2 GB liberado com sucesso!');
  };

  return (
    <div className="min-h-screen bg-[#14121c] text-[#e6e0ee] pb-32">
      <Header title="Configurações" />

      <main className="px-4 space-y-4 pt-3">
        {/* Profile Card */}
        <div
          onClick={() => setScreen('profile')}
          className="bg-[#2a2a2a] p-4 rounded-2xl border border-[#494455]/30 flex items-center justify-between cursor-pointer hover:bg-[#323232] transition-colors shadow-md"
        >
          <div className="flex items-center gap-3">
            <img
              src={
                user?.avatarUrl ||
                'https://lh3.googleusercontent.com/aida-public/AB6AXuAMZgXj8f96akVN5CiFaDHA5zhLzojah62MLCg2vYlQ3LWO5EpbsRamDYlOpSqgXLyd2M30O_Gxzhjkk1A3xn0XMeixQNOaHSbEyXgj5y7Vj7yHJ1JwqCPm4KpJWEn_0MRye8zkasaF9A3s8NZXMDY_FuhKweswkLv6OITABsOONMMi6o1j-gkxplMb1aJlH27JKJ35p_9fsCXHN_3xSAar2lb_kFalb6oKiDxcBvE-tw5GgGKl2-auJA'
              }
              alt="Avatar"
              className="w-14 h-14 rounded-full object-cover border-2 border-[#7c4dff]"
            />
            <div>
              <h3 className="font-bold text-base text-white">{user?.name || 'Usuário'}</h3>
              <p className="text-xs text-[#cac3d8]">{user?.email || 'email@exemplo.com'}</p>
              <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-[#7c4dff]/20 text-[#cdbdff] text-[10px] font-bold uppercase tracking-wider">
                Plano VIP Supabase Nuvem
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#cac3d8]">chevron_right</span>
        </div>

        {/* Section: Geral */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-[#cac3d8] uppercase tracking-wider">Geral</h3>
          <div className="bg-[#2a2a2a] rounded-2xl border border-[#494455]/20 divide-y divide-[#36333e]">
            {/* Theme */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#cdbdff]">dark_mode</span>
                <div>
                  <p className="text-sm font-semibold text-white">Tema Visual</p>
                  <p className="text-xs text-[#cac3d8]">Aparência do aplicativo</p>
                </div>
              </div>
              <select
                value={settings.theme}
                onChange={(e) => updateSettings({ theme: e.target.value as any })}
                className="bg-[#1d1a24] text-xs font-semibold text-[#cdbdff] px-3 py-1.5 rounded-xl border border-[#494455] focus:outline-none"
              >
                <option value="dark">Escuro (#1E1E1E)</option>
                <option value="system">Sistema</option>
                <option value="light">Claro</option>
              </select>
            </div>

            {/* Audio Quality */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#cdbdff]">graphic_eq</span>
                <div>
                  <p className="text-sm font-semibold text-white">Qualidade do Áudio</p>
                  <p className="text-xs text-[#cac3d8]">Taxa de bits da reprodução</p>
                </div>
              </div>
              <select
                value={settings.audioQuality}
                onChange={(e) => updateSettings({ audioQuality: e.target.value as any })}
                className="bg-[#1d1a24] text-xs font-semibold text-[#cdbdff] px-3 py-1.5 rounded-xl border border-[#494455] focus:outline-none"
              >
                <option value="extreme">Extrema (320kbps)</option>
                <option value="high">Alta (256kbps)</option>
                <option value="normal">Normal (128kbps)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section: Sincronização & Backup */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-[#cac3d8] uppercase tracking-wider">
            Sincronização & Supabase Nuvem
          </h3>
          <div className="bg-[#2a2a2a] rounded-2xl border border-[#494455]/20 divide-y divide-[#36333e]">
            {/* Auto Download */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#cdbdff]">
                  download_for_offline
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">Download Automático</p>
                  <p className="text-xs text-[#cac3d8]">Baixar ao favoritar músicas</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.autoDownload}
                onChange={(e) => updateSettings({ autoDownload: e.target.checked })}
                className="w-5 h-5 accent-[#7c4dff] rounded"
              />
            </div>

            {/* Auto Backup */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#cdbdff]">cloud_sync</span>
                <div>
                  <p className="text-sm font-semibold text-white">Backup Automático</p>
                  <p className="text-xs text-[#cac3d8]">Sincronizar novos arquivos locais</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.autoBackup}
                onChange={(e) => updateSettings({ autoBackup: e.target.checked })}
                className="w-5 h-5 accent-[#7c4dff] rounded"
              />
            </div>

            {/* WiFi Only */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#cdbdff]">wifi</span>
                <div>
                  <p className="text-sm font-semibold text-white">Apenas Wi-Fi</p>
                  <p className="text-xs text-[#cac3d8]">Economizar dados móveis</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.wifiOnlySync}
                onChange={(e) => updateSettings({ wifiOnlySync: e.target.checked })}
                className="w-5 h-5 accent-[#7c4dff] rounded"
              />
            </div>

            {/* Trigger Sync Screen */}
            <div
              onClick={() => setScreen('sync')}
              className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-[#323232]"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#cdbdff]">sync</span>
                <div>
                  <p className="text-sm font-semibold text-white">Painel de Sincronização</p>
                  <p className="text-xs text-[#cac3d8]">Verificar histórico e status da nuvem</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#cac3d8]">chevron_right</span>
            </div>
          </div>
        </div>

        {/* Section: Armazenamento */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-[#cac3d8] uppercase tracking-wider">
            Armazenamento Local & Cache
          </h3>
          <div className="bg-[#2a2a2a] p-4 rounded-2xl border border-[#494455]/20 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-white font-semibold">Espaço em uso</span>
              <span className="text-[#cac3d8]">
                {(user?.storageUsedGB ?? 12.4).toFixed(1)} GB de {user?.storageTotalGB ?? 50} GB
              </span>
            </div>
            <button
              onClick={handleClearCache}
              className="w-full h-11 bg-[#36333e] hover:bg-[#494455]/50 border border-[#494455] rounded-xl text-xs font-semibold text-[#e6e0ee] active:scale-98 transition-all"
            >
              Limpar Cache do Aplicativo (1.2 GB)
            </button>
          </div>
        </div>

        {/* Section: Logout */}
        <div className="pt-2">
          <button
            onClick={logout}
            className="w-full h-12 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-2xl text-red-400 font-bold text-sm active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span>Sair da Conta</span>
          </button>
        </div>
      </main>

      <MiniPlayer />
      <BottomNav />
    </div>
  );
};
