import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  docType: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ docType, onClose }) => {
  if (!docType) return null;

  const isPrivacy = docType === 'privacy';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1B3B]/60 p-4 backdrop-blur-sm"
    >
      <div className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close legal information"
          className="absolute right-4 top-4 rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-[#0B1B3B]"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#145BFF]">
          {isPrivacy ? <ShieldCheck className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
        </div>

        <h3 id="legal-modal-title" className="font-display text-xl font-bold text-[#0B1B3B]">
          {isPrivacy ? 'Privacy Policy (Summary)' : 'Terms and Conditions (Summary)'}
        </h3>

        <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
          {isPrivacy ? (
            <>
              <p>
                Digital Sathi respects your privacy. You can browse all informational guides,
                service checklists, and digital learning tutorials without creating an account.
              </p>
              <p>
                We never request or store sensitive banking credentials, UPI PINs, or one-time
                passcodes (OTPs). Information submitted through our contact form is used solely to
                respond to your inquiry.
              </p>
              <p>
                This is a summary policy placeholder. Full legal documentation will be published
                upon official release.
              </p>
            </>
          ) : (
            <>
              <p>
                Digital Sathi is an independent informational and digital literacy companion
                platform created to help citizens understand online services and build everyday
                digital skills.
              </p>
              <p>
                Service guides and document checklists are provided for general guidance. Citizens
                should always verify final requirements directly on official government portals.
              </p>
              <p>
                These terms are a summary placeholder provided until formal launch documentation is
                finalized.
              </p>
            </>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-[#145BFF] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0F48D6]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
