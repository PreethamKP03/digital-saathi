import React from 'react';
import { Compass } from 'lucide-react';

interface LogoProps {
  variant?: 'light' | 'dark';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'dark', showTagline = false }) => {
  const isLight = variant === 'light';

  return (
    <div className="inline-flex items-center gap-2.5 group select-none">
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#145BFF] to-[#0B3EC9] text-white shadow-md shadow-[#145BFF]/25 transition-transform duration-200 group-hover:scale-105">
        <Compass className="h-5 w-5 stroke-[2.25]" aria-hidden="true" />
        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-sky-400" />
      </div>
      <div className="flex flex-col">
        <span
          className={`font-display text-lg font-bold tracking-tight leading-none ${
            isLight ? 'text-white' : 'text-[#0B1B3B]'
          }`}
        >
          Digital <span className={isLight ? 'text-sky-300' : 'text-[#145BFF]'}>Sathi</span>
        </span>
        {showTagline && (
          <span
            className={`mt-1 text-[11px] font-medium ${
              isLight ? 'text-slate-300' : 'text-slate-500'
            }`}
          >
            Empowering Citizens. Building a Digital India.
          </span>
        )}
      </div>
    </div>
  );
};
