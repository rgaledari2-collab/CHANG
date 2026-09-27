import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  Sparkles,
  Music2,
  CheckCircle2
} from 'lucide-react';
import { COURSES_DATA } from '../data';
import { handleImageError } from '../utils/imageFallback';

interface CoursesProps {
  onSelectCourseForConsultation?: (courseName: string) => void;
}

export const Courses: React.FC<CoursesProps> = ({ onSelectCourseForConsultation }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleAccordion = (courseId: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [courseId]: !prev[courseId],
    }));
  };

  const categories = [
    { id: 'all', name: 'تمام سازها' },
    { id: 'classic', name: 'پیانو، گیتار و ویولن' },
    { id: 'iranian', name: 'سازهای اصیل ایرانی' },
    { id: 'vocal', name: 'آواز و صداسازی' },
    { id: 'child', name: 'موسیقی کودک (ارف)' },
  ];

  const filteredCourses = COURSES_DATA.filter((c) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'classic') return ['piano', 'guitar', 'violin'].includes(c.id);
    if (activeFilter === 'iranian') return ['tar', 'percussion'].includes(c.id);
    if (activeFilter === 'vocal') return c.id === 'vocal';
    if (activeFilter === 'child') return c.id === 'child';
    return true;
  });

  return (
    <section id="courses" className="py-20 lg:py-24 bg-[#FCF8F8] border-b border-[#E8DFE0]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-10 text-right">
          <div className="inline-flex items-center gap-2 text-[13px] font-bold text-[#B92B3A] mb-2 tracking-tight">
            <span className="font-mono text-[14px]">۰۱</span>
            <span>/</span>
            <span>کاتالوگ آموزشی و انتخاب ساز</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#202124] leading-[1.10] tracking-[-0.025em] mb-4 [text-wrap:balance]">
            هر ساز، یک جهان تازه از اصالت و هنر.
          </h2>
          <p className="text-[17px] text-[#5a626d] font-normal leading-[1.6] [text-wrap:pretty]">
            دوره‌های تخصصی آموزش انواع سازهای ایرانی و جهانی با اساتید کنسرواتواری و متدهای استاندارد آکادمیک؛ از پایه‌ای‌ترین گام‌ها تا آمادگی کامل برای صحنه.
          </p>
        </div>

        {/* Segmented Filter Bar */}
        <div className="mb-10 flex items-center justify-start overflow-x-auto pb-2 scrollbar-none">
          <div className="p-1 rounded-full bg-[#F3C7CA]/30 border border-[#E8DFE0] flex items-center gap-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 py-1.5 rounded-full text-[14px] transition-all duration-150 active:scale-95 whitespace-nowrap cursor-pointer ${
                  activeFilter === cat.id
                    ? 'bg-[#B92B3A] text-white shadow-sm font-bold'
                    : 'text-[#5a626d] hover:text-[#202124] font-medium'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {filteredCourses.map((c) => {
            const isExpanded = !!expandedCards[c.id];
            const milestones = c.milestones || [];

            return (
              <div
                key={c.id}
                className="bg-white border border-[#E8DFE0] hover:border-[#B92B3A] rounded-[18px] p-5 sm:p-6 transition-all duration-200 apple-soft-shadow flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header: Optimized Thumbnail + Instrument Title & Badges */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-[74px] h-[74px] rounded-2xl overflow-hidden bg-[#FCF8F8] border border-[#E8DFE0] shrink-0 relative group-hover:border-[#B92B3A]/40 transition-colors shadow-xs">
                      <img
                        src={c.image}
                        alt={c.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={handleImageError}
                      />
                    </div>

                    <div className="text-right flex-1 min-w-0">
                      <span className="inline-block text-[11px] font-bold text-[#B92B3A] bg-[#F3C7CA]/30 px-2 py-0.5 rounded-md mb-1.5">
                        {c.category}
                      </span>
                      <h3 className="text-[19px] sm:text-[20px] font-bold text-[#202124] leading-tight truncate">
                        {c.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-[12px] text-[#8996A6]">
                        <span>{c.ageGroup}</span>
                        <span>•</span>
                        <span>{c.level}</span>
                      </div>
                    </div>
                  </div>

                  {/* Course Description */}
                  <p className="text-[14px] text-[#5a626d] leading-relaxed mb-4 text-right">
                    {c.description}
                  </p>

                  {/* Accordion Toggle for Milestones */}
                  <div className="border-t border-[#E8DFE0]/80 pt-3">
                    <button
                      type="button"
                      onClick={() => toggleAccordion(c.id)}
                      className="w-full flex items-center justify-between text-right text-[13px] font-semibold text-[#202124] hover:text-[#B92B3A] py-1 transition-colors cursor-pointer"
                      aria-expanded={isExpanded}
                    >
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#B92B3A]" />
                        <span>سرفصل‌ها و گام‌های آموزش</span>
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#8996A6] transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-[#B92B3A]' : ''
                        }`}
                      />
                    </button>

                    {/* Milestones Content */}
                    {isExpanded && (
                      <div className="mt-3 space-y-2 text-right">
                        {milestones.map((m, idx) => (
                          <div
                            key={m.id}
                            className="p-2.5 rounded-[10px] bg-[#FCF8F8] border border-[#E8DFE0] flex items-start gap-2.5"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#B92B3A] shrink-0 mt-0.5" />
                            <div className="text-[13px] text-[#333] leading-snug">
                              <span className="font-bold text-[#202124] ml-1">
                                گام ۰{idx + 1}:
                              </span>
                              <span>{m.title}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom CTA Action Button */}
                <div className="pt-5 mt-3 border-t border-[#E8DFE0]/60 flex items-center justify-between">
                  <a
                    href="#contact"
                    onClick={() => onSelectCourseForConsultation?.(c.title)}
                    className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#B92B3A] hover:text-[#A52432] transition-colors group/btn"
                  >
                    <span>مشاوره و تعیین سطح این ساز</span>
                    <ArrowLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
                  </a>

                  <span className="text-[12px] text-[#8996A6] font-medium">
                    حضوری و آکادمیک
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
