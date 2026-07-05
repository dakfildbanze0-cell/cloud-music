import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { MiniPlayer } from '../components/MiniPlayer';

export const ProfileScreen: React.FC = () => {
  const { user, updateProfile, setScreen, showToast } = useApp();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatarUrl, setAvatarUrl] = useState(
    user?.avatarUrl ||
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAMZgXj8f96akVN5CiFaDHA5zhLzojah62MLCg2vYlQ3LWO5EpbsRamDYlOpSqgXLyd2M30O_Gxzhjkk1A3xn0XMeixQNOaHSbEyXgj5y7Vj7yHJ1JwqCPm4KpJWEn_0MRye8zkasaF9A3s8NZXMDY_FuhKweswkLv6OITABsOONMMi6o1j-gkxplMb1aJlH27JKJ35p_9fsCXHN_3xSAar2lb_kFalb6oKiDxcBvE-tw5GgGKl2-auJA'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, avatarUrl });
    showToast('Perfil atualizado com sucesso!');
    setScreen('settings');
  };

  return (
    <div className="min-h-screen bg-[#14121c] text-[#e6e0ee] pb-32">
      <Header title="Perfil do Usuário" showBack onBack={() => setScreen('settings')} />

      <main className="px-4 space-y-5 pt-3 max-w-md mx-auto">
        {/* Avatar Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-[#7c4dff] shadow-2xl">
            <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{user?.name}</h2>
            <p className="text-xs text-[#cac3d8]">{user?.email}</p>
            <p className="text-[10px] text-[#cdbdff] mt-1 font-semibold">
              Membro desde 12 de Maio de 2024
            </p>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-[#2a2a2a] p-4 rounded-2xl border border-[#494455]/20 shadow-md">
          <h3 className="text-xs font-bold text-[#cac3d8] uppercase tracking-wider">
            Informações Pessoais
          </h3>

          <div>
            <label className="block text-xs font-semibold text-[#cac3d8] mb-1">Nome</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-4 bg-[#1d1a24] border border-[#494455] rounded-xl text-sm text-white focus:outline-none focus:border-[#7c4dff]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#cac3d8] mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-4 bg-[#1d1a24] border border-[#494455] rounded-xl text-sm text-white focus:outline-none focus:border-[#7c4dff]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#cac3d8] mb-1">
              URL da Foto de Perfil
            </label>
            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full h-11 px-4 bg-[#1d1a24] border border-[#494455] rounded-xl text-xs text-white focus:outline-none focus:border-[#7c4dff]"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-[#7c4dff] text-[#fcf6ff] font-bold text-sm rounded-xl shadow-lg active:scale-98 transition-all hover:brightness-110 mt-2"
          >
            Salvar Alterações
          </button>
        </form>
      </main>

      <MiniPlayer />
      <BottomNav />
    </div>
  );
};
