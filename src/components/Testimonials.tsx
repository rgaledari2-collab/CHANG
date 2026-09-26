import React, { useState } from 'react';
import { Star, Quote, CheckCircle2, Users, HeartHandshake, Sparkles, ArrowLeft } from 'lucide-react';
import { TESTIMONIALS_DATA, TESTIMONIAL_STATS } from '../data';
import { Testimonial } from '../types';

export const Testimonials: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'student' | 'parent'>('all');

  const filteredTestimonials: Testimonial[] = TESTIMONIALS_DATA.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.role === activeFilter;
  });

  const studentCount = TESTIMONIALS_DATA.filter((i) => i.role === 'student').length;
  const parentCount = TESTIMONIALS_DATA.filter((i) => i.role === 'parent').length;

  return (
    <section id="testimonials" className="py-20 sm:py-24 bg-[#FCF8F8] border-b border-[#E8DFE0] relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#B92B3A] tracking-wider uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B92B3A]" />
            <span>روایت همراهان و صدای جامعه چنگ</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#202124] tracking-tight leading-tight mb-4">
            روایت خانواده‌ها و هنرجویان از یک مسیر موسیقایی
          </h2>
          
          <p className="text-base sm:text-lg text-[#5F6368] leading-relaxed">
            موسیقی در چنگ صرفاً تمرین کلاسی نیست؛ تجربه‌ای مستمر از رشد شخصی، انگیزه درونی، صبوری اساتید و لذت واقعی نوازندگی بر روی صحنه است.
          </p>
        </div>

        {/* Social Proof Key Metrics Strip */}
        <div className="max-w-5xl mx-auto mb-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-white border border-[#E8DFE0] rounded-2xl p-6 sm:p-8 shadow-xs">
          {TESTIMONIAL_STATS.map((stat, idx) => (
            <div key={idx} className="text-center px-2 py-1 border-r border-[#E8DFE0] first:border-r-0 md:first:border-r-0 md:[&:nth-child(2n+1)]:border-r md:[&:first-child]:border-r-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#B92B3A] tracking-tight mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-[#5F6368] font-medium leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Segmented Filter Controls */}
        <div className="flex items-center justify-center mb-10">
          <div 
            role="tablist" 
            aria-label="فیلتر نظرات بر اساس هنرجویان یا اولیا"
            className="inline-flex items-center gap-1 p-1 bg-[#F2ECEC] rounded-xl border border-[#E8DFE0]/80"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'all'}
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-white text-[#202124] shadow-xs'
                  : 'text-[#5F6368] hover:text-[#202124]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B92B3A]" />
              <span>همه روایت‌ها ({TESTIMONIALS_DATA.length})</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'student'}
              onClick={() => setActiveFilter('student')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                activeFilter === 'student'
                  ? 'bg-white text-[#202124] shadow-xs'
                  : 'text-[#5F6368] hover:text-[#202124]'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-[#B92B3A]" />
              <span>هنرجویان ({studentCount})</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'parent'}
              onClick={() => setActiveFilter('parent')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                activeFilter === 'parent'
                  ? 'bg-white text-[#202124] shadow-xs'
                  : 'text-[#5F6368] hover:text-[#202124]'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5 text-[#B92B3A]" />
              <span>والدین و اولیا ({parentCount})</span>
            </button>
          </div>
        </div>

        {/* Clean Grid Layout for Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredTestimonials.map((item) => (
            <article
              key={item.id}
              className="bg-white border border-[#E8DFE0] rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#B92B3A]/30 hover:shadow-md transition-all duration-200 group"
            >
              <div>
                {/* Card Top: Stars + Context Metadata */}
                <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-[#F2ECEC]">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-0.5" aria-label={`امتیاز ${item.rating} از ۵`}>
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  {/* Clean unboxed metadata: Course · Date */}
                  <div className="flex items-center gap-1.5 text-xs text-[#6F7682] font-medium">
                    <span className="text-[#3B1720] font-semibold">{item.course}</span>
                    <span aria-hidden="true" className="text-[#C0C7D0]">·</span>
                    <span>{item.dateSolar}</span>
                  </div>
                </div>

                {/* Quote Typography */}
                <div className="relative mb-5">
                  <Quote className="w-7 h-7 text-[#B92B3A]/15 absolute -top-1 -right-1 pointer-events-none group-hover:text-[#B92B3A]/25 transition-colors" />
                  <p className="text-[14.5px] sm:text-[15px] text-[#2D3139] leading-[1.8] relative z-10 pr-2">
                    {item.quote}
                  </p>
                </div>

                {/* Highlight / Achievement Note */}
                {item.highlight && (
                  <div className="mb-5 flex items-start gap-2 p-2.5 rounded-lg bg-[#FAF5F5] border border-[#E8DFE0]/60 text-xs text-[#3B1720]">
                    <CheckCircle2 className="w-4 h-4 text-[#B92B3A] shrink-0 mt-0.5" />
                    <span className="font-medium leading-relaxed">
                      <strong className="font-bold text-[#B92B3A]">دستاورد: </strong>
                      {item.highlight}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Bottom: Author Info */}
              <div className="pt-4 border-t border-[#F2ECEC] flex items-center gap-3.5">
                {/* Monogram Avatar */}
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm tracking-tight shrink-0 border border-black/5 shadow-2xs ${item.avatarBg}`}
                  aria-hidden="true"
                >
                  {item.avatarInitials}
                </div>

                {/* Name & Role Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[15px] text-[#202124] truncate">
                      {item.author}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#5F6368] mt-0.5 truncate">
                    <span className="truncate">{item.roleTitle}</span>
                    {item.duration && (
                      <>
                        <span aria-hidden="true" className="text-[#C0C7D0]">·</span>
                        <span className="shrink-0 text-[#8996A6]">{item.duration}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Social Proof Callout & CTA */}
        <div className="mt-14 sm:mt-16 bg-[#3B1720] text-white rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="text-center md:text-right max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
              شما هم می‌توانید داستان موسیقی خود را آغاز کنید
            </h3>
            <p className="text-sm sm:text-base text-[#E8DFE0] leading-relaxed">
              برای دریافت جلسه حضوری مشاوره و استعدادیابی رایگان ساز، با کارشناسان آموزشی ما در ارتباط باشید.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3.5 w-full md:w-auto">
            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-[#B92B3A] hover:bg-[#A52432] active:scale-95 text-white transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>رزرو جلسه مشاوره رایگان</span>
              <ArrowLeft className="w-4 h-4" />
            </a>

            <a
              href="tel:06153522000"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold bg-white/10 hover:bg-white/15 text-[#FCF8F8] border border-white/20 transition-all"
            >
              <span>تماس مستقیم: ۰۶۱-۵۳۵۲۲۰۰۰</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
