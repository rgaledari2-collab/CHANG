import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Volume2, Music, Mic, Award } from 'lucide-react';
import { playInstrumentSound } from '../utils/audio';

export const Hero: React.FC = () => {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Check user preference for reduced motion
  useEffect(() => {
    if (typeof window !== 'undefined' && 'matchMedia' in window) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const listener = (event: MediaQueryListEvent) => {
        setPrefersReducedMotion(event.matches);
      };

      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  // Safe muted autoplay
  useEffect(() => {
    if (!prefersReducedMotion && videoRef.current) {
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Video autoplay prevented:', error);
        });
      }
    }
  }, [prefersReducedMotion]);

  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const triggerSound = (type: 'piano' | 'tar' | 'child' | 'vocal', label: string) => {
    playInstrumentSound(type);
    setActiveSound(label);
    setTimeout(() => setActiveSound(null), 1500);
  };

  return (
    <section id="top" className="relative bg-[#FCF8F8] text-[#202124] pt-16 pb-20 lg:py-24 border-b border-[#E8DFE0] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Cultural Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Main Hero Copy (Right Side in RTL) */}
          <div className="lg:col-span-6 text-right">
            
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
            <p className="text-[17px] text-[#5a626d] font-normal leading-[1.5] mb-8 max-w-xl [text-wrap:pretty]">
              آموزش نظام‌مند انواع سازهای ایرانی و جهانی برای کودکان تا بزرگسالان؛ همراه با اساتید کنسرواتواری، مبانی سلفژ و سالن اختصاصی کنسرت‌های هنرجویی سالانه.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              
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

            {/* Sound Chips on White Card / Subtle Border */}
            <div className="pt-6 border-t border-[#E8DFE0]">
              <span className="block text-[14px] text-[#202124] font-bold mb-3 flex items-center gap-2">
                <span className="text-[#B92B3A]">♩</span>
                <span>طنین زنده سازها (برای شنیدن کلیک کنید):</span>
              </span>
              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => triggerSound('piano', 'پیانو')}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white hover:bg-[#F3C7CA]/30 active:scale-95 text-[14px] text-[#202124] font-medium transition-all border border-[#E8DFE0] hover:border-[#B92B3A] shadow-sm"
                >
                  <Music className="w-3.5 h-3.5 text-[#B92B3A]" />
                  <span>پیانو کلاسیک</span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerSound('tar', 'تار و سه‌تار')}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white hover:bg-[#F3C7CA]/30 active:scale-95 text-[14px] text-[#202124] font-medium transition-all border border-[#E8DFE0] hover:border-[#B92B3A] shadow-sm"
                >
                  <Music className="w-3.5 h-3.5 text-[#B92B3A]" />
                  <span>تار و سه‌تار</span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerSound('vocal', 'آواز')}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white hover:bg-[#F3C7CA]/30 active:scale-95 text-[14px] text-[#202124] font-medium transition-all border border-[#E8DFE0] hover:border-[#B92B3A] shadow-sm"
                >
                  <Mic className="w-3.5 h-3.5 text-[#B92B3A]" />
                  <span>آواز و صداسازی</span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerSound('child', 'ارف کودک')}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white hover:bg-[#F3C7CA]/30 active:scale-95 text-[14px] text-[#202124] font-medium transition-all border border-[#E8DFE0] hover:border-[#B92B3A] shadow-sm"
                >
                  <Award className="w-3.5 h-3.5 text-[#B92B3A]" />
                  <span>ارف و بلز کودکان</span>
                </button>
              </div>

              {activeSound && (
                <p className="mt-3 text-[13px] text-[#B92B3A] font-semibold flex items-center gap-1.5 animate-fade-in">
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                  <span>طنین آزمایشی ساز {activeSound} نواخته شد.</span>
                </p>
              )}
            </div>

          </div>

          {/* Main Visual Element: Logo Animation Video */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center w-full">
            
            {/* Visual Container: Aspect Ratio 16:9, matching background tone and shadow */}
            <div className="relative w-full max-w-[560px] rounded-[20px] overflow-hidden apple-product-shadow border border-[#E8DFE0] bg-[#DADCDB]">
              
              {prefersReducedMotion ? (
                /* Static accessible fallback for reduced-motion users */
                <div className="aspect-[16/9] w-full flex items-center justify-center bg-[#DADCDB]">
                  <img
                    src="/chang_logo_poster.jpg"
                    alt="نشان رسمی آموزشگاه موسیقی چنگ خرمشهر"
                    className="w-full h-full object-contain"
                    loading="eager"
                  />
                </div>
              ) : (
                /* Hero Main Video Element */
                <div className="aspect-[16/9] w-full overflow-hidden bg-[#DADCDB] flex items-center justify-center">
                  <span className="sr-only">پویانمایی هویت دیداری و نشان آموزشگاه موسیقی چنگ خرمشهر</span>
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    loop={false}
                    controls={false}
                    poster="/chang_logo_poster.jpg"
                    aria-hidden="true"
                    onEnded={handleVideoEnded}
                    className="w-full h-full object-contain block"
                  >
                    <source src="/Logo_animation_for_music_academy_20260923140909.mp4" type="video/mp4" />
                    <source src="/chang_hero_video.webm" type="video/webm" />
                    {/* Fallback image if browser doesn't support video */}
                    <img
                      src="/chang_logo_poster.jpg"
                      alt="نشان رسمی آموزشگاه موسیقی چنگ خرمشهر"
                      className="w-full h-full object-contain"
                    />
                  </video>
                </div>
              )}

            </div>

            {/* Under the video is completely empty - No text, caption, title, or button */}

          </div>

        </div>

      </div>
    </section>
  );
};
