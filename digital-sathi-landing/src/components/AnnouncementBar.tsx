import React from 'react';
import { ArrowRight, Sparkles, X } from 'lucide-react';

interface AnnouncementBarProps {
  visible: boolean;
  onDismiss: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ visible, onDismiss }) => {
  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Announcement"
      className="relative bg-gradient-to-r from-[#0B1B3B] via-[#145BFF] to-[#0F48D6] text-white"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex flex-1 flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide sm:text-sm">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-sky-200" aria-hidden="true" />
            <span>Bridge the Digital Divide – Empower Every Citizen with Digital Sathi!</span>
          </span>
          <a
            href="#features"
            className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            <span>Learn More</span>
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>

        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss announcement"
          className="shrink-0 rounded-lg p-1 text-white/80 transition hover:bg-white/15 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/60"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
