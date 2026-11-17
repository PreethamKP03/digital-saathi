import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  BookOpen, Globe, User, LogOut, Menu, X, Shield, 
  GraduationCap, Sparkles, LayoutDashboard, ChevronDown, PhoneCall 
} from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout, role } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const languages = [
    { code: 'en', label: 'English', sub: 'English' },
    { code: 'kn', label: 'ಕನ್ನಡ', sub: 'Kannada' },
    { code: 'hi', label: 'हिंदी', sub: 'Hindi' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top emergency & mission banner */}
      <div className="bg-gradient-to-r from-saathi-blue-950 via-saathi-blue-900 to-saathi-blue-950 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-600 px-2 py-0.5 rounded font-semibold text-[11px] tracking-wide">
              DIGITAL INDIA
            </span>
            <span className="text-slate-200 hidden sm:inline">
              Rural Digital Literacy & Citizen Empowerment Platform
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <a 
              href="tel:1930" 
              className="flex items-center gap-1.5 text-amber-300 font-semibold hover:text-amber-200 transition"
              title="National Cyber Crime Reporting Helpline"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Cyber Helpline: 1930</span>
            </a>
          </div>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-saathi-blue-900 via-saathi-blue-800 to-teal-600 flex items-center justify-center text-white shadow-md shadow-saathi-blue-900/20 group-hover:scale-105 transition duration-200">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl text-saathi-blue-950 tracking-tight">
                {t('brand')}
              </span>
              <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                AI Powered
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium hidden sm:block">
              {language === 'kn' ? 'ಗ್ರಾಮೀಣ ಡಿಜಿಟಲ್ ಸಾಕ್ಷರತಾ ವೇದಿಕೆ' : language === 'hi' ? 'ग्रामीण डिजिटल साक्षरता मंच' : 'Digital Literacy for Rural Communities'}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          <Link
            to="/"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
              isActive('/') 
                ? 'bg-saathi-blue-50 text-saathi-blue-900 font-semibold' 
                : 'text-slate-600 hover:text-saathi-blue-900 hover:bg-slate-100'
            }`}
          >
            {t('nav.home')}
          </Link>

          <Link
            to="/courses"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
              isActive('/courses') 
                ? 'bg-saathi-blue-50 text-saathi-blue-900 font-semibold' 
                : 'text-slate-600 hover:text-saathi-blue-900 hover:bg-slate-100'
            }`}
          >
            {t('nav.courses')}
          </Link>

          {isAuthenticated && (
            <Link
              to="/dashboard"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive('/dashboard') 
                  ? 'bg-saathi-blue-50 text-saathi-blue-900 font-semibold' 
                  : 'text-slate-600 hover:text-saathi-blue-900 hover:bg-slate-100'
              }`}
            >
              {t('nav.dashboard')}
            </Link>
          )}

          <Link
            to="/materials"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
              isActive('/materials') 
                ? 'bg-saathi-blue-50 text-saathi-blue-900 font-semibold' 
                : 'text-slate-600 hover:text-saathi-blue-900 hover:bg-slate-100'
            }`}
          >
            {t('nav.materials')}
          </Link>

          <Link
            to="/about"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
              isActive('/about') 
                ? 'bg-saathi-blue-50 text-saathi-blue-900 font-semibold' 
                : 'text-slate-600 hover:text-saathi-blue-900 hover:bg-slate-100'
            }`}
          >
            {t('nav.about')}
          </Link>

          {/* Trainer Portal Link */}
          {isAuthenticated && (role === 'trainer' || role === 'admin') && (
            <Link
              to="/trainer"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                isActive('/trainer') 
                  ? 'bg-teal-50 text-teal-800 font-semibold' 
                  : 'text-teal-700 hover:bg-teal-50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{t('nav.trainer')}</span>
            </Link>
          )}

          {/* Admin Portal Link */}
          {isAuthenticated && role === 'admin' && (
            <Link
              to="/admin"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                isActive('/admin') 
                  ? 'bg-purple-50 text-purple-800 font-semibold' 
                  : 'text-purple-700 hover:bg-purple-50'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>{t('nav.admin')}</span>
            </Link>
          )}
        </div>

        {/* Right Section: Language Selector & Auth Profile */}
        <div className="flex items-center gap-3">
          {/* Multi-language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-saathi-blue-500 bg-white text-xs font-semibold text-slate-700 shadow-sm transition"
              title="Change Language / ಭಾಷೆ ಬದಲಾಯಿಸಿ"
            >
              <Globe className="w-4 h-4 text-saathi-blue-700" />
              <span>{languages.find(l => l.code === language)?.label || 'Language'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {langDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-50 animate-in fade-in slide-in-from-top-1"
                onMouseLeave={() => setLangDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Select Language
                </div>
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition ${
                      language === l.code ? 'font-bold text-saathi-blue-900 bg-saathi-blue-50/70' : 'text-slate-700'
                    }`}
                  >
                    <span>{l.label}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{l.sub}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Auth Profile / Login Button */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 hover:border-saathi-blue-400 bg-white transition shadow-sm"
              >
                <img
                  src={user?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${user?.email}`}
                  alt={user?.name}
                  className="w-7 h-7 rounded-lg bg-saathi-blue-100"
                />
                <span className="text-xs font-bold text-slate-800 max-w-[100px] truncate hidden sm:inline">
                  {user?.name?.split(' ')[0]}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900 truncate">{user?.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                    <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded bg-saathi-blue-100 text-saathi-blue-800 capitalize">
                      {user?.role}
                    </span>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                  >
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>{t('nav.profile')}</span>
                  </Link>

                  <Link
                    to="/dashboard"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-slate-500" />
                    <span>{t('nav.dashboard')}</span>
                  </Link>

                  {role === 'trainer' && (
                    <Link
                      to="/trainer"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-teal-700 hover:bg-teal-50"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-teal-600" />
                      <span>{t('nav.trainer')}</span>
                    </Link>
                  )}

                  {role === 'admin' && (
                    <Link
                      to="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-purple-700 hover:bg-purple-50"
                    >
                      <Shield className="w-3.5 h-3.5 text-purple-600" />
                      <span>{t('nav.admin')}</span>
                    </Link>
                  )}

                  <div className="border-t border-slate-100 mt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{t('nav.logout')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3 py-1.5 text-xs font-semibold text-saathi-blue-900 hover:bg-saathi-blue-50 rounded-lg transition"
              >
                {t('nav.login')}
              </Link>
              <Link
                to="/register"
                className="px-3.5 py-1.5 text-xs font-semibold bg-saathi-blue-900 hover:bg-saathi-blue-800 text-white rounded-lg shadow-sm transition"
              >
                {t('nav.register')}
              </Link>
            </div>
          )}

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            {t('nav.home')}
          </Link>
          <Link
            to="/courses"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            {t('nav.courses')}
          </Link>
          {isAuthenticated && (
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              {t('nav.dashboard')}
            </Link>
          )}
          <Link
            to="/materials"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            {t('nav.materials')}
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            {t('nav.about')}
          </Link>
          {isAuthenticated && (role === 'trainer' || role === 'admin') && (
            <Link
              to="/trainer"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-teal-700 bg-teal-50"
            >
              {t('nav.trainer')}
            </Link>
          )}
          {isAuthenticated && role === 'admin' && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-purple-700 bg-purple-50"
            >
              {t('nav.admin')}
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
