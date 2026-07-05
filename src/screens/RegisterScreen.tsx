import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const RegisterScreen: React.FC = () => {
  const { register, setScreen, showToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const AVATAR_OPTIONS = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAMZgXj8f96akVN5CiFaDHA5zhLzojah62MLCg2vYlQ3LWO5EpbsRamDYlOpSqgXLyd2M30O_Gxzhjkk1A3xn0XMeixQNOaHSbEyXgj5y7Vj7yHJ1JwqCPm4KpJWEn_0MRye8zkasaF9A3s8NZXMDY_FuhKweswkLv6OITABsOONMMi6o1j-gkxplMb1aJlH27JKJ35p_9fsCXHN_3xSAar2lb_kFalb6oKiDxcBvE-tw5GgGKl2-auJA',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCmuMxddc3p7R_ebLh6FcqYRcxO11bSR2QQ5q2wvd3i3Hxw_RVAXQP7Qkrv2v_VVlSdD-sQEF9HlgRzBEMBClL2fD3g-heBZklgRx6t34ezPDx-JB1-CamXychKEEPciLd5heWjOUx8jYKKGnsLo9cYsPLCXinhRtadyKIlXPg3-v01EYOnk49_-t4NjaD3RLiCgA1FEFcvArtbY7M4ayhpFfBnFRx-uzdSnPzQH94S6dp0zd8m3cyYEQ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ0nooJgeQHRjCJJBVTUQTcCmqQOHjWeXEc4RSQFTSvMm3e_yUX6xKqNbhj_z6sJKju4BFli2TA4XqKZ-LEPtKlnIw5KRcaqM9pEnCKrWetKdW_6-J6OE2nna482uwrPylVZF5uFXOn5HhPXZ3qdwsuSWgZ3MUFRW8wnwUv_5NOSg_YkOEVeEYFq_SrKxouGwcmqD3CCnzpKbJmAjf_avjxQIwU5-vWYpZstuS0vtgKgnPld9cfmoCQw',
  ];

  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      showToast('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    if (password !== confirmPassword) {
      showToast('As senhas não coincidem!');
      return;
    }

    register(name, email, password, selectedAvatar);
  };

  return (
    <div className="min-h-screen bg-[#14121c] text-[#e6e0ee] flex flex-col items-center justify-center px-5 py-8 relative">
      <div className="ambient-glow top-1/4 left-1/2 -translate-x-1/2"></div>

      <div className="relative z-10 w-full max-w-sm space-y-5">
        {/* Back Button and Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setScreen('login')}
            className="w-10 h-10 rounded-full bg-[#211e28] flex items-center justify-center text-[#e6e0ee] active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-bold text-2xl text-white">Criar Conta</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Avatar Selection */}
          <div>
            <label className="block text-xs font-semibold text-[#cac3d8] mb-2">
              Escolha sua Foto de Perfil
            </label>
            <div className="flex items-center gap-4">
              {AVATAR_OPTIONS.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedAvatar(img)}
                  className={`relative w-14 h-14 rounded-full overflow-hidden cursor-pointer border-2 transition-all ${
                    selectedAvatar === img
                      ? 'border-[#7c4dff] scale-105 shadow-md shadow-[#7c4dff]/40'
                      : 'border-[#494455]/40 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Avatar" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Name Field */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#948ea1] text-[20px]">
              person
            </span>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome Completo"
              className="w-full h-12 pl-12 pr-4 bg-[#211e28] border border-[#494455]/40 rounded-xl text-sm text-white placeholder-[#cac3d8]/50 focus:outline-none focus:border-[#7c4dff]"
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#948ea1] text-[20px]">
              mail
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor Email"
              className="w-full h-12 pl-12 pr-4 bg-[#211e28] border border-[#494455]/40 rounded-xl text-sm text-white placeholder-[#cac3d8]/50 focus:outline-none focus:border-[#7c4dff]"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#948ea1] text-[20px]">
              lock
            </span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha de acesso"
              className="w-full h-12 pl-12 pr-4 bg-[#211e28] border border-[#494455]/40 rounded-xl text-sm text-white placeholder-[#cac3d8]/50 focus:outline-none focus:border-[#7c4dff]"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#948ea1] text-[20px]">
              lock_reset
            </span>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmar senha"
              className="w-full h-12 pl-12 pr-4 bg-[#211e28] border border-[#494455]/40 rounded-xl text-sm text-white placeholder-[#cac3d8]/50 focus:outline-none focus:border-[#7c4dff]"
            />
          </div>

          <button
            type="submit"
            className="w-full h-13 bg-[#7c4dff] text-[#fcf6ff] font-bold text-base rounded-xl shadow-lg shadow-[#7c4dff]/25 hover:brightness-110 active:scale-98 transition-all flex items-center justify-center mt-4"
          >
            Criar Conta no Supabase
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-[#cac3d8]">
            Já possui uma conta?{' '}
            <button
              onClick={() => setScreen('login')}
              className="text-[#cdbdff] font-bold hover:underline ml-1"
            >
              Fazer Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
