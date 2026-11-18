import React, { useState } from 'react';
import { X, ArrowRight, CheckCircle2, Compass } from 'lucide-react';

interface GetStartedModalProps {
  open: boolean;
  onClose: () => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({ open, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [interest, setInterest] = useState('Government Services');
  const [done, setDone] = useState(false);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !contactInfo.trim()) return;
    setDone(true);
  };

  const handleClose = () => {
    setDone(false);
    setFullName('');
    setContactInfo('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="get-started-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1B3B]/60 p-4 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-[#0B1B3B]"
        >
          <X className="h-5 w-5" />
        </button>

        {done ? (
          <div className="py-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 id="get-started-title" className="mt-4 font-display text-xl font-bold text-[#0B1B3B]">
              Welcome to Digital Sathi, {fullName}!
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              You are all set to explore our <strong>{interest}</strong> guides and learning
              tutorials.
            </p>
            <a
              href="#services"
              onClick={handleClose}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#145BFF] px-5 py-3 text-sm font-semibold text-white shadow-blue-glow transition hover:bg-[#0F48D6]"
            >
              <span>Browse Service Guides</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        ) : (
          <div>
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#145BFF]">
              <Compass className="h-6 w-6" />
            </div>
            <h3 id="get-started-title" className="font-display text-xl font-bold text-[#0B1B3B]">
              Get Started with Digital Sathi
            </h3>
            <p className="mt-1.5 text-sm text-slate-600">
              Personalize your starting experience in seconds — completely free.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="gs-name"
                  className="mb-1 block text-xs font-semibold text-[#0B1B3B]"
                >
                  Your Name
                </label>
                <input
                  id="gs-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g., Priya Verma"
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-[#0B1B3B] outline-none transition focus:border-[#145BFF] focus:ring-2 focus:ring-[#145BFF]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="gs-contact"
                  className="mb-1 block text-xs font-semibold text-[#0B1B3B]"
                >
                  Email or Mobile Number
                </label>
                <input
                  id="gs-contact"
                  type="text"
                  required
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-[#0B1B3B] outline-none transition focus:border-[#145BFF] focus:ring-2 focus:ring-[#145BFF]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="gs-interest"
                  className="mb-1 block text-xs font-semibold text-[#0B1B3B]"
                >
                  What would you like to explore first?
                </label>
                <select
                  id="gs-interest"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-[#0B1B3B] outline-none transition focus:border-[#145BFF] focus:ring-2 focus:ring-[#145BFF]/20"
                >
                  <option value="Government Services">Government Services (Aadhaar, PAN, Schemes)</option>
                  <option value="Digital Learning">Digital Learning &amp; Smartphone Skills</option>
                  <option value="Help & Support">Help, FAQs &amp; Support</option>
                </select>
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#145BFF] px-5 py-3 text-sm font-semibold text-white shadow-blue-glow transition hover:bg-[#0F48D6]"
              >
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
