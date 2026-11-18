import React from 'react';
import { Smartphone, Download, Play } from 'lucide-react';

interface DownloadSectionProps {
  onStorePlaceholderClick: (storeName: string) => void;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({ onStorePlaceholderClick }) => {
  return (
    <section className="bg-white py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0B1B3B] via-[#103285] to-[#145BFF] px-6 py-14 text-white shadow-xl sm:px-12 sm:py-16 lg:px-16">
          {/* Decorative soft circles */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 left-1/3 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl"
          />

          <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="text-center lg:col-span-7 lg:text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-sky-200 backdrop-blur-sm">
                <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Mobile App Preview</span>
              </span>

              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Take Digital Sathi Wherever You Go
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-blue-100 sm:text-base lg:mx-0">
                Access service checklists, digital learning tutorials, and friendly citizen guidance
                right from your pocket. Mobile applications for Android and iOS are currently in
                preparation.
              </p>

              {/* Store Placeholder Buttons */}
              <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row lg:justify-start">
                <button
                  type="button"
                  onClick={() => onStorePlaceholderClick('Google Play')}
                  className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white px-5 py-3.5 text-left text-[#0B1B3B] shadow-lg transition hover:bg-blue-50 active:scale-[0.98] sm:w-auto"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#145BFF]">
                    <Play className="h-4 w-4 fill-[#145BFF]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      Placeholder • Coming Soon
                    </p>
                    <p className="font-display text-sm font-bold leading-tight text-[#0B1B3B]">
                      Google Play
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onStorePlaceholderClick('App Store')}
                  className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-white/25 bg-white/10 px-5 py-3.5 text-left text-white backdrop-blur-sm transition hover:bg-white/20 active:scale-[0.98] sm:w-auto"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white">
                    <Download className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-200">
                      Placeholder • Coming Soon
                    </p>
                    <p className="font-display text-sm font-bold leading-tight text-white">
                      App Store
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5">
              <div className="mx-auto max-w-sm rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-wider text-sky-200">
                  Mobile Highlights
                </p>
                <ul className="mt-4 space-y-3 text-sm text-white/95">
                  <li className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-sky-300" />
                    <span>Quick access to service checklists</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-sky-300" />
                    <span>Bite-sized digital skill lessons</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-sky-300" />
                    <span>Lightweight &amp; responsive mobile interface</span>
                  </li>
                </ul>
                <p className="mt-5 rounded-xl bg-[#0B1B3B]/40 px-3.5 py-2.5 text-xs text-blue-100">
                  Official app store download links will be activated once published.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
