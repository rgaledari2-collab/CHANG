import React from 'react';
import { Quote } from 'lucide-react';

export const Manifesto: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-28 bg-[#F6E4E1] text-[#211F1E] border-b border-[#D9D2CA] overflow-hidden select-none">
      <div className="max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Editorial Quote Mark with Vivid Red Accent */}
        <div className="w-12 h-12 rounded-full bg-white border border-[#D9D2CA] text-[#C93438] flex items-center justify-center mx-auto mb-8 shadow-sm">
          <Quote className="w-6 h-6 text-[#C93438]" />
        </div>

        {/* Lead Editorial Typography */}
        <blockquote className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-[#211F1E] leading-[1.32] tracking-tight mb-8 [text-wrap:balance]">
          «موسیقی از یک کلاس، یک ساز و یک نت آغاز می‌شود، <br className="hidden sm:inline" />
          <span className="text-[#C93438]">اما در تمام جان و سال‌های زندگی ادامه پیدا می‌کند.»</span>
        </blockquote>

        <div className="w-16 h-[2px] bg-[#C93438] mx-auto mb-6" />
        
        {/* Caption */}
        <p className="text-[15px] sm:text-[16px] text-[#6E665E] font-medium max-w-lg mx-auto leading-relaxed [text-wrap:pretty]">
          رسالت آموزشی آموزشگاه چنگ؛ پرورش جسارت صحنه، انضباط تمرین و شور بی‌پایان به موسیقی در خرمشهر
        </p>

      </div>
    </section>
  );
};
