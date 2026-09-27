import React from 'react';
import { ArrowLeft, Award, Sparkles } from 'lucide-react';
import { CHANG_HEADER_LOGO_DATA_URI } from '../assets/logoData';

export const Hero: React.FC = () => {
  return (
    <section
      id="top"
      role="region"
      aria-labelledby="hero-heading"
      className="relative bg-[#FCF8F8] text-[#202124] pt-16 pb-16 lg:pt-24 lg:pb-24 border-b border-[#E8DFE0] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Copy Container */}
        <div className="max-w-3xl text-right">
          
          {/* Eyebrow Badge with semantic label and official logo */}
          <div
            role="status"
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#F3C7CA]/40 border border-[#E8DFE0] text-[#B92B3A] text-[13px] mb-5 shadow-xs"
          >
            <span className="w-5 h-5 rounded-full overflow-hidden bg-white flex items-center justify-center border border-[#B92B3A]/30 shrink-0">
              <img 
                src={CHANG_HEADER_LOGO_DATA_URI} 
                alt="لوگوی چنگ" 
                className="w-full h-full object-contain" 
              />
            </span>
            <span className="font-bold tracking-tight">آموزشگاه موسیقی چنگ خرمشهر</span>
            <span className="text-[#B92B3A]/60 font-light" aria-hidden="true">·</span>
            <span className="font-medium text-[#8E1C29] tracking-normal">از ۱۳۵۰ تا امروز</span>
          </div>

          {/* Dynamic Headline with Screen-Reader Accessible Name and Visual Typography Contrast */}
          <h1
            id="hero-heading"
            aria-label="صدایت را پیدا کن؛ جسور، زنده و روی صحنه."
            className="text-4xl sm:text-5xl lg:text-[62px] leading-[1.18] mb-6 [text-wrap:balance]"
          >
            <span
              aria-hidden="true"
              className="block font-extrabold text-[#1a1b1e] tracking-[-0.02em]"
            >
              صدایت را پیدا کن؛
            </span>
            <span
              aria-hidden="true"
              className="block font-black text-[#B92B3A] tracking-[-0.028em] mt-1.5 drop-shadow-[0_1px_2px_rgba(185,43,58,0.12)]"
            >
              جسور، زنده و روی صحنه.
            </span>
          </h1>

          {/* Subhead / Lead: Medium-bold hierarchy bridge with tuned line-height */}
          <p className="text-lg sm:text-[22px] font-medium text-[#2d3036] leading-[1.6] tracking-[-0.01em] mb-4 [text-wrap:balance]">
            موسیقی فقط یک مهارت نیست؛ <strong className="font-bold text-[#1a1b1e]">بیانی اصیل</strong> از افکار، شور و کاراکتر توست.
          </p>

          {/* Body Paragraph: Relaxed leading and neutral tracking for optimal Persian readability */}
          <p className="text-[16px] sm:text-[17px] text-[#515964] font-normal leading-[1.78] tracking-normal mb-8 max-w-2xl [text-wrap:pretty]">
            آموزش نظام‌مند انواع <strong className="font-semibold text-[#202328]">سازهای اصیل ایرانی و کلاسیک جهانی</strong> از سطوح پایه تا پیشرفته؛ همراه با اساتید کنسرواتواری، مبانی علمی سلفژ و امکان اجرای زنده در سالن اختصاصی کنسرت‌های هنرجویی.
          </p>

          {/* Action Buttons with Descriptive ARIA Labels and Accessible Focus States */}
          <div className="flex flex-wrap items-center gap-4" role="group" aria-label="اقدامات شروع و مشاوره">
            
            {/* Primary Lacquer Red Button */}
            <a
              href="#contact"
              aria-label="درخواست مشاوره رایگان و تعیین سطح حضوری در آموزشگاه موسیقی چنگ"
              className="inline-flex items-center justify-center px-[28px] py-[13px] rounded-full text-[16px] sm:text-[17px] font-bold tracking-[-0.01em] bg-[#B92B3A] hover:bg-[#A52432] active:scale-95 text-white transition-all duration-150 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B92B3A]"
            >
              مشاوره و تعیین سطح حضوری
            </a>

            {/* Secondary Ghost Button */}
            <a
              href="#courses"
              aria-label="مشاهده کاتالوگ دوره‌های آموزشی و سازهای موسیقی آموزشگاه چنگ"
              className="inline-flex items-center justify-center gap-2 px-[26px] py-[13px] rounded-full text-[16px] sm:text-[17px] font-semibold tracking-[-0.005em] text-[#202124] hover:text-[#B92B3A] border-2 border-[#202124] hover:border-[#B92B3A] hover:bg-[#F3C7CA]/20 active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#202124]"
            >
              <span>مشاهده کاتالوگ سازها</span>
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          {/* Semantic Trust Indicators with Accessible List Markup */}
          <ul
            aria-label="افتخارات و شاخص‌های کلیدی آموزشگاه"
            className="mt-10 pt-6 border-t border-[#E8DFE0] flex flex-wrap items-center gap-y-3 gap-x-6 text-[13px] list-none p-0"
          >
            <li className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B92B3A]" aria-hidden="true" />
              <span className="font-extrabold text-[#1a1b1e] tracking-tight">۵۰+ سال</span>
              <span className="font-normal text-[#5a626d]">پیشینه آموزش آکادمیک</span>
            </li>
            <li aria-hidden="true" className="hidden sm:inline text-[#d1d5db] select-none">•</li>
            <li className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#B92B3A]" aria-hidden="true" />
              <span className="font-bold text-[#B92B3A] tracking-tight">مدرک رسمی</span>
              <span className="font-normal text-[#5a626d]">مورد تأیید فرهنگ و ارشاد</span>
            </li>
            <li aria-hidden="true" className="hidden sm:inline text-[#d1d5db] select-none">•</li>
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" aria-hidden="true" />
              <span className="font-bold text-[#1a1b1e] tracking-tight">کنسرت‌های فصلی</span>
              <span className="font-normal text-[#5a626d]">تجربه اجرای زنده صحنه‌ای</span>
            </li>
          </ul>

        </div>

      </div>
    </section>
  );
};



