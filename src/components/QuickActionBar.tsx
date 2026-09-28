import React, { useState } from 'react';
import { Phone, MessageCircle, Sparkles, MapPin, X, ArrowLeft, ExternalLink, Instagram } from 'lucide-react';

interface QuickActionBarProps {
  onOpenConsultation?: () => void;
}

export const QuickActionBar: React.FC<QuickActionBarProps> = ({ onOpenConsultation }) => {
  const [showMessengerModal, setShowMessengerModal] = useState(false);

  const phoneNumber = '09359352738';
  const whatsappUrl = `https://wa.me/989359352738?text=${encodeURIComponent('درود، درخواست مشاوره، دریافت لوکیشن شعب و رزرو تعیین سطح در آموزشگاه موسیقی چنگ را دارم.')}`;
  const eitaaUrl = 'https://eitaa.com/Changabadan';
  const igKhorramshahrUrl = 'https://www.instagram.com/chang_khorramshahr?stkn=MWpvZTljd2Rya3U1cw==';
  const igAbadanUrl = 'https://www.instagram.com/chang_abadan?stkn=MTY1ZnhtdDVkcWZrbg==';

  const handleBookingClick = () => {
    if (onOpenConsultation) {
      onOpenConsultation();
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        const firstInput = contactSection.querySelector('input') as HTMLInputElement | null;
        if (firstInput) {
          setTimeout(() => firstInput.focus(), 600);
        }
      }
    }
  };

  return (
    <>
      {/* Floating Bottom Quick Action Bar - Mobile & Tablet (visible up to md screen) */}
      <aside 
        aria-label="دسترسی سریع و تماس" 
        className="fixed bottom-0 inset-x-0 z-40 md:hidden px-3 pb-3 pt-2 pointer-events-none"
      >
        <div className="max-w-md mx-auto pointer-events-auto">
          <div className="bg-[#1A1B1E]/95 dark:bg-[#121316]/95 backdrop-blur-xl border border-white/15 dark:border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.45)] p-1.5 flex items-center justify-between gap-1.5 ring-1 ring-black/20">
            
            {/* 1. Direct Phone Call */}
            <a
              href={`tel:${phoneNumber}`}
              aria-label="تماس تلفنی مستقیم با آموزشگاه موسیقی چنگ"
              className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl text-white hover:bg-white/10 active:bg-white/15 transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B92B3A] min-w-0 group"
            >
              <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-1 group-active:scale-90 transition-transform">
                <Phone className="w-4 h-4" />
              </span>
              <span className="text-[11px] font-bold tracking-tight text-neutral-200 truncate w-full">
                تماس مستقیم
              </span>
            </a>

            {/* Separator Line */}
            <div className="w-px h-8 bg-white/10 shrink-0" aria-hidden="true" />

            {/* 2. Messenger / Instagram / WhatsApp / Eitaa Modal trigger */}
            <button
              type="button"
              onClick={() => setShowMessengerModal(true)}
              aria-label="ارتباط در شبکه‌های اجتماعی، اینستاگرام شعب، واتساپ یا ایتا"
              className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl text-white hover:bg-white/10 active:bg-white/15 transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B92B3A] min-w-0 group"
            >
              <span className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-300 border border-pink-500/30 flex items-center justify-center mb-1 group-active:scale-90 transition-transform relative">
                <Instagram className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#1A1B1E]" />
              </span>
              <span className="text-[11px] font-bold tracking-tight text-neutral-200 truncate w-full">
                فضای مجازی
              </span>
            </button>

            {/* 3. Primary Booking CTA: رزرو برای تعیین سطح */}
            <button
              type="button"
              onClick={handleBookingClick}
              aria-label="رزرو برای تعیین سطح حضوری"
              className="flex-[1.5] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-l from-[#B92B3A] to-[#D9384A] hover:brightness-110 active:scale-[0.98] text-white shadow-md transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shrink-0"
            >
              <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
              </div>
              <div className="text-right leading-tight">
                <span className="block text-[12px] font-extrabold text-white">رزرو تعیین سطح</span>
                <span className="block text-[9px] text-[#FFB3BA] font-medium">مشاوره حضوری</span>
              </div>
            </button>

          </div>
        </div>
      </aside>

      {/* Desktop/Tablet Floating Quick Contact Trigger (Bottom-Right) */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3 pointer-events-auto">
        {/* Floating Mini Action Pill */}
        <div className="bg-[#1A1B1E]/95 dark:bg-[#121316]/95 backdrop-blur-xl border border-white/15 rounded-full p-1.5 shadow-xl flex items-center gap-2 ring-1 ring-black/20">
          <a
            href={`tel:${phoneNumber}`}
            aria-label="تماس با دفتر آموزشگاه: ۰۹۳۵۹۳۵۲۷۳۸"
            title="تماس مستقیم با دفتر آموزشگاه"
            className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 flex items-center justify-center transition-all active:scale-95"
          >
            <Phone className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={() => setShowMessengerModal(true)}
            aria-label="پیج‌های اینستاگرام شعب، واتساپ و ایتا"
            title="ارتباط در فضای مجازی و شبکه‌های اجتماعی"
            className="w-10 h-10 rounded-full bg-pink-500/20 text-pink-300 hover:bg-pink-500/30 border border-pink-500/30 flex items-center justify-center transition-all active:scale-95 relative"
          >
            <Instagram className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#1A1B1E]" />
          </button>

          <button
            type="button"
            onClick={handleBookingClick}
            aria-label="رزرو برای تعیین سطح حضوری"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#B92B3A] hover:bg-[#D9384A] text-white text-[13px] font-bold shadow-md transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>رزرو برای تعیین سطح</span>
          </button>
        </div>
      </div>

      {/* Social & Messenger Selection Modal (اینستاگرام شعب خرمشهر و آبادان + واتساپ + ایتا) */}
      {showMessengerModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="messenger-modal-title"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
          onClick={() => setShowMessengerModal(false)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-[#1A1D24] rounded-3xl p-5 sm:p-6 shadow-2xl border border-[#E8DFE0] dark:border-white/10 text-right animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFE0] dark:border-white/10 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-xs">
                  <Instagram className="w-5 h-5" />
                </span>
                <div>
                  <h3 id="messenger-modal-title" className="text-[15px] font-extrabold text-[#202124] dark:text-white">
                    پیج‌های رسمی و ارتباط مجازی
                  </h3>
                  <p className="text-[11px] text-[#4A5568] dark:text-[#CBD5E1]">
                    اینستاگرام شعب خرمشهر و آبادان، واتساپ و ایتا
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowMessengerModal(false)}
                aria-label="بستن پنجره"
                className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 text-[#4A5568] dark:text-neutral-300 hover:text-black dark:hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              
              {/* Instagram: Khorramshahr Branch */}
              <a
                href={igKhorramshahrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 border border-pink-200 dark:border-pink-800/40 hover:brightness-95 dark:hover:brightness-110 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[14px] font-bold text-[#202124] dark:text-white">
                        اینستاگرام شعبه خرمشهر
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#B92B3A] text-white font-medium">دفتر مرکزی</span>
                    </div>
                    <span className="block text-[12px] font-mono text-purple-700 dark:text-purple-300 dir-ltr text-right mt-0.5">
                      @chang_khorramshahr
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-pink-600 dark:text-pink-400 shrink-0" />
              </a>

              {/* Instagram: Abadan Branch */}
              <a
                href={igAbadanUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-rose-50 to-orange-50 dark:from-rose-950/20 dark:to-orange-950/20 border border-rose-200 dark:border-rose-800/40 hover:brightness-95 dark:hover:brightness-110 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#dc2743] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[14px] font-bold text-[#202124] dark:text-white">
                        اینستاگرام شعبه آبادان
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-600 text-white font-medium">شعبه فعال</span>
                    </div>
                    <span className="block text-[12px] font-mono text-rose-700 dark:text-rose-300 dir-ltr text-right mt-0.5">
                      @chang_abadan
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
              </a>

              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[13px] font-bold text-emerald-950 dark:text-emerald-200">
                      واتساپ (WhatsApp)
                    </span>
                    <span className="block text-[11px] text-emerald-800 dark:text-emerald-300">
                      مشاوره متنی، دریافت لوکیشن و فایل صوتی
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              </a>

              {/* Eitaa */}
              <a
                href={eitaaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/40 hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13px] font-bold text-orange-950 dark:text-orange-200">
                        پیام‌رسان ایتا (Eitaa)
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-orange-200 dark:bg-orange-800 text-orange-900 dark:text-orange-100 font-mono dir-ltr">
                        @Changabadan
                      </span>
                    </div>
                    <span className="block text-[11px] text-orange-800 dark:text-orange-300">
                      کانال رسمی اطلاع‌رسانی کلاس‌ها و مشاوره
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0" />
              </a>

              {/* Location addresses */}
              <div className="p-3.5 rounded-2xl bg-[#FCF8F8] dark:bg-[#14161C] border border-[#E8DFE0] dark:border-white/10">
                <div className="flex items-center gap-2 mb-1.5 text-[#B92B3A] dark:text-[#FFB3BA] text-[12px] font-bold">
                  <MapPin className="w-4 h-4" />
                  <span>آدرس شعب جهت مراجعه حضوری:</span>
                </div>
                <div className="text-[12px] text-[#4A5568] dark:text-[#CBD5E1] space-y-1">
                  <p><strong className="text-[#202124] dark:text-white">خرمشهر:</strong> میدان فرمانداری، مجتمع فرهنگی خلیج فارس</p>
                  <p><strong className="text-[#202124] dark:text-white">آبادان:</strong> سه‌راه شاملو، نبش زمین چمن</p>
                </div>
              </div>

            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowMessengerModal(false)}
              className="mt-4 w-full py-2.5 rounded-xl bg-[#FAF0F1] dark:bg-white/10 hover:bg-[#F3C7CA]/40 dark:hover:bg-white/20 text-[#202124] dark:text-white text-[13px] font-bold transition-colors"
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </>
  );
};
