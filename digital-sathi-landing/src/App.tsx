import React, { useState, useEffect, useCallback } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { DownloadSection } from './components/DownloadSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { GetStartedModal } from './components/GetStartedModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { LegalModal } from './components/LegalModal';
import { Toast } from './components/Toast';
import { ServiceGuideItem } from './types';

export const App: React.FC = () => {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [getStartedOpen, setGetStartedOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceGuideItem | null>(null);
  const [legalDoc, setLegalDoc] = useState<'privacy' | 'terms' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 4500);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  // Close active modal on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setGetStartedOpen(false);
        setSelectedService(null);
        setLegalDoc(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleStoreClick = (storeName: string) => {
    triggerToast(
      `The Digital Sathi ${storeName} app link is a placeholder and will be available soon.`
    );
  };

  const handleSocialPlaceholder = (platform: string) => {
    triggerToast(`${platform} link is a placeholder until official channels are published.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-700">
      {/* Top Announcement Bar */}
      <AnnouncementBar
        visible={showAnnouncement}
        onDismiss={() => setShowAnnouncement(false)}
      />

      {/* Sticky Responsive Navigation Bar */}
      <Navbar onGetStarted={() => setGetStartedOpen(true)} />

      {/* Main Content */}
      <main className="flex-1">
        <HeroSection onGetStarted={() => setGetStartedOpen(true)} />
        <FeaturesSection onSelectService={(service) => setSelectedService(service)} />
        <HowItWorksSection />
        <WhyChooseSection />
        <TestimonialsSection />
        <DownloadSection onStorePlaceholderClick={handleStoreClick} />
        <FaqSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenLegal={(doc) => setLegalDoc(doc)}
        onSocialPlaceholder={handleSocialPlaceholder}
      />

      {/* Interactive Modals & Toast */}
      <GetStartedModal
        open={getStartedOpen}
        onClose={() => setGetStartedOpen(false)}
      />
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
      <LegalModal
        docType={legalDoc}
        onClose={() => setLegalDoc(null)}
      />
      <Toast
        message={toastMessage}
        onDismiss={() => setToastMessage(null)}
      />
    </div>
  );
};

export default App;
