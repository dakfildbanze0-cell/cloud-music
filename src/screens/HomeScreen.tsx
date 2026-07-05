import React from 'react';
import { useApp } from '../context/AppContext';
import { useAudio } from '../context/AudioContext';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { MiniPlayer } from '../components/MiniPlayer';

export const HomeScreen: React.FC = () => {
  const {
    deviceStorage,
    openCategoryModal,
    openPermissionModal,
    hasGrantedPermissions,
    scanRealStorage,
    setScreen,
    showToast,
  } = useApp();

  const { currentSong } = useAudio();

  return (
    <div className="min-h-screen bg-[#111215] text-[#e3e2e6] pb-36 font-sans">
      {/* Header */}
      <Header title="Arquivos & Mídia" />

      <main className="px-4 space-y-6 pt-3">
        {/* Permission / Memory Bar Notice if not granted or scan trigger */}
        {!hasGrantedPermissions && (
          <div
            onClick={openPermissionModal}
            className="p-3.5 bg-gradient-to-r from-[#7c4dff]/20 to-[#651fff]/20 border border-[#7c4dff]/40 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-[#7c4dff]/30 transition-all active:scale-98"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#7c4dff] text-white flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[20px]">security</span>
              </div>
              <div>
                <p className="text-xs font-extrabold text-white">Carregar Memória do Celular</p>
                <p className="text-[11px] text-[#cac3d8]">Clique para conceder permissão de arquivos reais</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#cdbdff]">chevron_right</span>
          </div>
        )}

        {/* Top Horizontal Recent Cards Bar (Screenshots, Status, Video) */}
        <section className="space-y-2">
          <div className="flex overflow-x-auto gap-3 hide-scrollbar -mx-4 px-4 pb-1">
            {/* Card 1: Screenshot Preview Card */}
            <div className="flex-none w-52 bg-[#1c1d22] border border-white/5 rounded-3xl p-3 relative space-y-2 group cursor-pointer hover:bg-[#23252a] transition-all">
              <div className="relative w-full h-32 rounded-2xl overflow-hidden bg-[#282a30]">
                <img
                  src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80"
                  alt="Screenshot"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-[16px]">more_vert</span>
                </div>
                <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-black/70 backdrop-blur-md text-[10px] text-white font-mono">
                  <span className="material-symbols-outlined text-[12px] text-[#29b6f6]">folder</span>
                  <span>Screenshots</span>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-white truncate">Screenshot_202607...</h4>
                <p className="text-[11px] text-[#cac3d8]">Screenshots • 1.2 MB</p>
              </div>
            </div>

            {/* Card 2: Recent Video Media Card */}
            <div className="flex-none w-48 bg-[#1c1d22] border border-white/5 rounded-3xl p-3 relative space-y-2 cursor-pointer hover:bg-[#23252a] transition-all">
              <div className="relative w-full h-32 rounded-2xl overflow-hidden bg-[#282a30]">
                <img
                  src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&auto=format&fit=crop&q=80"
                  alt="Vídeo Recente"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-[24px]">play_arrow</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-white truncate">Vídeo_Câmera.mp4</h4>
                <p className="text-[11px] text-[#cac3d8]">Vídeos • 24.5 MB</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Categorias */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white tracking-tight">Categorias</h2>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Transferências */}
            <div
              onClick={() => openCategoryModal('Transferências')}
              className="bg-[#1c1d22] hover:bg-[#24262c] active:scale-98 transition-all p-4 rounded-2xl border border-white/5 flex items-center gap-3.5 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[22px]">download</span>
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-white truncate">Transferências</h3>
                <p className="text-xs text-[#cac3d8] font-medium">{deviceStorage.downloadsMB} MB</p>
              </div>
            </div>

            {/* Imagens */}
            <div
              onClick={() => openCategoryModal('Imagens')}
              className="bg-[#1c1d22] hover:bg-[#24262c] active:scale-98 transition-all p-4 rounded-2xl border border-white/5 flex items-center gap-3.5 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[22px]">image</span>
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-white truncate">Imagens</h3>
                <p className="text-xs text-[#cac3d8] font-medium">{deviceStorage.imagesMB} MB</p>
              </div>
            </div>

            {/* Vídeos */}
            <div
              onClick={() => openCategoryModal('Vídeos')}
              className="bg-[#1c1d22] hover:bg-[#24262c] active:scale-98 transition-all p-4 rounded-2xl border border-white/5 flex items-center gap-3.5 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[22px]">movie</span>
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-white truncate">Vídeos</h3>
                <p className="text-xs text-[#cac3d8] font-medium">{deviceStorage.videosGB} GB</p>
              </div>
            </div>

            {/* Áudio */}
            <div
              onClick={() => openCategoryModal('Áudio')}
              className="bg-[#1c1d22] hover:bg-[#24262c] active:scale-98 transition-all p-4 rounded-2xl border border-white/5 flex items-center gap-3.5 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[22px]">music_note</span>
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-white truncate">Áudio</h3>
                <p className="text-xs text-[#cac3d8] font-medium">{deviceStorage.audioMB} MB</p>
              </div>
            </div>

            {/* Documentos */}
            <div
              onClick={() => openCategoryModal('Documentos')}
              className="bg-[#1c1d22] hover:bg-[#24262c] active:scale-98 transition-all p-4 rounded-2xl border border-white/5 flex items-center gap-3.5 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[22px]">description</span>
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-white truncate">Documentos</h3>
                <p className="text-xs text-[#cac3d8] font-medium">{deviceStorage.docsMB} B</p>
              </div>
            </div>

            {/* Apps */}
            <div
              onClick={() => openCategoryModal('Apps')}
              className="bg-[#1c1d22] hover:bg-[#24262c] active:scale-98 transition-all p-4 rounded-2xl border border-white/5 flex items-center gap-3.5 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[22px]">grid_view</span>
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-white truncate">Apps</h3>
                <p className="text-xs text-[#cac3d8] font-medium">{deviceStorage.appsGB} GB</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Coleções */}
        <section className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white tracking-tight">Coleções</h2>
            <button className="text-[#cac3d8] hover:text-white p-1">
              <span className="material-symbols-outlined text-[20px]">more_vert</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Marcado com estrela */}
            <div
              onClick={() => setScreen('favorites')}
              className="bg-[#1c1d22] hover:bg-[#24262c] active:scale-98 transition-all p-4 rounded-2xl border border-white/5 flex items-center gap-3.5 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[22px]">star</span>
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-white truncate">Marcado com estrela</h3>
              </div>
            </div>

            {/* Pasta segura */}
            <div
              onClick={() => showToast('Pasta Segura protegida por criptografia')}
              className="bg-[#1c1d22] hover:bg-[#24262c] active:scale-98 transition-all p-4 rounded-2xl border border-white/5 flex items-center gap-3.5 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[22px]">lock</span>
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-white truncate">Pasta segura</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Todo o armazenamento */}
        <section className="space-y-3 pt-1">
          <h2 className="text-lg font-bold text-white tracking-tight">Todo o armazenamento</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Card 1: Armazenamento Interno */}
            <div
              onClick={() => openCategoryModal('Armazenamento Interno')}
              className="bg-[#1c1d22] hover:bg-[#24262c] active:scale-98 transition-all p-4 rounded-2xl border border-white/5 flex items-center gap-3.5 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#7c4dff]/20 text-[#cdbdff] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[28px]">smartphone</span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-extrabold text-white truncate">Armazenamento interno</h3>
                <p className="text-xs text-[#cac3d8] font-medium mt-0.5">
                  {deviceStorage.freeGB} GB livre (de {deviceStorage.totalGB} GB)
                </p>
                {/* Progress bar */}
                <div className="w-full bg-[#282a30] h-1.5 rounded-full overflow-hidden mt-2">
                  <div
                    className="bg-[#7c4dff] h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, (deviceStorage.usedGB / deviceStorage.totalGB) * 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Card 2: Outro Armazenamento / Cartão SD */}
            <div
              onClick={() => setScreen('import')}
              className="bg-[#1c1d22] hover:bg-[#24262c] active:scale-98 transition-all p-4 rounded-2xl border border-white/5 flex items-center gap-3.5 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 text-white flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[28px]">sd_card</span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-extrabold text-white truncate">Outro armazenamento</h3>
                <p className="text-xs text-[#cac3d8] font-medium mt-0.5">
                  Procure no armazenamento...
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Center Action Bar / Pill */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 p-1.5 rounded-full bg-[#d0bcff] text-[#381e72] shadow-2xl shadow-black/80 border border-white/20 backdrop-blur-lg">
        <button
          onClick={() => {
            scanRealStorage();
            showToast('Memória real do celular atualizada!');
          }}
          className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#b69df8] active:scale-90 transition-all"
          title="Atualizar Memória Real"
        >
          <span className="material-symbols-outlined text-[24px]">sync</span>
        </button>
        <button
          onClick={() => setScreen('import')}
          className="w-12 h-12 rounded-full bg-[#381e72] text-white flex items-center justify-center hover:bg-[#4a2896] active:scale-90 transition-all shadow-md"
          title="Escanear & Extrair Músicas"
        >
          <span className="material-symbols-outlined text-[24px]">center_focus_weak</span>
        </button>
      </div>

      {/* Mini Player & Bottom Navigation */}
      <MiniPlayer />
      <BottomNav />
    </div>
  );
};
