import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  ArrowLeft, 
  Calendar, 
  Music, 
  ShieldCheck, 
  Volume2, 
  Maximize2,
  Navigation
} from 'lucide-react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

interface StudioRoom {
  id: string;
  name: string;
  category: string;
  acousticSpec: string;
  instruments: string[];
  capacity: string;
  description: string;
  badge: string;
}

interface BranchData {
  id: 'khorramshahr' | 'abadan';
  title: string;
  subtitle: string;
  address: string;
  phone: string;
  workingHours: string;
  establishedYear: string;
  totalRooms: number;
  featuredInstrument: string;
  rooms: StudioRoom[];
  highlights: string[];
}

const BRANCHES: Record<'khorramshahr' | 'abadan', BranchData> = {
  khorramshahr: {
    id: 'khorramshahr',
    title: 'شعبه مرکزی خرمشهر (خلیج فارس)',
    subtitle: 'کنسرواتوار اصلی و کانون تاریخی آموزشگاه موسیقی چنگ از ۱۳۵۰',
    address: 'خرمشهر، بلوار ساحلی خلیج فارس، جنب مجتمع فرهنگی هنری چنگ',
    phone: '۰۶۱-۵۳۵۲۱۰۰۰',
    workingHours: 'همه‌روزه از ساعت ۱۵:۰۰ الی ۲۱:۳۰ (پنج‌شنبه‌ها از ۹:۰۰ صبح)',
    establishedYear: '۱۳۵۰',
    totalRooms: 6,
    featuredInstrument: 'گرند پیانو کنسرت رویال یاماها C3X',
    highlights: [
      'سالن رسیتال انفرادی با گنجایش ۵۰ تماشاگر ویژه اجراهای کلاسی',
      'عایق‌بندی دو جداره آکوستیک با چوب طبیعی گردو و راش',
      'آرشیو پارتیتورها و ردیف‌های خطی استاد صبا و خالقی',
      'استودیو اختصاصی ضبط اتودهای مرحله‌ای و سنجش پیشرفت هنرجو'
    ],
    rooms: [
      {
        id: 'kh-piano',
        name: 'استودیوی گرند پیانو و موسیقی کلاسیک',
        category: 'کلاویه‌ای و ارکسترال',
        acousticSpec: 'طنین RT60 کالیبره‌شده روی ۰.۸۵ ثانیه با دیفیوزرهای چوبی',
        instruments: ['گرند پیانو آکوستیک C3X', 'پیانو دیواری کاوایی', 'مترونوم مکانیکی ویتنر'],
        capacity: 'انفرادی و دوئت (استاد و هنرجو)',
        description: 'فضایی متمرکز با نورپردازی طبیعی کنترل‌شده و دمای تثبیت‌شده برای پایداری کوک سیم‌ها.',
        badge: 'ویژه رسیتال و آزمون'
      },
      {
        id: 'kh-traditional',
        name: 'تالار مشاهیر و سازهای دستگاهی ایران',
        category: 'تار، سه‌تار، سنتور و آواز',
        acousticSpec: 'طنین گرم مناسب کاسه پوستی سازهای سنتی و بم‌خوانی',
        instruments: ['تار پوستی یحیی ساخت', 'سنتور سه‌مهر سالاری', 'سه‌تار مفاخری'],
        capacity: 'انفرادی و آنسامبل ۴ نفره',
        description: 'دیزاین برگرفته از تالارهای موسیقی کهن با فرورفتگی‌های آکوستیک جهت بازتاب شفاف مضراب‌ها.',
        badge: 'ردیف‌نوازی عالی'
      },
      {
        id: 'kh-recital',
        name: 'پلاتوی رسیتال و هم‌نوازی ارکستر',
        category: 'اجرای صحنه‌ای و گروهی',
        acousticSpec: 'پوشش جاذب فرکانس‌های بم، سیستم صوتی استودیویی و نور متمرکز',
        instruments: ['سازهای کوبه‌ای کامل', 'پیانو استیج', 'پایه پارتیتورهای ارکستری'],
        capacity: 'تا ۱۲ نوازنده همزمان + ۳۰ صندلی حضار',
        description: 'تمرین اجرای بدون اضطراب صحنه پیش از اعزام به سالن‌های بزرگ منطقه آزاد اروند.',
        badge: 'استیج شبیه‌ساز'
      }
    ]
  },
  abadan: {
    id: 'abadan',
    title: 'شعبه تخصصی آبادان (خیابان شهید شاملو)',
    subtitle: 'مرکز نوین آموزش سازهای جهانی، موسیقی کودک و استودیوی آنسامبل',
    address: 'آبادان، خیابان شهید احمد شاملو (امیری سابق)، تقاطع فرعی سوم، پلاک ۴۲',
    phone: '۰۶۱-۵۳۳۲۴۵۰۰',
    workingHours: 'همه‌روزه از ساعت ۱۵:۳۰ الی ۲۱:۰۰ (جمعه‌ها تعطیل)',
    establishedYear: '۱۳۸۴',
    totalRooms: 5,
    featuredInstrument: 'مجموعه تخصصی متالوفون‌ها و زایلوفون‌های استاندارد Orff اشلایدر',
    highlights: [
      'دپارتمان مستقل استعدادیابی کودک با کفپوش ضدضربه و رنگ‌های ارگونومیک',
      'کلاس‌های عایق صدا اختصاصی ویولن و سازهای زهی با آینه‌های فرم‌گیری دست',
      'استودیو ضبط پادکست‌های تئوری و سلفژ گروهی',
      'دسترسی سریع شهری در قلب منطقه فرهنگی آبادان'
    ],
    rooms: [
      {
        id: 'ab-orff',
        name: 'آتلیه موسیقی کودک (کنسرواتوار اُرف)',
        category: 'کودک، بلز و ریکوردر',
        acousticSpec: 'محیط آکوستیک شاد با جذب بازتاب تند و فرکانس‌های زیر',
        instruments: ['بلز متالوفون سوپرانو و آلتو', 'فلوت ریکوردر موکلنباخ', 'شیکرها و طبلک‌ها'],
        capacity: 'کلاس‌های گروهی ۵ تا ۸ کودک',
        description: 'طراحی ویژه بدون زوایای تیز جهت حرکت آزادانه کودکان، بازی‌های ریتمیک و کشف شوق موسیقی.',
        badge: 'محیط اختصاصی ۳ تا ۸ سال'
      },
      {
        id: 'ab-strings',
        name: 'استودیوی ویولن و گیتار فلامنکو / کلاسیک',
        category: 'زهی و انگشت‌گذاری',
        acousticSpec: 'آینه‌های قدی پوزیسیون سنج و کف چوب پارکت طنین‌انداز',
        instruments: ['گیتار الحمبرا ۷P', 'ویولن دست‌ساز اروپایی', 'تیونرهای دیجیتال استودیویی'],
        capacity: 'انفرادی و دونوازی',
        description: 'تنظیم‌شده برای کنترل دقیق اکول دست، زوایای آرشه‌کشی و شفافیت نوانس‌های ریز صدادهی.',
        badge: 'تمرکز بر تکنیک آرشه'
      },
      {
        id: 'ab-percussion',
        name: 'استودیوی ضرب‌آهنگ و سازهای کوبه‌ای',
        category: 'دف، تنبک، کاخن و هنگ‌درام',
        acousticSpec: 'عایق‌بندی سنگین ضدلرزش کف (Floating Floor) جهت مهار ارتعاشات بم',
        instruments: ['دف‌های پوستی کردستان', 'تنبک‌های گردوی یک‌تکه شیرانی', 'هنگ‌درام ر مینور'],
        capacity: 'کلاس‌های ۴ نفره دورهمی ریتم',
        description: 'تخلیه انرژی و تقویت درک ایقاعی ریتم در فضایی کاملاً آکوستیک بدون آزار محیط پیرامونی.',
        badge: 'آکوستیک بدون نشت صدا'
      }
    ]
  }
};

export const BranchesStudioTour: React.FC = () => {
  const [activeBranch, setActiveBranch] = useState<'khorramshahr' | 'abadan'>('khorramshahr');
  const [activeRoomId, setActiveRoomId] = useState<string>('kh-piano');
  const sectionRef = useRevealOnScroll<HTMLElement>();

  const branch = BRANCHES[activeBranch];
  const activeRoom = branch.rooms.find(r => r.id === activeRoomId) || branch.rooms[0];

  const handleBranchSwitch = (newBranchId: 'khorramshahr' | 'abadan') => {
    setActiveBranch(newBranchId);
    setActiveRoomId(BRANCHES[newBranchId].rooms[0].id);
  };

  return (
    <section 
      ref={sectionRef}
      id="studios"
      className="py-20 lg:py-28 bg-[#F9F5F5] dark:bg-[#090B0E] border-b border-[#E8DFE0] dark:border-white/10 relative transition-colors overflow-hidden select-none"
    >
      {/* Subtle wood & gold grain atmosphere accents */}
      <div 
        className="absolute top-1/4 -right-24 w-96 h-96 bg-radial from-amber-600/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-10 left-0 w-80 h-80 bg-radial from-[#B92B3A]/8 via-transparent to-transparent rounded-full blur-2xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/25 text-amber-900 dark:text-amber-300 text-[12px] sm:text-[13px] font-bold mb-3 shadow-2xs">
            <Building2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>معماری آکوستیک و استودیوهای آموزشی</span>
            <span className="text-amber-600/40">•</span>
            <span>دو شعبه رسمی در منطقه آزاد اروند</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black font-brand-title text-[#141518] dark:text-white leading-[1.25] tracking-tight mb-4">
            فضایی شایسته تمرین هنر؛ <br className="hidden sm:block" />
            <span className="text-[#B92B3A] dark:text-[#FFB3BA]">کلاس‌های آکوستیک چوب و گرند پیانو</span>
          </h2>

          <p className="text-[15px] sm:text-[17px] text-[#555E6B] dark:text-[#A6B0BE] leading-relaxed max-w-2xl mx-auto">
            هنرجویان چنگ در اتاق‌هایی با مهندسی فرکانس، سازهای استاندارد اروپایی و سازهای اصیل سنتی آموزش می‌بینند تا شنوایی موسیقایی از روز اول به درستی پرورش یابد.
          </p>
        </div>

        {/* Branch Selector Tabs (Editorial Wood & Brass Style) */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-[#151821] border border-[#E8DFE0] dark:border-white/10 shadow-sm gap-2">
            <button
              type="button"
              onClick={() => handleBranchSwitch('khorramshahr')}
              className={`flex items-center gap-2.5 px-5 sm:px-8 py-3 rounded-xl text-[13px] sm:text-[15px] font-bold transition-all ${
                activeBranch === 'khorramshahr'
                  ? 'bg-[#B92B3A] text-white shadow-md shadow-[#B92B3A]/25'
                  : 'text-[#5a626d] dark:text-[#9ca3af] hover:text-[#141518] dark:hover:text-white hover:bg-[#FAF5F5] dark:hover:bg-white/5'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>شعبه مرکزی خرمشهر</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                activeBranch === 'khorramshahr' ? 'bg-white/20 text-white' : 'bg-amber-500/15 text-amber-800 dark:text-amber-300'
              }`}>
                تأسیس ۱۳۵۰
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleBranchSwitch('abadan')}
              className={`flex items-center gap-2.5 px-5 sm:px-8 py-3 rounded-xl text-[13px] sm:text-[15px] font-bold transition-all ${
                activeBranch === 'abadan'
                  ? 'bg-[#B92B3A] text-white shadow-md shadow-[#B92B3A]/25'
                  : 'text-[#5a626d] dark:text-[#9ca3af] hover:text-[#141518] dark:hover:text-white hover:bg-[#FAF5F5] dark:hover:bg-white/5'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>شعبه تخصصی آبادان</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                activeBranch === 'abadan' ? 'bg-white/20 text-white' : 'bg-blue-500/15 text-blue-800 dark:text-blue-300'
              }`}>
                شهید شاملو
              </span>
            </button>
          </div>
        </div>

        {/* Branch Info Strip */}
        <div className="bg-white dark:bg-[#141720] rounded-2xl border border-[#E8DFE0] dark:border-white/10 p-5 sm:p-7 mb-8 shadow-xs flex flex-wrap items-center justify-between gap-4 text-right">
          <div>
            <div className="flex items-center gap-2 text-[12px] font-bold text-amber-800 dark:text-amber-300 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{branch.subtitle}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-brand-title text-[#141518] dark:text-white">
              {branch.title}
            </h3>
            <p className="text-[13px] text-[#6b7280] dark:text-[#9ca3af] mt-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#B92B3A] shrink-0" />
              <span>{branch.address}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#5a626d] dark:text-[#A6B0BE]">
            <div className="flex items-center gap-2 bg-[#FAF5F5] dark:bg-white/5 px-3.5 py-2 rounded-xl">
              <Phone className="w-3.5 h-3.5 text-[#B92B3A]" />
              <span className="font-mono text-sm">{branch.phone}</span>
            </div>
            <div className="flex items-center gap-2 bg-[#FAF5F5] dark:bg-white/5 px-3.5 py-2 rounded-xl">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>{branch.workingHours}</span>
            </div>
          </div>
        </div>

        {/* Two-Column Studio Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Room Navigation Tabs - 5 Columns */}
          <div className="lg:col-span-5 space-y-3.5 order-2 lg:order-1 text-right">
            <span className="text-[12px] font-bold text-[#8996A6] dark:text-[#9ca3af] block px-1">
              استودیوها و آتلیه‌های فعال این شعبه:
            </span>

            {branch.rooms.map((room) => {
              const isSelected = room.id === activeRoom.id;
              return (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => setActiveRoomId(room.id)}
                  className={`w-full p-5 rounded-2xl border text-right transition-all flex flex-col justify-between group relative overflow-hidden ${
                    isSelected
                      ? 'bg-white dark:bg-[#181B24] border-[#B92B3A] dark:border-[#FFB3BA] shadow-md ring-2 ring-[#B92B3A]/20'
                      : 'bg-white/70 dark:bg-[#12151C] border-[#E8DFE0] dark:border-white/10 hover:border-[#B92B3A]/40 hover:bg-white dark:hover:bg-[#161922]'
                  }`}
                >
                  {/* Active Indicator Bar */}
                  {isSelected && (
                    <span className="absolute top-0 right-0 bottom-0 w-1.5 bg-[#B92B3A]" />
                  )}

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-extrabold text-[#B92B3A] dark:text-[#FFB3BA] bg-[#FAF0F1] dark:bg-white/5 px-2.5 py-0.5 rounded-full">
                      {room.badge}
                    </span>
                    <span className="text-xs text-[#8996A6] font-medium">{room.category}</span>
                  </div>

                  <h4 className="text-[16px] sm:text-[17px] font-black text-[#141518] dark:text-white mb-1.5 group-hover:text-[#B92B3A] transition-colors">
                    {room.name}
                  </h4>

                  <p className="text-[12px] text-[#555E6B] dark:text-[#9ca3af] line-clamp-2 leading-relaxed">
                    {room.description}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-[#F2ECEC] dark:border-white/5 flex items-center justify-between text-[11px] font-bold text-[#8996A6] group-hover:text-[#B92B3A]">
                    <span>مشاهده جزئیات آکوستیک و سازها</span>
                    <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                  </div>
                </button>
              );
            })}

            {/* Quick Visit Reservation Prompt */}
            <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-400/5 border border-amber-500/25 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
                <span className="text-xs font-bold text-amber-950 dark:text-amber-200">
                  تمایل به بازدید حضوری از استودیوها دارید؟
                </span>
              </div>
              <a
                href="#contact"
                className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold transition-all shadow-xs"
              >
                رزرو وقت بازدید
              </a>
            </div>

          </div>

          {/* Active Room In-Depth Acoustic Card - 7 Columns */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="rounded-[28px] bg-gradient-to-br from-white via-[#FCF9F9] to-[#F7EDED] dark:from-[#171A24] dark:via-[#14161F] dark:to-[#0D0F16] border-2 border-[#E8DFE0] dark:border-white/15 p-6 sm:p-9 shadow-xl relative overflow-hidden text-right">
              
              {/* Subtle Chamber Ambient Glow */}
              <div 
                className="absolute top-0 left-0 w-64 h-64 bg-amber-500/10 dark:bg-amber-400/5 rounded-full blur-3xl pointer-events-none"
                aria-hidden="true" 
              />

              {/* Room Header with Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-[#E8DFE0] dark:border-white/10">
                <div>
                  <span className="inline-block text-[11px] font-mono font-extrabold uppercase tracking-wider text-[#B92B3A] dark:text-[#FFB3BA] bg-[#FAF0F1] dark:bg-white/5 px-2.5 py-1 rounded-lg mb-2">
                    {branch.title} · {activeRoom.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black font-brand-title text-[#141518] dark:text-white">
                    {activeRoom.name}
                  </h3>
                </div>

                <div className="bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/25 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>استاندارد عایق صدا ISO 140</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-[15px] sm:text-[16px] text-[#374151] dark:text-[#CBD5E1] leading-relaxed mb-6 font-normal">
                {activeRoom.description}
              </p>

              {/* Acoustic & Physical Specifications Box */}
              <div className="bg-[#FAF5F5] dark:bg-black/30 rounded-2xl p-5 border border-[#E8DFE0] dark:border-white/5 mb-6 space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-[#8996A6] block mb-1">
                    مهندسی آکوستیک و زمان واخنش (Reverberation):
                  </span>
                  <p className="text-sm font-bold text-[#141518] dark:text-white flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-[#B92B3A]" />
                    <span>{activeRoom.acousticSpec}</span>
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#E8DFE0] dark:border-white/10">
                  <div>
                    <span className="text-[11px] font-bold text-[#8996A6] block mb-1">ظرفیت فضا:</span>
                    <span className="text-xs font-bold text-[#141518] dark:text-white">{activeRoom.capacity}</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#8996A6] block mb-1">ساز شاخص این استودیو:</span>
                    <span className="text-xs font-bold text-[#B92B3A] dark:text-[#FFB3BA]">{branch.featuredInstrument}</span>
                  </div>
                </div>
              </div>

              {/* Stationed Instruments in this Room */}
              <div className="mb-7">
                <span className="text-[13px] font-bold text-[#141518] dark:text-white block mb-3">
                  تجهیزات و سازهای مستقر در این استودیو:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeRoom.instruments.map((inst, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#1F2330] border border-[#E8DFE0] dark:border-white/10 text-xs font-bold text-[#1f2937] dark:text-white shadow-2xs"
                    >
                      <Music className="w-3.5 h-3.5 text-[#B92B3A]" />
                      <span>{inst}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Branch Highlights Checklist */}
              <div className="pt-5 border-t border-[#E8DFE0] dark:border-white/10">
                <span className="text-[12px] font-bold text-[#8996A6] block mb-3">
                  امتیازات کنسرواتواری این شعبه:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {branch.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-medium text-[#4b5563] dark:text-[#9ca3af]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
