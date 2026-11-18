import React from 'react';
import { Star, Quote } from 'lucide-react';
import { SAMPLE_TESTIMONIALS } from '../data/content';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-[#EEF4FF] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#145BFF]">
            Community Voices
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0B1B3B] sm:text-4xl">
            How Citizens Experience Digital Sathi
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-0.5 text-xs font-medium text-slate-600">
              Note: Sample testimonials shown for illustrative purposes
            </span>
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-3">
          {SAMPLE_TESTIMONIALS.map((item) => (
            <article
              key={item.id}
              className="relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#145BFF]/30 hover:shadow-soft"
            >
              <div>
                <div className="flex items-center justify-between">
                  {/* Star Rating */}
                  <div className="flex items-center gap-0.5" aria-label={`${item.rating} out of 5 stars`}>
                    {Array.from({ length: item.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <Quote className="h-5 w-5 text-[#145BFF]/20" aria-hidden="true" />
                </div>

                <p className="mt-5 text-sm leading-relaxed text-slate-700">
                  &ldquo;{item.review}&rdquo;
                </p>
              </div>

              <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-5">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold ${item.avatarBg}`}
                    aria-hidden="true"
                  >
                    {item.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0B1B3B]">{item.name}</p>
                    <p className="text-xs text-slate-500">
                      {item.role} &bull; {item.location}
                    </p>
                  </div>
                </div>
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                  Sample
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
