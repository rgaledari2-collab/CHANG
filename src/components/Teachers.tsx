import React, { useState, useEffect } from 'react';
import { Award, ArrowLeft, X, Trophy, BookOpen, Music, ZoomIn } from 'lucide-react';
import { TEACHERS_DATA } from '../data';
import { Teacher } from '../types';
import { LightboxData } from './Lightbox';
import { handleImageError } from '../utils/imageFallback';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { ResponsiveImage } from './ResponsiveImage';

interface TeachersProps {
  onOpenLightbox?: (data: LightboxData) => void;
}

export const Teachers: React.FC<TeachersProps> = ({ onOpenLightbox }) => {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  
  // Viewport trigger for .teacher-card & .reveal-on-scroll smooth fade-in as user scrolls down
  const sectionRef = useRevealOnScroll<HTMLElement>();

  const openTeacherLightbox = (teacher: Teacher) => {
    if (onOpenLightbox) {
      onOpenLightbox({
        src: teacher.image,
        title: `استاد ${teacher.name}`,
        subtitle: teacher.role,
        badge: `${teacher.experienceYears} سال سابقه تدریس`,
        actionText: 'مشاهده سوابق و رزومه هنری',
        onAction: () => setSelectedTeacher(teacher),
      });
    } else {
      setSelectedTeacher(teacher);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedTeacher) {
        setSelectedTeacher(null);
      }
    };
    if (selectedTeacher) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedTeacher]);

  const handleConsultation = (teacher: Teacher) => {
    setSelectedTeacher(null);
    const select = document.getElementById('course-select') as HTMLSelectElement | null;
    if (select && teacher.courseName) {
      select.value = teacher.courseName;
    }
    const msg = document.getElementById('user-message') as HTMLTextAreaElement | null;
    if (msg) {
      msg.value = `با سلام، متقاضی تعیین سطح و هماهنگی کلاس با استاد ${teacher.name} هستم.`;
    }
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
    <section ref={sectionRef} id="teachers" className="py-20 lg:py-24 bg-[#FCF8F8] border-b border-[#E8DFE0]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header with Numbering */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 reveal-on-scroll">
          <div className="max-w-xl text-right">
            <div className="inline-flex items-center gap-2 text-[13px] font-bold text-[#B92B3A] mb-2 tracking-tight">
              <span className="font-mono text-[14px]">۰۳</span>
              <span>/</span>
              <span>اساتید راهنما و نوازندگان صحنه</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#202124] leading-[1.10] tracking-[-0.025em] mb-3 [text-wrap:balance]">
              آدم‌هایی که در مسیرت همراهت می‌مانند.
            </h2>
            <p className="text-[17px] text-[#5a626d] font-normal leading-[1.5] [text-wrap:pretty]">
              اساتید چنگ از میان فارغ‌التحصیلان برجسته موسیقی و نوازندگان فعال صحنه، با شیوه تدریس صبورانه و متدهای نوین آکادمیک برگزیده شده‌اند.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#E8DFE0] hover:border-[#B92B3A] text-[14px] font-semibold text-[#202124] hover:text-[#B92B3A] transition-all active:scale-95 shadow-sm self-start md:self-auto"
          >
            <span>مشاوره و تعیین استاد راهنما</span>
            <ArrowLeft className="w-3.5 h-3.5 text-[#B92B3A]" />
          </a>
        </div>

        {/* Card Grid for Teachers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEACHERS_DATA.map((teacher) => (
            <div
              key={teacher.id}
              className="teacher-card bg-white border border-[#E8DFE0] hover:border-[#B92B3A] rounded-[18px] p-5 flex flex-col justify-between transition-all duration-200 group apple-soft-shadow"
            >
              <div>
                {/* Selective Portrait Frame with Responsive Image */}
                <div
                  className="aspect-[4/5] relative rounded-[11px] overflow-hidden bg-[#FCF8F8] border border-[#E8DFE0] cursor-zoom-in mb-4"
                  onClick={() => openTeacherLightbox(teacher)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openTeacherLightbox(teacher);
                    }
                  }}
                  title={`بزرگ‌نمایی عکس ${teacher.name}`}
                >
                  <ResponsiveImage
                    src={teacher.image}
                    alt={`استاد ${teacher.name}`}
                    width={400}
                    height={500}
                    aspectRatio="4/5"
                    sizes="(max-width: 640px) 94vw, (max-width: 1024px) 46vw, 280px"
                    className="w-full h-full object-cover filter contrast-115 group-hover:contrast-100 group-hover:scale-105 transition-all duration-500 ease-out"
                  />
                  
                  {/* Badge in high-contrast styling: 6.8:1 contrast in light mode and 8.5:1 in dark mode */}
                  <div className="absolute top-2.5 right-2.5 bg-[#FAF0F1]/95 dark:bg-[#1A1216]/90 backdrop-blur-sm border border-[#B92B3A]/30 dark:border-[#FFB3BA]/30 text-[#9C1C29] dark:text-[#FFB3BA] text-[11px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1 shadow-sm">
                    <Award className="w-3 h-3 text-[#9C1C29] dark:text-[#FFB3BA]" />
                    <span>{teacher.experienceYears} سال سابقه</span>
                  </div>

                  {/* Hover Cue */}
                  <div className="absolute inset-0 bg-[#3B1720]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="bg-[#FCF8F8]/95 backdrop-blur-md text-[#202124] text-[12px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md border border-[#E8DFE0]">
                      <ZoomIn className="w-3.5 h-3.5 text-[#B92B3A]" />
                      <span>مشاهده پرتره کامل</span>
                    </span>
                  </div>
                </div>

                {/* Metadata & Copy */}
                <div className="text-right">
                  <h3
                    onClick={() => setSelectedTeacher(teacher)}
                    className="text-[19px] font-bold text-[#202124] hover:text-[#B92B3A] cursor-pointer transition-colors mb-1"
                  >
                    {teacher.name}
                  </h3>
                  <p className="text-[13px] text-[#B92B3A] font-semibold mb-2">
                    {teacher.role}
                  </p>
                  <p className="text-[14px] text-[#5a626d] leading-relaxed line-clamp-2">
                    {teacher.specialty}
                  </p>
                </div>
              </div>

              {/* Action Link in Lacquer Red */}
              <div className="pt-4 border-t border-[#E8DFE0]/60 mt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedTeacher(teacher)}
                  className="text-[14px] font-semibold text-[#B92B3A] hover:text-[#A52432] transition-colors flex items-center gap-1"
                >
                  <span>رزومه و سوابق هنری</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Profile Modal with Dark Crimson Backdrop */}
      {selectedTeacher && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-[#3B1720]/80 backdrop-blur-md animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-teacher-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedTeacher(null);
          }}
        >
          <div className="bg-[#FCF8F8] dark:bg-[#150a0f] text-[#202124] dark:text-white rounded-[18px] border border-[#E8DFE0] dark:border-white/10 shadow-2xl max-w-xl w-full max-h-[92vh] overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-[#F3C7CA]/30 border-b border-[#E8DFE0] dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3.5 sm:gap-4">
                <ResponsiveImage
                  src={selectedTeacher.image}
                  alt={selectedTeacher.name}
                  width={56}
                  height={56}
                  aspectRatio="1/1"
                  sizes="56px"
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-[#B92B3A] shrink-0"
                />
                <div className="text-right">
                  <h3 id="modal-teacher-title" className="text-[19px] sm:text-[21px] font-bold text-[#202124] dark:text-white">
                    استاد {selectedTeacher.name}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] text-[#B92B3A] dark:text-[#F3C7CA] font-semibold">
                    {selectedTeacher.role} · {selectedTeacher.experienceYears} سال سابقه تدریس
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTeacher(null)}
                className="w-8 h-8 rounded-full bg-white hover:bg-[#FCF8F8] border border-[#E8DFE0] flex items-center justify-center text-[#202124] transition-colors"
                aria-label="بستن"
              >
                <X className="w-4 h-4 text-[#B92B3A]" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-right bg-[#FCF8F8]">
              {selectedTeacher.education && (
                <div>
                  <h4 className="text-[14px] font-bold text-[#202124] mb-1.5 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#B92B3A]" />
                    <span>تحصیلات و مدارک تخصصی</span>
                  </h4>
                  <p className="text-[15px] text-[#5a626d] leading-relaxed">
                    {selectedTeacher.education}
                  </p>
                </div>
              )}

              {selectedTeacher.stageRecords && selectedTeacher.stageRecords.length > 0 && (
                <div>
                  <h4 className="text-[14px] font-bold text-[#202124] mb-2 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-[#B92B3A]" />
                    <span>سوابق صحنه‌ای و فعالیت‌های اجرایی</span>
                  </h4>
                  <ul className="space-y-1.5 text-[14px] text-[#5a626d]">
                    {selectedTeacher.stageRecords.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#B92B3A] font-bold">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedTeacher.pedagogy && (
                <div>
                  <h4 className="text-[14px] font-bold text-[#202124] mb-1.5 flex items-center gap-2">
                    <Music className="w-4 h-4 text-[#B92B3A]" />
                    <span>متد و رویکرد آموزشی</span>
                  </h4>
                  <p className="text-[15px] text-[#5a626d] leading-relaxed">
                    {selectedTeacher.pedagogy}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 bg-[#F3C7CA]/20 border-t border-[#E8DFE0] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedTeacher(null)}
                className="px-4 py-2 rounded-full text-[14px] font-medium text-[#202124] hover:bg-white transition-colors"
              >
                بستن
              </button>
              <button
                type="button"
                onClick={() => handleConsultation(selectedTeacher)}
                className="px-5 py-2 rounded-full bg-[#B92B3A] hover:bg-[#A52432] active:scale-95 text-white text-[14px] font-semibold transition-all shadow-sm"
              >
                مشاوره و ثبت‌نام در کلاس این استاد
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
