import React from 'react';
import { Mail, MapPin, Globe, Share2, MessageCircle, Youtube } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onOpenLegal: (docType: 'privacy' | 'terms') => void;
  onSocialPlaceholder: (platform: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onSocialPlaceholder }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1B3B] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Logo variant="light" showTagline />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Your trusted digital companion for discovering government service guidance, building
              practical digital skills, and accessing clear citizen support — all in one platform.
            </p>

            {/* Social Media Placeholder Icons */}
            <div className="mt-6 flex items-center gap-2.5">
              {[
                { name: 'Website Portal', icon: Globe },
                { name: 'Community Channel', icon: MessageCircle },
                { name: 'YouTube Tutorials', icon: Youtube },
                { name: 'Share Digital Sathi', icon: Share2 },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <button
                    key={social.name}
                    type="button"
                    onClick={() => onSocialPlaceholder(social.name)}
                    aria-label={social.name}
                    title={`${social.name} (Placeholder link)`}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-[#145BFF] hover:bg-[#145BFF] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#145BFF]"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href="#home" className="text-slate-400 transition hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#features" className="text-slate-400 transition hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-slate-400 transition hover:text-white">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#about" className="text-slate-400 transition hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-slate-400 transition hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href="#services" className="text-slate-400 transition hover:text-white">
                  Aadhaar Guidance
                </a>
              </li>
              <li>
                <a href="#services" className="text-slate-400 transition hover:text-white">
                  PAN Card Services
                </a>
              </li>
              <li>
                <a href="#services" className="text-slate-400 transition hover:text-white">
                  Certificates &amp; Schemes
                </a>
              </li>
              <li>
                <a href="#services" className="text-slate-400 transition hover:text-white">
                  Digital Learning
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white">
              Resources
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href="#faq" className="text-slate-400 transition hover:text-white">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#services" className="text-slate-400 transition hover:text-white">
                  Online Safety Tips
                </a>
              </li>
              <li>
                <a href="#services" className="text-slate-400 transition hover:text-white">
                  Beginner Tutorials
                </a>
              </li>
              <li>
                <a href="#contact" className="text-slate-400 transition hover:text-white">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white">
              Contact Info
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" aria-hidden="true" />
                <span className="break-all">support@digitalsathi.example</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" aria-hidden="true" />
                <span>Citizen Digital Initiative, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-400 sm:flex-row">
          <p>&copy; {year} Digital Sathi. Empowering Citizens. Building a Digital India.</p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => onOpenLegal('privacy')}
              className="transition hover:text-white focus:outline-none focus:underline"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('terms')}
              className="transition hover:text-white focus:outline-none focus:underline"
            >
              Terms and Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
