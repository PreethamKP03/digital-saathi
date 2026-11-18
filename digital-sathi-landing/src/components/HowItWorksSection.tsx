import React from 'react';
import { UserPlus, LayoutGrid, CheckCircle2 } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../data/content';

const STEP_ICONS = [UserPlus, LayoutGrid, CheckCircle2];

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-[#EEF4FF] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#145BFF]">
            Simple 3-Step Journey
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0B1B3B] sm:text-4xl">
            How Digital Sathi Works
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Get started in minutes with a clear, guided workflow designed for every citizen.
          </p>
        </div>

        {/* 3 Numbered Cards + Connecting Lines */}
        <div className="relative mt-16">
          {/* Horizontal connecting line on desktop */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[16%] right-[16%] top-12 hidden h-0.5 border-t-2 border-dashed border-[#145BFF]/30 lg:block"
          />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {HOW_IT_WORKS_STEPS.map((step, index) => {
              const Icon = STEP_ICONS[index] || CheckCircle2;
              return (
                <div
                  key={step.number}
                  className="relative flex flex-col items-center rounded-3xl border border-slate-200/80 bg-white p-8 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#145BFF]/40 hover:shadow-soft"
                >
                  {/* Numbered Circle Badge */}
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#145BFF] to-[#0F48D6] text-white shadow-blue-glow">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                    <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#0B1B3B] font-display text-xs font-bold text-white shadow-sm">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-xl font-bold text-[#0B1B3B]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
