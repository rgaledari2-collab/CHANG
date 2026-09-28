import React from 'react';
import { Quote } from 'lucide-react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

export const Manifesto: React.FC = () => {
  const sectionRef = useRevealOnScroll<HTMLElement>();

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 sm:py-28 bg-[#F3C7CA]/25 dark:bg-[#15080D]/60 text-[#202124] dark:text-[#F3F4F6] border-b border-[#E8DFE0] dark:border-white/10 overflow-hidden select-none"
    >
      <div className="max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Quote Mark with Lacquer Red Accent */}
        <div className="reveal-on-scroll w-12 h-12 rounded-full bg-white dark:bg-[#1E0B12] border border-[#E8DFE0] dark:border-white/10 text-[#B92B3A] dark:text-[#FFB3BA] flex items-center justify-center mx-auto mb-8 shadow-sm">
          <Quote className="w-6 h-6 text-[#B92B3A] dark:text-[#FFB3BA]" />
        </div>

        {/* Lead Typography - Subtle Staggered Fade-in */}
        <blockquote className="reveal-on-scroll reveal-delay-1 text-2xl sm:text-3xl lg:text-[40px] font-bold text-[#202124] dark:text-white leading-[1.32] tracking-tight mb-8 [text-wrap:balance]">
          «موسیقی از یک کلاس، یک ساز و یک نت آغاز می‌شود، <br className="hidden sm:inline" />
          <span className="text-[#B92B3A] dark:text-[#FFB3BA]">اما در تمام جان و سال‌های زندگی ادامه پیدا می‌کند.»</span>
        </blockquote>

        {/* Elegant Accent Divider */}
        <div className="reveal-on-scroll reveal-delay-2 w-16 h-[2px] bg-[#B92B3A] dark:bg-[#FFB3BA] mx-auto mb-6" />
        
        {/* Caption & Mission Statement */}
        <p className="reveal-on-scroll reveal-delay-3 text-[15px] sm:text-[16px] text-[#5a626d] dark:text-[#ABB3C0] font-medium max-w-lg mx-auto leading-relaxed [text-wrap:pretty]">
          رسالت آموزشی آموزشگاه چنگ؛ پرورش جسارت صحنه، انضباط تمرین و شور بی‌پایان به موسیقی در خرمشهر
        </p>

      </div>
    </section>
  );
};
