import React from 'react';
import { ArrowLeft, Award, Sparkles, ShieldCheck } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section
      id="top"
      role="region"
      aria-labelledby="hero-heading"
      className="relative w-full max-w-full bg-[#FCF8F8] dark:bg-[#0E1013] text-[#202124] dark:text-white pt-14 pb-18 lg:pt-20 lg:pb-24 border-b border-[#E8DFE0] dark:border-white/10 overflow-hidden [contain:paint] transition-colors"
    >
      {/* Subtle ambient light accents bounded strictly to viewport */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[520px] lg:w-[700px] h-[220px] sm:h-[300px] lg:h-[350px] max-w-full bg-gradient-to-tr from-[#B92B3A]/8 via-[#F3C7CA]/10 to-transparent dark:from-[#B92B3A]/10 dark:via-[#F3C7CA]/5 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Main Hero Copy Container - Fully Centered and Balanced */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto w-full">
          
          {/* Animated 50 Years Legacy Badge */}
          <div 
            className="relative group inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-[#B92B3A]/10 to-amber-500/10 dark:from-amber-400/15 dark:via-[#B92B3A]/20 dark:to-amber-400/15 border border-amber-500/30 dark:border-amber-400/30 shadow-2xs mb-5 overflow-hidden select-none max-w-[calc(100vw-32px)]"
            title="آموزشگاه موسیقی چنگ خرمشهر؛ تأسیس ۱۳۵۰"
          >
            {/* Continuous Shimmer Light Sweep */}
            <div 
              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 dark:via-white/20 to-transparent pointer-events-none animate-legacy-shimmer"
              aria-hidden="true"
            />

            {/* Glowing Golden Beacon */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600 dark:bg-amber-400" />
            </span>

            <div className="flex items-center gap-1.5 text-[12px] sm:text-[13px] font-bold text-amber-950 dark:text-amber-200">
              <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
              <span>۵۰ سال اصالت در آموزش موسیقی</span>
              <span className="text-amber-600/40 dark:text-amber-400/40 font-light" aria-hidden="true">·</span>
              <span className="font-mono text-[11px] sm:text-[12px] font-extrabold text-amber-800 dark:text-amber-300">
                ۱۳۵۰ — اکنون
              </span>
            </div>
          </div>

          {/* Dynamic Headline - Brand Name */}
          <h1
            id="hero-heading"
            aria-label="آموزشگاه موسیقی چنگ"
            className="text-3xl sm:text-5xl lg:text-6xl font-brand-title leading-[1.2] mb-3 sm:mb-4 tracking-[-0.03em] text-[#1a1b1e] dark:text-white [text-wrap:balance]"
          >
            آموزشگاه موسیقی چنگ
          </h1>

          {/* Featured Motto / Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2 rounded-full bg-gradient-to-r from-[#B92B3A]/10 via-[#B92B3A]/15 to-[#B92B3A]/10 dark:from-[#B92B3A]/25 dark:via-[#B92B3A]/30 dark:to-[#B92B3A]/25 border border-[#B92B3A]/25 dark:border-[#B92B3A]/40 mb-4 shadow-2xs select-none">
            <span className="text-[14px] sm:text-[18px] font-extrabold text-[#B92B3A] dark:text-[#F3C7CA] tracking-tight">
              آموزش اصیل موسیقی؛ از پایه تا شکوهِ صحنه
            </span>
          </div>

          {/* Subhead / Lead - Compact & Focused */}
          <p className="text-[15px] sm:text-[20px] font-medium text-[#2d3036] dark:text-[#E8DFE0] leading-[1.6] tracking-[-0.01em] mb-3 max-w-xl [text-wrap:balance]">
            پداگوژی استاندارد و آموزش تخصصی انواع <strong className="font-bold text-[#1a1b1e] dark:text-white">سازهای ایرانی و جهانی</strong> در خرمشهر.
          </p>

          {/* Body Paragraph - Crisp & Non-cluttered */}
          <p className="text-[13px] sm:text-[16px] text-[#555e6b] dark:text-[#9ca3af] font-normal leading-[1.75] mb-8 max-w-lg [text-wrap:pretty]">
            یادگیری گام‌به‌گام نت‌خوانی، سلفژ و تکنیک با اساتید برجسته؛ همراه با تجربه واقعی اجرا در کنسرت‌های هنرجویی.
          </p>

          {/* Action Buttons Centered */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none" role="group" aria-label="اقدامات شروع و مشاوره">
            
            {/* Primary Lacquer Red Button */}
            <a
              href="#contact"
              aria-label="درخواست مشاوره رایگان و تعیین سطح حضوری در آموزشگاه موسیقی چنگ"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 sm:px-9 py-3.5 sm:py-4 rounded-full text-[15px] sm:text-[16px] font-bold tracking-[-0.01em] bg-[#B92B3A] hover:bg-[#A52432] active:scale-95 text-white transition-all duration-150 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B92B3A]"
            >
              مشاوره و تعیین سطح حضوری
            </a>

            {/* Secondary Ghost Button */}
            <a
              href="#teachers"
              aria-label="مشاهده اساتید و سوابق آموزشی آموزشگاه چنگ"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-[15px] sm:text-[16px] font-semibold tracking-[-0.005em] text-[#202124] dark:text-white hover:text-[#B92B3A] border-2 border-[#202124] dark:border-white/30 hover:border-[#B92B3A] hover:bg-[#F3C7CA]/20 active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#202124]"
            >
              <span>آشنایی با اساتید و سوابق</span>
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          {/* Semantic Trust Indicators Centered */}
          <ul
            aria-label="افتخارات و شاخص‌های کلیدی آموزشگاه"
            className="mt-10 pt-6 border-t border-[#E8DFE0] dark:border-white/10 flex flex-wrap items-center justify-center gap-y-2.5 gap-x-6 sm:gap-x-8 text-[13px] sm:text-[14px] list-none p-0 w-full"
          >
            <li className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B92B3A] dark:text-[#F3C7CA]" aria-hidden="true" />
              <span className="font-extrabold text-[#1a1b1e] dark:text-white tracking-tight">۵۰+ سال</span>
              <span className="font-normal text-[#5a626d] dark:text-[#9ca3af]">پیشینه آموزش آکادمیک</span>
            </li>
            <li aria-hidden="true" className="hidden sm:inline text-[#d1d5db] dark:text-white/20 select-none">•</li>
            <li className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#B92B3A] dark:text-[#F3C7CA]" aria-hidden="true" />
              <span className="font-bold text-[#B92B3A] dark:text-[#F3C7CA] tracking-tight">مدرک رسمی</span>
              <span className="font-normal text-[#5a626d] dark:text-[#9ca3af]">مورد تأیید فرهنگ و ارشاد</span>
            </li>
            <li aria-hidden="true" className="hidden sm:inline text-[#d1d5db] dark:text-white/20 select-none">•</li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#10b981]" aria-hidden="true" />
              <span className="font-bold text-[#1a1b1e] dark:text-white tracking-tight">کنسرت‌های فصلی</span>
              <span className="font-normal text-[#5a626d] dark:text-[#9ca3af]">تجربه اجرای زنده صحنه‌ای</span>
            </li>
          </ul>

        </div>

      </div>
    </section>
  );
};
