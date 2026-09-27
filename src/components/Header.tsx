import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  PhoneCall,
  Phone,
  GraduationCap,
  History,
  BarChart3,
  Sparkles,
  ArrowLeft,
  MapPin,
  Clock
} from 'lucide-react';
import { CHANG_TRANSPARENT_LOGO_DATA_URI } from '../assets/logoData';
import { ThemeToggle } from './ThemeToggle';
import { ResponsiveImage } from './ResponsiveImage';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const navLinks = [
    { 
      name: 'اساتید و کادر آموزشی', 
      href: '#teachers', 
      icon: GraduationCap,
      description: 'آشنایی با اساتید کنسرواتواری و رزومه هنری'
    },
    { 
      name: 'پیشینه و رسالت آموزشگاه', 
      href: '#story', 
      icon: History,
      description: 'پنج دهه پداگوژی و تداوم فرهنگی خرمشهر'
    },
    { 
      name: 'شاخص‌ها و آمار رسمی', 
      href: '#stats', 
      icon: BarChart3,
      description: 'کارنامه عملکردی و سوابق فارغ‌التحصیلان'
    },
    { 
      name: 'کنسرت‌ها و صحنه اجرا', 
      href: '#events', 
      icon: Sparkles,
      description: 'رسیتال‌های صحنه‌ای و تجربه استیج زنده'
    },
    { 
      name: 'تماس و تعیین سطح', 
      href: '#contact', 
      icon: PhoneCall,
      description: 'مشاوره حضوری و تعیین سطح هنرجو'
    },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    document.body.style.overflow = '';
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 120);
  };

  return (
    <header className="sticky top-0 z-40 w-full select-none bg-[#1A0A0F]/95 dark:bg-[#0B0D11]/95 backdrop-blur-md border-b border-white/10 shadow-md transition-colors duration-200">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-[68px] flex items-center justify-between">
        
        {/* Right Section: Mobile 3-Lines (Hamburger) Button + Brand Logo & Title */}
        <div className="flex items-center gap-2 sm:gap-3.5 min-w-0">
          {/* Mobile Hamburger / Sidebar Button - Placed firmly on the RIGHT in RTL */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-expanded={isOpen}
            aria-controls="mobile-drawer"
            aria-label="باز کردن منوی سایدبار و نویگیشن"
            className="lg:hidden flex items-center gap-1.5 p-2 px-2.5 rounded-xl text-white bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B92B3A] transition-all shadow-2xs group shrink-0"
          >
            <Menu className="w-5 h-5 text-white group-hover:scale-105 transition-transform" />
            <span className="text-[12px] font-bold text-white/90 hidden min-[390px]:inline">منو</span>
          </button>

          {/* Brand Logo & Title */}
          <a 
            href="#top" 
            className="flex items-center gap-2 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B92B3A] rounded-xl p-1 -m-1 min-w-0"
            aria-label="آموزشگاه موسیقی چنگ خرمشهر - صفحه نخست"
          >
            <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center border border-white/20 shrink-0 transition-transform group-hover:scale-105 shadow-inner">
              <ResponsiveImage 
                src={CHANG_TRANSPARENT_LOGO_DATA_URI} 
                alt="لوگوی آموزشگاه موسیقی چنگ" 
                width={40}
                height={40}
                aspectRatio="1/1"
                sizes="40px"
                priority={true}
                className="w-full h-full object-contain filter drop-shadow-sm" 
              />
            </span>
            <div className="text-right min-w-0 truncate">
              <span className="block font-bold text-[14px] sm:text-[18px] text-white tracking-tight leading-none truncate">
                آموزشگاه موسیقی چنگ
              </span>
              <span className="hidden sm:block text-[10px] sm:text-[11px] text-[#F3C7CA]/80 font-medium mt-1 truncate">
                خرمشهر · تأسیس ۱۳۵۰
              </span>
            </div>
          </a>
        </div>

        {/* Center: Desktop Nav Links (Hidden on Mobile) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="ناوبری اصلی">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium text-[#E8DFE0] hover:text-white hover:bg-white/10 active:scale-95 transition-all duration-150"
              >
                <Icon className="w-3.5 h-3.5 text-[#F3C7CA]" />
                <span>{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Left Section: Action Controls & Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Direct Phone Link in Dark Pill */}
          <a
            href="tel:09359352738"
            className="hidden xl:inline-flex items-center gap-2 text-[12px] text-[#E8DFE0] hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-full transition-all duration-150 shadow-2xs"
            title="تماس مستقیم با آموزشگاه"
          >
            <Phone className="w-3.5 h-3.5 text-[#F3C7CA]" />
            <span className="dir-ltr font-mono font-semibold text-white">۰۹۳۵-۹۳۵-۲۷۳۸</span>
          </a>

          {/* Quick Call Icon on Mobile (Left side) */}
          <a
            href="tel:09359352738"
            className="lg:hidden p-2 rounded-xl text-[#F3C7CA] hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 transition-colors"
            title="تماس مستقیم با آموزشگاه: ۰۹۳۵۹۳۵۲۷۳۸"
            aria-label="تماس تلفنی با آموزشگاه"
          >
            <Phone className="w-4 h-4" />
          </a>

          {/* Theme Switcher */}
          <ThemeToggle variant="compact" />

          {/* Primary CTA (Desktop & Tablet) */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-[13px] font-semibold bg-[#B92B3A] hover:bg-[#D9384A] active:scale-95 text-white transition-all duration-150 shadow-md ring-1 ring-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B92B3A]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F3C7CA]" />
            <span>مشاوره و تعیین سطح</span>
          </a>
        </div>

      </div>

      {/* Modern Mobile Slide-over Drawer & Overlay (Opens From Right) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" id="mobile-drawer">
          
          {/* Backdrop Blur Overlay */}
          <div 
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-out Drawer Panel (Firmly on the RIGHT) */}
          <div className="fixed inset-y-0 right-0 w-[85vw] max-w-[360px] sm:max-w-[390px] bg-[#14080D] dark:bg-[#0B0D11] border-l border-white/15 text-white shadow-2xl flex flex-col justify-between overflow-y-auto z-10 transition-transform duration-300">
            
            {/* Drawer Header */}
            <div>
              <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.03]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center border border-white/20 shrink-0 shadow-xs">
                    <ResponsiveImage 
                      src={CHANG_TRANSPARENT_LOGO_DATA_URI} 
                      alt="آموزشگاه چنگ" 
                      width={40}
                      height={40}
                      aspectRatio="1/1"
                      sizes="40px"
                      priority={true}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-right">
                    <span className="block font-bold text-[15px] text-white leading-tight">
                      آموزشگاه موسیقی چنگ
                    </span>
                    <span className="block text-[11px] text-[#F3C7CA] font-medium mt-0.5">
                      خرمشهر · تأسیس ۱۳۵۰
                    </span>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="بستن منو"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white active:scale-90 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B92B3A]"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Navigation Links with Descriptions (Right-aligned in RTL) */}
              <nav className="p-4 space-y-1.5 text-right" aria-label="منوی سایدبار موبایل">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="group flex items-center gap-3.5 p-3 rounded-2xl hover:bg-white/10 active:bg-white/15 border border-transparent hover:border-white/10 transition-all duration-150"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#B92B3A]/25 border border-[#B92B3A]/30 flex items-center justify-center shrink-0 group-hover:bg-[#B92B3A] group-hover:scale-105 transition-all">
                        <Icon className="w-5 h-5 text-[#F3C7CA] group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block text-[14px] font-bold text-white group-hover:text-[#F3C7CA] transition-colors">
                          {link.name}
                        </span>
                        <span className="block text-[11px] text-[#8E97A6] truncate mt-0.5">
                          {link.description}
                        </span>
                      </div>
                      <ArrowLeft className="w-4 h-4 text-white/40 group-hover:text-white group-hover:-translate-x-1 transition-all shrink-0" />
                    </a>
                  );
                })}
              </nav>

              {/* Theme Toggle inside Drawer */}
              <div className="px-4 py-2">
                <ThemeToggle variant="drawer" />
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-5 border-t border-white/10 bg-white/[0.02] space-y-3 text-right">
              {/* Phone Direct Call */}
              <a
                href="tel:09359352738"
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-[13px] text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#F3C7CA]" />
                  <span className="font-medium text-[#E8DFE0]">تماس مستقیم:</span>
                </div>
                <span className="font-mono font-bold text-white dir-ltr">۰۹۳۵-۹۳۵-۲۷۳۸</span>
              </a>

              {/* Consultation CTA */}
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full text-[14px] font-bold bg-[#B92B3A] hover:bg-[#D9384A] active:scale-95 text-white transition-all shadow-lg"
              >
                <span>مشاوره و تعیین سطح حضوری</span>
                <ArrowLeft className="w-4 h-4" />
              </a>

              {/* Quick Academy Branches Info */}
              <div className="pt-2 flex flex-col gap-2 text-[11px] text-[#8E97A6]">
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#B92B3A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#F3C7CA]">شعبه خرمشهر: </span>
                    <span>میدان فرمانداری - مجتمع فرهنگی هنری خلیج فارس</span>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#B92B3A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#F3C7CA]">شعبه آبادان: </span>
                    <span>سه‌راه شاملو، نبش زمین چمن</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 pt-1 border-t border-white/5">
                  <Clock className="w-3.5 h-3.5 text-[#B92B3A] shrink-0" />
                  <span>شنبه تا پنج‌شنبه: ۹:۰۰ تا ۱۳:۰۰ و ۱۶:۰۰ تا ۲۱:۰۰</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}
    </header>
  );
};
