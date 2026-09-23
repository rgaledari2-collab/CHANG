import React from 'react';
import { Quote } from 'lucide-react';

export const Manifesto: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-28 bg-[#F3C7CA]/25 text-[#202124] border-b border-[#E8DFE0] overflow-hidden select-none">
      <div className="max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Quote Mark with Lacquer Red Accent */}
        <div className="w-12 h-12 rounded-full bg-white border border-[#E8DFE0] text-[#B92B3A] flex items-center justify-center mx-auto mb-8 shadow-sm">
          <Quote className="w-6 h-6 text-[#B92B3A]" />
        </div>

        {/* Lead Typography */}
        <blockquote className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-[#202124] leading-[1.32] tracking-tight mb-8 [text-wrap:balance]">
          «موسیقی از یک کلاس، یک ساز و یک نت آغاز می‌شود، <br className="hidden sm:inline" />
          <span className="text-[#B92B3A]">اما در تمام جان و سال‌های زندگی ادامه پیدا می‌کند.»</span>
        </blockquote>

        <div className="w-16 h-[2px] bg-[#B92B3A] mx-auto mb-6" />
        
        {/* Caption */}
        <p className="text-[15px] sm:text-[16px] text-[#5a626d] font-medium max-w-lg mx-auto leading-relaxed [text-wrap:pretty]">
          رسالت آموزشی آموزشگاه چنگ؛ پرورش جسارت صحنه، انضباط تمرین و شور بی‌پایان به موسیقی در خرمشهر
        </p>

      </div>
    </section>
  );
};
