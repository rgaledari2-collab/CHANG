import React, { useState, useEffect, useRef } from 'react';
import { History, GraduationCap, Music, Sparkles, Award } from 'lucide-react';

interface StatItem {
  id: string;
  targetValue: number;
  suffix: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  stepNumber: string;
}

const STATS_ITEMS: StatItem[] = [
  {
    id: 'experience',
    targetValue: 50,
    suffix: '+ سال',
    title: 'سابقه آموزش و اصالت',
    description: 'از دهه ۱۳۵۰ خرمشهر؛ پنج دهه پداگوژی استاندارد، تداوم فرهنگی و آموزش نسل‌ها',
    icon: <History className="w-6 h-6 text-[#B92B3A]" />,
    stepNumber: '۰۱',
  },
  {
    id: 'graduates',
    targetValue: 1450,
    suffix: '+ نفر',
    title: 'هنرجوی فارغ‌التحصیل و موفق',
    description: 'هنرجویانی که دوره‌های آکادمیک را به پایان رسانده و وارد گروه‌ها و کنسرواتوارها شده‌اند',
    icon: <GraduationCap className="w-6 h-6 text-[#B92B3A]" />,
    stepNumber: '۰۲',
  },
  {
    id: 'instruments',
    targetValue: 16,
    suffix: '+ رشته',
    title: 'ساز تخصصی و دوره آموزشی',
    description: 'شامل پیانو، تار، سه‌تار، سنتور، ویولن، گیتار، دف، تنبک، آواز کلاسیک و متد ارف',
    icon: <Music className="w-6 h-6 text-[#B92B3A]" />,
    stepNumber: '۰۳',
  },
  {
    id: 'concerts',
    targetValue: 85,
    suffix: '+ رویداد',
    title: 'کنسرت و رسیتال صحنه‌ای',
    description: 'اجراهای زنده رسمی با حضور خانواده‌ها جهت غلبه بر اضطراب و تجربه واقعی اجرای زنده',
    icon: <Sparkles className="w-6 h-6 text-[#B92B3A]" />,
    stepNumber: '۰۴',
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
  isVisible: boolean;
}

const CounterCard: React.FC<CounterCardProps> = ({ item, isVisible }) => {
  const [currentValue, setCurrentValue] = useState<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // If not visible yet, stay at 0
    if (!isVisible) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setCurrentValue(item.targetValue);
      return;
    }

    const duration = 2000; // ms
    const startTime = performance.now();
    const startValue = 0;
    const endValue = item.targetValue;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease Out Cubic: 1 - (1 - t)^3
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const nextValue = startValue + (endValue - startValue) * easeOutProgress;

      setCurrentValue(nextValue);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setCurrentValue(endValue);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible, item.targetValue]);

  return (
    <div className="bg-white border border-[#E8DFE0] rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#B92B3A]/30 hover:shadow-md transition-all duration-300 group">
      <div>
        {/* Top bar: Icon container + Step indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#FCF8F8] border border-[#E8DFE0] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#FAF0F1] group-hover:border-[#B92B3A]/20 transition-all duration-200">
            {item.icon}
          </div>
          <span className="font-mono text-xs font-semibold text-[#8996A6] tracking-wider">
            {item.stepNumber}
          </span>
        </div>

        {/* Counter Display */}
        <div className="mb-3 flex items-baseline gap-1.5 flex-wrap">
          <span 
            className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#202124] tracking-tight tabular-nums"
            aria-label={`${item.targetValue} ${item.suffix}`}
          >
            {formatPersianNumber(currentValue)}
          </span>
          <span className="text-lg sm:text-xl font-bold text-[#B92B3A] tracking-tight">
            {item.suffix}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-[#202124] mb-2 leading-snug">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#5F6368] leading-relaxed font-normal">
          {item.description}
        </p>
      </div>

      {/* Bottom subtle progress line */}
      <div className="mt-6 pt-4 border-t border-[#F2ECEC] flex items-center justify-between text-xs text-[#8996A6]">
        <span className="inline-flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-[#B92B3A]" />
          <span>شاخص رسمی چنگ</span>
        </span>
        <span className="text-[11px] text-[#A0AAB5]">مستند و تاییدشده</span>
      </div>
    </div>
  );
};

export const Stats: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Trigger once
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-24 bg-[#FCF8F8] border-b border-[#E8DFE0] relative"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#B92B3A] tracking-wider uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B92B3A]" />
            <span>شاخص‌های عملکردی و اعتبار آکادمیک</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#202124] tracking-tight leading-tight mb-4">
            اعدادی که گواه پنج دهه تعهد به هنر موسیقی هستند
          </h2>

          <p className="text-base sm:text-lg text-[#5F6368] leading-relaxed">
            کارنامه نیم قرن آموزش مستمر در خرمشهر؛ اعدادی که تفاوت یک مرکز آکادمیک اصیل را در عمل نشان می‌دهند.
          </p>
        </div>

        {/* Clean Responsive Grid with Animated Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {STATS_ITEMS.map((item) => (
            <CounterCard key={item.id} item={item} isVisible={isVisible} />
          ))}
        </div>

        {/* Quiet footnote note */}
        <div className="mt-10 text-center text-xs text-[#8996A6]">
          <span>
            * اطلاعات و آمار بر اساس سوابق و پرونده‌های فارغ‌التحصیلی هنرجویان آموزشگاه موسیقی چنگ خرمشهر استخراج شده است.
          </span>
        </div>

      </div>
    </section>
  );
};
