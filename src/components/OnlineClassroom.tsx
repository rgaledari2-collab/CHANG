import React, { useState } from 'react';
import { 
  Radio, 
  ExternalLink, 
  Sparkles, 
  Video, 
  ShieldCheck, 
  Key, 
  ArrowLeft, 
  Copy, 
  Check, 
  Music, 
  Users, 
  Layers,
  Lock,
  Globe,
  Share2
} from 'lucide-react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { ClassroomWindow } from './ClassroomWindow';
import { OnlineClassGuide } from './OnlineClassGuide';
import { COURSES_DATA } from '../data';

interface OnlineClassroomProps {
  onRegisterRequest?: () => void;
}

export const OnlineClassroom: React.FC<OnlineClassroomProps> = () => {
  const sectionRef = useRevealOnScroll<HTMLElement>();
  
  // Link Entry State
  const [roomInput, setRoomInput] = useState('chang-piano-studio');
  const [studentName, setStudentName] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('پیانو کلاسیک و ایرانی');
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const activeRooms = [
    {
      code: 'chang-piano-studio',
      title: 'استودیو ۱: پیانو و کیبورد (مسترکلاس)',
      teacher: 'استاد نگار احمدی',
      status: 'در حال برگزاری',
      activeCount: '۲ نفر آنلاین',
      tag: 'پیانو'
    },
    {
      code: 'chang-tar-setar',
      title: 'استودیو ۲: تار، سه‌تار و ردیف‌نوازی',
      teacher: 'استاد علیرضا حسینی',
      status: 'در حال برگزاری',
      activeCount: '۲ نفر آنلاین',
      tag: 'تار و سه‌تار'
    },
    {
      code: 'chang-vocal-ear',
      title: 'استودیو ۳: سلفژ، آواز و صداسازی',
      teacher: 'استاد پوریا دهقان',
      status: 'آماده پذیرش',
      activeCount: 'آماده ورود',
      tag: 'آواز'
    }
  ];

  const handleEnterByLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setErrorMsg('لطفاً نام یا نام‌خانوادگی خود را جهت ورود به کلاس وارد نمایید.');
      return;
    }
    if (!roomInput.trim()) {
      setErrorMsg('شناسه یا لینک اتاق الزامی است.');
      return;
    }

    setErrorMsg(null);
    setIsWindowOpen(true);
  };

  const handleQuickJoin = (roomCode: string, courseTitle: string) => {
    setRoomInput(roomCode);
    setSelectedCourse(courseTitle);
    if (!studentName.trim()) {
      setStudentName('هنرجو مهمان');
    }
    setIsWindowOpen(true);
  };

  const fullShareUrl = `https://chang-music.ir/live-room/${roomInput}`;

  const copyCurrentLink = () => {
    navigator.clipboard?.writeText(fullShareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section 
      ref={sectionRef} 
      id="online-class" 
      className="py-20 lg:py-24 bg-[#FCF8F8] dark:bg-[#0A0C10] border-b border-[#E8DFE0] dark:border-white/10 transition-colors"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 reveal-on-scroll">
          <div className="max-w-2xl text-right">
            <div className="inline-flex items-center gap-2 text-[13px] font-bold text-[#B92B3A] dark:text-[#F3C7CA] mb-2 tracking-tight">
              <span className="font-mono text-[14px]">۰۲</span>
              <span>/</span>
              <Radio className="w-3.5 h-3.5 text-[#B92B3A] dark:text-[#F3C7CA] animate-pulse" />
              <span>پلتفرم استودیو و کلاس آنلاین اختصاصی</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#202124] dark:text-white leading-[1.10] tracking-[-0.025em] mb-3 [text-wrap:balance]">
              ورود سریع با لینک اختصاصی به پنجره کلاس آنلاین.
            </h2>
            
            <p className="text-[17px] text-[#5a626d] dark:text-[#9ca3af] font-normal leading-[1.5] [text-wrap:pretty]">
              بدون نیاز به نصب اپلیکیشن سنگین. هنرجویان صرفاً با کلیک روی لینک کلاس ارسالی در پیامک یا ورود شناسه اتاق، در یک پنجره مجزا و متمرکز به استودیوی زنده استاد متصل می‌شوند.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40 text-[12px] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>پنجره مستقل WebRTC با صدای High-Fi</span>
            </span>
          </div>
        </div>

        {/* 2-Column Portal Hub Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 7 Cols: Link Access & Join Card */}
          <div className="lg:col-span-7 bg-white dark:bg-[#171A21] rounded-[24px] border border-[#E8DFE0] dark:border-white/10 p-6 sm:p-8 shadow-sm text-right">
            
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E8DFE0] dark:border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-[#B92B3A] text-white flex items-center justify-center shadow-md">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-[18px] sm:text-[20px] font-bold text-[#202124] dark:text-white">
                  درگاه اتصال به اتاق جلسه با لینک اختصاصی
                </h3>
                <p className="text-[13px] text-[#8996A6] dark:text-[#9ca3af]">
                  لینک کلاس پس از ثبت‌نام پیامک شده یا از استاد دریافت می‌گردد.
                </p>
              </div>
            </div>

            <form onSubmit={handleEnterByLink} className="space-y-4">
              
              {/* Student Name */}
              <div>
                <label className="block text-[13px] font-bold text-[#202124] dark:text-[#CBD5E1] mb-1.5">
                  نام و نام خانوادگی هنرجو جهت ثبت حضور در جلسه *
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="مثال: کیان راد"
                  className="w-full px-4 py-3 rounded-xl bg-[#FCF8F8] dark:bg-[#101217] border border-[#E8DFE0] dark:border-white/10 text-[14px] text-[#202124] dark:text-white focus:outline-none focus:border-[#B92B3A]"
                />
              </div>

              {/* Room Identifier / Link input */}
              <div>
                <label className="block text-[13px] font-bold text-[#202124] dark:text-[#CBD5E1] mb-1.5 flex items-center justify-between">
                  <span>شناسه یا لینک اتاق کلاس آنلاین *</span>
                  <span className="text-[11px] text-[#8996A6]">لینک مستقیم یا کُد استودیو</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={roomInput}
                    onChange={(e) => setRoomInput(e.target.value)}
                    placeholder="مثال: chang-piano-studio"
                    className="w-full pr-4 pl-24 py-3 rounded-xl bg-[#FCF8F8] dark:bg-[#101217] border border-[#E8DFE0] dark:border-white/10 text-[14px] text-[#202124] dark:text-white font-mono dir-ltr text-right focus:outline-none focus:border-[#B92B3A]"
                  />
                  <div className="absolute left-2 top-2">
                    <button
                      type="button"
                      onClick={copyCurrentLink}
                      className="px-2.5 py-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 text-[11px] text-gray-600 dark:text-gray-300 flex items-center gap-1 transition-colors"
                      title="کپی لینک مستقیم"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? 'کپی شد' : 'کپی لینک'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Course Selection */}
              <div>
                <label className="block text-[13px] font-bold text-[#202124] dark:text-[#CBD5E1] mb-1.5">
                  دوره / ساز مورد آموزش در این جلسه:
                </label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#FCF8F8] dark:bg-[#101217] border border-[#E8DFE0] dark:border-white/10 text-[13px] text-[#202124] dark:text-white focus:outline-none focus:border-[#B92B3A]"
                >
                  {COURSES_DATA.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 text-red-700 dark:text-red-300 text-[12px]">
                  {errorMsg}
                </div>
              )}

              {/* Action Button: Opens dedicated independent classroom window */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-full bg-[#B92B3A] hover:bg-[#A52432] active:scale-98 text-white font-bold text-[15px] shadow-md transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span>ورود به پنجره کلاس آنلاین استودیو</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-[#E8DFE0] dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-[12px] text-[#8996A6] dark:text-[#9ca3af]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>رمزنگاری سرتاسری اتاق جلسات</span>
              </div>
              <span className="font-mono">سرور اختصاصی خوزستان</span>
            </div>

          </div>

          {/* Right 5 Cols: Active Rooms & Direct Access Cards */}
          <div className="lg:col-span-5 space-y-4 text-right">
            
            <div className="p-4 bg-white dark:bg-[#171A21] rounded-2xl border border-[#E8DFE0] dark:border-white/10 shadow-xs">
              <h4 className="text-[15px] font-bold text-[#202124] dark:text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>اتاق‌های فعال آموزشگاه (ورود سریع یک‌کلیکی)</span>
              </h4>
              <p className="text-[12px] text-[#5a626d] dark:text-[#9ca3af] leading-relaxed mb-4">
                اگر پیامک لینک را دریافت نکرده‌اید، با انتخاب اتاق مربوطه مستقیماً وارد پنجره کلاس شوید:
              </p>

              <div className="space-y-2.5">
                {activeRooms.map((room) => (
                  <div
                    key={room.code}
                    className="p-3.5 rounded-xl border border-[#E8DFE0] dark:border-white/10 bg-[#FCF8F8] dark:bg-[#111317] hover:border-[#B92B3A] transition-all flex items-center justify-between gap-3 group"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[13px] font-bold text-[#202124] dark:text-white">
                          {room.title}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#8996A6] dark:text-[#9ca3af]">
                        <span>مدرس: {room.teacher}</span> · <span className="text-emerald-600 dark:text-emerald-400 font-medium">{room.activeCount}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleQuickJoin(room.code, room.tag)}
                      className="px-3 py-1.5 rounded-lg bg-[#B92B3A] hover:bg-[#A52432] text-white font-bold text-[12px] flex items-center gap-1 transition-all shrink-0 shadow-xs group-hover:scale-105"
                    >
                      <span>ورود</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Instruction Box */}
            <div className="p-4 rounded-2xl bg-[#FAF0F1] dark:bg-white/5 border border-[#E8DFE0] dark:border-white/10 text-[12px] leading-relaxed text-[#5a626d] dark:text-[#9ca3af]">
              <strong className="text-[#B92B3A] dark:text-[#FFB3BA] block mb-1">
                نحوه ورود به پنجره کلاس آنلاین:
              </strong>
              ۱. روی دکمه ورود کلیک کنید تا پنجره استودیوی زنده باز شود.<br />
              ۲. اجازه دسترسی به میکروفون و دوربین را در مرورگر تایید کنید.<br />
              ۳. پیانوی مجازی و مترونوم برای سلفژ و کوک همزمان در اختیار شماست.
            </div>

          </div>

        </div>

        {/* Step-by-Step Educational Guide for Students */}
        <OnlineClassGuide />

      </div>

      {/* Independent Fullscreen/Windowed Classroom Overlay */}
      {isWindowOpen && (
        <ClassroomWindow
          roomCode={roomInput}
          studentName={studentName || 'هنرجوی عزیز'}
          courseTitle={selectedCourse}
          onClose={() => setIsWindowOpen(false)}
        />
      )}
    </section>
  );
};
