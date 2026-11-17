import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  GraduationCap, ShieldCheck, HeartHandshake, Smartphone, 
  Users, CheckCircle2, Award, Globe2, Code2, Database, Cpu 
} from 'lucide-react';

const AboutPage = () => {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-saathi-blue-900 to-teal-600 flex items-center justify-center text-white mx-auto shadow-xl shadow-saathi-blue-900/20">
          <GraduationCap className="w-9 h-9" />
        </div>
        <div className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-bold uppercase tracking-wider">
          Academic Project Demonstration &bull; BE Software Engineering
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-saathi-blue-950 tracking-tight">
          About Digital Saathi
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          An AI-powered, multi-lingual, voice-enabled digital literacy ecosystem developed to bridge India's rural-urban digital divide and foster independent digital citizenship.
        </p>
      </div>

      {/* Core Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-saathi-blue-50 text-saathi-blue-900 flex items-center justify-center font-bold">
            01
          </div>
          <h3 className="font-extrabold text-base text-slate-900">Digital Inclusion</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Eliminating intimidating technical jargon by teaching computers, smartphones, and online banking through everyday analogies in regional Indian languages (English, Kannada, Hindi).
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
            02
          </div>
          <h3 className="font-extrabold text-base text-slate-900">Financial Security</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Protecting vulnerable rural savings by ingraining safe UPI payment habits and the Golden Rule: <em>"Never enter your UPI PIN to receive money"</em> via risk-free interactive sandboxes.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
            03
          </div>
          <h3 className="font-extrabold text-base text-slate-900">Direct Citizen Welfare</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Empowering citizens to access DigiLocker documents, PM-KISAN funds, Ration services, and e-Sanjeevani doctor consultations directly, eliminating costly middlemen and brokers.
          </p>
        </div>
      </div>

      {/* Technology Architecture Section */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-saathi-blue-900" />
            <span>Modern Full-Stack Technical Architecture</span>
          </h2>
          <p className="text-xs text-slate-500">Robust, modular, decoupled architecture adhering to modern industry standards.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-3">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] text-saathi-blue-900">
              Frontend Client Layer:
            </h4>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>React.js (Vite)</strong>: Fast modular component rendering with optimized SPA state.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Tailwind CSS</strong>: Accessible, high-contrast, mobile-first rural UI palette.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Web Speech API (TTS)</strong>: Integrated browser text-to-speech for audio-guided voice learning.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Lucide React</strong>: Clean, universally recognized visual icon indicators.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] text-teal-800">
              Backend & AI Intelligence Layer:
            </h4>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Python Flask REST API</strong>: Clean Blueprint routing, modular controllers and secure JWT auth.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Flask-SQLAlchemy ORM</strong>: Unified relational mapping with SQLite default & MySQL production ready.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>AI Assistant (Gemini / Multilingual NLP)</strong>: Context-aware digital tutor with rural FAQ fallback.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Role-Based Access Control (RBAC)</strong>: Secure decorators for Student, Trainer, and Admin roles.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
