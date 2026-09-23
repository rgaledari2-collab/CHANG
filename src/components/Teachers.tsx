import React, { useState, useEffect, useRef } from 'react';
import { Award, ArrowLeft, X, Trophy, BookOpen, Music, ZoomIn } from 'lucide-react';
import { TEACHERS_DATA } from '../data';
import { Teacher } from '../types';
import { LightboxData } from './Lightbox';

interface TeachersProps {
  onOpenLightbox?: (data: LightboxData) => void;
}

export const Teachers: React.FC<TeachersProps> = ({ onOpenLightbox }) => {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Viewport trigger for .teacher-card smooth fade-in as user scrolls down
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const cards = sectionEl.querySelectorAll<HTMLElement>('.teacher-card');
    if (!cards.length) return;

    if (!('IntersectionObserver' in window)) {
      cards.forEach((c) => c.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, []);

  const openTeacherLightbox = (teacher: Teacher) => {
    if (onOpenLightbox) {
      onOpenLightbox({
        src: teacher.image.replace('w=700', 'w=1800').replace('q=84', 'q=92'),
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
    <section ref={sectionRef} id="teachers" className="py-20 lg:py-24 bg-[#F4F1EB] border-b border-[#D9D2CA]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header with Numbering */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-xl text-right">
            <div className="inline-flex items-center gap-2 text-[13px] font-bold text-[#C93438] mb-2 tracking-tight">
              <span className="font-mono text-[14px]">۰۳</span>
              <span>/</span>
              <span>اساتید راهنما و نوازندگان صحنه</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#211F1E] leading-[1.10] tracking-[-0.025em] mb-3 [text-wrap:balance]">
              آدم‌هایی که در مسیرت همراهت می‌مانند.
            </h2>
            <p className="text-[17px] text-[#6E665E] font-normal leading-[1.5] [text-wrap:pretty]">
              اساتید چنگ از میان فارغ‌التحصیلان برجسته موسیقی و نوازندگان فعال صحنه، با شیوه تدریس صبورانه و متدهای نوین آکادمیک برگزیده شده‌اند.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#D9D2CA] hover:border-[#C93438] text-[14px] font-semibold text-[#211F1E] hover:text-[#C93438] transition-all active:scale-95 shadow-sm self-start md:self-auto"
          >
            <span>مشاوره و تعیین استاد راهنما</span>
            <ArrowLeft className="w-3.5 h-3.5 text-[#C93438]" />
          </a>
        </div>

        {/* Editorial Utility Card Grid for Teachers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEACHERS_DATA.map((teacher) => (
            <div
              key={teacher.id}
              className="teacher-card bg-white border border-[#D9D2CA] hover:border-[#C93438] rounded-[18px] p-5 flex flex-col justify-between transition-all duration-200 group apple-soft-shadow"
            >
              <div>
                {/* Selective Black & White Portrait with Color Reveal on Hover */}
                <div
                  className="aspect-[4/5] relative rounded-[11px] overflow-hidden bg-[#F4F1EB] border border-[#D9D2CA]/60 cursor-zoom-in mb-4"
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
                  <img
                    src={teacher.image}
                    alt={`استاد ${teacher.name}`}
                    className="w-full h-full object-cover filter grayscale-[88%] contrast-115 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-103 transition-all duration-500 ease-out"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Paper Pink Badge with Vivid Red Text */}
                  <div className="absolute top-2.5 right-2.5 bg-[#F6E4E1] border border-[#D9D2CA] text-[#C93438] text-[11px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1 shadow-sm">
                    <Award className="w-3 h-3 text-[#C93438]" />
                    <span>{teacher.experienceYears} سال سابقه</span>
                  </div>

                  {/* Hover Cue */}
                  <div className="absolute inset-0 bg-[#211F1E]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="bg-[#F4F1EB]/95 backdrop-blur-md text-[#211F1E] text-[12px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md border border-[#D9D2CA]">
                      <ZoomIn className="w-3.5 h-3.5 text-[#C93438]" />
                      <span>مشاهده پرتره کامل</span>
                    </span>
                  </div>
                </div>

                {/* Metadata & Copy */}
                <div className="text-right">
                  <h3
                    onClick={() => setSelectedTeacher(teacher)}
                    className="text-[19px] font-bold text-[#211F1E] hover:text-[#C93438] cursor-pointer transition-colors mb-1"
                  >
                    {teacher.name}
                  </h3>
                  <p className="text-[13px] text-[#C93438] font-semibold mb-2">
                    {teacher.role}
                  </p>
                  <p className="text-[14px] text-[#6E665E] leading-relaxed line-clamp-2">
                    {teacher.specialty}
                  </p>
                </div>
              </div>

              {/* Action Link in Vivid Red */}
              <div className="pt-4 border-t border-[#D9D2CA]/60 mt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedTeacher(teacher)}
                  className="text-[14px] font-semibold text-[#C93438] hover:text-[#B82A2E] transition-colors flex items-center gap-1"
                >
                  <span>رزومه و سوابق هنری</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Editorial Profile Modal */}
      {selectedTeacher && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#211F1E]/70 backdrop-blur-md animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-teacher-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedTeacher(null);
          }}
        >
          <div className="bg-[#F4F1EB] rounded-[18px] border border-[#D9D2CA] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 bg-[#F6E4E1] border-b border-[#D9D2CA] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={selectedTeacher.image}
                  alt={selectedTeacher.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#C93438]"
                />
                <div className="text-right">
                  <h3 id="modal-teacher-title" className="text-[21px] font-bold text-[#211F1E]">
                    استاد {selectedTeacher.name}
                  </h3>
                  <p className="text-[14px] text-[#C93438] font-semibold">
                    {selectedTeacher.role} · {selectedTeacher.experienceYears} سال سابقه تدریس
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTeacher(null)}
                className="w-8 h-8 rounded-full bg-white hover:bg-[#F4F1EB] border border-[#D9D2CA] flex items-center justify-center text-[#211F1E] transition-colors"
                aria-label="بستن"
              >
                <X className="w-4 h-4 text-[#C93438]" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-right bg-[#F4F1EB]">
              {selectedTeacher.education && (
                <div>
                  <h4 className="text-[14px] font-bold text-[#211F1E] mb-1.5 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#C93438]" />
                    <span>تحصیلات و مدارک تخصصی</span>
                  </h4>
                  <p className="text-[15px] text-[#6E665E] leading-relaxed">
                    {selectedTeacher.education}
                  </p>
                </div>
              )}

              {selectedTeacher.stageRecords && selectedTeacher.stageRecords.length > 0 && (
                <div>
                  <h4 className="text-[14px] font-bold text-[#211F1E] mb-2 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-[#C93438]" />
                    <span>سوابق صحنه‌ای و فعالیت‌های اجرایی</span>
                  </h4>
                  <ul className="space-y-1.5 text-[14px] text-[#6E665E]">
                    {selectedTeacher.stageRecords.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#C93438] font-bold">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedTeacher.pedagogy && (
                <div>
                  <h4 className="text-[14px] font-bold text-[#211F1E] mb-1.5 flex items-center gap-2">
                    <Music className="w-4 h-4 text-[#C93438]" />
                    <span>متد و رویکرد آموزشی</span>
                  </h4>
                  <p className="text-[15px] text-[#6E665E] leading-relaxed">
                    {selectedTeacher.pedagogy}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 bg-[#F6E4E1] border-t border-[#D9D2CA] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedTeacher(null)}
                className="px-4 py-2 rounded-full text-[14px] font-medium text-[#211F1E] hover:bg-white transition-colors"
              >
                بستن
              </button>
              <button
                type="button"
                onClick={() => handleConsultation(selectedTeacher)}
                className="px-5 py-2 rounded-full bg-[#C93438] hover:bg-[#B82A2E] active:scale-95 text-white text-[14px] font-semibold transition-all shadow-sm"
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
