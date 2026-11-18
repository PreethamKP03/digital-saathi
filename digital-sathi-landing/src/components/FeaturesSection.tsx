import React, { useState } from 'react';
import {
  Landmark,
  GraduationCap,
  LifeBuoy,
  CheckCircle2,
  Fingerprint,
  CreditCard,
  FileText,
  Smartphone,
  ShieldCheck,
  ArrowUpRight,
  BookOpen,
  MessageSquare,
} from 'lucide-react';
import { FEATURES_DATA, SERVICE_GUIDES } from '../data/content';
import { ServiceGuideItem } from '../types';

interface FeaturesSectionProps {
  onSelectService: (service: ServiceGuideItem) => void;
}

const SERVICE_ICON_MAP: Record<string, React.ElementType> = {
  Fingerprint,
  CreditCard,
  FileText,
  Smartphone,
  ShieldCheck,
  LifeBuoy,
};

const FeatureIllustration: React.FC<{ id: string }> = ({ id }) => {
  if (id === 'government-services') {
    return (
      <div className="relative rounded-3xl border border-slate-200/80 bg-gradient-to-br from-[#EEF4FF] via-white to-[#F4F8FF] p-6 shadow-soft sm:p-8">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#145BFF] text-white shadow-sm">
              <Landmark className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0B1B3B]">Citizen Service Hub</p>
              <p className="text-[11px] text-slate-500">Organized portal guidance</p>
            </div>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-[#145BFF] shadow-sm border border-[#145BFF]/15">
            Guided Steps
          </span>
        </div>

        <div className="space-y-3">
          {[
            { icon: Fingerprint, title: 'Aadhaar Information', tag: 'Status & Address Steps' },
            { icon: CreditCard, title: 'PAN Card Services', tag: 'Apply & Linking Guide' },
            { icon: FileText, title: 'Certificates & Schemes', tag: 'Document Checklists' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white p-3.5 shadow-sm transition hover:border-[#145BFF]/30"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#145BFF]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0B1B3B]">{item.title}</p>
                    <p className="text-[11px] text-slate-500">{item.tag}</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-400" />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (id === 'digital-learning') {
    return (
      <div className="relative rounded-3xl border border-slate-200/80 bg-gradient-to-br from-sky-50 via-white to-[#EEF4FF] p-6 shadow-soft sm:p-8">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600 text-white shadow-sm">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0B1B3B]">Digital Learning Track</p>
              <p className="text-[11px] text-slate-500">Practical everyday tutorials</p>
            </div>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-sky-700 shadow-sm border border-sky-200">
            Beginner Friendly
          </span>
        </div>

        <div className="space-y-3.5">
          {[
            { title: 'Smartphone & App Essentials', progress: 85, lessons: '5 Short Lessons' },
            { title: 'Safe Internet & Email Basics', progress: 65, lessons: '4 Short Lessons' },
            { title: 'Online Safety & Scam Awareness', progress: 95, lessons: '6 Practical Tips' },
          ].map((track) => (
            <div key={track.title} className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#0B1B3B]">{track.title}</span>
                <span className="text-[11px] font-medium text-slate-500">{track.lessons}</span>
              </div>
              <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#145BFF] to-sky-400"
                  style={{ width: `${track.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-3xl border border-slate-200/80 bg-gradient-to-br from-[#F4F8FF] via-white to-indigo-50/60 p-6 shadow-soft sm:p-8">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B1B3B] text-white shadow-sm">
            <LifeBuoy className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#0B1B3B]">Citizen Help Desk</p>
            <p className="text-[11px] text-slate-500">Clear answers & support</p>
          </div>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 border border-emerald-200">
          Friendly Guidance
        </span>
      </div>

      <div className="space-y-3">
        <div className="rounded-2xl rounded-tl-sm border border-slate-200/80 bg-white p-3.5 text-xs text-slate-700 shadow-sm">
          <p className="font-semibold text-[#0B1B3B] mb-1 flex items-center gap-1.5">
            <MessageSquare className="h-3.5 w-3.5 text-[#145BFF]" />
            Sample Question:
          </p>
          "Which documents should I keep ready before applying for an address update?"
        </div>
        <div className="rounded-2xl rounded-tr-sm bg-[#145BFF] p-3.5 text-xs text-white shadow-md">
          <p className="font-semibold text-blue-100 mb-1 flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5" />
            Digital Sathi Guide:
          </p>
          "Keep your valid Proof of Address (such as electricity bill, ration card, or bank passbook) and your registered mobile number ready."
        </div>
      </div>
    </div>
  );
};

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', 'Government Services', 'Digital Learning', 'Help & Support'];

  const filteredServices =
    activeCategory === 'All'
      ? SERVICE_GUIDES
      : SERVICE_GUIDES.filter((item) => item.category === activeCategory);

  return (
    <>
      {/* 3 Core Feature Sections */}
      <section id="features" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-[#EEF4FF] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#145BFF]">
              Core Platform Features
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0B1B3B] sm:text-4xl">
              Everything Citizens Need for Digital Confidence
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Thoughtfully structured modules that simplify public services, nurture digital skills,
              and provide dependable support in plain language.
            </p>
          </div>

          {/* Alternating 3 Feature Blocks */}
          <div className="mt-16 space-y-20 lg:space-y-24">
            {FEATURES_DATA.map((feature, idx) => {
              const isReversed = idx % 2 === 1;
              return (
                <div
                  key={feature.id}
                  className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14"
                >
                  {/* Visual Illustration */}
                  <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <FeatureIllustration id={feature.id} />
                  </div>

                  {/* Feature Copy */}
                  <div className={`lg:col-span-6 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                    <span className="inline-block rounded-full bg-[#EEF4FF] px-3 py-1 text-xs font-semibold text-[#145BFF]">
                      {feature.badge}
                    </span>
                    <h3 className="mt-3 font-display text-2xl font-bold text-[#0B1B3B] sm:text-3xl">
                      {feature.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-slate-600">
                      {feature.description}
                    </p>

                    <ul className="mt-6 space-y-3.5">
                      {feature.points.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EEF4FF] text-[#145BFF]">
                            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                          </span>
                          <span className="text-sm font-medium text-slate-700 sm:text-base">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Services Explorer */}
      <section id="services" className="border-y border-slate-200/70 bg-[#F8FAFF] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="inline-block rounded-full bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#145BFF] shadow-sm border border-[#145BFF]/15">
                Interactive Directory
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0B1B3B] sm:text-4xl">
                Explore Popular Citizen Services & Guides
              </h2>
              <p className="mt-3 text-base text-slate-600">
                Select any guide below to view practical steps and document checklists right away.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div
              role="tablist"
              aria-label="Filter services by category"
              className="flex flex-wrap gap-2"
            >
              {categories.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                      active
                        ? 'bg-[#145BFF] text-white shadow-md shadow-[#145BFF]/20'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-[#145BFF]/40 hover:text-[#145BFF]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Service Guide Cards */}
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => {
              const Icon = SERVICE_ICON_MAP[service.iconName] || FileText;
              return (
                <article
                  key={service.id}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#145BFF]/40 hover:shadow-soft"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#145BFF] transition-colors group-hover:bg-[#145BFF] group-hover:text-white">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                        {service.category}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-lg font-bold text-[#0B1B3B] group-hover:text-[#145BFF] transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {service.shortDesc}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <button
                      type="button"
                      onClick={() => onSelectService(service)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#145BFF] transition hover:text-[#0F48D6] focus:outline-none focus:underline"
                    >
                      <span>View Step-by-Step Guide</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
