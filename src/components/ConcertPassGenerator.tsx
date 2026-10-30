import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  Ticket, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Music, 
  Download, 
  Check, 
  Share2, 
  Award, 
  QrCode, 
  Building2,
  ChevronLeft
} from 'lucide-react';
import { ChangLogo } from './ChangLogo';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

interface ConcertEventOption {
  id: string;
  seasonTitle: string;
  hallName: string;
  hallLocation: string;
  dateStr: string;
  timeStr: string;
}

const UPCOMING_CONCERTS: ConcertEventOption[] = [
  {
    id: 'recital-fall',
    seasonTitle: 'رسیتال فصلی هنرجویان چنگ (پاییز و زمستان)',
    hallName: 'تالار مجلل سینما نفت (سالن اصلی)',
    hallLocation: 'آبادان، بلوار پیروز',
    dateStr: 'جمعه ۲۸ آذر ۱۴۰۳',
    timeStr: 'ساعت ۱۸:۳۰ الی ۲۱:۰۰'
  },
  {
    id: 'recital-persian',
    seasonTitle: 'شب هم‌نوازی و ارکستر سازهای اصیل ایرانی',
    hallName: 'تالار فرهنگی هنری خلیج فارس',
    hallLocation: 'خرمشهر، بلوار ساحلی',
    dateStr: 'پنج‌شنبه ۱۸ دی ۱۴۰۳',
    timeStr: 'ساعت ۱۹:۰۰ الی ۲۱:۳۰'
  },
  {
    id: 'recital-kids',
    seasonTitle: 'جشنواره استعدادهای کودک و خردسال (متد اُرف)',
    hallName: 'پلاتوی رسیتال آکوستیک آموزشگاه چنگ',
    hallLocation: 'شعبه مرکزی خرمشهر',
    dateStr: 'جمعه ۵ بهمن ۱۴۰۳',
    timeStr: 'ساعت ۱۶:۳۰ الی ۱۸:۳۰'
  }
];

const INSTRUMENT_OPTIONS = [
  'پیانو آکوستیک',
  'تار ایرانی',
  'سه‌تار',
  'ویولن کلاسیک',
  'سنتور',
  'گیتار فلامنکو و کلاسیک',
  'دف و سازهای کوبه‌ای',
  'تنبک',
  'آواز اصیل ایرانی',
  'بلز و فلوت ریکوردر (کودک)'
];

export const ConcertPassGenerator: React.FC = () => {
  const sectionRef = useRevealOnScroll<HTMLElement>();
  const ticketRef = useRef<HTMLDivElement>(null);

  const [studentName, setStudentName] = useState<string>('مهبد اسماعیلی');
  const [selectedInstrument, setSelectedInstrument] = useState<string>('پیانو آکوستیک');
  const [selectedConcertId, setSelectedConcertId] = useState<string>('recital-fall');
  const [pieceName, setPieceName] = useState<string>('نوکتورن شوپن در دو دیز مینور');
  const [branchChoice, setBranchChoice] = useState<'khorramshahr' | 'abadan'>('khorramshahr');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const currentConcert = UPCOMING_CONCERTS.find(c => c.id === selectedConcertId) || UPCOMING_CONCERTS[0];
  const ticketSeat = 'A-14';
  const ticketCode = `CHG-2024-${Math.abs(studentName.length * 37 + 1042)}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `بلیت رسیتال هنرجویی ${studentName} در آموزشگاه موسیقی چنگ`,
        text: `بلیت رسمی اجرای زنده هنرجویی ${studentName} بر روی صحنه ${currentConcert.hallName}. قطعه: ${pieceName}`,
        url: window.location.href
      }).catch(() => {
        // Ignored if cancelled
      });
    } else {
      navigator.clipboard.writeText(
        `کنسرت و رسیتال رسمی آموزشگاه موسیقی چنگ\nهنرجو: ${studentName}\nساز: ${selectedInstrument}\nقطعه: ${pieceName}\nمکان: ${currentConcert.hallName} (${currentConcert.dateStr})\nوب‌سایت آموزشگاه چنگ: ${window.location.origin}`
      );
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section 
      ref={sectionRef}
      id="events"
      className="py-20 lg:py-28 bg-[#F9F5F5] dark:bg-[#08090C] border-b border-[#E8DFE0] dark:border-white/10 relative transition-colors overflow-hidden select-none"
    >
      {/* Background Concert Stage Amber Lighting */}
      <div 
        className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-radial from-amber-500/12 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-10 right-10 w-96 h-96 bg-radial from-[#B92B3A]/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/25 text-amber-900 dark:text-amber-300 text-[12px] sm:text-[13px] font-bold mb-3 shadow-2xs">
            <Ticket className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>تجربه حقیقی استیج و صحنه زنده</span>
            <span className="text-amber-600/40">•</span>
            <span>صدور گذرنامه اجرای هنرجو</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black font-brand-title text-[#141518] dark:text-white leading-[1.25] tracking-tight mb-4">
            از کلاس درس تا تشویقِ تماشاگران؛ <br className="hidden sm:block" />
            <span className="text-[#B92B3A] dark:text-[#FFB3BA]">کنسرت‌های رسمی و بلیت دیجیتال صحنه</span>
          </h2>

          <p className="text-[15px] sm:text-[17px] text-[#555E6B] dark:text-[#A6B0BE] leading-relaxed max-w-2xl mx-auto">
            موسیقی با اجرا کامل می‌شود. در چنگ، هر هنرجو در پایان ترم فرصت دارد هنر خود را در سالن‌های رسمی با بلیت اختصاصی و حضور پرشور خانواده‌ها به نمایش بگذارد.
          </p>
        </div>

        {/* Main Grid: Left Customizer / Right Luxury Stage Pass */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Customizer Form (Right in RTL: 5 Columns) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#141720] rounded-[28px] border border-[#E8DFE0] dark:border-white/10 p-6 sm:p-7 shadow-lg text-right">
            
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E8DFE0] dark:border-white/10">
              <span className="text-[14px] font-extrabold text-[#141518] dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B92B3A]" />
                <span>شخصی‌سازی کارت اجرای هنرجویی</span>
              </span>
              <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full">
                پیش‌نمایش زنده
              </span>
            </div>

            <div className="space-y-4">
              {/* Student Name */}
              <div>
                <label className="block text-xs font-bold text-[#4b5563] dark:text-[#9ca3af] mb-1.5">
                  نام و نام خانوادگی نوازنده / هنرجو:
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="مثال: سارا محمدی"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D5C6C8] dark:border-white/15 bg-[#FAF5F5] dark:bg-black/30 text-sm font-bold text-[#141518] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#B92B3A]"
                />
              </div>

              {/* Instrument Selection */}
              <div>
                <label className="block text-xs font-bold text-[#4b5563] dark:text-[#9ca3af] mb-1.5">
                  ساز تخصصی اجرا:
                </label>
                <select
                  value={selectedInstrument}
                  onChange={(e) => setSelectedInstrument(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D5C6C8] dark:border-white/15 bg-[#FAF5F5] dark:bg-[#1A1D26] text-sm font-bold text-[#141518] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#B92B3A]"
                >
                  {INSTRUMENT_OPTIONS.map((inst) => (
                    <option key={inst} value={inst}>
                      {inst}
                    </option>
                  ))}
                </select>
              </div>

              {/* Repertoire Piece Name */}
              <div>
                <label className="block text-xs font-bold text-[#4b5563] dark:text-[#9ca3af] mb-1.5">
                  عنوان قطعه / دستگاه موسیقی:
                </label>
                <input
                  type="text"
                  value={pieceName}
                  onChange={(e) => setPieceName(e.target.value)}
                  placeholder="مثال: چهارمضراب شور یا والس شوپن"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D5C6C8] dark:border-white/15 bg-[#FAF5F5] dark:bg-black/30 text-sm font-bold text-[#141518] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#B92B3A]"
                />
              </div>

              {/* Concert Event Picker */}
              <div>
                <label className="block text-xs font-bold text-[#4b5563] dark:text-[#9ca3af] mb-1.5">
                  کنسرت / رسیتال پیش‌رو:
                </label>
                <select
                  value={selectedConcertId}
                  onChange={(e) => setSelectedConcertId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D5C6C8] dark:border-white/15 bg-[#FAF5F5] dark:bg-[#1A1D26] text-sm font-bold text-[#141518] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#B92B3A]"
                >
                  {UPCOMING_CONCERTS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.seasonTitle} — {c.dateStr}
                    </option>
                  ))}
                </select>
              </div>

              {/* Branch Choice */}
              <div>
                <label className="block text-xs font-bold text-[#4b5563] dark:text-[#9ca3af] mb-1.5">
                  شعبه برگزارکننده:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setBranchChoice('khorramshahr')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                      branchChoice === 'khorramshahr'
                        ? 'bg-[#B92B3A] text-white shadow-xs'
                        : 'bg-[#FAF5F5] dark:bg-white/5 border border-[#E8DFE0] dark:border-white/10 text-[#555E6B]'
                    }`}
                  >
                    شعبه خرمشهر
                  </button>
                  <button
                    type="button"
                    onClick={() => setBranchChoice('abadan')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                      branchChoice === 'abadan'
                        ? 'bg-[#B92B3A] text-white shadow-xs'
                        : 'bg-[#FAF5F5] dark:bg-white/5 border border-[#E8DFE0] dark:border-white/10 text-[#555E6B]'
                    }`}
                  >
                    شعبه آبادان
                  </button>
                </div>
              </div>

            </div>

            {/* Action Bar */}
            <div className="mt-6 pt-5 border-t border-[#E8DFE0] dark:border-white/10 flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="flex-1 py-3 px-4 rounded-xl bg-[#B92B3A] hover:bg-[#A32230] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-[#B92B3A]/20 transition-all active:scale-98"
              >
                {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedLink ? 'متن بلیت کپی شد!' : 'اشتراک‌گذاری بلیت استیج'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="p-3 rounded-xl border border-[#D5C6C8] dark:border-white/15 hover:border-[#B92B3A] text-[#141518] dark:text-white transition-all"
                title="چاپ یا ذخیره PDF"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* LUXURY CONCERT STAGE PASS (Left in RTL: 7 Columns) */}
          <div className="lg:col-span-7">
            
            {/* The Ticket Mockup */}
            <div 
              ref={ticketRef}
              className="rounded-[30px] bg-gradient-to-r from-[#220B10] via-[#1A080C] to-[#120508] text-white border-2 border-amber-500/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden text-right"
            >
              {/* Velvet Texture & Golden Radial Highlights */}
              <div 
                className="absolute top-0 right-0 w-80 h-80 bg-radial from-amber-500/15 via-transparent to-transparent pointer-events-none" 
                aria-hidden="true" 
              />
              <div 
                className="absolute -bottom-10 left-0 w-72 h-72 bg-radial from-[#B92B3A]/20 via-transparent to-transparent pointer-events-none" 
                aria-hidden="true" 
              />

              {/* Perforation decorative cutouts */}
              <div className="hidden sm:block absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full bg-[#F9F5F5] dark:bg-[#08090C] border-l-2 border-amber-500/40" />
              <div className="hidden sm:block absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 rounded-full bg-[#F9F5F5] dark:bg-[#08090C] border-r-2 border-amber-500/40" />

              {/* Ticket Top Ribbon */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-white/15">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Music className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold tracking-widest text-amber-400 uppercase block">
                      CHANG CONSERVATORY · STAGE PASS
                    </span>
                    <span className="text-xs font-semibold text-white/80">
                      گذرنامه رسمی اجرای صحنه‌ای هنرجو
                    </span>
                  </div>
                </div>

                <div className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3.5 py-1 rounded-full text-xs font-mono font-extrabold flex items-center gap-1.5 shadow-2xs">
                  <Award className="w-3.5 h-3.5" />
                  <span>VIP STAGE · {ticketSeat}</span>
                </div>
              </div>

              {/* Student Name & Performing Instrument Title */}
              <div className="mb-6">
                <span className="text-xs text-amber-300/80 font-medium block mb-1">
                  هنرمند و نوازنده صحنه:
                </span>
                <h3 className="text-3xl sm:text-4xl font-black font-brand-title text-white tracking-tight drop-shadow-sm">
                  {studentName || 'نام هنرجو'}
                </h3>
                
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="px-3 py-1 rounded-lg bg-white/10 text-amber-200 text-xs font-bold border border-white/10">
                    ساز: {selectedInstrument}
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-white/10 text-white/90 text-xs font-medium border border-white/10">
                    قطعه: {pieceName || 'اجرای آزاد'}
                  </span>
                </div>
              </div>

              {/* Event Hall & Timing Box */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[11px] text-amber-300/80 font-bold block mb-1">محل و سالن اجرا:</span>
                  <p className="text-sm font-bold text-white flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{currentConcert.hallName}</span>
                  </p>
                  <span className="text-[11px] text-white/60 block mt-0.5">{currentConcert.hallLocation}</span>
                </div>

                <div>
                  <span className="text-[11px] text-amber-300/80 font-bold block mb-1">زمان برگزاری:</span>
                  <p className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{currentConcert.dateStr}</span>
                  </p>
                  <span className="text-[11px] text-white/60 block mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{currentConcert.timeStr}</span>
                  </span>
                </div>
              </div>

              {/* Barcode & Security Strip */}
              <div className="pt-4 border-t border-dashed border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Decorative Barcode Lines */}
                  <div className="h-10 flex items-center gap-[3px] bg-white/10 px-3 py-1 rounded-lg">
                    {[16, 28, 20, 32, 14, 30, 24, 18, 28, 12, 26, 32, 16, 24, 30, 20].map((h, i) => (
                      <span 
                        key={i} 
                        style={{ height: `${h}px` }} 
                        className="w-[2px] bg-amber-400/90 rounded-xs" 
                      />
                    ))}
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-xs font-bold text-amber-300 block tracking-wider">
                      {ticketCode}
                    </span>
                    <span className="text-[10px] text-white/60">
                      مهر رسمی کنسرواتوار چنگ
                    </span>
                  </div>
                </div>

                {/* Branch affiliation tag */}
                <div className="text-left sm:text-left">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300/90 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
                    <Building2 className="w-3 h-3 text-amber-400" />
                    <span>{branchChoice === 'khorramshahr' ? 'شعبه خرمشهر' : 'شعبه آبادان'}</span>
                  </span>
                </div>
              </div>

            </div>

            {/* Note under ticket */}
            <p className="text-xs text-[#8996A6] text-center mt-3">
              * این کارت به عنوان نماد اشتیاق و یادبود آماده‌سازی هنرجو برای رسیتال‌های فصلی با افتخار اعطا می‌گردد.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};
