import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Volume2,
  CheckCircle2,
  Circle,
  ChevronDown,
  Check,
  Sparkles,
  BookmarkCheck,
  RotateCcw,
  CheckCheck
} from 'lucide-react';
import { COURSES_DATA } from '../data';
import { playInstrumentSound } from '../utils/audio';
import { Course } from '../types';

interface CoursesProps {
  onSelectCourseForConsultation?: (courseName: string) => void;
}

const STORAGE_KEY_PROGRESS = 'changh_course_progress_v2';
const STORAGE_KEY_MILESTONES = 'changh_course_milestones_v2';

export const Courses: React.FC<CoursesProps> = ({ onSelectCourseForConsultation }) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  // Progress state: { [courseId]: number (0 to 100) }
  const [courseProgress, setCourseProgress] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Milestone completion state: { [courseId]: { [milestoneId]: boolean } }
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, Record<string, boolean>>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MILESTONES);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Save to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(courseProgress));
    } catch (e) {
      console.warn('Failed to save course progress to localStorage', e);
    }
  }, [courseProgress]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MILESTONES, JSON.stringify(completedMilestones));
    } catch (e) {
      console.warn('Failed to save course milestones to localStorage', e);
    }
  }, [completedMilestones]);

  const handlePlaySound = (
    type: 'piano' | 'tar' | 'child' | 'guitar' | 'vocal' | 'violin' | 'percussion',
    id: string,
    e?: React.MouseEvent
  ) => {
    if (e) {
      e.stopPropagation();
    }
    playInstrumentSound(type);
    setPlayingId(id);
    setTimeout(() => setPlayingId(null), 1400);
  };

  const toggleAccordion = (courseId: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [courseId]: !prev[courseId],
    }));
  };

  // Toggle whole course selection (100% vs 0%)
  const handleToggleSelectCourse = (course: Course, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const currentProgress = courseProgress[course.id] || 0;
    const isCurrentlySelected = currentProgress === 100;

    const milestones = course.milestones || [];
    const newMilestoneState: Record<string, boolean> = {};

    if (!isCurrentlySelected) {
      // Select course -> 100% & all milestones checked
      milestones.forEach((m) => {
        newMilestoneState[m.id] = true;
      });
      setCourseProgress((prev) => ({ ...prev, [course.id]: 100 }));
      setCompletedMilestones((prev) => ({ ...prev, [course.id]: newMilestoneState }));
    } else {
      // Deselect course -> 0% & all milestones unchecked
      milestones.forEach((m) => {
        newMilestoneState[m.id] = false;
      });
      setCourseProgress((prev) => ({ ...prev, [course.id]: 0 }));
      setCompletedMilestones((prev) => ({ ...prev, [course.id]: newMilestoneState }));
    }
  };

  // Toggle individual milestone inside accordion
  const handleToggleMilestone = (courseId: string, milestoneId: string, course: Course) => {
    const milestones = course.milestones || [];
    const currentForCourse = completedMilestones[courseId] || {};
    const updatedForCourse = {
      ...currentForCourse,
      [milestoneId]: !currentForCourse[milestoneId],
    };

    const total = milestones.length || 1;
    const checkedCount = milestones.filter((m) => updatedForCourse[m.id]).length;
    const newPercentage = Math.round((checkedCount / total) * 100);

    setCompletedMilestones((prev) => ({
      ...prev,
      [courseId]: updatedForCourse,
    }));

    setCourseProgress((prev) => ({
      ...prev,
      [courseId]: newPercentage,
    }));
  };

  const handleResetAllProgress = () => {
    if (window.confirm('آیا مایلید تمام نشان‌ها و پیشرفت‌های ثبت‌شده در دوره‌ها بازنشانی شوند؟')) {
      setCourseProgress({});
      setCompletedMilestones({});
    }
  };

  // Selected courses count
  const selectedCourseIds = Object.keys(courseProgress).filter((id) => (courseProgress[id] || 0) > 0);
  const fullySelectedCount = Object.keys(courseProgress).filter((id) => courseProgress[id] === 100).length;

  const categories = [
    { id: 'all', name: 'تمام سازها' },
    ...(selectedCourseIds.length > 0 ? [{ id: 'selected', name: `دوره‌های پیگیری‌شده (${selectedCourseIds.length})` }] : []),
    { id: 'زهی و کلاویه‌ای', name: 'پیانو و کلاسیک' },
    { id: 'سازهای ایرانی', name: 'سازهای ایرانی' },
    { id: 'آواز و صدا', name: 'آواز و صداسازی' },
    { id: 'کودک و نوجوان', name: 'ارف کودکان' },
  ];

  const filteredCourses = COURSES_DATA.filter((c) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'selected') return (courseProgress[c.id] || 0) > 0;
    return c.category === activeFilter;
  });

  return (
    <section id="courses" className="py-20 lg:py-24 bg-[#FCF8F8] border-b border-[#E8DFE0]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header with Numbering */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 text-right">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[13px] font-bold text-[#B92B3A] mb-2 tracking-tight">
              <span className="font-mono text-[14px]">۰۱</span>
              <span>/</span>
              <span>کاتالوگ آموزشی و انتخاب ساز</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#202124] leading-[1.10] tracking-[-0.025em] mb-4 [text-wrap:balance]">
              هر ساز، یک جهان تازه و طنین زنده.
            </h2>
            <p className="text-[17px] text-[#5a626d] font-normal leading-[1.5] [text-wrap:pretty]">
              دوره‌های آموزشی با استاندارد آکادمیک تنظیم شده‌اند. با کلیک بر روی نشانگرهای دورانی هر ساز، علاقه‌مندی یا پیشرفت گام‌به‌گام خود را نشانه‌گذاری و ذخیره کنید.
            </p>
          </div>

          {/* User Progress Tracker Card */}
          <div className="bg-white border border-[#E8DFE0] rounded-[18px] p-4 sm:p-5 shadow-sm min-w-[280px] lg:max-w-xs text-right">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <BookmarkCheck className="w-4 h-4 text-[#B92B3A]" />
                <span className="text-[13px] font-bold text-[#202124]">رهگیری دوره‌های شما</span>
              </div>
              {selectedCourseIds.length > 0 && (
                <button
                  type="button"
                  onClick={handleResetAllProgress}
                  className="text-[11px] text-[#8996A6] hover:text-[#B92B3A] flex items-center gap-1 transition-colors"
                  title="پاک‌کردن تمام نشان‌ها"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>بازنشانی</span>
                </button>
              )}
            </div>

            <div className="text-[14px] text-[#5a626d] mb-2">
              <span className="font-bold text-[#202124] text-[16px]">{fullySelectedCount}</span> از{' '}
              <span className="font-bold text-[#202124]">{COURSES_DATA.length}</span> ساز به عنوان دوره منتخب تثبیت شد.
            </div>

            {/* Horizontal Mini Bar */}
            <div className="w-full bg-[#F3C7CA]/40 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#B92B3A] h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.round((fullySelectedCount / COURSES_DATA.length) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Segmented Filter Bar */}
        <div className="mb-10 flex items-center justify-start overflow-x-auto pb-2 scrollbar-none">
          <div className="p-1 rounded-full bg-[#F3C7CA]/30 border border-[#E8DFE0] flex items-center gap-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 py-1.5 rounded-full text-[14px] transition-all duration-150 active:scale-95 whitespace-nowrap ${
                  activeFilter === cat.id
                    ? 'bg-[#B92B3A] text-white shadow-sm font-semibold'
                    : 'text-[#5a626d] hover:text-[#202124] font-medium'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {filteredCourses.map((c) => {
            const soundKey = (c.instrumentType as 'piano' | 'tar' | 'child' | 'guitar' | 'vocal' | 'violin' | 'percussion') || 'piano';
            const isPlaying = playingId === c.id;
            const progress = courseProgress[c.id] || 0;
            const isSelected = progress === 100;
            const isInProgress = progress > 0 && progress < 100;
            const isExpanded = !!expandedCards[c.id];
            const milestones = c.milestones || [];
            const completedCount = milestones.filter((m) => completedMilestones[c.id]?.[m.id]).length;

            // SVG Circular Progress math
            const radius = 42;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset = circumference - (progress / 100) * circumference;

            return (
              <div
                key={c.id}
                className={`bg-white border rounded-[18px] p-5 sm:p-6 transition-all duration-300 apple-soft-shadow flex flex-col justify-between group ${
                  isSelected
                    ? 'border-[#B92B3A] ring-2 ring-[#B92B3A]/20 shadow-md'
                    : isInProgress
                    ? 'border-[#B92B3A]/60'
                    : 'border-[#E8DFE0] hover:border-[#B92B3A]'
                }`}
              >
                <div>
                  {/* Top Header Row: Circular Progress Thumbnail + Instrument Info */}
                  <div className="flex items-start gap-4 mb-4">
                    
                    {/* CIRCULAR PROGRESS INDICATOR AROUND THUMBNAIL */}
                    <div className="relative flex flex-col items-center justify-center shrink-0">
                      <div className="relative w-[92px] h-[92px] sm:w-[98px] sm:h-[98px] flex items-center justify-center">
                        {/* Background & Active Circular Track SVG */}
                        <svg
                          className="w-full h-full -rotate-90 origin-center absolute inset-0 pointer-events-none"
                          viewBox="0 0 100 100"
                        >
                          {/* Track */}
                          <circle
                            cx="50"
                            cy="50"
                            r={radius}
                            fill="transparent"
                            stroke="#E8DFE0"
                            strokeWidth="5"
                          />
                          {/* Dynamic Progress Stroke in Lacquer Red #B92B3A */}
                          <circle
                            cx="50"
                            cy="50"
                            r={radius}
                            fill="transparent"
                            stroke="#B92B3A"
                            strokeWidth="5"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            className="transition-all duration-700 ease-out"
                          />
                        </svg>

                        {/* Concentric Circular Thumbnail Image */}
                        <div
                          onClick={(e) => handlePlaySound(soundKey, c.id, e)}
                          title="برای شنیدن صدای زنده ساز کلیک کنید"
                          role="button"
                          tabIndex={0}
                          className={`w-[72px] h-[72px] sm:w-[78px] sm:h-[78px] rounded-full overflow-hidden relative cursor-pointer shadow-inner border border-[#E8DFE0] transition-transform duration-200 group-hover:scale-[1.03] ${
                            isSelected ? 'ring-2 ring-[#B92B3A] ring-offset-2' : ''
                          }`}
                        >
                          <img
                            src={c.image}
                            alt={c.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                          {/* Overlay Sound Button */}
                          <div
                            className={`absolute inset-0 bg-[#3B1720]/50 flex items-center justify-center transition-opacity duration-200 ${
                              isPlaying ? 'opacity-100' : 'opacity-0 hover:opacity-100'
                            }`}
                          >
                            <Volume2 className={`w-4 h-4 text-white ${isPlaying ? 'text-[#F3C7CA] animate-bounce' : ''}`} />
                          </div>
                        </div>

                        {/* Interactive Circular Progress Tag on Bottom Edge */}
                        <button
                          type="button"
                          onClick={(e) => handleToggleSelectCourse(c, e)}
                          title={isSelected ? 'دوره منتخب شما (کلیک برای لغو)' : 'کلیک برای علامت‌گذاری به عنوان دوره منتخب'}
                          className={`absolute -bottom-2 z-10 px-2 py-0.5 rounded-full text-[11px] font-bold cursor-pointer transition-all duration-300 shadow-sm flex items-center gap-1 active:scale-95 ${
                            isSelected
                              ? 'bg-[#B92B3A] text-white hover:bg-[#A52432]'
                              : isInProgress
                              ? 'bg-[#F3C7CA]/60 text-[#B92B3A] border border-[#B92B3A]/40'
                              : 'bg-white text-[#5a626d] border border-[#E8DFE0] hover:border-[#B92B3A] hover:text-[#B92B3A]'
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <Check className="w-2.5 h-2.5" />
                              <span>۱۰۰٪</span>
                            </>
                          ) : (
                            <span>{progress}٪</span>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Metadata on the Left */}
                    <div className="flex-1 text-right min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[12px] font-bold text-[#B92B3A] truncate">
                          {c.category}
                        </span>
                        
                        {/* Quick Selection Toggle Button */}
                        <button
                          type="button"
                          onClick={(e) => handleToggleSelectCourse(c, e)}
                          className={`text-[12px] px-2.5 py-1 rounded-full font-semibold transition-all active:scale-95 flex items-center gap-1 shrink-0 ${
                            isSelected
                              ? 'bg-[#B92B3A] text-white'
                              : 'bg-[#F3C7CA]/40 text-[#B92B3A] hover:bg-[#B92B3A] hover:text-white'
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <BookmarkCheck className="w-3 h-3" />
                              <span>منتخب شد</span>
                            </>
                          ) : (
                            <>
                              <Check className="w-3 h-3" />
                              <span>انتخاب ساز</span>
                            </>
                          )}
                        </button>
                      </div>

                      <h3 className="text-[18px] sm:text-[19px] font-bold text-[#202124] leading-tight mb-1.5 group-hover:text-[#B92B3A] transition-colors">
                        {c.title}
                      </h3>

                      {/* Status indicator message */}
                      <div className="text-[12px]">
                        {isSelected ? (
                          <span className="text-[#B92B3A] font-semibold flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            <span>دوره در اولویت یادگیری شماست</span>
                          </span>
                        ) : isInProgress ? (
                          <span className="text-[#B92B3A] font-medium">
                            {completedCount} از {milestones.length} مرحله تکمیل شد
                          </span>
                        ) : (
                          <span className="text-[#8996A6] font-medium">
                            {c.level || 'سطح مقدماتی تا پیشرفته'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Course Short Description */}
                  <p className="text-[14px] sm:text-[15px] text-[#5a626d] font-normal leading-[1.5] mb-4 text-right">
                    {c.description}
                  </p>

                  {/* Sound Trigger Button in Card */}
                  <div className="flex items-center justify-between gap-2 py-2 px-3 rounded-[11px] bg-[#FCF8F8] border border-[#E8DFE0] mb-4">
                    <button
                      type="button"
                      onClick={(e) => handlePlaySound(soundKey, c.id, e)}
                      className="text-[13px] text-[#202124] hover:text-[#B92B3A] flex items-center gap-1.5 font-medium transition-colors"
                    >
                      <Volume2 className={`w-4 h-4 text-[#B92B3A] ${isPlaying ? 'animate-bounce' : ''}`} />
                      <span>{isPlaying ? 'در حال پخش طنین ساز…' : 'شنیدن نمونه صدای این ساز'}</span>
                    </button>
                    {c.ageGroup && (
                      <span className="text-[12px] text-[#8996A6] font-medium">
                        {c.ageGroup}
                      </span>
                    )}
                  </div>
                </div>

                {/* ACCORDION TRIGGER & BODY */}
                <div className="pt-2 border-t border-[#E8DFE0]/60">
                  {/* Accordion Expand / Collapse Header Button */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(c.id)}
                    aria-expanded={isExpanded}
                    className="w-full py-2 flex items-center justify-between text-right text-[13px] sm:text-[14px] font-bold text-[#202124] hover:text-[#B92B3A] transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <span>سرفصل‌ها و نقشه پیشرفت دوره ({milestones.length} گام)</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-normal text-[#8996A6]">
                        {completedCount} از {milestones.length}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#B92B3A] transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {/* Accordion Drawer Content */}
                  {isExpanded && (
                    <div className="pt-3 pb-2 space-y-2.5 text-right animate-fade-in border-t border-dashed border-[#E8DFE0] mt-2">
                      <p className="text-[12px] text-[#5a626d] mb-2 leading-relaxed">
                        برای ثبت پیشرفت یا سنجش علاقه، گام‌های زیر را علامت بزنید. حلقه دور تصویر همزمان به‌روزرسانی می‌شود:
                      </p>

                      {/* Interactive Milestones Checklist */}
                      <div className="space-y-2">
                        {milestones.map((m, idx) => {
                          const isDone = !!completedMilestones[c.id]?.[m.id];
                          return (
                            <div
                              key={m.id}
                              onClick={() => handleToggleMilestone(c.id, m.id, c)}
                              role="button"
                              tabIndex={0}
                              className={`p-2.5 rounded-[10px] border flex items-start gap-2.5 cursor-pointer transition-all duration-150 ${
                                isDone
                                  ? 'bg-[#F3C7CA]/35 border-[#B92B3A]/40 text-[#202124]'
                                  : 'bg-white border-[#E8DFE0] text-[#5a626d] hover:border-[#B92B3A]/50'
                              }`}
                            >
                              <div className="pt-0.5 shrink-0">
                                {isDone ? (
                                  <CheckCircle2 className="w-4 h-4 text-[#B92B3A]" />
                                ) : (
                                  <Circle className="w-4 h-4 text-[#E8DFE0]" />
                                )}
                              </div>
                              <div className="text-[13px] leading-tight">
                                <span className="font-bold ml-1 text-[#202124]">
                                  گام ۰{idx + 1}:
                                </span>
                                <span>{m.title}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Accordion Footer Action Bar */}
                      <div className="pt-3 flex flex-wrap items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={(e) => handleToggleSelectCourse(c, e)}
                          className="text-[12px] font-semibold text-[#B92B3A] hover:text-[#A52432] flex items-center gap-1 transition-colors"
                        >
                          <CheckCheck className="w-3.5 h-3.5" />
                          <span>{isSelected ? 'پاک کردن علامت‌ها' : 'تکمیل همه گام‌ها'}</span>
                        </button>

                        <a
                          href="#contact"
                          onClick={() => onSelectCourseForConsultation?.(c.title)}
                          className="inline-flex items-center gap-1 text-[13px] font-bold text-[#B92B3A] hover:text-[#A52432] transition-colors"
                        >
                          <span>مشاوره اختصاصی این ساز</span>
                          <ArrowLeft className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Card Bottom CTA when collapsed */}
                  {!isExpanded && (
                    <div className="pt-3 flex items-center justify-between">
                      <a
                        href="#contact"
                        onClick={() => onSelectCourseForConsultation?.(c.title)}
                        className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#B92B3A] hover:text-[#A52432] transition-colors group/link"
                      >
                        <span>مشاوره و تعیین سطح</span>
                        <ArrowLeft className="w-4 h-4 group-hover/link:-translate-x-1 transition-transform" />
                      </a>

                      <button
                        type="button"
                        onClick={() => toggleAccordion(c.id)}
                        className="text-[12px] text-[#8996A6] hover:text-[#202124] font-medium"
                      >
                        مشاهده سرفصل‌ها
                      </button>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
