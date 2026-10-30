import React, { useState } from 'react';
import { 
  Music2, 
  ArrowLeft, 
  Sparkles, 
  Users, 
  CheckCircle2, 
  Filter
} from 'lucide-react';
import { COURSES_DATA } from '../data';
import { Course } from '../types';
import { ResponsiveImage } from './ResponsiveImage';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { InstrumentMatcher } from './InstrumentMatcher';

interface CoursesProps {
  onSelectCourse: (courseTitle: string) => void;
  onPayTuition: (course: Course) => void;
}

interface CourseCardProps {
  course: Course;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onConsultationClick: (courseTitle: string) => void;
  onPayTuition: (course: Course) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isExpanded,
  onToggleExpand,
  onConsultationClick,
  onPayTuition,
}) => {
  const [parallaxStyle, setParallaxStyle] = useState<React.CSSProperties>({});
  const [imageShift, setImageShift] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt (max ~3.2 degrees) for conservatory elegance
    const rotateX = ((y - centerY) / centerY) * -3.2;
    const rotateY = ((x - centerX) / centerX) * 3.2;

    // Counter-parallax shift for inner photography & floating badges
    const shiftX = ((x - centerX) / centerX) * -5;
    const shiftY = ((y - centerY) / centerY) * -5;

    setParallaxStyle({
      transform: `perspective(1100px) translateY(-6px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`,
      '--mouse-x': `${x}px`,
      '--mouse-y': `${y}px`,
    } as React.CSSProperties);

    setImageShift({ x: shiftX, y: shiftY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setParallaxStyle({
      transform: 'perspective(1100px) translateY(0px) rotateX(0deg) rotateY(0deg)',
    });
    setImageShift({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={parallaxStyle}
      className="conservatory-card relative border border-[#E5DDD2] dark:border-[#C29B53]/20 rounded-[22px] overflow-hidden flex flex-col justify-between group"
    >
      {/* Interactive Specular Bronze Sheen Following Cursor */}
      <div
        className={`conservatory-card-sheen pointer-events-none absolute inset-0 z-10 transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* Top Burnished Brass Accent Line */}
      <div
        className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#C29B53] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Photo with Subtle Counter-Parallax & Overlay Badge */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#0B0909]">
          <div
            style={{
              transform: isHovered
                ? `scale(1.06) translate3d(${imageShift.x.toFixed(1)}px, ${imageShift.y.toFixed(1)}px, 0)`
                : 'scale(1) translate3d(0px, 0px, 0)',
              transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            className="w-full h-full will-change-transform"
          >
            <ResponsiveImage
              src={course.image}
              alt={course.title}
              width={480}
              height={300}
              aspectRatio="16/10"
              sizes="(max-width: 640px) 94vw, (max-width: 1024px) 46vw, 380px"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0909]/80 via-[#0B0909]/15 to-transparent pointer-events-none" />

          {/* Floating Category Badge with Opposite Micro-Parallax */}
          <div
            style={{
              transform: isHovered
                ? `translate3d(${(-imageShift.x * 0.5).toFixed(1)}px, ${(-imageShift.y * 0.5).toFixed(1)}px, 0)`
                : 'translate3d(0, 0, 0)',
              transition: 'transform 0.25s ease-out',
            }}
            className="absolute top-3.5 right-3.5 bg-[#0B0909]/85 backdrop-blur-md border border-[#C29B53]/45 text-[#E5C787] text-[11px] px-3 py-1 rounded-full font-bold shadow-md"
          >
            {course.category}
          </div>

          <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-white text-[12px] font-medium">
            <span className="flex items-center gap-1.5 bg-[#0B0909]/65 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10">
              <Users className="w-3.5 h-3.5 text-[#C29B53]" />
              <span>{course.ageGroup}</span>
            </span>
            <span className="bg-[#0B0909]/65 backdrop-blur-xs px-2.5 py-1 rounded-full text-[#E5C787] border border-[#C29B53]/30 font-bold">
              {course.level}
            </span>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 text-right">
          <h3 className="text-[20px] font-bold text-[#0B0909] dark:text-[#F7F4F0] group-hover:text-[#8E1B26] dark:group-hover:text-[#E2BE7E] transition-colors duration-300 mb-2">
            {course.title}
          </h3>

          <p className="text-[14px] text-[#544D49] dark:text-[#B8B0A6] leading-relaxed mb-4">
            {course.description}
          </p>

          {/* Milestones Toggle */}
          {course.milestones && course.milestones.length > 0 && (
            <div className="border-t border-[#E5DDD2] dark:border-white/10 pt-3">
              <button
                type="button"
                onClick={onToggleExpand}
                className="w-full flex items-center justify-between text-[12px] font-bold text-[#8E1B26] dark:text-[#E2BE7E] py-1 group/btn"
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C29B53] transition-transform duration-300 group-hover/btn:rotate-12" />
                  <span>سرفصل‌های آموزشی دوره ({course.milestones.length} مرحله)</span>
                </span>
                <span className="text-[11px] underline decoration-[#C29B53]/60 underline-offset-4">
                  {isExpanded ? 'بستن مراحل' : 'مشاهده سرفصل‌ها'}
                </span>
              </button>

              {isExpanded && (
                <div className="mt-3 space-y-2 bg-[#FBF9F6]/90 dark:bg-[#0B0909]/80 p-3.5 rounded-xl border border-[#E5DDD2] dark:border-[#C29B53]/25 animate-in fade-in duration-200">
                  {course.milestones.map((m, idx) => (
                    <div key={m.id} className="flex items-start gap-2 text-[12px] text-[#0B0909] dark:text-[#E2DCD5]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C29B53] shrink-0 mt-0.5" />
                      <span>
                        <strong>مرحله {idx + 1}:</strong> {m.title}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Card Footer CTA */}
      <div className="relative z-10 p-4 sm:p-5 bg-[#F4EFE6]/75 dark:bg-[#0B0909]/60 border-t border-[#E5DDD2] dark:border-[#C29B53]/15 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-right w-full sm:w-auto">
          <span className="text-[11px] text-[#5C534B] dark:text-[#B8B0A6] block">
            شهریه هر ترم ({course.sessionCount || 8} جلسه):
          </span>
          <span className="text-[15px] font-extrabold text-[#8E1B26] dark:text-[#E2BE7E]">
            {(course.tuitionFee || 1650000).toLocaleString('fa-IR')}{' '}
            <span className="text-[11px] font-normal text-[#544D49] dark:text-[#B8B0A6]">تومان</span>
          </span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={() => onConsultationClick(course.title)}
            className="px-3.5 py-2 rounded-full border border-[#D5C6B8] dark:border-[#C29B53]/30 hover:border-[#C29B53] hover:bg-[#C29B53]/10 text-[12px] font-semibold text-[#0B0909] dark:text-[#F7F4F0] transition-all duration-200"
          >
            مشاوره حضوری
          </button>

          <button
            type="button"
            onClick={() => onPayTuition(course)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#8E1B26] hover:bg-[#74141E] active:scale-95 text-white text-[12px] font-bold transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <span>ثبت‌نام و پرداخت آنلاین</span>
            <ArrowLeft className="w-3 h-3 transition-transform duration-200 group-hover:-translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

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
      className="py-20 lg:py-24 bg-[#FBF9F6] dark:bg-[#0B0909] border-b border-[#E5DDD2] dark:border-white/10 transition-colors"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 text-right">
          <div>
            <div className="inline-flex items-center gap-2 text-[13px] font-bold text-[#8E1B26] dark:text-[#E2BE7E] mb-2">
              <span className="font-mono text-[14px]">۰۱</span>
              <span>/</span>
              <Music2 className="w-3.5 h-3.5 text-[#C29B53]" />
              <span>دپارتمان‌های تخصصی ساز و آواز</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B0909] dark:text-white tracking-tight leading-[1.15]">
              مسیر آموزشی ساز خود را انتخاب کنید
            </h2>
            <p className="text-[16px] text-[#544D49] dark:text-[#B8B0A6] mt-2 max-w-2xl">
              آموزش گام‌به‌گام از سطح مقدماتی تا عالی بر اساس متدهای استاندارد کنسرواتواری به همراه امکان پرداخت آنلاین شهریه یا رزرو مشاوره حضوری.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-[#151211] border border-[#E5DDD2] dark:border-[#C29B53]/30 hover:border-[#C29B53] text-[14px] font-semibold text-[#0B0909] dark:text-white hover:text-[#8E1B26] dark:hover:text-[#E2BE7E] transition-all active:scale-95 shadow-sm self-start md:self-auto shrink-0"
          >
            <span>مشاوره تعیین سطح رایگان</span>
            <ArrowLeft className="w-3.5 h-3.5 text-[#C29B53]" />
          </a>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none select-none">
          <Filter className="w-4 h-4 text-[#C29B53] shrink-0 mr-1 hidden sm:inline" />
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-[13px] font-bold whitespace-nowrap transition-all active:scale-95 ${
                selectedFilter === tab.id
                  ? 'bg-[#8E1B26] text-white shadow-sm ring-2 ring-[#C29B53]/40'
                  : 'bg-white dark:bg-[#151211] text-[#544D49] dark:text-[#B8B0A6] border border-[#E5DDD2] dark:border-white/10 hover:border-[#C29B53]/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Courses Grid with Interactive Parallax & Soft Brass Shadow Micro-Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isExpanded={expandedCourseId === course.id}
              onToggleExpand={() =>
                setExpandedCourseId(expandedCourseId === course.id ? null : course.id)
              }
              onConsultationClick={handleConsultationClick}
              onPayTuition={onPayTuition}
            />
          ))}
        </div>

        {/* Interactive Instrument Matcher & Talent Discovery Tool */}
        <InstrumentMatcher onSelectCourse={onSelectCourse} />

      </div>
    </section>
  );
};
