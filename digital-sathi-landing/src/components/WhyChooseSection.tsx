import React from 'react';
import {
  Sparkles,
  BookOpen,
  Shield,
  Layers,
  GraduationCap,
  Compass,
} from 'lucide-react';
import { WHY_CHOOSE_ITEMS } from '../data/content';

const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles,
  BookOpen,
  Shield,
  Layers,
  GraduationCap,
};

export const WhyChooseSection: React.FC = () => {
  return (
    <section id="about" className="border-t border-slate-200/70 bg-[#F8FAFF] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#145BFF] border border-[#145BFF]/15 shadow-sm">
            About Digital Sathi
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0B1B3B] sm:text-4xl">
            Why Choose Digital Sathi?
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Built around clarity, accessibility, and practical empowerment so every citizen can
            navigate India&apos;s digital ecosystem without confusion.
          </p>
        </div>

        {/* 6-Tile Balanced Bento Grid (Mission Spotlight + 5 Core Pillars) */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Mission Card */}
          <div className="flex flex-col justify-between rounded-3xl bg-gradient-to-br from-[#0B1B3B] via-[#102B6B] to-[#145BFF] p-7 text-white shadow-soft">
            <div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-sky-200 backdrop-blur-sm">
                <Compass className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold leading-snug">
                Empowering Citizens. Building a Digital India.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-blue-100">
                Digital Sathi bridges the gap between everyday citizens and modern digital tools by
                bringing trusted guidance, tutorials, and helpful checklists together in one
                welcoming platform.
              </p>
            </div>
            <div className="mt-6 border-t border-white/15 pt-4 text-xs font-medium text-sky-200">
              Designed for students, families, seniors &amp; first-time internet users.
            </div>
          </div>

          {/* 5 Required Pillar Cards */}
          {WHY_CHOOSE_ITEMS.map((item) => {
            const Icon = ICON_MAP[item.iconName] || Sparkles;
            return (
              <div
                key={item.id}
                className="group rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#145BFF]/40 hover:shadow-soft"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#145BFF] transition-colors group-hover:bg-[#145BFF] group-hover:text-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-[#0B1B3B]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
