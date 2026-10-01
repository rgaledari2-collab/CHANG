import React, { useState } from 'react';
import { 
  Phone, 
  Sparkles, 
  X, 
  ExternalLink, 
  Instagram, 
  MessageCircle, 
  MapPin 
} from 'lucide-react';
import { useSiteConfig } from '../config/SiteConfigContext';

interface QuickActionBarProps {
  onOpenConsultation?: () => void;
}

export const QuickActionBar: React.FC<QuickActionBarProps> = ({ onOpenConsultation }) => {
  const config = useSiteConfig();
  const [showMessengerModal, setShowMessengerModal] = useState(false);
  const [isFabMenuOpen, setIsFabMenuOpen] = useState(false);

  const phoneNumber = config.phone;
  const whatsappUrl = config.socialLinks.whatsapp 
    ? `${config.socialLinks.whatsapp}?text=${encodeURIComponent('درود، درخواست مشاوره، دریافت لوکیشن شعب و رزرو تعیین سطح در آموزشگاه موسیقی چنگ را دارم.')}`
    : `https://wa.me/98${config.phone.replace(/^0/, '')}`;
  const eitaaUrl = config.socialLinks.eitaa;
  const igKhorramshahrUrl = config.socialLinks.instagramKhorramshahr;
  const igAbadanUrl = config.socialLinks.instagramAbadan;

  const handleBookingClick = () => {
    setIsFabMenuOpen(false);
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
      {/* 
        ========================================================================
        MOBILE & TABLET: Ultra-Compact Circular Floating Action Button (FAB)
        Only 48x48px circular button placed cleanly at bottom-left corner.
        Frees up 100% of the mobile screen while providing instant, elegant access.
        ========================================================================
      */}
      <div className="md:hidden fixed bottom-5 left-4 z-40 flex flex-col items-start select-none">
        
        {/* Backdrop overlay when speed dial popup is active */}
        {isFabMenuOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-30 transition-opacity animate-in fade-in duration-200"
            onClick={() => setIsFabMenuOpen(false)}
          />
        )}

        {/* Speed-dial Popover Menu items */}
        {isFabMenuOpen && (
          <div className="relative z-40 mb-3 flex flex-col gap-2.5 items-start animate-in slide-in-from-bottom-3 fade-in duration-200">
            {/* 1. Direct Phone Call */}
            <a
              href={`tel:${phoneNumber}`}
              onClick={() => setIsFabMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-full bg-[#1A1B1E] text-white text-[12px] font-bold border border-white/20 shadow-xl active:scale-95 transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span className="whitespace-nowrap">تماس تلفنی</span>
            </a>

            {/* 2. Instagram & Messengers */}
            <button
              type="button"
              onClick={() => {
                setIsFabMenuOpen(false);
                setShowMessengerModal(true);
              }}
              className="flex items-center gap-2.5 px-3 py-2 rounded-full bg-[#1A1B1E] text-white text-[12px] font-bold border border-white/20 shadow-xl active:scale-95 transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 flex items-center justify-center">
                <Instagram className="w-3.5 h-3.5" />
              </div>
              <span className="whitespace-nowrap">اینستاگرام و ایتا</span>
            </button>

            {/* 3. Level Assessment Reservation */}
            <button
              type="button"
              onClick={handleBookingClick}
              className="flex items-center gap-2.5 px-3 py-2 rounded-full bg-gradient-to-l from-[#B92B3A] to-[#D9384A] text-white text-[12px] font-extrabold border border-white/20 shadow-xl active:scale-95 transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="whitespace-nowrap">رزرو تعیین سطح</span>
            </button>
          </div>
        )}

        {/* Circular Main FAB Button */}
        <button
          type="button"
          onClick={() => setIsFabMenuOpen(!isFabMenuOpen)}
          aria-expanded={isFabMenuOpen}
          aria-label="دکمه دسترسی سریع، تماس و رزرو تعیین سطح"
          className={`relative z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(185,43,58,0.4)] border border-white/25 active:scale-90 transition-all duration-200 ${
            isFabMenuOpen 
              ? 'bg-[#1A1B1E] text-white rotate-90' 
              : 'bg-[#B92B3A] hover:bg-[#D9384A] text-white ring-4 ring-[#B92B3A]/20'
          }`}
        >
          {isFabMenuOpen ? (
            <X className="w-5 h-5 transition-transform" />
          ) : (
            <>
              <Phone className="w-5 h-5 text-white animate-pulse" />
              {/* Micro badge dot indicator */}
              <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-[#B92B3A]" />
            </>
          )}
        </button>
      </div>

      {/* 
        ========================================================================
        DESKTOP / TABLET: Refined Floating Pill (Bottom-Right)
        ========================================================================
      */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3 pointer-events-auto select-none">
        <div className="bg-[#1A1B1E]/95 dark:bg-[#121316]/95 backdrop-blur-xl border border-white/15 rounded-full p-1.5 shadow-xl flex items-center gap-2 ring-1 ring-black/20">
          <a
            href={`tel:${phoneNumber}`}
            aria-label={`تماس با دفتر آموزشگاه: ${config.phoneDisplay}`}
            title="تماس مستقیم با دفتر آموزشگاه"
            className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 flex items-center justify-center transition-all active:scale-95"
          >
            <Phone className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={() => setShowMessengerModal(true)}
            aria-label="پیج‌های اینستاگرام شعب، واتساپ و ایتا"
            title="ارتباط در فضای مجازی و شبکه‌های اجتماعی"
            className="w-9 h-9 rounded-full bg-pink-500/20 text-pink-300 hover:bg-pink-500/30 border border-pink-500/30 flex items-center justify-center transition-all active:scale-95 relative"
          >
            <Instagram className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#1A1B1E]" />
          </button>

          <button
            type="button"
            onClick={handleBookingClick}
            aria-label="رزرو برای تعیین سطح حضوری"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#B92B3A] hover:bg-[#D9384A] text-white text-[12px] font-bold shadow-md transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>تعیین سطح حضوری</span>
          </button>
        </div>
      </div>

      {/* Social & Messenger Selection Modal (اینستاگرام شعب خرمشهر و آبادان + واتساپ + ایتا) */}
      {showMessengerModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="messenger-modal-title"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200 select-none"
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
                className="w-8 h-8 rounded-full bg-[#FAF0F1] dark:bg-white/10 text-[#4A5568] dark:text-white hover:bg-[#F3C7CA]/50 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Channels List */}
            <div className="space-y-2.5">
              {/* 1. Instagram Khorramshahr */}
              {igKhorramshahrUrl && (
                <a
                  href={igKhorramshahrUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 hover:border-pink-500/40 text-[#202124] dark:text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div className="text-right">
                      <span className="block text-[13px] font-bold">اینستاگرام {config.branches.khorramshahr.name}</span>
                      <span className="block text-[11px] font-mono text-[#4A5568] dark:text-[#CBD5E1]">@{config.branches.khorramshahr.instagramId}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-pink-500 group-hover:translate-x-0.5 transition-transform" />
                </a>
              )}

              {/* 2. Instagram Abadan */}
              {igAbadanUrl && (
                <a
                  href={igAbadanUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-rose-500/10 to-amber-500/10 border border-rose-500/20 hover:border-rose-500/40 text-[#202124] dark:text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-orange-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div className="text-right">
                      <span className="block text-[13px] font-bold">اینستاگرام {config.branches.abadan.name}</span>
                      <span className="block text-[11px] font-mono text-[#4A5568] dark:text-[#CBD5E1]">@{config.branches.abadan.instagramId}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-rose-500 group-hover:translate-x-0.5 transition-transform" />
                </a>
              )}

              {/* 3. WhatsApp Direct */}
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 text-[#202124] dark:text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div className="text-right">
                      <span className="block text-[13px] font-bold">ارتباط مستقیم در واتساپ</span>
                      <span className="block text-[11px] font-mono text-[#4A5568] dark:text-[#CBD5E1] dir-ltr">{config.phoneDisplay}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-emerald-500 group-hover:translate-x-0.5 transition-transform" />
                </a>
              )}

              {/* 4. Eitaa Channel */}
              {eitaaUrl && (
                <a
                  href={eitaaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20 hover:border-orange-500/40 text-[#202124] dark:text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div className="text-right">
                      <span className="block text-[13px] font-bold">کانال رسمی در پیام‌رسان ایتا</span>
                      <span className="block text-[11px] font-mono text-[#4A5568] dark:text-[#CBD5E1]">{config.socialLinks.eitaaId || '@Changabadan'}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-orange-500 group-hover:translate-x-0.5 transition-transform" />
                </a>
              )}
            </div>

            {/* Branch Locations note */}
            <div className="mt-4 pt-3 border-t border-[#E8DFE0] dark:border-white/10 text-[11px] text-[#4A5568] dark:text-[#CBD5E1] space-y-1.5">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#B92B3A] shrink-0" />
                <span>{config.branches.khorramshahr.name}: {config.branches.khorramshahr.address}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#B92B3A] shrink-0" />
                <span>{config.branches.abadan.name}: {config.branches.abadan.address}</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
