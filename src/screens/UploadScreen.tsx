import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';

export const UploadScreen: React.FC = () => {
  const { setScreen, showToast } = useApp();

  const [progress, setProgress] = useState(72);
  const [uploadedCount, setUploadedCount] = useState(167);
  const totalCount = 245;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            showToast('Sincronização com Supabase concluída com sucesso!');
            setScreen('library');
          }, 1000);
          return 100;
        }
        return prev + 1;
      });

      setUploadedCount((prev) => (prev < totalCount ? prev + 1 : totalCount));
    }, 250);

    return () => clearInterval(interval);
  }, [setScreen, showToast]);

  const handleCancel = () => {
    if (confirm('Tem certeza que deseja cancelar o envio? O progresso não salvo será pausado.')) {
      showToast('Upload para o Supabase pausado.');
      setScreen('home');
    }
  };

  return (
    <div className="min-h-screen bg-[#14121c] text-[#e6e0ee] flex flex-col justify-between pb-8">
      <Header title="Enviando para Nuvem" showBack onBack={handleCancel} />

      <main className="flex-1 flex flex-col items-center justify-center px-5 py-6 text-center relative">
        {/* Animated Orbs */}
        <div className="ambient-glow top-1/3 left-1/2 -translate-x-1/2"></div>

        {/* Central Cloud Icon */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-[#7c4dff]/20 rounded-full blur-2xl scale-125 animate-pulse"></div>
          <div className="w-32 h-32 rounded-full bg-[#2b2833] flex items-center justify-center border border-[#494455]/40 relative overflow-hidden shadow-2xl">
            <span className="material-symbols-outlined text-[64px] text-[#cdbdff] icon-filled">
              cloud_upload
            </span>
            <div
              className="absolute bottom-0 left-0 w-full bg-[#7c4dff]/30 transition-all duration-300"
              style={{ height: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Status Message */}
        <div className="space-y-1 mb-6">
          <h2 className="text-xl font-bold text-white">Sincronizando biblioteca</h2>
          <p className="text-xs text-[#cac3d8] animate-pulse">
            Não feche o app durante o processo
          </p>
        </div>

        {/* Progress Card */}
        <div className="w-full max-w-sm bg-[#211e28] p-4 rounded-2xl border border-[#494455]/40 shadow-xl space-y-4">
          <div className="flex justify-between items-end text-xs font-semibold">
            <span className="text-[#cdbdff]">{Math.floor(progress)}% Concluído</span>
            <span className="text-[#cac3d8]">
              {uploadedCount} de {totalCount}
            </span>
          </div>

          <div className="h-3 w-full bg-[#36333e] rounded-full overflow-hidden relative">
            <div
              className="h-full bg-[#7c4dff] rounded-full transition-all duration-300 shadow-[0_0_12px_#7c4dff]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2 text-left">
            <div className="bg-[#1d1a24] p-3 rounded-xl border border-[#494455]/20 space-y-0.5">
              <span className="text-[10px] uppercase tracking-wider text-[#cac3d8]/70 font-semibold">
                Velocidade
              </span>
              <p className="text-lg font-bold text-[#cdbdff]">2.4 MB/s</p>
            </div>
            <div className="bg-[#1d1a24] p-3 rounded-xl border border-[#494455]/20 space-y-0.5">
              <span className="text-[10px] uppercase tracking-wider text-[#cac3d8]/70 font-semibold">
                Restante
              </span>
              <p className="text-lg font-bold text-[#cdbdff]">
                00:{Math.max(0, 30 - Math.floor(progress / 3.3)).toString().padStart(2, '0')}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Cancel Action */}
      <div className="px-5 space-y-3">
        <button
          onClick={handleCancel}
          className="w-full h-13 rounded-2xl bg-[#36333e] border border-[#494455] text-white font-semibold text-sm active:scale-98 hover:bg-[#494455]/50 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
