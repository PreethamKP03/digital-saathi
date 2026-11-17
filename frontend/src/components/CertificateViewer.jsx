import React, { useRef } from 'react';
import { Award, Download, Printer, CheckCircle, ShieldCheck, QrCode } from 'lucide-react';

const CertificateViewer = ({ certificate, onClose }) => {
  const certRef = useRef(null);

  if (!certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = certificate.issue_date 
    ? new Date(certificate.issue_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 shadow-2xl relative">
        {/* Action Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6 print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-500" />
            <h3 className="font-extrabold text-slate-900 text-base">
              Digital Saathi Official Certificate of Competence
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-saathi-blue-900 hover:bg-saathi-blue-950 text-white rounded-xl text-xs font-bold shadow-md transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
              >
                Close
              </button>
            )}
          </div>
        </div>

        {/* PRINTABLE HIGH-RESOLUTION CERTIFICATE CANVAS */}
        <div 
          ref={certRef}
          className="certificate-print-area bg-gradient-to-br from-amber-50/60 via-white to-teal-50/60 border-8 border-double border-saathi-blue-900 rounded-2xl p-8 sm:p-12 relative overflow-hidden text-center shadow-lg"
          style={{ minHeight: '520px' }}
        >
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-3 left-3 w-12 h-12 border-t-4 border-l-4 border-amber-600 rounded-tl-xl pointer-events-none"></div>
          <div className="absolute top-3 right-3 w-12 h-12 border-t-4 border-r-4 border-amber-600 rounded-tr-xl pointer-events-none"></div>
          <div className="absolute bottom-3 left-3 w-12 h-12 border-b-4 border-l-4 border-amber-600 rounded-bl-xl pointer-events-none"></div>
          <div className="absolute bottom-3 right-3 w-12 h-12 border-b-4 border-r-4 border-amber-600 rounded-br-xl pointer-events-none"></div>

          {/* Watermark Logo */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <Award className="w-96 h-96 text-saathi-blue-900" />
          </div>

          {/* Platform Header */}
          <div className="space-y-1 mb-6 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saathi-blue-900 text-white text-[11px] font-bold tracking-widest uppercase mb-1">
              Digital India Rural Literacy Mission
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-saathi-blue-950 tracking-tight">
              DIGITAL SAATHI
            </h1>
            <p className="text-xs text-slate-500 font-semibold tracking-wider uppercase">
              National Digital Literacy & Cyber Empowerment Platform
            </p>
          </div>

          {/* Main Statement */}
          <div className="space-y-4 mb-6 relative">
            <p className="text-sm font-serif italic text-slate-600">
              This is to proudly certify that
            </p>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-saathi-blue-900 underline decoration-amber-500 underline-offset-8 decoration-2 font-serif">
              {certificate.learner_name || "Valued Rural Citizen"}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed pt-2">
              has successfully completed all learning units, hands-on simulations, and passed the official assessment for:
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-teal-800 bg-teal-50/80 border border-teal-200/80 inline-block px-6 py-2 rounded-xl shadow-sm">
              {certificate.course_title}
            </h3>
          </div>

          {/* Score & Validation */}
          <div className="flex items-center justify-center gap-6 text-xs text-slate-600 mb-8 relative">
            <span className="flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Score: {certificate.score_percentage}%
            </span>
            <span>Date: <strong>{formattedDate}</strong></span>
          </div>

          {/* Footer Signatures and Verification */}
          <div className="grid grid-cols-3 items-end pt-6 border-t border-slate-200 text-xs relative">
            <div className="text-left space-y-1">
              <p className="font-mono text-[10px] text-slate-400">CERTIFICATE ID:</p>
              <p className="font-mono font-bold text-slate-800 text-[11px] bg-slate-100 px-2 py-0.5 rounded inline-block">
                {certificate.certificate_code}
              </p>
              <p className="text-[10px] text-slate-500">Scan code to verify authenticity</p>
            </div>

            <div className="flex justify-center">
              <div className="w-16 h-16 bg-white border border-slate-300 rounded-xl p-1 shadow-sm flex items-center justify-center">
                <QrCode className="w-14 h-14 text-slate-800" />
              </div>
            </div>

            <div className="text-right space-y-1">
              <div className="inline-block border-b-2 border-slate-700 pb-1 px-4 mb-1">
                <span className="font-serif italic text-sm text-slate-800">Dr. Ramesh Rao</span>
              </div>
              <p className="font-bold text-slate-800 text-[11px]">Director & Program Head</p>
              <p className="text-[10px] text-slate-500">Digital Saathi Mission, GoI</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateViewer;
