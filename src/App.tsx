import React, { useState, useEffect, useMemo, useCallback, Suspense, lazy } from 'react';
import {
  Home,
  ChevronRight,
  ChevronLeft,
  Music,
  GraduationCap,
  History,
  BarChart3,
  Sparkles,
  PhoneCall,
} from 'lucide-react';
import { ThemeProvider } from './context/ThemeContext';
import { SiteConfigProvider } from './config/SiteConfigContext';
import { Header, type ConservatoryViewId } from './components/Header';
import { Hero } from './components/Hero';
import { ProofStrip } from './components/ProofStrip';
import { Courses } from './components/Courses';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { QuickActionBar } from './components/QuickActionBar';
import type { LightboxData } from './components/Lightbox';
import type { PaymentReceipt, PaymentFlowMode } from './components/PaymentModal';
import { COURSES_DATA } from './data';
import { Course } from './types';

// Client-side static courses cache configuration (24-hour TTL + versioned key)
const COURSES_CACHE_KEY = 'chang_static_courses_cache_v2';
const COURSES_CACHE_TTL_MS = 24 * 60 * 60 * 1000;

interface CachedCoursesPayload {
  version: string;
  timestamp: number;
  data: Course[];
}

function getClientCachedCourses(): Course[] {
  if (typeof window === 'undefined') return COURSES_DATA;

  try {
    const raw = localStorage.getItem(COURSES_CACHE_KEY);
    if (raw) {
      const parsed: CachedCoursesPayload = JSON.parse(raw);
      const isFresh = Date.now() - parsed.timestamp < COURSES_CACHE_TTL_MS;
      if (isFresh && Array.isArray(parsed.data) && parsed.data.length > 0) {
        return parsed.data;
      }
    }

    const payload: CachedCoursesPayload = {
      version: 'v2',
      timestamp: Date.now(),
      data: COURSES_DATA,
    };
    localStorage.setItem(COURSES_CACHE_KEY, JSON.stringify(payload));
  } catch {
    // Fallback to in-memory static data if storage is unavailable
  }

  return COURSES_DATA;
}

// Lazy-loaded section stages & interactive modals
const Story = lazy(() =>
  import('./components/Story').then((m) => ({ default: m.Story }))
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
      className="w-full py-28 flex flex-col items-center justify-center gap-3 bg-[#FBF9F6] dark:bg-[#0B0909]"
      aria-hidden="true"
    >
      <div className="w-9 h-9 rounded-full border-2 border-[#C29B53]/30 border-t-[#8E1B26] animate-spin" />
      <span className="text-[12px] font-bold text-[#5C534B] dark:text-[#E5C787]">
        در حال گشودن صحنه سه‌بعدی...
      </span>
    </div>
  );
}

const HALL_METADATA: Record<
  Exclude<ConservatoryViewId, 'home'>,
  {
    title: string;
    subtitle: string;
    kicker: string;
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  courses: {
    title: 'تالار سازها و دوره‌های آموزشی',
    subtitle: 'دپارتمان‌های تخصصی سازهای ایرانی، جهانی، ارف کودکان و آواز در دو شعبه خرمشهر و آبادان',
    kicker: 'دپارتمان‌های آموزشی · صحنه ۱ از ۶',
    icon: Music,
  },
  teachers: {
    title: 'تالار اساتید و کادر علمی کنسرواتوار',
    subtitle: 'آشنایی با اساتید برجسته، سوابق کنسرواتواری و منشور آموزشی آکادمی چنگ',
    kicker: 'کادر علمی و هنری · صحنه ۲ از ۶',
    icon: GraduationCap,
  },
  story: {
    title: 'تالار پیشینه و رسالت فرهنگی چنگ',
    subtitle: 'روایت نیم قرن اصالت و پداگوژی موسیقی در خرمشهر و آبادان از سال ۱۳۵۰ تا امروز',
    kicker: 'میراث و تاریخچه · صحنه ۳ از ۶',
    icon: History,
  },
  stats: {
    title: 'تالار شاخص‌ها و کارنامه رسمی آموزشگاه',
    subtitle: 'گزارش آماری هنرجویان، فارغ‌التحصیلان و اجراهای صحنه‌ای در طول پنج دهه فعالیت',
    kicker: 'کارنامه عملکردی · صحنه ۴ از ۶',
    icon: BarChart3,
  },
  events: {
    title: 'تالار کنسرت‌ها، رسیتال‌ها و صحنه اجرا',
    subtitle: 'آرشیو تصویری اجراهای زنده هنرجویی، ارکسترها و تقویم رویدادهای کنسرواتوار',
    kicker: 'استیج زنده · صحنه ۵ از ۶',
    icon: Sparkles,
  },
  contact: {
    title: 'تالار مشاوره، تعیین سطح حضوری و ثبت‌نام',
    subtitle: 'رزرو نوبت تعیین سطح رایگان در دو شعبه خرمشهر و آبادان و پرداخت آنلاین شهریه',
    kicker: 'پذیرش و ارتباط · صحنه ۶ از ۶',
    icon: PhoneCall,
  },
};

const SUB_HALL_ORDER: Array<Exclude<ConservatoryViewId, 'home'>> = [
  'courses',
  'teachers',
  'story',
  'stats',
  'events',
  'contact',
];

function mapHashToView(hash: string): ConservatoryViewId | null {
  const clean = hash.replace(/^#/, '').trim().toLowerCase();
  if (!clean || clean === 'top' || clean === 'home') return 'home';
  if (clean === 'courses' || clean === 'instruments-preview') return 'courses';
  if (clean === 'teachers') return 'teachers';
  if (clean === 'story' || clean === 'about') return 'story';
  if (clean === 'stats') return 'stats';
  if (clean === 'events') return 'events';
  if (clean === 'contact') return 'contact';
  return null;
}

function MainApp() {
  const [activeView, setActiveView] = useState<ConservatoryViewId>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      return mapHashToView(window.location.hash) || 'home';
    }
    return 'home';
  });
  const [selectedCourseForConsultation, setSelectedCourseForConsultation] = useState<string>('');
  const [payingCourse, setPayingCourse] = useState<Course | null>(null);
  const [paymentFlowMode, setPaymentFlowMode] = useState<PaymentFlowMode>('tuition');
  const [lightboxData, setLightboxData] = useState<LightboxData | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Memoized client-side cached courses data + background image cache warming
  const cachedCourses = useMemo<Course[]>(() => getClientCachedCourses(), []);

  const handleNavigate = useCallback((view: ConservatoryViewId) => {
    setActiveView(view);
    if (typeof window !== 'undefined') {
      const newHash = view === 'home' ? '#home' : `#${view}`;
      if (window.location.hash !== newHash) {
        window.history.pushState(null, '', newHash);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const warmCourseAssets = () => {
      if ('caches' in window) {
        caches
          .open('chang-courses-assets-v1')
          .then((cache) => {
            cachedCourses.forEach((course) => {
              if (course.image && !course.image.startsWith('http')) {
                cache.add(course.image).catch(() => {});
              }
            });
          })
          .catch(() => {});
      }
    };

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(warmCourseAssets);
      return () => window.cancelIdleCallback(id);
    } else {
      const timer = setTimeout(warmCourseAssets, 1200);
      return () => clearTimeout(timer);
    }
  }, [cachedCourses]);

  // Sync URL hash changes (#admin or any 3D view hash) and intercept in-page anchor clicks
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
        return;
      }
      const mapped = mapHashToView(window.location.hash);
      if (mapped) {
        setActiveView(mapped);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    const handleGlobalAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#main-content') return;
      if (href === '#admin') {
        e.preventDefault();
        setIsAdminOpen(true);
        return;
      }
      const mapped = mapHashToView(href);
      if (mapped) {
        e.preventDefault();
        handleNavigate(mapped);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    document.addEventListener('click', handleGlobalAnchorClick);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      document.removeEventListener('click', handleGlobalAnchorClick);
    };
  }, [handleNavigate]);

  const handleSelectCourseForConsultation = useCallback(
    (courseTitle: string) => {
      setSelectedCourseForConsultation(courseTitle);
      handleNavigate('contact');
    },
    [handleNavigate]
  );

  const handleOpenPayment = (course: Course, mode: PaymentFlowMode = 'tuition') => {
    setPaymentFlowMode(mode);
    setPayingCourse(course);
  };

  const handlePaymentSuccess = (receipt: PaymentReceipt) => {
    try {
      const existing = JSON.parse(
        localStorage.getItem('chang_payment_receipts') ||
          localStorage.getItem('chang_payment_records') ||
          '[]'
      );
      const updated = [receipt, ...existing];
      localStorage.setItem('chang_payment_receipts', JSON.stringify(updated));
      localStorage.setItem('chang_payment_records', JSON.stringify(updated));
    } catch {
      // Ignore storage quota errors
    }
  };

  // Determine previous/next sub-hall when inside a dedicated 3D stage
  const currentSubIndex =
    activeView === 'home' ? -1 : SUB_HALL_ORDER.indexOf(activeView);
  const prevHall =
    currentSubIndex > 0
      ? SUB_HALL_ORDER[currentSubIndex - 1]
      : SUB_HALL_ORDER[SUB_HALL_ORDER.length - 1];
  const nextHall =
    currentSubIndex >= 0 && currentSubIndex < SUB_HALL_ORDER.length - 1
      ? SUB_HALL_ORDER[currentSubIndex + 1]
      : SUB_HALL_ORDER[0];

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

      {/* Top Elevated 3D Navigation Header */}
      <Header activeView={activeView} onNavigate={handleNavigate} />

      {/* 3D Spatial Multi-View Stage Container */}
      <main
        id="main-content"
        className="stage-3d-viewport flex-1 overflow-x-hidden w-full max-w-full"
      >
        {activeView === 'home' ? (
          /* =====================================================================
             VIEW 0: SINGLE-PAGE MAIN HALL (صفحه اول تک‌صفحه‌ای بدون اسکرول در بخش‌ها)
             ===================================================================== */
          <Hero key="stage-home" onNavigate={handleNavigate} />
        ) : (
          /* =====================================================================
             VIEWS 1–6: DEDICATED 3D SUB-HALL PORTAL STAGE
             Each section opens in its own elevated 3D stage with Back to Main Hall
             ===================================================================== */
          <div
            key={`stage-${activeView}`}
            className="stage-3d-portal w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-9"
          >
            {/* Sub-Hall Editorial Control Deck */}
            <div className="mb-6 sm:mb-8 rounded-2xl bg-white dark:bg-[#141110] text-[#141414] dark:text-[#f5f0ea] border border-[#E5DDD2] dark:border-white/10 p-5 sm:p-6 shadow-[0_12px_32px_-12px_rgba(20,20,20,0.08)]">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                
                {/* Right: Active Hall Identity */}
                <div className="flex items-start sm:items-center gap-4 text-right">
                  {(() => {
                    const HallIcon = HALL_METADATA[activeView].icon;
                    return (
                      <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-xl bg-[#BF1C2C]/10 dark:bg-[#E04858]/15 text-[#BF1C2C] dark:text-[#E04858] flex items-center justify-center shrink-0">
                        <HallIcon className="w-6 h-6" />
                      </div>
                    );
                  })()}
                  <div>
                    <div className="text-[12px] font-medium text-[#BF1C2C] dark:text-[#E04858] mb-1">
                      {HALL_METADATA[activeView].kicker}
                    </div>
                    <h1 className="font-black text-xl sm:text-2xl lg:text-[28px] text-[#141414] dark:text-[#f5f0ea] tracking-[-0.02em] leading-tight">
                      {HALL_METADATA[activeView].title}
                    </h1>
                    <p className="text-[13px] sm:text-[14px] text-[#5C534B] dark:text-[#B8B0A6] mt-1">
                      {HALL_METADATA[activeView].subtitle}
                    </p>
                  </div>
                </div>

                {/* Left: Back to Main Hall + Prev/Next Stage Switchers */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleNavigate('home')}
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-[13px] font-bold text-white bg-[#BF1C2C] hover:bg-[#9E1523] active:scale-95 shadow-sm transition-all cursor-pointer whitespace-nowrap"
                  >
                    <Home className="w-4 h-4" />
                    <span>بازگشت به تالار اصلی</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleNavigate(prevHall)}
                      className="inline-flex items-center gap-1 px-3 py-2.5 rounded-xl text-[12px] font-bold text-[#141414] dark:text-[#f5f0ea] bg-[#FBF9F6] dark:bg-[#1D1816] border border-[#E5DDD2] dark:border-white/15 hover:border-[#BF1C2C] transition-colors cursor-pointer whitespace-nowrap"
                      title={`صحنه قبلی: ${HALL_METADATA[prevHall].title}`}
                    >
                      <ChevronRight className="w-4 h-4 text-[#BF1C2C] dark:text-[#E04858]" />
                      <span className="hidden sm:inline">صحنه قبلی</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNavigate(nextHall)}
                      className="inline-flex items-center gap-1 px-3 py-2.5 rounded-xl text-[12px] font-bold text-[#141414] dark:text-[#f5f0ea] bg-[#FBF9F6] dark:bg-[#1D1816] border border-[#E5DDD2] dark:border-white/15 hover:border-[#BF1C2C] transition-colors cursor-pointer whitespace-nowrap"
                      title={`صحنه بعدی: ${HALL_METADATA[nextHall].title}`}
                    >
                      <span className="hidden sm:inline">صحنه بعدی</span>
                      <ChevronLeft className="w-4 h-4 text-[#BF1C2C] dark:text-[#E04858]" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Dedicated 3D Architectural Stage Surface */}
            <div className="stage-3d-frame rounded-[32px] overflow-hidden">
              {activeView === 'courses' && (
                <>
                  <ProofStrip />
                  <Courses
                    courses={cachedCourses}
                    onSelectCourse={handleSelectCourseForConsultation}
                    onPayTuition={(course) => handleOpenPayment(course, 'tuition')}
                  />
                </>
              )}

              <Suspense fallback={<SectionFallback />}>
                {activeView === 'teachers' && (
                  <>
                    <Teachers onOpenLightbox={setLightboxData} />
                    <Manifesto />
                  </>
                )}

                {activeView === 'story' && <Story />}

                {activeView === 'stats' && <Stats />}

                {activeView === 'events' && (
                  <Events onOpenLightbox={setLightboxData} />
                )}

                {activeView === 'contact' && (
                  <ContactForm
                    selectedCourse={selectedCourseForConsultation}
                    onOpenPayment={(course, mode) => handleOpenPayment(course, mode)}
                  />
                )}
              </Suspense>
            </div>

            {/* Bottom 3D Stage Navigation Footer Bar */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white/80 dark:bg-[#141110]/90 border border-[#E5DDD2] dark:border-[#C29B53]/25 shadow-md">
              <button
                type="button"
                onClick={() => handleNavigate('home')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8E1B26] hover:bg-[#74141E] text-white text-[12px] sm:text-[13px] font-extrabold shadow-sm transition-all cursor-pointer"
              >
                <Home className="w-4 h-4 text-[#E5C787]" />
                <span>بازگشت به تالار اصلی (صفحه اول)</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleNavigate(prevHall)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F4EFE6] dark:bg-[#1D1816] text-[#0B0909] dark:text-[#F4EFEA] border border-[#E5DDD2] dark:border-[#C29B53]/30 hover:border-[#C29B53] text-[12px] font-bold transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4 text-[#8E1B26] dark:text-[#E5C787]" />
                  <span>{HALL_METADATA[prevHall].title}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNavigate(nextHall)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F4EFE6] dark:bg-[#1D1816] text-[#0B0909] dark:text-[#F4EFEA] border border-[#E5DDD2] dark:border-[#C29B53]/30 hover:border-[#C29B53] text-[12px] font-bold transition-all cursor-pointer"
                >
                  <span>{HALL_METADATA[nextHall].title}</span>
                  <ChevronLeft className="w-4 h-4 text-[#8E1B26] dark:text-[#E5C787]" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer with Discreet Admin Panel Button */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* Quick Action Floating Bar (Call, Messengers WhatsApp/Eitaa, Level Assessment Booking) */}
      <QuickActionBar onOpenConsultation={() => handleNavigate('contact')} />

      {/* Lazy-Loaded Modals */}
      <Suspense fallback={null}>
        {Boolean(payingCourse) && (
          <PaymentModal
            isOpen={Boolean(payingCourse)}
            course={payingCourse}
            mode={paymentFlowMode}
            onClose={() => setPayingCourse(null)}
            onSuccess={handlePaymentSuccess}
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
