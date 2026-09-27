import React from 'react';
import { ArrowLeft, Award, Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section
      id="top"
      role="region"
      aria-labelledby="hero-heading"
      className="relative bg-[#FCF8F8] dark:bg-[#0E1013] text-[#202124] dark:text-white pt-14 pb-18 lg:pt-22 lg:pb-24 border-b border-[#E8DFE0] dark:border-white/10 overflow-hidden transition-colors"
    >
      {/* Subtle ambient light accents in the background (no logo) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#B92B3A]/8 via-[#F3C7CA]/10 to-transparent dark:from-[#B92B3A]/10 dark:via-[#F3C7CA]/5 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true"
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero Copy Container - Fully Centered and Balanced */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
          
          {/* Clean Editorial Kicker */}
          <div className="inline-flex items-center justify-center gap-2 text-[13px] font-semibold text-[#B92B3A] dark:text-[#F3C7CA] mb-6 tracking-tight bg-[#F3C7CA]/30 dark:bg-[#B92B3A]/20 px-4 py-1.5 rounded-full border border-[#E8DFE0] dark:border-white/10 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#B92B3A] animate-pulse" aria-hidden="true" />
            <span>پذیرش هنرجو برای ترم جدید</span>
            <span className="text-[#B92B3A]/40 dark:text-[#F3C7CA]/40 font-light" aria-hidden="true">·</span>
            <span className="text-[#5a626d] dark:text-[#9ca3af] font-medium">آموزش تخصصی از پایه تا اجرای صحنه‌ای</span>
          </div>

          {/* Dynamic Headline with Screen-Reader Accessible Name and Visual Typography Contrast */}
          <h1
            id="hero-heading"
            aria-label="صدایت را پیدا کن؛ جسور، زنده و روی صحنه."
            className="text-3xl sm:text-5xl lg:text-[58px] font-black leading-[1.18] mb-6 [text-wrap:balance]"
          >
            <span
              aria-hidden="true"
              className="block font-extrabold text-[#1a1b1e] dark:text-white tracking-[-0.025em]"
            >
              صدایت را پیدا کن؛
            </span>
            <span
              aria-hidden="true"
              className="block font-black text-[#B92B3A] dark:text-[#F3C7CA] tracking-[-0.03em] mt-2 drop-shadow-[0_1px_3px_rgba(185,43,58,0.15)]"
            >
              جسور، زنده و روی صحنه.
            </span>
          </h1>

          {/* Subhead / Lead */}
          <p className="text-lg sm:text-[22px] font-medium text-[#2d3036] dark:text-[#E8DFE0] leading-[1.6] tracking-[-0.01em] mb-4 max-w-2xl [text-wrap:balance]">
            موسیقی فقط یک مهارت نیست؛ <strong className="font-bold text-[#1a1b1e] dark:text-white">بیانی اصیل</strong> از افکار، آرامش درونی و کاراکتر توست.
          </p>

          {/* Body Paragraph */}
          <p className="text-[15px] sm:text-[17px] text-[#515964] dark:text-[#9ca3af] font-normal leading-[1.85] tracking-normal mb-9 max-w-2xl [text-wrap:pretty]">
            آموزش نظام‌مند انواع <strong className="font-semibold text-[#202328] dark:text-white">سازهای اصیل ایرانی و کلاسیک جهانی</strong> از سطوح پایه تا پیشرفته؛ همراه با اساتید کنسرواتواری، مبانی علمی سلفژ و امکان اجرای زنده در سالن اختصاصی کنسرت‌های هنرجویی خرمشهر.
          </p>

          {/* Action Buttons Centered */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 w-full" role="group" aria-label="اقدامات شروع و مشاوره">
            
            {/* Primary Lacquer Red Button */}
            <a
              href="#contact"
              aria-label="درخواست مشاوره رایگان و تعیین سطح حضوری در آموزشگاه موسیقی چنگ"
              className="inline-flex items-center justify-center px-7 sm:px-9 py-3.5 sm:py-4 rounded-full text-[15px] sm:text-[16px] font-bold tracking-[-0.01em] bg-[#B92B3A] hover:bg-[#A52432] active:scale-95 text-white transition-all duration-150 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B92B3A]"
            >
              مشاوره و تعیین سطح حضوری
            </a>

            {/* Secondary Ghost Button */}
            <a
              href="#courses"
              aria-label="مشاهده کاتالوگ دوره‌های آموزشی و سازهای موسیقی آموزشگاه چنگ"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-[15px] sm:text-[16px] font-semibold tracking-[-0.005em] text-[#202124] dark:text-white hover:text-[#B92B3A] border-2 border-[#202124] dark:border-white/30 hover:border-[#B92B3A] hover:bg-[#F3C7CA]/20 active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#202124]"
            >
              <span>مشاهده کاتالوگ سازها</span>
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </a>

            {/* Mental Health Link Button */}
            <a
              href="#mental-health"
              className="inline-flex items-center justify-center gap-1.5 text-[14px] font-semibold text-[#515964] dark:text-[#d1d5db] hover:text-[#B92B3A] dark:hover:text-[#F3C7CA] px-4 py-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            >
              <HeartHandshake className="w-4 h-4 text-[#B92B3A] dark:text-[#F3C7CA]" />
              <span>موسیقی و سلامت روان</span>
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
