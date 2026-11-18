import React from 'react';
import { ArrowRight, Compass, CheckCircle2 } from 'lucide-react';
import { PhoneMockup } from './PhoneMockup';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-[#F4F8FF] via-white to-white pb-20 pt-14 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24"
    >
      {/* Subtle Light-Blue Ambient Background Shapes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-[480px] w-[480px] rounded-full bg-[#145BFF]/[0.06] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-[360px] w-[360px] rounded-full bg-sky-200/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Hero Copy & CTAs */}
          <div className="text-center lg:col-span-7 lg:text-left">
            {/* Tagline Pill */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#145BFF]/20 bg-[#EEF4FF] px-4 py-1.5 text-xs font-semibold text-[#145BFF] shadow-sm">
              <Compass className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Empowering Citizens. Building a Digital India.</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-[#0B1B3B] sm:text-5xl lg:text-[3.25rem] lg:leading-[1.15]">
              Digital Sathi –{' '}
              <span className="bg-gradient-to-r from-[#145BFF] to-sky-500 bg-clip-text text-transparent">
                Your Trusted Digital Companion
              </span>
            </h1>

            {/* Subheading */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg lg:mx-0">
              Access government services, discover digital opportunities, learn new skills and get
              assistance — all in one platform.
            </p>

            {/* Primary & Secondary Buttons */}
            <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row lg:justify-start">
              <a
                href="#services"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#145BFF] px-7 py-3.5 text-sm font-semibold text-white shadow-blue-glow transition hover:bg-[#0F48D6] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#145BFF] focus:ring-offset-2 sm:w-auto"
              >
                <span>Explore Services</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={onGetStarted}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-[#0B1B3B] shadow-sm transition hover:border-[#145BFF]/50 hover:bg-[#F8FAFF] hover:text-[#145BFF] focus:outline-none focus:ring-2 focus:ring-[#145BFF] focus:ring-offset-2 sm:w-auto"
              >
                <span>Get Started</span>
              </button>
            </div>

            {/* Clean Value Highlights (Honest, no fabricated claims) */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-slate-200/80 pt-7 text-xs font-medium text-slate-600 lg:justify-start">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#145BFF]" aria-hidden="true" />
                Free citizen guidance
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#145BFF]" aria-hidden="true" />
                Plain-language tutorials
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#145BFF]" aria-hidden="true" />
                Works on mobile & desktop
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Smartphone Mockup */}
          <div className="lg:col-span-5">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
};
