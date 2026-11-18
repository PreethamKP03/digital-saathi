import React from 'react';
import { X, CheckCircle2, FileCheck2, Info } from 'lucide-react';
import { ServiceGuideItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceGuideItem | null;
  onClose: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, onClose }) => {
  if (!service) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1B3B]/60 p-4 backdrop-blur-sm"
    >
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close service guide"
          className="absolute right-4 top-4 rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-[#0B1B3B]"
        >
          <X className="h-5 w-5" />
        </button>

        <span className="inline-block rounded-full bg-[#EEF4FF] px-3 py-1 text-xs font-semibold text-[#145BFF]">
          {service.category}
        </span>

        <h3
          id="service-modal-title"
          className="mt-3 pr-8 font-display text-xl font-bold text-[#0B1B3B]"
        >
          {service.title}
        </h3>
        <p className="mt-2 text-sm text-slate-600">{service.shortDesc}</p>

        {/* Step-by-Step Guidance */}
        <div className="mt-6">
          <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-500">
            Step-by-Step Guidance
          </h4>
          <ol className="mt-3 space-y-3">
            {service.steps.map((step, index) => (
              <li
                key={step}
                className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-[#F8FAFF] p-3.5 text-sm text-slate-700"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#145BFF] text-xs font-bold text-white">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Helpful Document Checklist */}
        {service.requiredDocs && service.requiredDocs.length > 0 && (
          <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white p-4">
            <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0B1B3B]">
              <FileCheck2 className="h-4 w-4 text-[#145BFF]" />
              <span>Helpful Items to Keep Ready</span>
            </h4>
            <ul className="mt-2.5 space-y-1.5">
              {service.requiredDocs.map((doc) => (
                <li key={doc} className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Informational Note */}
        <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-amber-50 p-3 text-xs text-amber-900">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
          <p>
            Digital Sathi provides informational guidance only. Always complete official submissions
            directly on verified government portals.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-[#0B1B3B] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
