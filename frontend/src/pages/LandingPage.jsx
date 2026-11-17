import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import SafeUpiSimulator from '../components/SafeUpiSimulator';
import { 
  GraduationCap, Smartphone, Monitor, ShieldCheck, Landmark, 
  Mail, HeartHandshake, CreditCard, ArrowRight, CheckCircle2, 
  Users, Award, Sparkles, PhoneCall, Globe2, BookOpen, ChevronRight 
} from 'lucide-react';

const LandingPage = () => {
  const { t, language } = useLanguage();
  const { isAuthenticated } = useAuth();

  const moduleCards = [
    {
      num: 1,
      title: language === 'kn' ? "ಕಂಪ್ಯೂಟರ್ ಮೂಲಗಳು" : language === 'hi' ? "कंप्यूटर की मूल बातें" : "Module 1: Computer Basics",
      desc: "Hardware, software, mouse navigation, folder management, and safe shutdown.",
      icon: Monitor,
      color: "from-blue-600 to-indigo-600",
      badge: "Foundations"
    },
    {
      num: 2,
      title: language === 'kn' ? "ಸ್ಮಾರ್ಟ್‌ಫೋನ್ ಕಲಿಕೆ" : language === 'hi' ? "स्मार्टफोन सीखना" : "Module 2: Smartphone Learning",
      desc: "Android essentials, Google Play Store app downloads, WiFi, and phone settings.",
      icon: Smartphone,
      color: "from-teal-600 to-emerald-600",
      badge: "Mobile Essentials"
    },
    {
      num: 3,
      title: language === 'kn' ? "ಇಂಟರ್ನೆಟ್ ಮತ್ತು ಇಮೇಲ್" : language === 'hi' ? "इंटरनेट और ईमेल" : "Module 3: Internet & Email",
      desc: "Web browsing, searching information safely, Gmail accounts, and sending documents.",
      icon: Mail,
      color: "from-sky-600 to-cyan-600",
      badge: "Communication"
    },
    {
      num: 4,
      title: language === 'kn' ? "ಡಿಜಿಟಲ್ ಪಾವತಿಗಳು" : language === 'hi' ? "डिजिटल भुगतान" : "Module 4: Digital Payments",
      desc: "UPI, Google Pay, PhonePe, scanning shop QR codes, and avoiding payment fraud.",
      icon: CreditCard,
      color: "from-emerald-600 to-green-700",
      badge: "Financial Safety"
    },
    {
      num: 5,
      title: language === 'kn' ? "ಸರ್ಕಾರಿ ಆನ್‌ಲೈನ್ ಸೇವೆಗಳು" : language === 'hi' ? "सरकारी सेवाएं" : "Module 5: Government Online Services",
      desc: "DigiLocker, PM-KISAN, Ration Card, RTC land records, and online certificates.",
      icon: Landmark,
      color: "from-amber-600 to-orange-600",
      badge: "Citizen Services"
    },
    {
      num: 6,
      title: language === 'kn' ? "ಸೈಬರ್ ಸುರಕ್ಷತೆ" : language === 'hi' ? "साइबर सुरक्षा" : "Module 6: Cybersecurity & Safety",
      desc: "Identifying fake lottery SMS, OTP protection, and reporting fraud to Helpline 1930.",
      icon: ShieldCheck,
      color: "from-rose-600 to-red-600",
      badge: "Cyber Defense"
    },
    {
      num: 7,
      title: language === 'kn' ? "ಆನ್‌ಲೈನ್ ಶಿಕ್ಷಣ ಮತ್ತು ಆರೋಗ್ಯ" : language === 'hi' ? "ऑनलाइन शिक्षा व स्वास्थ्य" : "Module 7: Education & Healthcare",
      desc: "Free learning portals (DIKSHA, SWAYAM), ABHA Health Card, and e-Sanjeevani doctor calls.",
      icon: HeartHandshake,
      color: "from-purple-600 to-violet-600",
      badge: "Social Welfare"
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-saathi-blue-50/70 via-white to-slate-50 pt-12 pb-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-100/80 border border-teal-300 text-teal-900 text-xs font-bold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-teal-700" />
                <span>{t('hero.badge')}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-saathi-blue-950 tracking-tight leading-tight">
                {t('tagline')}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                {t('subtagline')}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start pt-2">
                <Link
                  to={isAuthenticated ? "/dashboard" : "/register"}
                  className="w-full sm:w-auto px-7 py-3.5 bg-saathi-blue-900 hover:bg-saathi-blue-950 text-white rounded-xl font-bold text-sm shadow-xl shadow-saathi-blue-900/25 flex items-center justify-center gap-2 transition hover:-translate-y-0.5"
                >
                  <span>{t('hero.startLearning')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/courses"
                  className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 rounded-xl font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition"
                >
                  <BookOpen className="w-4 h-4 text-saathi-blue-700" />
                  <span>{t('hero.exploreCourses')}</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <p className="text-xl sm:text-2xl font-extrabold text-saathi-blue-900">7+</p>
                  <p className="text-[11px] text-slate-500 font-medium">Core Modules</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-extrabold text-teal-700">3</p>
                  <p className="text-[11px] text-slate-500 font-medium">Languages (EN/KN/HI)</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-extrabold text-emerald-700">100%</p>
                  <p className="text-[11px] text-slate-500 font-medium">Free & Safe</p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Safe UPI Sandbox Preview */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-saathi-blue-600 rounded-3xl blur-xl opacity-20"></div>
                <div className="relative">
                  <SafeUpiSimulator />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEARNING MODULES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full uppercase tracking-wider">
            {t('common.modules')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-saathi-blue-950">
            Step-by-Step Curriculum for Everyday Independence
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Practical, easy-to-understand modules created specifically for rural citizens with visual guides and voice explanations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {moduleCards.map((module) => {
            const Icon = module.icon;
            return (
              <div
                key={module.num}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-saathi-blue-300 shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center text-white shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {module.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 group-hover:text-saathi-blue-900 transition">
                      {module.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {module.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400">
                    Includes Quiz & Certificate
                  </span>
                  <Link
                    to="/courses"
                    className="flex items-center gap-1 text-xs font-bold text-saathi-blue-900 hover:text-teal-700 transition"
                  >
                    <span>View Lessons</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* BENEFICIARIES TARGET GROUPS */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">
              Empowering Every Rural Household
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Designed For Real Rural Needs
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                🌾
              </div>
              <h3 className="font-bold text-sm">Farmers (ರೈತರು)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Check PM-KISAN cash transfer, view RTC land records online, and consult weather & crop advisories directly.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
                👩‍🌾
              </div>
              <h3 className="font-bold text-sm">Rural Women (SHG)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Learn online banking for self-help groups, access Gruha Lakshmi and welfare schemes safely without middlemen.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                👴
              </div>
              <h3 className="font-bold text-sm">Village Elders (ಹಿರಿಯರು)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Stay safe from telephone fraud, consult specialist doctors on e-Sanjeevani video calls, and access pension records.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                🎓
              </div>
              <h3 className="font-bold text-sm">Students & Beginners</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Access DIKSHA digital textbooks, learn computer operations, and earn verified Digital Saathi graduation certificates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NATIONAL CYBERSECURITY HELPLINE 1930 AWARENESS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-red-600 via-rose-700 to-red-800 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-3">
              <span className="bg-white/20 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                National Cyber Crime Awareness
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Lost Money to an Online Fraud? Act in the "Golden Hour"!
              </h2>
              <p className="text-xs sm:text-sm text-red-100 max-w-xl leading-relaxed">
                If an unauthorized bank transaction occurred, immediately dial <strong>1930</strong> (Toll-Free). Reporting within the first 2 hours allows the cyber police to freeze the fraudster's bank account and rescue your money.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col items-center justify-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
              <p className="text-xs font-semibold text-red-100">National Helpline Number</p>
              <a href="tel:1930" className="text-4xl font-black text-amber-300 tracking-wider my-1 hover:scale-105 transition">
                1930
              </a>
              <p className="text-[11px] text-red-200">24x7 Citizen Cyber Assistance</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
