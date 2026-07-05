import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const LoginScreen: React.FC = () => {
  const { login, setScreen, showToast } = useApp();
  const [email, setEmail] = useState('usuario@email.com');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Por favor, digite seu e-mail');
      return;
    }
    login(email, password);
  };

  const handleForgotPassword = () => {
    showToast('Instruções de redefinição de senha enviadas para seu e-mail.');
  };

  return (
    <div className="min-h-screen bg-[#14121c] text-[#e6e0ee] flex flex-col items-center justify-center px-5 py-8 relative">
      {/* Background Glow */}
      <div className="ambient-glow top-1/4 left-1/2 -translate-x-1/2"></div>

      <div className="relative z-10 w-full max-w-sm space-y-6">
        {/* Logo and Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-20 h-20 rounded-2xl bg-[#7c4dff] flex items-center justify-center shadow-xl shadow-[#7c4dff]/30 transform transition-transform hover:scale-105 cursor-pointer">
            <span className="material-symbols-outlined text-[42px] text-[#fcf6ff] icon-filled">
              music_note
            </span>
          </div>
          <h1 className="font-bold text-2xl text-white mt-3">Cloud Music</h1>
          <p className="text-xs text-[#cac3d8] max-w-[260px]">
            Guarde suas músicas na nuvem Supabase e acesse de qualquer lugar.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Email Input */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#948ea1] text-[20px]">
              mail
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full h-13 pl-12 pr-4 bg-[#211e28] border border-[#494455]/40 rounded-xl text-sm text-white placeholder-[#cac3d8]/50 focus:outline-none focus:border-[#7c4dff] transition-all"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#948ea1] text-[20px]">
              lock
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className="w-full h-13 pl-12 pr-12 bg-[#211e28] border border-[#494455]/40 rounded-xl text-sm text-white placeholder-[#cac3d8]/50 focus:outline-none focus:border-[#7c4dff] transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#948ea1] hover:text-white"
            >
              <span className="material-symbols-outlined text-[20px]">
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end pt-0.5">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-xs font-semibold text-[#cdbdff] hover:underline"
            >
              Esqueceu a senha?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-13 bg-[#7c4dff] text-[#fcf6ff] font-bold text-base rounded-xl shadow-lg shadow-[#7c4dff]/25 hover:brightness-110 active:scale-98 transition-all flex items-center justify-center mt-2"
          >
            Entrar
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center space-x-3 py-1">
          <div className="flex-1 h-[1px] bg-[#494455]/40"></div>
          <span className="text-xs text-[#cac3d8] uppercase font-semibold tracking-wider">ou</span>
          <div className="flex-1 h-[1px] bg-[#494455]/40"></div>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => login('google.user@gmail.com', 'google')}
            className="w-full h-12 bg-[#2b2833] border border-[#494455]/40 rounded-xl flex items-center justify-center space-x-3 hover:bg-[#36333e] transition-colors active:scale-98 text-xs font-semibold text-white"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUjiPloFsTsHhsO3uGvarVHwRbpWFaGP8diuMZTUj18urGlXqCcWEukDtZs05IEzGk4gkEOo9SsnOWOgJbJct1NeJKNl4X2qmjjKcBFzHlsnJAFYk6xBV-EAsP5PGhdj_wktXNk6zqC-yy6CznvKDlJY5PCbAxFaFY-AH4XL1HAR8VlzpALZuGddzYEUGMgVTned_Bc4UJ95zRkEQ9tsUyWkl4G_Dkx6h2bjo_mfG1639N6SSr9rhUnQ"
              alt="Google Logo"
              className="w-5 h-5 object-contain"
            />
            <span>Entrar com Google</span>
          </button>

          <button
            onClick={() => login('apple.user@icloud.com', 'apple')}
            className="w-full h-12 bg-[#2b2833] border border-[#494455]/40 rounded-xl flex items-center justify-center space-x-3 hover:bg-[#36333e] transition-colors active:scale-98 text-xs font-semibold text-white"
          >
            <span className="material-symbols-outlined text-[20px] text-white">apps</span>
            <span>Entrar com Apple</span>
          </button>

          <button
            onClick={() => login('guest@cloudmusic.app', 'guest')}
            className="w-full h-10 text-xs text-[#cac3d8] hover:text-white font-medium transition-colors"
          >
            Entrar como Anônimo
          </button>
        </div>

        {/* Register Redirect */}
        <div className="text-center pt-2">
          <p className="text-xs text-[#cac3d8]">
            Não tem conta?{' '}
            <button
              onClick={() => setScreen('register')}
              className="text-[#cdbdff] font-bold hover:underline ml-1"
            >
              Cadastre-se
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
