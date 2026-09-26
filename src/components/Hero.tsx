import React from 'react';
import { ArrowLeft } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="top" className="relative bg-[#FCF8F8] text-[#202124] pt-16 pb-20 lg:py-24 border-b border-[#E8DFE0] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Copy */}
        <div className="max-w-3xl text-right">
          
          {/* Eyebrow Badge (Light Pink #F3C7CA background + Lacquer Red #B92B3A text) */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3C7CA]/40 border border-[#E8DFE0] text-[#B92B3A] text-[13px] font-bold mb-4 tracking-tight">
            <span className="w-2 h-2 rounded-full bg-[#B92B3A] animate-pulse" />
            <span>آموزشگاه موسیقی چنگ خرمشهر · از ۱۳۵۰ تا امروز</span>
          </div>

          {/* Editorial Bold Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-bold text-[#202124] leading-[1.08] tracking-[-0.03em] mb-6 [text-wrap:balance]">
            صدایت را پیدا کن؛ <br className="hidden sm:inline" />
            <span className="text-[#B92B3A]">جسور، زنده و روی صحنه.</span>
          </h1>

          {/* Lead */}
          <p className="text-xl sm:text-[22px] font-semibold text-[#202124] leading-[1.35] mb-4 [text-wrap:balance]">
            موسیقی فقط یک مهارت نیست؛ بیانی اصیل از افکار، شور و کاراکتر توست.
          </p>

          {/* Body */}
          <p className="text-[17px] text-[#5a626d] font-normal leading-[1.5] mb-8 max-w-2xl [text-wrap:pretty]">
            آموزش نظام‌مند انواع سازهای ایرانی و جهانی برای کودکان تا بزرگسالان؛ همراه با اساتید کنسرواتواری، مبانی سلفژ و سالن اختصاصی کنسرت‌های هنرجویی سالانه.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            
            {/* Primary Lacquer Red Button */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-[24px] py-[12px] rounded-full text-[17px] font-semibold bg-[#B92B3A] hover:bg-[#A52432] active:scale-95 text-white transition-all duration-150 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B92B3A]"
            >
              مشاوره و تعیین سطح حضوری
            </a>

            {/* Secondary Ghost Button */}
            <a
              href="#courses"
              className="inline-flex items-center justify-center gap-2 px-[24px] py-[12px] rounded-full text-[17px] font-semibold text-[#202124] hover:text-[#B92B3A] border-2 border-[#202124] hover:border-[#B92B3A] hover:bg-[#F3C7CA]/20 active:scale-95 transition-all duration-150"
            >
              <span>مشاهده کاتالوگ سازها</span>
              <ArrowLeft className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

