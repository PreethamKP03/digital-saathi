import React, { useState } from 'react';
import {
  Search,
  Fingerprint,
  CreditCard,
  GraduationCap,
  LifeBuoy,
  CheckCircle2,
  ChevronRight,
  Bell,
  Sparkles,
  Wifi,
  Battery,
} from 'lucide-react';

interface MiniService {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  bg: string;
  color: string;
  tip: string;
}

const MINI_SERVICES: MiniService[] = [
  {
    id: 'aadhaar',
    label: 'Aadhaar Guide',
    sublabel: 'Updates & Status',
    icon: Fingerprint,
    bg: 'bg-[#EEF4FF]',
    color: 'text-[#145BFF]',
    tip: 'Keep your registered mobile ready for OTP verification on official portals.',
  },
  {
    id: 'pan',
    label: 'PAN Services',
    sublabel: 'Apply & Link',
    icon: CreditCard,
    bg: 'bg-sky-50',
    color: 'text-sky-600',
    tip: 'Verify name and date-of-birth match your Aadhaar before applying.',
  },
  {
    id: 'learn',
    label: 'Digital Skills',
    sublabel: 'Tutorials & Tips',
    icon: GraduationCap,
    bg: 'bg-indigo-50',
    color: 'text-indigo-600',
    tip: 'Start with 5-minute smartphone & safe internet lessons.',
  },
  {
    id: 'help',
    label: 'Help & FAQs',
    sublabel: 'Guided Support',
    icon: LifeBuoy,
    bg: 'bg-emerald-50',
    color: 'text-emerald-600',
    tip: 'Browse common questions or reach our friendly support team.',
  },
];

export const PhoneMockup: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('aadhaar');
  const activeService = MINI_SERVICES.find((s) => s.id === activeId) || MINI_SERVICES[0];

  return (
    <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[360px]">
      {/* Subtle decorative light-blue glow behind phone */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-[3rem] bg-gradient-to-tr from-[#145BFF]/20 via-sky-200/35 to-[#EEF4FF] blur-2xl"
      />

      {/* Floating side pill 1 (Desktop only for clean uncluttered feel) */}
      <div className="hidden sm:flex absolute -left-10 top-16 z-20 items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-white/95 px-3.5 py-2.5 shadow-soft backdrop-blur-md">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#145BFF]">
          <CheckCircle2 className="h-4 w-4" />
        </div>
        <div className="text-left">
          <p className="text-[11px] font-bold text-[#0B1B3B] leading-tight">Step-by-Step Guides</p>
          <p className="text-[10px] text-slate-500">Clear citizen checklists</p>
        </div>
      </div>

      {/* Floating side pill 2 */}
      <div className="hidden sm:flex absolute -right-8 bottom-20 z-20 items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-white/95 px-3.5 py-2.5 shadow-soft backdrop-blur-md">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="text-left">
          <p className="text-[11px] font-bold text-[#0B1B3B] leading-tight">Beginner Friendly</p>
          <p className="text-[10px] text-slate-500">Simple & accessible UI</p>
        </div>
      </div>

      {/* Smartphone Chassis */}
      <div className="animate-gentle-float relative z-10 rounded-[2.6rem] border-[7px] border-[#0B1B3B] bg-[#0B1B3B] p-1.5 shadow-2xl shadow-[#0B1B3B]/20">
        {/* Screen */}
        <div className="overflow-hidden rounded-[2.1rem] bg-[#F8FAFF]">
          {/* Status bar & Dynamic Notch */}
          <div className="relative flex items-center justify-between bg-[#145BFF] px-5 pb-3 pt-2.5 text-[10px] font-medium text-white/90">
            <span>9:41</span>
            <div className="h-4 w-20 rounded-full bg-[#0B1B3B]/90" aria-hidden="true" />
            <div className="flex items-center gap-1.5">
              <Wifi className="h-3 w-3" />
              <Battery className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* App Header */}
          <div className="rounded-b-3xl bg-gradient-to-br from-[#145BFF] to-[#0F48D6] px-4 pb-5 pt-1 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-medium text-blue-100">Welcome back</p>
                <h3 className="font-display text-sm font-bold tracking-tight">Digital Sathi</h3>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                <Bell className="h-4 w-4 text-white" />
              </div>
            </div>

            {/* Mock App Search Bar */}
            <div className="mt-3.5 flex items-center gap-2 rounded-xl bg-white/15 px-3 py-2 text-[11px] text-blue-100 backdrop-blur-sm">
              <Search className="h-3.5 w-3.5 text-blue-100" />
              <span>Search services, guides, FAQs...</span>
            </div>
          </div>

          {/* App Dashboard Content */}
          <div className="space-y-3.5 p-4">
            {/* Section Title */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#0B1B3B]">Citizen Services</span>
              <span className="text-[10px] font-semibold text-[#145BFF]">Interactive Preview</span>
            </div>

            {/* 2x2 Service Cards Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {MINI_SERVICES.map((service) => {
                const Icon = service.icon;
                const isSelected = service.id === activeId;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setActiveId(service.id)}
                    className={`rounded-2xl border p-3 text-left transition-all duration-150 ${
                      isSelected
                        ? 'border-[#145BFF] bg-white shadow-md shadow-[#145BFF]/10 ring-1 ring-[#145BFF]/20'
                        : 'border-slate-200/70 bg-white/90 hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`mb-2 flex h-8 w-8 items-center justify-center rounded-xl ${service.bg} ${service.color}`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="text-[11px] font-bold text-[#0B1B3B] leading-snug">
                      {service.label}
                    </p>
                    <p className="text-[10px] text-slate-500">{service.sublabel}</p>
                  </button>
                );
              })}
            </div>

            {/* Active Tip Banner Inside App */}
            <div className="rounded-2xl border border-[#145BFF]/15 bg-[#EEF4FF]/80 p-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#145BFF]">
                  Quick Tip • {activeService.label}
                </span>
                <ChevronRight className="h-3.5 w-3.5 text-[#145BFF]" />
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-700">
                {activeService.tip}
              </p>
            </div>

            {/* Progress / Learning Card Inside App */}
            <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-3">
              <div>
                <p className="text-[11px] font-bold text-[#0B1B3B]">Digital Skills Path</p>
                <p className="text-[10px] text-slate-500">Smartphone & Safe Internet</p>
              </div>
              <span className="rounded-full bg-[#EEF4FF] px-2.5 py-1 text-[10px] font-bold text-[#145BFF]">
                Start Free
              </span>
            </div>
          </div>

          {/* Bottom Home Indicator */}
          <div className="flex justify-center pb-2.5 pt-1">
            <div className="h-1 w-24 rounded-full bg-slate-300" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
};
