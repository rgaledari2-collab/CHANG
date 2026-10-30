import React, { useState } from 'react';
import { 
  Award, 
  History, 
  Calendar, 
  Sparkles, 
  Scroll, 
  CheckCircle2, 
  ChevronDown, 
  Music, 
  ShieldCheck, 
  Users,
  Building,
  Quote
} from 'lucide-react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

interface TimelineEra {
  id: string;
  yearRange: string;
  solarYear: string;
  title: string;
  subtitle: string;
  narrative: string;
  quote?: {
    text: string;
    author: string;
  };
  milestones: string[];
  icon: React.ReactNode;
  archivalBadge: string;
}

const TIMELINE_ERAS: TimelineEra[] = [
  {
    id: 'era-1350',
    yearRange: '1971 — 1979',
    solarYear: '۱۳۵۰ — ۱۳۵۸',
    title: 'تأسیس در خرمشهر و بنیاد آموزش آکادمیک',
    subtitle: 'پایه‌گذاری نخستین کانون منسجم آموزش ردیف و سازهای جهانی در جنوب غرب کشور',
    narrative: 'در پاییز سال ۱۳۵۰، اساتید موسیقی و نوازندگان نام‌آشنای خوزستان با هدف خروج آموزش از حالت سینه‌به‌سینه و انتقال متدهای علمی نت‌خوانی، هسته اولیه آموزشگاه موسیقی چنگ را در خرمشهر بنا نهادند. پیانوهای دیواری اروپایی و سازهای اصیل ایرانی برای نخستین بار در چارچوب ردیف‌های استاندارد تدریس شدند.',
    quote: {
      text: 'موسیقی در این دیار، صدای نبض کارون و روح زلال مردمانی است که نغمه را با زندگی آمیخته‌اند.',
      author: 'از دفتر یادداشت‌های بنیان‌گذاران چنگ — خرمشهر ۱۳۵۰'
    },
    milestones: [
      'ثبت رسمی آموزشگاه با مجوز وزارت فرهنگ و هنر وقت',
      'تدوین نخستین دوره‌های آموزش پیانو و ویولن به شیوه کنسرواتواری',
      'تشکیل نخستین گروه کر هنرجویی و اجرای قطعات فولکلور اروند'
    ],
    icon: <History className="w-5 h-5 text-amber-500" />,
    archivalBadge: 'مبدأ تاریخی'
  },
  {
    id: 'era-1360',
    yearRange: '1980 — 1988',
    solarYear: '۱۳۵۹ — ۱۳۶۷',
    title: 'سال‌های پایداری و مهاجرت موقت سازها',
    subtitle: 'حفظ چراغ پداگوژی و امانت‌داری از میراث هنری در دوران دفاع مقدس',
    narrative: 'با آغاز جنگ تحمیلی، ساختمان آموزشگاه دستخوش صدمات سنگین شد، اما اساتید متعهد چنگ با انتقال سازها و پارتیتورهای گران‌بها به نقاط امن، آموزش را در قالب جلسات کارگاهی و آتلیه‌های سیار در مناطق مجاور زنده نگاه داشتند تا پیوند نسل جدید با ساز و نغمه هرگز گسسته نشود.',
    milestones: [
      'حفظ و نگهداری بیش از ۳۰۰ جلد پارتیتور و ردیف دست‌نویس تاریخی',
      'برگزاری کلاس‌های تک‌نوازی و بداهه‌پردازی در شرایط دشوار دفاع',
      'آموزش رایگان به فرزندان ایثارگران و مدافعان شهر'
    ],
    icon: <ShieldCheck className="w-5 h-5 text-amber-600" />,
    archivalBadge: 'دوران پایداری'
  },
  {
    id: 'era-1370',
    yearRange: '1989 — 2005',
    solarYear: '۱۳۶۸ — ۱۳۸۴',
    title: 'بازگشت به کارون، بازسازی و احیای صحنه',
    subtitle: 'بازگشایی ساختمان مرکزی در خرمشهر و تشکیل ارکستر بزرگ سنتی چنگ',
    narrative: 'همگام با بازسازی خرمشهر، ساختمان آموزشگاه در بلوار خلیج فارس مجدداً مرمت و بازگشایی شد. با بازگشت فارغ‌التحصیلان کنسرواتوار تهران به زادگاه خود، دپارتمان‌های تار، سه‌تار، سنتور و آواز با رویکرد آکادمیک احیا شدند و نخستین کنسرت‌های بزرگ عمومی پس از جنگ بر روی صحنه سینما نخل و تالارهای خرمشهر رفت.',
    quote: {
      text: 'صدای طنین مضراب‌ها در دل دیوارهای بازسازی‌شده، زیباترین سرود حیات دوباره خرمشهر بود.',
      author: 'مستند بازگشت چنگ — پاییز ۱۳۷۱'
    },
    milestones: [
      'تجهیز اولین پلاتوی رسیتال آکوستیک استاندارد در منطقه آزاد اروند',
      'راه‌اندازی متد بین‌المللی ارف کودک با ابزارهای اهدایی کنسرواتوار',
      'عضویت هنرجویان برگزیده در جشنواره‌های سراسری فجر و موسیقی جوان'
    ],
    icon: <Music className="w-5 h-5 text-[#B92B3A]" />,
    archivalBadge: 'رنسانس فرهنگی'
  },
  {
    id: 'era-1390',
    yearRange: '2006 — 2020',
    solarYear: '۱۳۸۵ — ۱۳۹۹',
    title: 'توسعه شعبه آبادان و اعطای گواهی‌نامه‌های رسمی',
    subtitle: 'گسترش چتر آموزشی به منطقه اروند و تجهیز کلاس‌ها به پیانوهای گرند کنسرت',
    narrative: 'با افزایش استقبال خانواده‌های شهرهای آبادان و خرمشهر، شعبه دوم در خیابان شهید شاملو آبادان با استانداردهای نوین آکوستیک افتتاح شد. نظام ارزشیابی ترمیک با آزمون‌های پایان دوره و مدرک معتبر اداره کل فرهنگ و ارشاد اسلامی به اجرا درآمد و سالانه صدها هنرجو مدارک رسمی خود را دریافت کردند.',
    milestones: [
      'افتتاح شعبه تخصصی آبادان با ۶ استودیوی عایق‌بندی صوت',
      'برگزاری سالانه ۴ کنسرت فصلی در سالن نفت و تالار مهر آبادان',
      'استقرار گرند پیانوهای کنسرت و متدهای بین‌المللی ABRSM انگلستان'
    ],
    icon: <Building className="w-5 h-5 text-amber-500" />,
    archivalBadge: 'گسترش آکادمیک'
  },
  {
    id: 'era-now',
    yearRange: '2021 — 2026',
    solarYear: '۱۴۰۰ — اکنون',
    title: 'عصر کنسرواتواری، فناوری‌های نوین و نسل آینده',
    subtitle: 'تربیت بیش از ۱۴۵۰ فارغ‌التحصیل، استودیوهای دیجیتال و تداوم نیم قرن افتخار',
    narrative: 'امروز آموزشگاه موسیقی چنگ با بیش از ۵۰ سال قدمت مستمر، نه تنها یک مدرسه موسیقی، بلکه یک نهاد فرهنگی تثبیت‌شده در استان خوزستان است. با بیش از ۱۶ دپارتمان سازهای کلاسیک، سنتی و کودک، استودیوهای آکوستیک های-اند و کادر اساتید تحصیل‌کرده، چنگ کانون شکوفایی استعدادهای نسل فرداست.',
    milestones: [
      'عبور از مرز ۱۴۵۰ فارغ‌التحصیل و صدها نوازنده فعال در ارکسترهای کشور',
      'سیستم آزمون‌های ادواری، کارت صحنه دیجیتال و آرشیو صوتی پیشرفت هنرجو',
      'پذیرش فعال در هر دو شعبه مرکزی خرمشهر و آبادان'
    ],
    icon: <Sparkles className="w-5 h-5 text-amber-500" />,
    archivalBadge: 'نیم قرن اصالت'
  }
];

export const HeritageTimeline: React.FC = () => {
  const [activeEraId, setActiveEraId] = useState<string>('era-1350');
  const sectionRef = useRevealOnScroll<HTMLElement>();

  const selectedEra = TIMELINE_ERAS.find(e => e.id === activeEraId) || TIMELINE_ERAS[0];

  return (
    <section 
      ref={sectionRef}
      id="story"
      className="py-20 lg:py-28 bg-[#FCF8F8] dark:bg-[#0B0D11] border-b border-[#E8DFE0] dark:border-white/10 relative transition-colors overflow-hidden select-none"
    >
      {/* Background Architectural Watermark & Golden Glow */}
      <div 
        className="absolute top-1/3 -left-20 w-[500px] h-[500px] bg-radial from-amber-500/8 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-10 right-0 w-80 h-80 bg-radial from-[#B92B3A]/8 via-transparent to-transparent rounded-full blur-2xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/25 text-amber-900 dark:text-amber-300 text-[12px] sm:text-[13px] font-bold mb-3 shadow-2xs">
            <History className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>گاه‌شمار مستند ۵۰ سال تداوم فرهنگی</span>
            <span className="text-amber-600/40">•</span>
            <span className="font-mono">۱۳۵۰ — اکنون</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black font-brand-title text-[#141518] dark:text-white leading-[1.25] tracking-tight mb-4">
            روایت نیم قرن عشق به موسیقی؛ <br className="hidden sm:block" />
            <span className="text-[#B92B3A] dark:text-[#FFB3BA]">از نخستین نغمه‌های خرمشهر تا شکوه امروز</span>
          </h2>

          <p className="text-[15px] sm:text-[17px] text-[#555E6B] dark:text-[#A6B0BE] leading-relaxed max-w-2xl mx-auto">
            آموزشگاه چنگ فقط یک کلاس درس نیست؛ ۵ دهه تاریخ پایداری، بازسازی و افتخار هنری است که در سینه این خاک طنین‌انداز شده است.
          </p>
        </div>

        {/* Interactive Timeline Navigation Bar (Golden Rail with Year Badges) */}
        <div className="relative mb-12 sm:mb-16">
          {/* Subtle connecting golden line */}
          <div 
            className="hidden md:block absolute top-1/2 left-8 right-8 -translate-y-1/2 h-[2px] bg-gradient-to-r from-amber-500/20 via-[#B92B3A]/40 to-amber-500/20 z-0" 
            aria-hidden="true"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 relative z-10">
            {TIMELINE_ERAS.map((era, idx) => {
              const isSelected = era.id === activeEraId;
              return (
                <button
                  key={era.id}
                  type="button"
                  onClick={() => setActiveEraId(era.id)}
                  className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center group relative ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#251015] to-[#17080B] text-white border-amber-500/60 shadow-lg scale-102 ring-2 ring-amber-500/25'
                      : 'bg-white dark:bg-[#141720] border-[#E8DFE0] dark:border-white/10 hover:border-amber-500/40 text-[#555E6B] dark:text-[#9ca3af] hover:bg-[#FAF5F5] dark:hover:bg-[#181C26]'
                  }`}
                >
                  {/* Top indicator dot */}
                  <span className={`w-3 h-3 rounded-full mb-2 transition-all ${
                    isSelected 
                      ? 'bg-amber-400 shadow-[0_0_10px_#F59E0B]' 
                      : 'bg-[#D1D5DB] dark:bg-white/20 group-hover:bg-amber-400'
                  }`} />

                  <span className={`font-mono text-xs font-extrabold tracking-tight mb-1 ${
                    isSelected ? 'text-amber-300' : 'text-[#8996A6] group-hover:text-amber-500'
                  }`}>
                    {era.solarYear}
                  </span>

                  <span className={`text-[13px] font-bold leading-tight ${
                    isSelected ? 'text-white' : 'text-[#141518] dark:text-white'
                  }`}>
                    {era.archivalBadge}
                  </span>

                  <span className={`text-[10px] font-mono mt-1 ${
                    isSelected ? 'text-amber-200/70' : 'text-[#9ca3af]'
                  }`}>
                    {era.yearRange}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Era Detailed Archival Exhibit Card (Museum Conservatory Styling) */}
        <div className="rounded-[32px] bg-gradient-to-br from-[#1C0E12] via-[#140A0D] to-[#0D0507] text-white border-2 border-amber-500/30 p-7 sm:p-11 shadow-2xl relative overflow-hidden text-right">
          
          {/* Gold Trim Corner Ornament */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/20 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-500/20 via-transparent to-transparent pointer-events-none" />

          {/* Era Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-mono text-amber-400 text-sm font-black tracking-widest uppercase">
                  اسناد آرشیو تاریخی چنگ · {selectedEra.solarYear}
                </span>
                <span className="text-white/30">|</span>
                <span className="text-xs text-white/70 font-mono">{selectedEra.yearRange}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-brand-title text-white">
                {selectedEra.title}
              </h3>
              <p className="text-[14px] sm:text-[16px] text-amber-200/90 mt-1 font-medium">
                {selectedEra.subtitle}
              </p>
            </div>

            <div className="bg-white/5 border border-amber-500/30 px-5 py-3 rounded-2xl text-center self-start md:self-auto shadow-inner">
              <span className="block text-[11px] text-amber-300/80 font-mono">وضعیت دوره</span>
              <span className="font-bold text-sm text-white">{selectedEra.archivalBadge}</span>
            </div>
          </div>

          {/* Two-Column Exhibit: Left Quote & Milestones / Right Rich Narrative */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Right: Narrative Story - 7 Columns */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-[16px] sm:text-[18px] text-white/90 leading-[1.8] font-light [text-wrap:pretty]">
                {selectedEra.narrative}
              </p>

              {/* Historical Quote Box if available */}
              {selectedEra.quote && (
                <div className="p-5 rounded-2xl bg-amber-500/10 border-r-4 border-amber-400 border border-white/5 my-4">
                  <div className="flex items-start gap-3">
                    <Quote className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                    <div>
                      <p className="text-[14px] sm:text-[15px] font-bold text-amber-100 italic leading-relaxed mb-2">
                        «{selectedEra.quote.text}»
                      </p>
                      <span className="text-xs text-amber-300/80 font-medium block">
                        — {selectedEra.quote.author}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Left: Key Milestones Box - 5 Columns */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 shadow-inner space-y-4">
              <span className="text-[13px] font-bold text-amber-300 block mb-3 flex items-center gap-2">
                <Scroll className="w-4 h-4 text-amber-400" />
                <span>دست‌آوردها و وقایع ثبت‌شده این دوره:</span>
              </span>

              <div className="space-y-3">
                {selectedEra.milestones.map((milestone, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-white/85 font-medium leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{milestone}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50">
                <span>شماره سند آرشیو: CHG-1350-{selectedEra.id}</span>
                <span className="text-amber-400 font-bold">تأییدشده رسمی</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
