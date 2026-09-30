import React, { useState } from 'react';
import { 
  Music2, 
  ArrowLeft, 
  Sparkles, 
  Users, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  Filter
} from 'lucide-react';
import { COURSES_DATA } from '../data';
import { Course } from '../types';
import { ResponsiveImage } from './ResponsiveImage';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

interface CoursesProps {
  onSelectCourse: (courseTitle: string) => void;
  onPayTuition: (course: Course) => void;
}

export const Courses: React.FC<CoursesProps> = ({ onSelectCourse, onPayTuition }) => {
  const sectionRef = useRevealOnScroll<HTMLElement>();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);

  const filterTabs = [
    { id: 'all', label: 'همه دوره‌ها' },
    { id: 'keyboard', label: 'پیانو و کیبورد' },
    { id: 'string', label: 'تار، سه‌تار و سنتی' },
    { id: 'guitar', label: 'گیتار' },
    { id: 'violin', label: 'ویولن' },
    { id: 'vocal', label: 'آواز و صدا' },
    { id: 'child', label: 'کودک (ارف)' },
    { id: 'percussion', label: 'کوبه‌ای (دف و تنبک)' },
  ];

  const filteredCourses = selectedFilter === 'all' 
    ? COURSES_DATA 
    : COURSES_DATA.filter(c => c.instrumentType === selectedFilter);

  const handleConsultationClick = (courseTitle: string) => {
    onSelectCourse(courseTitle);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const nameField = document.getElementById('full-name');
        if (nameField) nameField.focus();
      }, 500);
    }
  };

  return (
    <section 
      ref={sectionRef} 
      id="courses" 
      className="py-20 lg:py-24 bg-[#FCF8F8] dark:bg-[#0E1013] border-b border-[#E8DFE0] dark:border-white/10 transition-colors"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 reveal-on-scroll">
          <div className="max-w-2xl text-right">
            <div className="inline-flex items-center gap-2 text-[13px] font-bold text-[#B92B3A] dark:text-[#F3C7CA] mb-2 tracking-tight">
              <span className="font-mono text-[14px]">۰۱</span>
              <span>/</span>
              <Music2 className="w-3.5 h-3.5 text-[#B92B3A] dark:text-[#F3C7CA]" />
              <span>دپارتمان سازها و دوره‌های تخصصی</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#202124] dark:text-white leading-[1.10] tracking-[-0.025em] mb-3 [text-wrap:balance]">
              موسیقی را با ساز دلخواهت شروع کن.
            </h2>
            
            <p className="text-[17px] text-[#5a626d] dark:text-[#9ca3af] font-normal leading-[1.5] [text-wrap:pretty]">
              از نخستین درس آشنایی با ساز تا اجرای قطعات پیشرفته کنسرواتواری؛ پداگوژی استاندارد با سازهای ایرانی و جهانی در دو شعبه خرمشهر و آبادان.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-[#171A21] border border-[#E8DFE0] dark:border-white/10 hover:border-[#B92B3A] text-[14px] font-semibold text-[#202124] dark:text-white hover:text-[#B92B3A] dark:hover:text-[#FFB3BA] transition-all active:scale-95 shadow-sm self-start md:self-auto shrink-0"
          >
            <span>مشاوره تعیین سطح رایگان</span>
            <ArrowLeft className="w-3.5 h-3.5 text-[#B92B3A] dark:text-[#F3C7CA]" />
          </a>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none select-none">
          <Filter className="w-4 h-4 text-[#8996A6] shrink-0 mr-1 hidden sm:inline" />
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-[13px] font-bold whitespace-nowrap transition-all active:scale-95 ${
                selectedFilter === tab.id
                  ? 'bg-[#B92B3A] text-white shadow-sm ring-2 ring-[#B92B3A]/20'
                  : 'bg-white dark:bg-[#171A21] text-[#5a626d] dark:text-[#9ca3af] border border-[#E8DFE0] dark:border-white/10 hover:border-[#B92B3A]/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredCourses.map((course) => {
            const isExpanded = expandedCourseId === course.id;

            return (
              <div
                key={course.id}
                className="bg-white dark:bg-[#171A21] border border-[#E8DFE0] dark:border-white/10 rounded-[20px] overflow-hidden hover:border-[#B92B3A] dark:hover:border-[#B92B3A]/60 flex flex-col justify-between transition-all duration-300 group apple-soft-shadow"
              >
                <div>
                  {/* Photo with Overlay Badge */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#290f16]">
                    <ResponsiveImage
                      src={course.image}
                      alt={course.title}
                      width={480}
                      height={300}
                      aspectRatio="16/10"
                      sizes="(max-width: 640px) 94vw, (max-width: 1024px) 46vw, 380px"
                      className="w-full h-full object-cover filter group-hover:scale-105 transition-all duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-3 right-3 bg-[#FAF0F1]/95 dark:bg-[#1A1216]/95 backdrop-blur-sm border border-[#B92B3A]/30 dark:border-[#FFB3BA]/30 text-[#9C1C29] dark:text-[#FFB3BA] text-[11px] px-3 py-1 rounded-full font-bold shadow-sm">
                      {course.category}
                    </div>

                    <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-white text-[12px] font-medium">
                      <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full">
                        <Users className="w-3.5 h-3.5 text-[#F3C7CA]" />
                        <span>{course.ageGroup}</span>
                      </span>
                      <span className="bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full text-[#F3C7CA] font-bold">
                        {course.level}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 text-right">
                    <h3 className="text-[20px] font-bold text-[#202124] dark:text-white group-hover:text-[#B92B3A] dark:group-hover:text-[#FFB3BA] transition-colors mb-2">
                      {course.title}
                    </h3>
                    
                    <p className="text-[14px] text-[#5a626d] dark:text-[#9ca3af] leading-relaxed mb-4">
                      {course.description}
                    </p>

                    {/* Milestones Toggle */}
                    {course.milestones && course.milestones.length > 0 && (
                      <div className="border-t border-[#E8DFE0]/60 dark:border-white/10 pt-3">
                        <button
                          type="button"
                          onClick={() => setExpandedCourseId(isExpanded ? null : course.id)}
                          className="w-full flex items-center justify-between text-[12px] font-bold text-[#B92B3A] dark:text-[#FFB3BA] py-1"
                        >
                          <span className="flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>سرفصل‌های آموزشی دوره ({course.milestones.length} مرحله)</span>
                          </span>
                          <span className="text-[11px] underline">
                            {isExpanded ? 'بستن مراحل' : 'مشاهده سرفصل‌ها'}
                          </span>
                        </button>

                        {isExpanded && (
                          <div className="mt-3 space-y-2 bg-[#FCF8F8] dark:bg-[#12141A] p-3 rounded-xl border border-[#E8DFE0] dark:border-white/10 animate-in fade-in duration-200">
                            {course.milestones.map((m, idx) => (
                              <div key={m.id} className="flex items-start gap-2 text-[12px] text-[#202124] dark:text-[#CBD5E1]">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                <span><strong>مرحله {idx + 1}:</strong> {m.title}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="p-4 sm:p-5 bg-[#FAF0F1]/60 dark:bg-white/[0.02] border-t border-[#E8DFE0] dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-right w-full sm:w-auto">
                    <span className="text-[11px] text-[#8996A6] dark:text-[#9ca3af] block">شهریه هر ترم ({course.sessionCount || 8} جلسه):</span>
                    <span className="text-[15px] font-extrabold text-[#B92B3A] dark:text-[#FFB3BA]">
                      {(course.tuitionFee || 1650000).toLocaleString('fa-IR')} <span className="text-[11px] font-normal text-[#5a626d] dark:text-[#9ca3af]">تومان</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      type="button"
                      onClick={() => handleConsultationClick(course.title)}
                      className="px-3 py-2 rounded-full border border-[#E8DFE0] dark:border-white/10 hover:border-[#B92B3A] text-[12px] font-semibold text-[#202124] dark:text-white transition-all"
                    >
                      مشاوره حضوری
                    </button>

                    <button
                      type="button"
                      onClick={() => onPayTuition(course)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#B92B3A] hover:bg-[#D9384A] active:scale-95 text-white text-[12px] font-bold transition-all shadow-xs"
                    >
                      <span>ثبت‌نام و پرداخت آنلاین</span>
                      <ArrowLeft className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
