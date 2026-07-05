import React from 'react';
import { useApp } from '../context/AppContext';

export const PermissionModal: React.FC = () => {
  const {
    permissionModalOpen,
    grantPermissions,
    closePermissionModal,
    deviceStorage,
  } = useApp();

  if (!permissionModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-sm bg-[#1e2025] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-5 text-white">
        {/* Header Icon */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-16 h-16 rounded-2xl bg-[#7c4dff]/20 border border-[#7c4dff]/40 flex items-center justify-center text-[#cdbdff] shadow-lg shadow-[#7c4dff]/20">
            <span className="material-symbols-outlined text-[36px]">folder_shared</span>
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            Acesso ao Armazenamento
          </h2>
          <p className="text-xs text-[#cac3d8] leading-relaxed">
            Permita que o app leia e organize todas as suas músicas, documentos e arquivos do armazenamento interno do celular sem simulação.
          </p>
        </div>

        {/* Real Storage Estimate Badge */}
        <div className="bg-[#141518] rounded-2xl p-3.5 border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-[#cdbdff] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">smartphone</span>
              Memória Real Detectada
            </span>
            <span className="text-white font-bold">
              {deviceStorage.freeGB} GB livre de {deviceStorage.totalGB} GB
            </span>
          </div>

          <div className="w-full bg-[#2a2d33] h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#7c4dff] to-[#00e676] h-full rounded-full transition-all duration-700"
              style={{
                width: `${Math.min(100, (deviceStorage.usedGB / deviceStorage.totalGB) * 100)}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Permissions List */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#252830]">
            <span className="material-symbols-outlined text-[#cdbdff] text-[20px]">music_note</span>
            <div>
              <p className="font-semibold text-white">Áudios & Músicas MP3/FLAC</p>
              <p className="text-[11px] text-[#cac3d8]">Acesso direto às músicas locais do aparelho</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#252830]">
            <span className="material-symbols-outlined text-[#cdbdff] text-[20px]">description</span>
            <div>
              <p className="font-semibold text-white">Documentos & Downloads</p>
              <p className="text-[11px] text-[#cac3d8]">Extração de PDFs, TXT, arquivos da pasta Downloads</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#252830]">
            <span className="material-symbols-outlined text-[#cdbdff] text-[20px]">movie</span>
            <div>
              <p className="font-semibold text-white">Vídeos, Fotos & Mídia</p>
              <p className="text-[11px] text-[#cac3d8]">Acesso rápido às galerias e vídeos do dispositivo</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={() => grantPermissions()}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-[#7c4dff] to-[#651fff] text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-[#7c4dff]/30 active:scale-95 transition-all hover:brightness-110 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            <span>Conceder Permissões e Carregar</span>
          </button>

          <button
            onClick={() => closePermissionModal()}
            className="w-full py-2.5 text-xs font-bold text-[#cac3d8] hover:text-white transition-colors"
          >
            Agora Não
          </button>
        </div>
      </div>
    </div>
  );
};
