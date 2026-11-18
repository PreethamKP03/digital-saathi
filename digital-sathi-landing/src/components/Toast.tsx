import React from 'react';
import { Info, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 flex max-w-sm items-center gap-3 rounded-2xl border border-[#145BFF]/20 bg-[#0B1B3B] px-4 py-3.5 text-sm text-white shadow-2xl"
    >
      <Info className="h-5 w-5 shrink-0 text-sky-400" aria-hidden="true" />
      <p className="text-xs font-medium leading-relaxed text-slate-100">{message}</p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Close notification"
        className="ml-1 shrink-0 rounded-lg p-1 text-slate-400 transition hover:bg-white/10 hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
