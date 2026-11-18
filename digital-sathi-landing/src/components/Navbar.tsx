import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  onGetStarted: () => void;
}

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Services', href: '#services' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onGetStarted }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80'
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-100'
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8"
      >
        <a
          href="#home"
          className="focus:outline-none focus:ring-2 focus:ring-[#145BFF] focus:ring-offset-2 rounded-xl"
        >
          <Logo />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex md:items-center md:gap-1 lg:gap-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-[#EEF4FF] hover:text-[#145BFF] focus:outline-none focus:ring-2 focus:ring-[#145BFF]/40"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex md:items-center">
          <button
            type="button"
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 rounded-xl bg-[#145BFF] px-5 py-2.5 text-sm font-semibold text-white shadow-blue-glow transition hover:bg-[#0F48D6] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#145BFF] focus:ring-offset-2"
          >
            <span>Get Started</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="inline-flex items-center justify-center rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 hover:text-[#0B1B3B] focus:outline-none focus:ring-2 focus:ring-[#145BFF] md:hidden"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 pb-6 pt-3 shadow-lg md:hidden">
          <div className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-[#EEF4FF] hover:text-[#145BFF]"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onGetStarted();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#145BFF] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#0F48D6]"
              >
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
