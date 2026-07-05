import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';

export const CategoryModal: React.FC = () => {
  const { activeCategoryModal, closeCategoryModal, setScreen, showToast, deviceStorage } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isScanning, setIsScanning] = useState(false);

  if (!activeCategoryModal) return null;

  const getCategoryDetails = () => {
    switch (activeCategoryModal) {
      case 'Transferências':
        return {
          icon: 'download',
          color: 'text-[#29b6f6]',
          size: `${deviceStorage.downloadsMB} MB`,
          path: '/storage/emulated/0/Download',
          types: 'PDFs, ZIPs, APKs, MP3s baixados',
          accept: '*',
        };
      case 'Imagens':
        return {
          icon: 'image',
          color: 'text-[#ab47bc]',
          size: `${deviceStorage.imagesMB} MB`,
          path: '/storage/emulated/0/DCIM/Camera',
          types: 'JPG, PNG, WEBP, Screenshots',
          accept: 'image/*',
        };
      case 'Vídeos':
        return {
          icon: 'movie',
          color: 'text-[#ef5350]',
          size: `${deviceStorage.videosGB} GB`,
          path: '/storage/emulated/0/Movies',
          types: 'MP4, MKV, AVI, Gravações de tela',
          accept: 'video/*',
        };
      case 'Áudio':
        return {
          icon: 'music_note',
          color: 'text-[#7c4dff]',
          size: `${deviceStorage.audioMB} MB`,
          path: '/storage/emulated/0/Music',
          types: 'MP3, FLAC, M4A, WAV, WhatsApp Audio',
          accept: 'audio/*',
        };
      case 'Documentos':
        return {
          icon: 'description',
          color: 'text-[#ffca28]',
          size: `${deviceStorage.docsMB} B`,
          path: '/storage/emulated/0/Documents',
          types: 'PDF, DOCX, TXT, EPUB',
          accept: '.pdf,.doc,.docx,.txt',
        };
      case 'Apps':
        return {
          icon: 'apps',
          color: 'text-[#66bb6a]',
          size: `${deviceStorage.appsGB} GB`,
          path: '/data/app (Sistema do Dispositivo)',
          types: 'Aplicativos instalados e arquivos de dados',
          accept: '.apk',
        };
      default:
        return {
          icon: 'folder',
          color: 'text-[#7c4dff]',
          size: `${deviceStorage.usedGB} GB`,
          path: '/storage/emulated/0',
          types: 'Todos os arquivos do armazenamento interno',
          accept: '*',
        };
    }
  };

  const details = getCategoryDetails();

  const handleSelectFiles = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const count = e.target.files.length;
      showToast(`${count} arquivo(s) selecionado(s) da pasta ${activeCategoryModal}!`);
      closeCategoryModal();
      if (activeCategoryModal === 'Áudio') {
        setScreen('import');
      }
    }
  };

  const handleScanDirectory = () => {
    setIsScanning(true);
    showToast(`Escaneando pasta ${details.path}...`);
    setTimeout(() => {
      setIsScanning(false);
      showToast(`Varredura concluída: 12 arquivos encontrados em ${activeCategoryModal}!`);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-sm bg-[#1e2025] border border-white/10 rounded-3xl p-5 shadow-2xl space-y-4 text-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${details.color}`}>
              <span className="material-symbols-outlined text-[24px]">{details.icon}</span>
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">{activeCategoryModal}</h3>
              <p className="text-xs text-[#cac3d8]">{details.size} usado</p>
            </div>
          </div>
          <button
            onClick={closeCategoryModal}
            className="w-8 h-8 rounded-full bg-white/5 text-[#cac3d8] hover:text-white flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Directory Info */}
        <div className="bg-[#141518] rounded-2xl p-3 border border-white/5 space-y-1.5 text-xs">
          <div className="flex items-center gap-2 text-[#cdbdff]">
            <span className="material-symbols-outlined text-[16px]">folder</span>
            <span className="font-mono truncate">{details.path}</span>
          </div>
          <p className="text-[#cac3d8] text-[11px]">{details.types}</p>
        </div>

        {/* Action Options */}
        <div className="space-y-2">
          <button
            onClick={handleSelectFiles}
            className="w-full py-3 px-4 bg-[#7c4dff] hover:bg-[#651fff] text-white font-bold text-xs rounded-2xl shadow-lg shadow-[#7c4dff]/25 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">file_open</span>
            <span>Navegar & Selecionar Arquivos do Celular</span>
          </button>

          <button
            onClick={handleScanDirectory}
            disabled={isScanning}
            className="w-full py-2.5 px-4 bg-[#2b2e36] hover:bg-[#343842] text-[#cdbdff] font-semibold text-xs rounded-2xl border border-white/10 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span className={`material-symbols-outlined text-[18px] ${isScanning ? 'animate-spin' : ''}`}>
              {isScanning ? 'sync' : 'search'}
            </span>
            <span>{isScanning ? 'Escaneando...' : 'Escanear Pasta Automaticamente'}</span>
          </button>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={details.accept}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};
