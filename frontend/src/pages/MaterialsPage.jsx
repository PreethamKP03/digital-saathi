import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  FileText, Download, BookOpen, Smartphone, CreditCard, 
  ShieldCheck, Landmark, HeartHandshake, ExternalLink 
} from 'lucide-react';

const MaterialsPage = () => {
  const { t, language } = useLanguage();

  const materials = [
    {
      id: 1,
      title: "Computer Basics Printable Handbook",
      category: "Module 1",
      icon: BookOpen,
      size: "1.4 MB",
      format: "PDF Guide",
      desc: "Visual diagram of CPU, keyboard shortcuts, mouse gestures, and file organization for rural beginners."
    },
    {
      id: 2,
      title: "Smartphone Safety & Play Store Cheatsheet",
      category: "Module 2",
      icon: Smartphone,
      size: "850 KB",
      format: "Infographic",
      desc: "Step-by-step illustrations of downloading verified apps and avoiding harmful WhatsApp APK forwards."
    },
    {
      id: 3,
      title: "Safe UPI & QR Code Pocket Card",
      category: "Module 4",
      icon: CreditCard,
      size: "620 KB",
      format: "Pocket Card",
      desc: "The Golden Rule card: 'Never enter UPI PIN to receive money!' with shop QR scanner instructions."
    },
    {
      id: 4,
      title: "Citizen Government Services Guide (DigiLocker & PM-KISAN)",
      category: "Module 5",
      icon: Landmark,
      size: "2.1 MB",
      format: "Handbook",
      desc: "How to carry legal driving licenses on DigiLocker and check PM-KISAN 17th installment status."
    },
    {
      id: 5,
      title: "National Cyber Fraud Protection Poster (Helpline 1930)",
      category: "Module 6",
      icon: ShieldCheck,
      size: "1.1 MB",
      format: "Poster",
      desc: "Emergency action steps for the Golden Hour if an online fraud occurs, and how to spot phishing SMS."
    },
    {
      id: 6,
      title: "Digital Health & Telemedicine Guide (e-Sanjeevani)",
      category: "Module 7",
      icon: HeartHandshake,
      size: "940 KB",
      format: "Guide",
      desc: "How to book online video appointments with MBBS specialists from your village phone without travel."
    }
  ];

  const handleDownload = (mat) => {
    // Generate a quick downloadable printable text file / summary
    const content = `DIGITAL SAATHI - RURAL DIGITAL LITERACY MISSION\n\nTitle: ${mat.title}\nCategory: ${mat.category}\nFormat: ${mat.format}\n\nDescription:\n${mat.desc}\n\nEmergency Cyber Fraud Helpline: 1930\nOfficial Portal: https://digitalsaathi.gov.in\n\n© Digital Saathi Project - All Rights Reserved.`;
    const element = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${mat.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold">
          <FileText className="w-3.5 h-3.5" />
          <span>Free Educational Resources</span>
        </div>
        <h1 className="text-3xl font-extrabold text-saathi-blue-950 tracking-tight">
          Learning Materials & Visual Handbooks
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          Download and print illustrated reference cards, safety guides, and cheatsheets to share with family and community self-help groups.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.map((mat) => {
          const Icon = mat.icon;
          return (
            <div
              key={mat.id}
              className="bg-white rounded-3xl border border-slate-200 hover:border-teal-400 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100 group-hover:scale-105 transition">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    {mat.format}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider block mb-1">
                    {mat.category}
                  </span>
                  <h3 className="font-extrabold text-base text-slate-900 group-hover:text-saathi-blue-900 transition">
                    {mat.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {mat.desc}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400">
                  Size: {mat.size}
                </span>
                <button
                  onClick={() => handleDownload(mat)}
                  className="px-4 py-2 bg-saathi-blue-900 hover:bg-saathi-blue-950 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MaterialsPage;
