import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  Clock,
  Instagram,
  MessageCircle,
  ExternalLink,
  ChevronLeft
} from 'lucide-react';
import { ChangLogo } from './ChangLogo';
import { ThemeToggle } from './ThemeToggle';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const closeMenu = (callback?: () => void) => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      if (callback) callback();
    }, 280);
  };

  const openMenu = () => {
    setIsClosing(false);
    setIsOpen(true);
  };

  // Lock body scroll and prevent touch-through when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      const prevTouchAction = document.body.style.touchAction;
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeMenu();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = prevOverflow;
        document.body.style.touchAction = prevTouchAction;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen]);

  const navLinks = [
    { 
      name: 'اساتید و کادر آموزشی', 
      href: '#teachers', 
      icon: GraduationCap,
      description: 'آشنایی با اساتید کنسرواتواری و رزومه هنری',
      tag: 'کادر علمی'
    },
    { 
      name: 'پیشینه و رسالت آموزشگاه', 
      href: '#story', 
      icon: History,
      description: 'پنج دهه پداگوژی و تداوم فرهنگی خرمشهر',
      tag: 'از ۱۳۵۰'
    },
    { 
      name: 'شاخص‌ها و آمار رسمی', 
      href: '#stats', 
      icon: BarChart3,
      description: 'کارنامه عملکردی و سوابق فارغ‌التحصیلان',
      tag: 'دست‌آوردها'
    },
    { 
      name: 'کنسرت‌ها و صحنه اجرا', 
      href: '#events', 
      icon: Sparkles,
      description: 'رسیتال‌های صحنه‌ای و تجربه استیج زنده',
      tag: 'استیج هنرجویی'
    },
    { 
      name: 'تماس و تعیین سطح حضوری', 
      href: '#contact', 
      icon: PhoneCall,
      description: 'مشاوره حضوری و تعیین سطح هنرجو در دو شعبه',
      tag: 'رزرو وقت'
    },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    closeMenu(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full select-none bg-[#1A0A0F]/95 dark:bg-[#0B0D11]/95 backdrop-blur-md border-b border-white/10 shadow-md transition-colors duration-200">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-[68px] flex items-center justify-between">
        
        {/* Right Section: Mobile Hamburger Button + Brand Logo & Title */}
        <div className="flex items-center gap-2 sm:gap-3.5 min-w-0">
          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={openMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-fullscreen-drawer"
            aria-label="باز کردن منوی تمام‌صفحه سایت"
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
            <div className="h-10 sm:h-12 w-16 sm:w-20 flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
              <ChangLogo className="w-full h-full" variant="white" />
            </div>
            <div className="text-right min-w-0 truncate">
              <span className="block font-brand-title text-[15px] sm:text-[19px] text-white tracking-tight leading-none truncate">
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

          {/* Quick Call Icon on Mobile */}
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

          {/* Primary CTA */}
          <a
            href="#contact"
            aria-label="رزرو برای تعیین سطح"
            title="رزرو برای تعیین سطح"
            className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-[12px] sm:text-[13px] font-semibold bg-[#B92B3A] hover:bg-[#D9384A] active:scale-95 text-white transition-all duration-150 shadow-md ring-1 ring-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B92B3A]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F3C7CA]" />
            <span className="hidden min-[480px]:inline">تعیین سطح</span>
            <span className="min-[480px]:hidden">مشاوره</span>
          </a>
        </div>

      </div>

      {/* FULLSCREEN MOBILE DRAWER WITH SMOOTH ANIMATIONS & LARGE READABLE LIST */}
      {isOpen && typeof document !== 'undefined' && createPortal(
        <div 
          className={`fixed inset-0 z-[100] lg:hidden flex flex-col bg-[#0F0508]/98 dark:bg-[#07090D]/98 backdrop-blur-2xl text-white select-none overflow-hidden will-change-transform ${
            isClosing ? 'drawer-exit' : 'drawer-enter'
          }`} 
          role="dialog" 
          aria-modal="true" 
          id="mobile-fullscreen-drawer"
        >
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B92B3A]/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
          <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-purple-900/15 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* 1. Fullscreen Drawer Top Bar */}
          <div className="h-16 sm:h-20 px-4 sm:px-6 flex items-center justify-between border-b border-white/10 shrink-0 bg-white/[0.02]">
            {/* Logo and Brand Title */}
            <div className="flex items-center gap-3">
              <div className="h-11 sm:h-12 w-20 flex items-center justify-center shrink-0">
                <ChangLogo className="w-full h-full" variant="white" />
              </div>
              <div className="text-right">
                <span className="block font-brand-title text-[17px] sm:text-[20px] text-white leading-tight">
                  آموزشگاه موسیقی چنگ
                </span>
                <span className="block text-[11px] text-[#F3C7CA] font-medium mt-0.5">
                  خرمشهر و آبادان · نیم قرن اصالت
                </span>
              </div>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => closeMenu()}
              aria-label="بستن منو"
              className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-90 border border-white/15 flex items-center justify-center text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B92B3A] cursor-pointer"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* 2. Scrollable Body: Large Readable Nav List + Contact Quick Cards */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6">
            
            {/* Primary Large Links List */}
            <div className="space-y-2.5">
              <span className="text-[12px] font-bold text-[#F3C7CA] uppercase tracking-wider px-2 block text-right">
                صفحات و بخش‌های اصلی وب‌سایت
              </span>

              <nav className="space-y-2 text-right" aria-label="فهرست بخش‌های اصلی">
                {navLinks.map((link, idx) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="group flex items-center justify-between p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.1] active:bg-white/[0.15] border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.98]"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        {/* Big Icon Container */}
                        <div className="w-12 h-12 rounded-2xl bg-[#B92B3A]/30 border border-[#B92B3A]/40 text-[#FFB3BA] flex items-center justify-center shrink-0 group-hover:bg-[#B92B3A] group-hover:text-white transition-all shadow-sm">
                          <Icon className="w-6 h-6" />
                        </div>
                        
                        {/* Title and Description with Large Typography */}
                        <div className="text-right min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[17px] sm:text-[19px] font-extrabold text-white group-hover:text-[#FFB3BA] transition-colors">
                              {link.name}
                            </span>
                            {link.tag && (
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/10 text-[#E8DFE0]">
                                {link.tag}
                              </span>
                            )}
                          </div>
                          <p className="text-[12px] text-[#A6AFBD] truncate mt-1">
                            {link.description}
                          </p>
                        </div>
                      </div>

                      {/* Arrow indicator */}
                      <ChevronLeft className="w-5 h-5 text-white/40 group-hover:text-white group-hover:-translate-x-1.5 transition-all shrink-0" />
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Quick Actions Grid: Call + Reservation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {/* Direct Call */}
              <a
                href="tel:09359352738"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="text-right">
                    <span className="block text-[13px] font-bold text-emerald-200">تماس تلفنی سریع</span>
                    <span className="block text-[14px] font-mono font-extrabold text-white dir-ltr">۰۹۳۵-۹۳۵-۲۷۳۸</span>
                  </div>
                </div>
                <ArrowLeft className="w-4 h-4 text-emerald-400 group-hover:-translate-x-1 transition-transform" />
              </a>

              {/* Consultation / Level Assessment Reservation */}
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-l from-[#B92B3A] to-[#D9384A] text-white hover:brightness-110 active:scale-95 transition-all shadow-md group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center shadow-xs">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="text-right">
                    <span className="block text-[14px] font-extrabold">رزرو برای تعیین سطح</span>
                    <span className="block text-[11px] text-[#FFB3BA]">مشاوره حضوری دو شعبه</span>
                  </div>
                </div>
                <ArrowLeft className="w-4 h-4 text-white group-hover:-translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Social Channels: Instagram Khorramshahr, Instagram Abadan, Eitaa */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <span className="text-[12px] font-bold text-[#F3C7CA] block text-right">
                شبکه‌های رسمی و پیام‌رسان‌ها
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href="https://www.instagram.com/chang_khorramshahr?stkn=MWpvZTljd2Rya3U1cw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-white text-[12px] font-bold hover:brightness-110 transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-pink-400" />
                    <span>اینستاگرام خرمشهر</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-pink-400 group-hover:translate-x-0.5" />
                </a>

                <a
                  href="https://www.instagram.com/chang_abadan?stkn=MTY1ZnhtdDVkcWZrbg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-rose-500/20 to-orange-500/20 border border-rose-500/30 text-white text-[12px] font-bold hover:brightness-110 transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-rose-400" />
                    <span>اینستاگرام آبادان</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-rose-400 group-hover:translate-x-0.5" />
                </a>
              </div>

              <a
                href="https://eitaa.com/Changabadan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-orange-500/20 border border-orange-500/30 text-white text-[12px] font-bold hover:bg-orange-500/30 transition-all group"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-orange-400" />
                  <span>کانال رسمی ایتا (Changabadan@)</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
              </a>
            </div>

            {/* Branch Addresses */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-[12px] text-[#A6AFBD] space-y-2 text-right">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B92B3A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">شعبه خرمشهر: </strong>
                  <span>میدان فرمانداری، مجتمع فرهنگی هنری خلیج فارس</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B92B3A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">شعبه آبادان: </strong>
                  <span>سه‌راه شاملو، نبش زمین چمن</span>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1.5 border-t border-white/10 text-[11px] text-[#CBD5E1]">
                <Clock className="w-3.5 h-3.5 text-[#B92B3A] shrink-0" />
                <span>ساعات کاری: شنبه تا پنج‌شنبه ۹ الی ۱۳ و ۱۶ الی ۲۱</span>
              </div>
            </div>

            {/* Theme Toggle within Fullscreen Drawer */}
            <div className="pt-2 pb-6">
              <ThemeToggle variant="drawer" />
            </div>

          </div>
        </div>,
        document.body
      )}
    </header>
  );
};
