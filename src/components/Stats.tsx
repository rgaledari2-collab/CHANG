import React, { useState, useEffect, useRef } from 'react';
import { History, GraduationCap, Music, Sparkles, Award, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

interface StatItem {
  id: string;
  targetValue: number;
  suffix: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  stepNumber: string;
  detail: string;
}

const STATS_ITEMS: StatItem[] = [
  {
    id: 'experience',
    targetValue: 50,
    suffix: '+ سال',
    title: 'سابقه آموزش و اصالت',
    description: 'از دهه ۱۳۵۰ خرمشهر؛ پنج دهه پداگوژی استاندارد، تداوم فرهنگی و آموزش نسل‌ها',
    icon: <History className="w-6 h-6 text-[#B92B3A] dark:text-[#F3C7CA]" />,
    stepNumber: '۰۱',
    detail: 'بیش از نیم قرن تداوم فرهنگی'
  },
  {
    id: 'graduates',
    targetValue: 1450,
    suffix: '+ نفر',
    title: 'هنرجوی فارغ‌التحصیل و موفق',
    description: 'هنرجویانی که دوره‌های آکادمیک را به پایان رسانده و وارد کنسرواتوارها و ارکسترها شده‌اند',
    icon: <GraduationCap className="w-6 h-6 text-[#B92B3A] dark:text-[#F3C7CA]" />,
    stepNumber: '۰۲',
    detail: 'دارای پرونده فارغ‌التحصیلی معتبر'
  },
  {
    id: 'instruments',
    targetValue: 16,
    suffix: '+ ساز',
    title: 'ساز تخصصی و دوره آموزشی',
    description: 'شامل پیانو، تار، سه‌تار، سنتور، ویولن، گیتار، دف، تنبک، آواز کلاسیک و متد ارف',
    icon: <Music className="w-6 h-6 text-[#B92B3A] dark:text-[#F3C7CA]" />,
    stepNumber: '۰۳',
    detail: 'آموزش سازهای ایرانی و جهانی'
  },
  {
    id: 'concerts',
    targetValue: 85,
    suffix: '+ کنسرت',
    title: 'کنسرت و رسیتال صحنه‌ای',
    description: 'اجراهای زنده رسمی با حضور خانواده‌ها جهت غلبه بر اضطراب صحنه و تجربه حرفه‌ای استیج',
    icon: <Sparkles className="w-6 h-6 text-[#B92B3A] dark:text-[#F3C7CA]" />,
    stepNumber: '۰۴',
    detail: 'سالن اختصاصی اجراهای هنرجویی'
  },
];

// Helper to convert numbers to Persian digits with standard separators
function formatPersianNumber(value: number): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const formatted = Math.floor(value)
    .toLocaleString('en-US')
    .replace(/\d/g, (d) => persianDigits[parseInt(d, 10)])
    .replace(/,/g, '،');
  return formatted;
}

interface CounterCardProps {
  item: StatItem;
  index: number;
}

const CounterCard: React.FC<CounterCardProps> = ({ item, index }) => {
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  useEffect(() => {
    const cardEl = cardRef.current;
    if (!cardEl) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      setCurrentValue(item.targetValue);
      setIsCompleted(true);
      return;
    }

    // On mobile screens, immediately reveal to prevent any loading delays
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    if (isMobile) {
      setIsVisible(true);
      setCurrentValue(item.targetValue);
      setIsCompleted(true);
      return;
    }

    // Animation runner using RequestAnimationFrame with smooth Quintic Ease-Out
    const startCounterAnimation = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;
      setIsVisible(true);

      const duration = 2000; // 2 seconds animation
      let startTime: number | null = null;
      const startValue = 0;
      const endValue = item.targetValue;

      // Small initial delay based on card index for a natural cascading wave effect
      const startDelay = index * 140;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp + startDelay;

        // Waiting for cascade delay
        if (timestamp < startTime) {
          requestAnimationFrame(animate);
          return;
        }

        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Quintic Ease-Out: 1 - (1 - t)^5 (super smooth deceleration)
        const easeOut = 1 - Math.pow(1 - progress, 5);
        const next = Math.floor(startValue + (endValue - startValue) * easeOut);

        setCurrentValue(next);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCurrentValue(endValue);
          setIsCompleted(true);
        }
      };

      requestAnimationFrame(animate);
    };

    // IntersectionObserver to trigger fade-in & counting animation on scroll into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            startCounterAnimation();
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15, // Triggers when 15% of the card is visible in the viewport
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(cardEl);

    return () => {
      observer.disconnect();
    };
  }, [item.targetValue, index]);

  const progressPercent = Math.min((currentValue / item.targetValue) * 100, 100);

  return (
    <div
      ref={cardRef}
      style={{
        transitionDelay: `${index * 130}ms`,
      }}
      className={`bg-white dark:bg-[#171A21] border border-[#E8DFE0] dark:border-white/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#B92B3A]/40 dark:hover:border-[#B92B3A]/60 hover:shadow-lg transition-all duration-700 ease-out group relative overflow-hidden will-change-transform ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-8 scale-[0.98] pointer-events-none'
      }`}
    >
      {/* Top ambient highlight on hover */}
      <div 
        className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#B92B3A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
        aria-hidden="true" 
      />

      <div>
        {/* Top bar: Icon container + Step indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#FAF0F1] dark:bg-[#B92B3A]/15 border border-[#E8DFE0] dark:border-white/10 flex items-center justify-center group-hover:scale-105 group-hover:bg-[#F3C7CA]/30 transition-all duration-200 shadow-2xs">
            {item.icon}
          </div>
          <span className="font-mono text-[12px] font-bold text-[#8996A6] dark:text-[#9ca3af] tracking-wider">
            {item.stepNumber}
          </span>
        </div>

        {/* Counter Display with Real-Time Number Ticker */}
        <div className="mb-3 flex items-baseline gap-2 flex-wrap">
          <span
            className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#1a1b1e] dark:text-white tracking-tight tabular-nums"
            aria-live="polite"
            aria-label={`${item.targetValue} ${item.suffix}`}
          >
            {formatPersianNumber(currentValue)}
          </span>
          <span className="text-lg sm:text-xl font-extrabold text-[#B92B3A] dark:text-[#F3C7CA] tracking-tight">
            {item.suffix}
          </span>
        </div>

        {/* Dynamic Animated Progress Bar */}
        <div 
          className="w-full h-1.5 bg-[#FAF0F1] dark:bg-white/10 rounded-full overflow-hidden mb-4" 
          aria-hidden="true"
        >
          <div
            className="h-full bg-gradient-to-r from-[#B92B3A] to-[#D9384A] rounded-full transition-all duration-75"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-[18px] font-bold text-[#1a1b1e] dark:text-white mb-2 leading-snug">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-[13px] sm:text-[14px] text-[#555e6b] dark:text-[#9ca3af] leading-relaxed font-normal">
          {item.description}
        </p>
      </div>

      {/* Bottom status line */}
      <div className="mt-6 pt-4 border-t border-[#F2ECEC] dark:border-white/10 flex items-center justify-between text-xs text-[#8996A6] dark:text-[#9ca3af]">
        <span className="inline-flex items-center gap-1.5">
          {isCompleted ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          ) : (
            <TrendingUp className="w-3.5 h-3.5 text-[#B92B3A] dark:text-[#F3C7CA] shrink-0" />
          )}
          <span className="font-medium text-[#202124] dark:text-white">{item.detail}</span>
        </span>
        <span className="text-[11px] text-[#8996A6] dark:text-[#9ca3af]">تأییدشده</span>
      </div>
    </div>
  );
};

export const Stats: React.FC = () => {
  const sectionRef = useRevealOnScroll<HTMLElement>();

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-24 bg-[#FCF8F8] dark:bg-[#0E1013] border-b border-[#E8DFE0] dark:border-white/10 relative transition-colors overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Reveal-on-Scroll */}
        <div 
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 reveal-on-scroll"
        >
          <div className="inline-flex items-center gap-2 text-[13px] font-bold text-[#B92B3A] dark:text-[#F3C7CA] tracking-tight bg-[#F3C7CA]/30 dark:bg-[#B92B3A]/20 px-4 py-1.5 rounded-full border border-[#E8DFE0] dark:border-white/10 shadow-2xs mb-3">
            <Award className="w-4 h-4 text-[#B92B3A] dark:text-[#F3C7CA]" />
            <span>شاخص‌های عملکردی و اعتبار آکادمیک</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-black text-[#1a1b1e] dark:text-white tracking-tight leading-[1.2] mb-4">
            اعدادی که گواه پنج دهه تعهد به هنر موسیقی هستند
          </h2>

          <p className="text-base sm:text-[18px] text-[#555e6b] dark:text-[#9ca3af] leading-relaxed">
            کارنامه نیم قرن آموزش مستمر در خرمشهر؛ اعدادی که تفاوت یک مرکز آکادمیک اصیل را در عمل نشان می‌دهند.
          </p>
        </div>

        {/* Clean Responsive Grid with Animated Counters and Staggered Fade-in */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {STATS_ITEMS.map((item, index) => (
            <CounterCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Quiet footnote note */}
        <div className="mt-10 text-center text-xs text-[#8996A6] dark:text-[#9ca3af]">
          <span>
            * اطلاعات و آمار بر اساس سوابق و پرونده‌های فارغ‌التحصیلی هنرجویان آموزشگاه موسیقی چنگ خرمشهر از سال ۱۳۵۰ تا کنون استخراج شده است.
          </span>
        </div>

      </div>
    </section>
  );
};
