import React, { useState } from 'react';
import { ArrowLeft, Volume2, CheckCircle2 } from 'lucide-react';
import { COURSES_DATA } from '../data';
import { playInstrumentSound } from '../utils/audio';

interface CoursesProps {
  onSelectCourseForConsultation?: (courseName: string) => void;
}

export const Courses: React.FC<CoursesProps> = ({ onSelectCourseForConsultation }) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

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

  const categories = [
    { id: 'all', name: 'تمام سازها' },
    { id: 'زهی و کلاویه‌ای', name: 'پیانو و کلاسیک' },
    { id: 'سازهای ایرانی', name: 'سازهای ایرانی' },
    { id: 'آواز و صدا', name: 'آواز و صداسازی' },
    { id: 'کودک و نوجوان', name: 'ارف کودکان' },
  ];

  const filteredCourses = activeFilter === 'all'
    ? COURSES_DATA
    : COURSES_DATA.filter((c) => c.category === activeFilter);

  return (
    <section id="courses" className="py-20 lg:py-24 bg-[#F4F1EB] border-b border-[#D9D2CA]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header with Numbering */}
        <div className="max-w-2xl mb-10 text-right">
          <div className="inline-flex items-center gap-2 text-[13px] font-bold text-[#C93438] mb-2 tracking-tight">
            <span className="font-mono text-[14px]">۰۱</span>
            <span>/</span>
            <span>کاتالوگ آموزشی و انتخاب ساز</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#211F1E] leading-[1.10] tracking-[-0.025em] mb-4 [text-wrap:balance]">
            هر ساز، یک جهان تازه و طنین زنده.
          </h2>
          <p className="text-[17px] text-[#6E665E] font-normal leading-[1.5] [text-wrap:pretty]">
            دوره‌ها با استاندارد آکادمیک و متناسب با سن، سطح و سلیقه هنرجو تنظیم شده‌اند. روی نمونه صدای هر ساز کلیک کنید و طنین شفاف آن را بشنوید.
          </p>
        </div>

        {/* Editorial Segmented Filter Bar (Container #F6E4E1 + Border #D9D2CA) */}
        <div className="mb-10 flex items-center justify-start overflow-x-auto pb-2 scrollbar-none">
          <div className="p-1 rounded-full bg-[#F6E4E1] border border-[#D9D2CA] flex items-center gap-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 py-1.5 rounded-full text-[14px] transition-all duration-150 active:scale-95 whitespace-nowrap ${
                  activeFilter === cat.id
                    ? 'bg-[#211F1E] text-white shadow-sm font-semibold'
                    : 'text-[#6E665E] hover:text-[#211F1E] font-medium'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Store Utility Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredCourses.map((c) => {
            const soundKey = (c.instrumentType as 'piano' | 'tar' | 'child' | 'guitar' | 'vocal' | 'violin' | 'percussion') || 'piano';
            const isPlaying = playingId === c.id;

            return (
              <div
                key={c.id}
                className="bg-white border border-[#D9D2CA] hover:border-[#C93438] rounded-[18px] p-6 flex flex-col justify-between transition-all duration-200 group apple-soft-shadow"
              >
                <div>
                  {/* Product Imagery */}
                  <div className="aspect-[16/10] w-full rounded-[11px] overflow-hidden relative mb-5 bg-[#F4F1EB] border border-[#D9D2CA]/60">
                    <img
                      src={c.image}
                      alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />

                    {/* Circular Sound Action Chip in Vivid Red */}
                    <button
                      type="button"
                      onClick={(e) => handlePlaySound(soundKey, c.id, e)}
                      aria-label={`شنیدن طنین ساز ${c.title}`}
                      className="absolute bottom-3 left-3 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md border border-[#D9D2CA] flex items-center justify-center text-[#211F1E] hover:text-[#C93438] hover:border-[#C93438] shadow-sm transition-all active:scale-90"
                      title="شنیدن صدای این ساز"
                    >
                      <Volume2 className={`w-4 h-4 ${isPlaying ? 'text-[#C93438] animate-bounce' : ''}`} />
                    </button>
                  </div>

                  {/* Clean Text Metadata */}
                  <div className="text-right">
                    <span className="text-[12px] font-semibold text-[#C93438] block mb-1">
                      {c.category} · سطح مقدماتی تا پیشرفته
                    </span>

                    {/* Headline */}
                    <h3 className="text-[21px] font-bold text-[#211F1E] leading-tight mb-2 group-hover:text-[#C93438] transition-colors">
                      {c.title}
                    </h3>

                    {/* Body */}
                    <p className="text-[15px] sm:text-[16px] text-[#6E665E] font-normal leading-[1.5] mb-5">
                      {c.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-[#D9D2CA]/60 flex items-center justify-between">
                  <a
                    href="#contact"
                    onClick={() => onSelectCourseForConsultation?.(c.title)}
                    className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#C93438] hover:text-[#B82A2E] transition-colors group/link"
                  >
                    <span>مشاوره و تعیین سطح</span>
                    <ArrowLeft className="w-4 h-4 group-hover/link:-translate-x-1 transition-transform" />
                  </a>

                  <button
                    type="button"
                    onClick={(e) => handlePlaySound(soundKey, c.id, e)}
                    className="text-[13px] text-[#6E665E] hover:text-[#211F1E] flex items-center gap-1 font-medium transition-colors"
                  >
                    <span>{isPlaying ? 'در حال پخش…' : 'شنیدن صدا'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
