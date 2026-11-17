import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { GraduationCap, ShieldCheck, Heart, PhoneCall, Globe, ExternalLink } from 'lucide-react';

const Footer = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Purpose */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-saathi-blue-600 to-teal-500 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                {t('brand')}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('subtagline')}
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/60 p-2.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Safe Educational Demo Environment – No Real Money Involved</span>
            </div>
          </div>

          {/* Quick Learning Portals */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t('common.modules')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/courses" className="hover:text-teal-400 transition">
                  Module 1: Computer Basics
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-teal-400 transition">
                  Module 2: Smartphone Learning
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-teal-400 transition">
                  Module 3: Internet & Email
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-teal-400 transition">
                  Module 4: Digital Payments & UPI
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-teal-400 transition">
                  Module 5: Government Online Services
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-teal-400 transition">
                  Module 6: Cybersecurity & Online Safety
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-teal-400 transition">
                  Module 7: Online Education & Healthcare
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Citizen Portals */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Citizen Web Portals
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="https://pmkisan.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-teal-400 transition">
                  <span>PM-KISAN Samman Nidhi</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.digilocker.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-teal-400 transition">
                  <span>DigiLocker India</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://esanjeevani.mohfw.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-teal-400 transition">
                  <span>e-Sanjeevani Teleconsultation</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-teal-400 transition">
                  <span>National Cyber Crime Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://diksha.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-teal-400 transition">
                  <span>DIKSHA National Education</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Emergency Helplines & Academic Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Emergency & Support
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-1.5">
                <p className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                  <span>National Cyber Fraud Helpline</span>
                </p>
                <p className="text-lg font-extrabold text-amber-400">1930</p>
                <p className="text-[11px] text-slate-500">Call immediately within the first 2 hours of any unauthorized bank transaction.</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl">
                <span className="text-[11px] text-slate-400 block font-medium">Kisan Call Centre (KCC):</span>
                <span className="text-emerald-400 font-bold text-xs">1800-180-1551 (Toll-Free)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Digital Saathi. Developed for Bachelor of Engineering Academic Demonstration.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-slate-300 transition">About Project</Link>
            <span>•</span>
            <Link to="/materials" className="hover:text-slate-300 transition">Resources</Link>
            <span>•</span>
            <span className="text-slate-400">Languages: EN / ಕನ್ನಡ / हिंदी</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
