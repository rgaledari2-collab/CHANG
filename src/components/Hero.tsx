import React, { useState } from 'react';
import { ArrowLeft, Volume2, Music, Mic, Award } from 'lucide-react';
import { playInstrumentSound } from '../utils/audio';

export const Hero: React.FC = () => {
  const [activeSound, setActiveSound] = useState<string | null>(null);

  const triggerSound = (type: 'piano' | 'tar' | 'child' | 'vocal', label: string) => {
    playInstrumentSound(type);
    setActiveSound(label);
    setTimeout(() => setActiveSound(null), 1500);
  };

  return (
    <section id="top" className="relative bg-[#F4F1EB] text-[#211F1E] pt-16 pb-20 lg:py-24 border-b border-[#D9D2CA] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Cultural Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Main Hero Copy (Right Side in RTL) */}
          <div className="lg:col-span-6 text-right">
            
            {/* Editorial Eyebrow Badge (Paper pink background #F6E4E1 + Vivid red #C93438 text) */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6E4E1] border border-[#D9D2CA] text-[#C93438] text-[13px] font-semibold mb-4 tracking-tight">
              <span className="w-2 h-2 rounded-full bg-[#C93438] animate-pulse" />
              <span>آموزشگاه موسیقی چنگ خرمشهر · از ۱۳۵۰ تا امروز</span>
            </div>

            {/* Editorial Bold Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-bold text-[#211F1E] leading-[1.08] tracking-[-0.03em] mb-6 [text-wrap:balance]">
              صدایت را پیدا کن؛ <br className="hidden sm:inline" />
              <span className="text-[#C93438]">جسور، زنده و روی صحنه.</span>
            </h1>

            {/* Lead: 22px / 26px, weight 400 */}
            <p className="text-xl sm:text-[22px] font-medium text-[#211F1E] leading-[1.35] mb-4 [text-wrap:balance]">
              موسیقی فقط یک مهارت نیست؛ بیانی اصیل از افکار، شور و کاراکتر توست.
            </p>

            {/* Body 17px / 400 */}
            <p className="text-[17px] text-[#6E665E] font-normal leading-[1.5] mb-8 max-w-xl [text-wrap:pretty]">
              آموزش نظام‌مند و ادیتوریال انواع سازهای ایرانی و غربی برای کودکان تا بزرگسالان؛ همراه با اساتید برجسته، مبانی سلفژ و سالن اجرای زنده سالانه.
            </p>

            {/* Primary Vivid Red (#C93438) & Warm Black Ghost Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              
              {/* Primary Vivid Red Button */}
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-[24px] py-[12px] rounded-full text-[17px] font-semibold bg-[#C93438] hover:bg-[#B82A2E] active:scale-95 text-white transition-all duration-150 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C93438]"
              >
                مشاوره و تعیین سطح حضوری
              </a>

              {/* Secondary Ghost Button: Warm Black #211F1E */}
              <a
                href="#courses"
                className="inline-flex items-center justify-center gap-2 px-[24px] py-[12px] rounded-full text-[17px] font-medium text-[#211F1E] hover:text-white border-2 border-[#211F1E] hover:bg-[#211F1E] active:scale-95 transition-all duration-150"
              >
                <span>مشاهده کاتالوگ سازها</span>
                <ArrowLeft className="w-4 h-4" />
              </a>
            </div>

            {/* Sound Chips on Paper Pink / White Card */}
            <div className="pt-6 border-t border-[#D9D2CA]">
              <span className="block text-[14px] text-[#211F1E] font-bold mb-3 flex items-center gap-2">
                <span className="text-[#C93438]">♩</span>
                <span>طنین زنده سازها (برای شنیدن کلیک کنید):</span>
              </span>
              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => triggerSound('piano', 'پیانو')}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white hover:bg-[#F6E4E1] active:scale-95 text-[14px] text-[#211F1E] font-medium transition-all border border-[#D9D2CA] hover:border-[#C93438]"
                >
                  <Music className="w-3.5 h-3.5 text-[#C93438]" />
                  <span>پیانو کلاسیک</span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerSound('tar', 'تار و سه‌تار')}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white hover:bg-[#F6E4E1] active:scale-95 text-[14px] text-[#211F1E] font-medium transition-all border border-[#D9D2CA] hover:border-[#C93438]"
                >
                  <Music className="w-3.5 h-3.5 text-[#C93438]" />
                  <span>تار و سه‌تار</span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerSound('vocal', 'آواز')}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white hover:bg-[#F6E4E1] active:scale-95 text-[14px] text-[#211F1E] font-medium transition-all border border-[#D9D2CA] hover:border-[#C93438]"
                >
                  <Mic className="w-3.5 h-3.5 text-[#C93438]" />
                  <span>آواز و صداسازی</span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerSound('child', 'ارف کودک')}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white hover:bg-[#F6E4E1] active:scale-95 text-[14px] text-[#211F1E] font-medium transition-all border border-[#D9D2CA] hover:border-[#C93438]"
                >
                  <Award className="w-3.5 h-3.5 text-[#C93438]" />
                  <span>ارف و بلز کودکان</span>
                </button>
              </div>

              {activeSound && (
                <p className="mt-3 text-[13px] text-[#C93438] font-medium flex items-center gap-1.5 animate-fade-in">
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                  <span>طنین آزمایشی ساز {activeSound} نواخته شد.</span>
                </p>
              )}
            </div>

          </div>

          {/* Photography-First Showcase */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            {/* Poster Card with Warm Gray border and Editorial shadow */}
            <div className="relative w-full max-w-[560px] rounded-[18px] overflow-hidden apple-product-shadow bg-white border border-[#D9D2CA]">
              <div className="aspect-[4/3] w-full overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1600&q=88"
                  alt="ساز پیانو و کلاس‌های آموزشگاه موسیقی چنگ"
                  className="w-full h-full object-cover"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                
                {/* Editorial Bottom Bar in Warm Black #211F1E */}
                <div className="absolute inset-x-0 bottom-0 bg-[#211F1E]/90 backdrop-blur-md px-6 py-3.5 text-white flex items-center justify-between border-t border-white/10">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C93438]" />
                    <span className="text-[13px] font-medium text-white">سازهای زهی، کلاویه‌ای، کوبه‌ای و سنتی</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => triggerSound('piano', 'پیانو آکوستیک')}
                    className="text-[12px] text-[#F6E4E1] hover:text-[#C93438] flex items-center gap-1 font-semibold transition-colors"
                  >
                    <span>شنیدن پیانو</span>
                    <Volume2 className="w-3.5 h-3.5 text-[#C93438]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Caption in warm tone */}
            <p className="text-[13px] text-[#6E665E] mt-4 text-center font-medium">
              محیط آکوستیک و کلاس‌های آموزش تخصصی در آموزشگاه موسیقی چنگ خرمشهر
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};
