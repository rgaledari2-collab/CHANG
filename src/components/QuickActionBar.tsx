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
        MOBILE & TABLET: Conservatory Ebony & Burnished Brass Floating Action Button (FAB)
        Respects iOS/Android safe-area inset at bottom-left corner.
        ========================================================================
      */}
      <div className="md:hidden fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-4 z-40 flex flex-col items-start select-none">
        
        {/* Backdrop overlay when speed dial popup is active */}
        {isFabMenuOpen && (
          <div
            className="fixed inset-0 bg-[#0B0909]/60 backdrop-blur-xs z-30 transition-opacity animate-in fade-in duration-200"
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
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-[#0B0909]/95 text-[#F7F4F0] text-[12px] font-bold border border-[#C29B53]/35 shadow-xl active:scale-95 transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/35 flex items-center justify-center">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span className="whitespace-nowrap">تماس تلفنی با آموزشگاه</span>
            </a>

            {/* 2. Instagram & Messengers */}
            <button
              type="button"
              onClick={() => {
                setIsFabMenuOpen(false);
                setShowMessengerModal(true);
              }}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-[#0B0909]/95 text-[#F7F4F0] text-[12px] font-bold border border-[#C29B53]/35 shadow-xl active:scale-95 transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-[#C29B53]/20 text-[#E5C787] border border-[#C29B53]/40 flex items-center justify-center">
                <Instagram className="w-3.5 h-3.5" />
              </div>
              <span className="whitespace-nowrap">اینستاگرام، واتساپ و ایتا</span>
            </button>

            {/* 3. Level Assessment Reservation */}
            <button
              type="button"
              onClick={handleBookingClick}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-gradient-to-l from-[#8E1B26] to-[#6E121B] text-white text-[12px] font-extrabold border border-[#C29B53]/50 shadow-xl active:scale-95 transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-[#C29B53]/25 text-[#E5C787] flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="whitespace-nowrap">رزرو نوبت تعیین سطح</span>
            </button>
          </div>
        )}

        {/* Circular Main FAB Button */}
        <button
          type="button"
          onClick={() => setIsFabMenuOpen(!isFabMenuOpen)}
          aria-expanded={isFabMenuOpen}
          aria-label="دکمه دسترسی سریع، تماس و رزرو تعیین سطح"
          className={`relative z-40 w-13 h-13 rounded-full flex items-center justify-center shadow-[0_8px_28px_rgba(11,9,9,0.55)] border border-[#C29B53]/55 active:scale-90 transition-all duration-200 ${
            isFabMenuOpen 
              ? 'bg-[#0B0909] text-[#E5C787] rotate-90' 
              : 'bg-gradient-to-br from-[#8E1B26] via-[#74141E] to-[#0B0909] text-[#F7F4F0] ring-4 ring-[#C29B53]/20'
          }`}
        >
          {isFabMenuOpen ? (
            <X className="w-5 h-5 transition-transform text-[#E5C787]" />
          ) : (
            <>
              <Phone className="w-5 h-5 text-[#E5C787] animate-pulse" />
              {/* Micro badge dot indicator */}
              <span className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-[#0B0909]" />
            </>
          )}
        </button>
      </div>

      {/* 
        ========================================================================
        DESKTOP / TABLET: Refined Conservatory Floating Pill (Bottom-Right)
        ========================================================================
      */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3 pointer-events-auto select-none">
        <div className="bg-[#0B0909]/95 backdrop-blur-xl border border-[#C29B53]/30 rounded-full p-1.5 shadow-2xl flex items-center gap-2 ring-1 ring-black/40">
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
            className="w-9 h-9 rounded-full bg-[#C29B53]/15 text-[#E5C787] hover:bg-[#C29B53]/25 border border-[#C29B53]/35 flex items-center justify-center transition-all active:scale-95 relative"
          >
            <Instagram className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#0B0909]" />
          </button>

          <button
            type="button"
            onClick={handleBookingClick}
            aria-label="رزرو برای تعیین سطح حضوری"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#8E1B26] hover:bg-[#74141E] border border-[#C29B53]/40 text-white text-[12px] font-bold shadow-md transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E5C787]" />
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
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-[#0B0909]/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200 select-none"
          onClick={() => setShowMessengerModal(false)}
        >
          <div
            className="w-full max-w-md bg-[#FBF9F6] dark:bg-[#141110] rounded-3xl p-5 sm:p-6 shadow-2xl border border-[#E5DDD2] dark:border-[#C29B53]/30 text-right animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DDD2] dark:border-white/10 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#8E1B26] to-[#C29B53] text-white flex items-center justify-center shadow-xs">
                  <Instagram className="w-5 h-5" />
                </span>
                <div>
                  <h3 id="messenger-modal-title" className="text-[15px] font-extrabold text-[#0B0909] dark:text-white">
                    پیج‌های رسمی و ارتباط مجازی
                  </h3>
                  <p className="text-[11px] text-[#544D49] dark:text-[#B8B0A6]">
                    اینستاگرام شعب خرمشهر و آبادان، واتساپ و ایتا
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowMessengerModal(false)}
                aria-label="بستن پنجره"
                className="w-8 h-8 rounded-full bg-[#F4EFE6] dark:bg-white/10 text-[#0B0909] dark:text-white hover:border-[#C29B53] flex items-center justify-center transition-colors"
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
