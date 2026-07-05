import React from 'react';

export const MobileFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#111215] text-[#e3e2e6] font-sans flex flex-col justify-between">
      <div className="w-full max-w-2xl mx-auto flex-1 flex flex-col min-h-screen relative">
        {children}
      </div>
    </div>
  );
};

