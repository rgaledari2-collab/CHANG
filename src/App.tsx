import React, { useState, useEffect, Suspense, lazy } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { SiteConfigProvider } from './config/SiteConfigContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProofStrip } from './components/ProofStrip';
import { Courses } from './components/Courses';
import { SectionDivider } from './components/SectionDivider';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { QuickActionBar } from './components/QuickActionBar';
import type { LightboxData } from './components/Lightbox';
import type { PaymentReceipt, PaymentFlowMode } from './components/PaymentModal';
import { Course } from './types';

// Lazy-loaded below-the-fold sections & interactive modals for sub-second initial paint
const BranchesStudioTour = lazy(() =>
  import('./components/BranchesStudioTour').then((m) => ({ default: m.BranchesStudioTour }))
);
const HeritageTimeline = lazy(() =>
  import('./components/HeritageTimeline').then((m) => ({ default: m.HeritageTimeline }))
);
const Stats = lazy(() =>
  import('./components/Stats').then((m) => ({ default: m.Stats }))
);
const Teachers = lazy(() =>
  import('./components/Teachers').then((m) => ({ default: m.Teachers }))
);
const Manifesto = lazy(() =>
  import('./components/Manifesto').then((m) => ({ default: m.Manifesto }))
);
const Events = lazy(() =>
  import('./components/Events').then((m) => ({ default: m.Events }))
);
const ConcertPassGenerator = lazy(() =>
  import('./components/ConcertPassGenerator').then((m) => ({ default: m.ConcertPassGenerator }))
);
const ContactForm = lazy(() =>
  import('./components/ContactForm').then((m) => ({ default: m.ContactForm }))
);
const Lightbox = lazy(() =>
  import('./components/Lightbox').then((m) => ({ default: m.Lightbox }))
);
const PaymentModal = lazy(() =>
  import('./components/PaymentModal').then((m) => ({ default: m.PaymentModal }))
);
const AdminDashboardModal = lazy(() =>
  import('./components/AdminDashboardModal').then((m) => ({ default: m.AdminDashboardModal }))
);

function SectionFallback() {
  return (
    <div
      className="w-full py-24 flex items-center justify-center bg-[#FBF9F6] dark:bg-[#0B0909]"
      aria-hidden="true"
    >
      <div className="w-8 h-8 rounded-full border-2 border-[#C29B53]/30 border-t-[#8E1B26] animate-spin" />
    </div>
  );
}

function MainApp() {
  const [selectedCourseForConsultation, setSelectedCourseForConsultation] = useState<string>('');
  const [payingCourse, setPayingCourse] = useState<Course | null>(null);
  const [paymentFlowMode, setPaymentFlowMode] = useState<PaymentFlowMode>('tuition');
  const [lightboxData, setLightboxData] = useState<LightboxData | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Allow opening admin dashboard directly via #admin hash in URL
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleOpenPayment = (course: Course, mode: PaymentFlowMode = 'tuition') => {
    setPaymentFlowMode(mode);
    setPayingCourse(course);
  };

  const handlePaymentSuccess = (receipt: PaymentReceipt) => {
    try {
      const existing = JSON.parse(localStorage.getItem('chang_payment_receipts') || '[]');
      localStorage.setItem('chang_payment_receipts', JSON.stringify([receipt, ...existing]));
    } catch {
      // Ignore storage quota errors
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen w-full max-w-[100vw] overflow-x-hidden flex flex-col bg-[#FBF9F6] dark:bg-[#0B0909] text-[#0B0909] dark:text-[#F4EFEA] selection:bg-[#8E1B26] selection:text-white transition-colors"
    >
      {/* Accessibility Skip to Main Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[100] focus:px-5 focus:py-3 focus:rounded-xl focus:bg-[#8E1B26] focus:text-white focus:font-bold focus:shadow-lg"
      >
        پرش به محتوای اصلی
      </a>

      {/* Top Navigation & Brand Identity */}
      <Header />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-1 overflow-x-hidden w-full max-w-full">
        <Hero />
        <ProofStrip />

        {/* Dedicated Courses & Instruments Department */}
        <Courses 
          onSelectCourse={setSelectedCourseForConsultation} 
          onPayTuition={(course) => handleOpenPayment(course, 'tuition')}
        />

        {/* Lazy-loaded Below-the-Fold Sections */}
        <Suspense fallback={<SectionFallback />}>
          {/* Dual Branch Architectural & Acoustic Studio Tour */}
          <BranchesStudioTour />

          {/* Decorative Wave Divider into Heritage Timeline */}
          <SectionDivider preset="courses-to-story" />

          {/* Archival Museum Timeline (1350 to Present) */}
          <HeritageTimeline />

          {/* Decorative Architectural Slant Divider from Timeline into Stats Section */}
          <SectionDivider preset="story-to-stats" />

          <Stats />

          {/* Decorative Layered Soundwave Divider between Stats and Teachers */}
          <SectionDivider preset="stats-to-teachers" />

          <Teachers onOpenLightbox={setLightboxData} />
          <Manifesto />
          <Events onOpenLightbox={setLightboxData} />

          {/* Luxury Concert Pass & Student Recital Ticket Generator */}
          <ConcertPassGenerator />
          
          {/* Contact, Level Assessment Booking, and Direct Tuition Payment Form */}
          <ContactForm 
            selectedCourse={selectedCourseForConsultation} 
            onOpenPayment={(course, mode) => handleOpenPayment(course, mode)}
          />
        </Suspense>
      </main>

      {/* Footer with Discreet Admin Panel Button */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* Quick Action Floating Bar (Call, Messengers WhatsApp/Eitaa, Level Assessment Booking) */}
      <QuickActionBar />

      {/* Lazy-Loaded Modals (Only downloaded when triggered by user) */}
      <Suspense fallback={null}>
        {Boolean(payingCourse) && (
          <PaymentModal 
            isOpen={Boolean(payingCourse)} 
            course={payingCourse} 
            mode={paymentFlowMode}
            onClose={() => setPayingCourse(null)}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}

        {Boolean(lightboxData) && (
          <Lightbox 
            data={lightboxData} 
            onClose={() => setLightboxData(null)} 
          />
        )}

        {isAdminOpen && (
          <AdminDashboardModal 
            isOpen={isAdminOpen} 
            onClose={() => setIsAdminOpen(false)} 
          />
        )}
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SiteConfigProvider>
        <MainApp />
      </SiteConfigProvider>
    </ThemeProvider>
  );
}
