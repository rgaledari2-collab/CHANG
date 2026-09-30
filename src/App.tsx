import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProofStrip } from './components/ProofStrip';
import { Courses } from './components/Courses';
import { Story } from './components/Story';
import { Stats } from './components/Stats';
import { Teachers } from './components/Teachers';
import { SectionDivider } from './components/SectionDivider';
import { Manifesto } from './components/Manifesto';
import { Events } from './components/Events';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { QuickActionBar } from './components/QuickActionBar';
import { Lightbox, LightboxData } from './components/Lightbox';

function MainApp() {
  const [selectedCourseForConsultation, setSelectedCourseForConsultation] = useState<string>('');
  const [lightboxData, setLightboxData] = useState<LightboxData | null>(null);

  return (
    <div className="min-h-screen bg-[#FCF8F8] text-[#202124] selection:bg-[#B92B3A] selection:text-white antialiased flex flex-col font-sans transition-colors duration-200 overflow-x-hidden w-full max-w-full">
      {/* Skip Link for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#B92B3A] focus:text-white focus:rounded-full focus:shadow-lg focus:text-sm font-semibold"
      >
        رفتن به محتوای اصلی
      </a>

      {/* Header with Mobile Drawer Menu */}
      <Header />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-1 overflow-x-hidden w-full max-w-full">
        <Hero />
        <ProofStrip />

        {/* Dedicated Courses & Instruments Department */}
        <Courses onSelectCourse={setSelectedCourseForConsultation} />

        {/* Decorative Wave Divider into Story Section */}
        <SectionDivider preset="courses-to-story" />

        <Story />

        {/* Decorative Architectural Slant Divider from Story into Stats Section */}
        <SectionDivider preset="story-to-stats" />

        <Stats />

        {/* Decorative Layered Soundwave Divider between Stats and Teachers */}
        <SectionDivider preset="stats-to-teachers" />

        <Teachers onOpenLightbox={setLightboxData} />
        <Manifesto />
        <Events onOpenLightbox={setLightboxData} />
        <ContactForm selectedCourse={selectedCourseForConsultation} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* Quick Action Floating Bar (Call, Messengers WhatsApp/Eitaa, Level Assessment Booking) */}
      <QuickActionBar />

      {/* High-Resolution Image Lightbox Modal */}
      <Lightbox data={lightboxData} onClose={() => setLightboxData(null)} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
