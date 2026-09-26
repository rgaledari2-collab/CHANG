import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProofStrip } from './components/ProofStrip';
import { Courses } from './components/Courses';
import { Story } from './components/Story';
import { Stats } from './components/Stats';
import { Teachers } from './components/Teachers';
import { Manifesto } from './components/Manifesto';
import { Events } from './components/Events';
import { Testimonials } from './components/Testimonials';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { Lightbox, LightboxData } from './components/Lightbox';

export default function App() {
  const [selectedCourseForConsultation, setSelectedCourseForConsultation] = useState<string>('');
  const [lightboxData, setLightboxData] = useState<LightboxData | null>(null);

  const handleSelectCourse = (courseTitle: string) => {
    setSelectedCourseForConsultation(courseTitle);
    // Smooth scroll into contact section
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF8F8] text-[#202124] selection:bg-[#B92B3A] selection:text-white antialiased flex flex-col font-sans">
      {/* Skip Link for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#B92B3A] focus:text-white focus:rounded-full focus:shadow-lg focus:text-sm font-semibold"
      >
        رفتن به محتوای اصلی
      </a>

      {/* Header */}
      <Header />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-1">
        <Hero />
        <ProofStrip />
        <Courses onSelectCourseForConsultation={handleSelectCourse} />
        <Story />
        <Stats />
        <Teachers onOpenLightbox={setLightboxData} />
        <Manifesto />
        <Events onOpenLightbox={setLightboxData} />
        <Testimonials />
        <ContactForm selectedCourse={selectedCourseForConsultation} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* High-Resolution Image Lightbox Modal */}
      <Lightbox data={lightboxData} onClose={() => setLightboxData(null)} />
    </div>
  );
}
