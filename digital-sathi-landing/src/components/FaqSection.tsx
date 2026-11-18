import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS } from '../data/content';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="border-t border-slate-200/70 bg-[#F8FAFF] py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#145BFF] border border-[#145BFF]/15 shadow-sm">
            <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Common Questions</span>
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0B1B3B] sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Clear answers to help you understand how Digital Sathi supports your everyday digital
            journey.
          </p>
        </div>

        <div className="mt-12 space-y-3.5">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`overflow-hidden rounded-2xl border bg-white transition-all duration-200 ${
                  isOpen
                    ? 'border-[#145BFF]/40 shadow-soft'
                    : 'border-slate-200/80 shadow-sm hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`${item.id}-content`}
                  id={`${item.id}-button`}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#145BFF]"
                >
                  <span className="font-display text-sm font-semibold text-[#0B1B3B] sm:text-base">
                    {item.question}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                      isOpen
                        ? 'rotate-180 bg-[#145BFF] text-white'
                        : 'bg-[#EEF4FF] text-[#145BFF]'
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" aria-hidden="true" />
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={`${item.id}-content`}
                    role="region"
                    aria-labelledby={`${item.id}-button`}
                    className="border-t border-slate-100 px-6 pb-5 pt-4 text-sm leading-relaxed text-slate-600"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
