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
  ChevronLeft,
  Music,
  Home,
  Compass
} from 'lucide-react';
import { ChangLogo } from './ChangLogo';
import { ThemeToggle } from './ThemeToggle';
import { useSiteConfig } from '../config/SiteConfigContext';

export type ConservatoryViewId =
  | 'home'
  | 'courses'
  | 'teachers'
  | 'story'
  | 'stats'
  | 'events'
  | 'contact';

interface HeaderProps {
  activeView: ConservatoryViewId;
  onNavigate: (view: ConservatoryViewId) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeView, onNavigate }) => {
  const config = useSiteConfig();
  const { phone, phoneDisplay, workingHours, branches, socialLinks } = config;

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

  const navLinks: Array<{
    id: ConservatoryViewId;
    name: string;
    shortName: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
    tag: string;
  }> = [
    {
      id: 'courses',
      name: 'سازها و دوره‌ها',
      shortName: 'سازها و دوره‌ها',
      href: '#courses',
      icon: Music,
      description: 'پیانو، تار، گیتار، ویولن، ارف و آواز در دو شعبه',
      tag: 'دپارتمان‌ها',
    },
    {
      id: 'teachers',
      name: 'اساتید و کادر آموزشی',
      shortName: 'اساتید',
      href: '#teachers',
      icon: GraduationCap,
      description: 'آشنایی با اساتید کنسرواتواری و رزومه هنری',
      tag: 'کادر علمی',
    },
    {
      id: 'story',
      name: 'پیشینه و رسالت آموزشگاه',
      shortName: 'پیشینه چنگ',
      href: '#story',
      icon: History,
      description: 'پنج دهه پداگوژی و تداوم فرهنگی خرمشهر',
      tag: 'از ۱۳۵۰',
    },
    {
      id: 'stats',
      name: 'شاخص‌ها و آمار رسمی',
      shortName: 'شاخص‌ها و آمار',
      href: '#stats',
      icon: BarChart3,
      description: 'کارنامه عملکردی و سوابق فارغ‌التحصیلان',
      tag: 'دست‌آوردها',
    },
    {
      id: 'events',
      name: 'کنسرت‌ها و صحنه اجرا',
      shortName: 'کنسرت‌ها',
      href: '#events',
      icon: Sparkles,
      description: 'رسیتال‌های صحنه‌ای و تجربه استیج زنده',
      tag: 'استیج هنرجویی',
    },
    {
      id: 'contact',
      name: 'تماس و تعیین سطح حضوری',
      shortName: 'تعیین سطح و تماس',
      href: '#contact',
      icon: PhoneCall,
      description: 'مشاوره حضوری و تعیین سطح هنرجو در دو شعبه',
      tag: 'رزرو وقت',
    },
  ];

  const handleViewSelect = (e: React.MouseEvent, viewId: ConservatoryViewId) => {
    e.preventDefault();
    if (isOpen) {
      closeMenu(() => {
        onNavigate(viewId);
      });
    } else {
      onNavigate(viewId);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full select-none bg-[#16090D]/95 dark:bg-[#0B0909]/95 backdrop-blur-xl border-b border-[#C29B53]/25 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.55)] transition-colors duration-200">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-[74px] flex items-center justify-between gap-2">
        
        {/* Right Section: Mobile Hamburger Button + Brand Logo & Title + Back to Main Hall */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={openMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-fullscreen-drawer"
            aria-label="باز کردن منوی تمام‌صفحه تالارها"
            className="lg:hidden flex items-center gap-1.5 p-2 px-2.5 rounded-xl text-white nav-3d-btn active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C29B53] shrink-0 cursor-pointer"
          >
            <Menu className="w-5 h-5 text-[#E5C787]" />
            <span className="text-[12px] font-bold text-white/95 hidden min-[390px]:inline">تالارها</span>
          </button>

          {/* Brand Logo & Title (Clicks return to Main Hall) */}
          <a
            href="#home"
            onClick={(e) => handleViewSelect(e, 'home')}
            className="flex items-center gap-2 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C29B53] rounded-xl p-1 -m-1 min-w-0 cursor-pointer"
            aria-label="آموزشگاه موسیقی چنگ خرمشهر - بازگشت به تالار اصلی"
          >
            <div className="h-10 sm:h-12 w-14 sm:w-18 flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
              <ChangLogo className="w-full h-full" variant="white" />
            </div>
            <div className="text-right min-w-0 truncate">
              <span className="block font-brand-title text-[15px] sm:text-[18px] text-white tracking-tight leading-none truncate">
                آموزشگاه موسیقی چنگ
              </span>
              <span className="hidden sm:block text-[10px] sm:text-[11px] text-[#E5C787]/85 font-medium mt-1 truncate">
                خرمشهر و آبادان · تأسیس ۱۳۵۰
              </span>
            </div>
          </a>

          {/* Prominent Elevated 3D "Back to Main Hall" Button when viewing a Sub-Hall */}
          {activeView !== 'home' && (
            <button
              type="button"
              onClick={(e) => handleViewSelect(e, 'home')}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-[12px] font-extrabold text-[#0B0909] bg-gradient-to-l from-[#E5C787] via-[#D4AF63] to-[#C29B53] hover:brightness-110 active:scale-95 shadow-[0_6px_18px_-3px_rgba(194,155,83,0.45)] border border-white/40 transition-all shrink-0 cursor-pointer"
              title="بازگشت به تالار اصلی (صفحه نخست)"
            >
              <Home className="w-3.5 h-3.5 text-[#0B0909]" />
              <span>بازگشت به تالار اصلی</span>
            </button>
          )}
        </div>

        {/* Center: Elevated 3D Navigation Bar (Desktop) */}
        <nav
          className="hidden lg:flex items-center gap-1.5 p-1.5 rounded-2xl bg-black/35 border border-[#C29B53]/25 shadow-inner"
          aria-label="گذرگاه سه‌بعدی تالارهای آموزشگاه"
        >
          <button
            type="button"
            onClick={(e) => handleViewSelect(e, 'home')}
            aria-current={activeView === 'home' ? 'page' : undefined}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] xl:text-[13px] font-bold cursor-pointer ${
              activeView === 'home'
                ? 'nav-3d-btn nav-3d-btn-active text-white'
                : 'nav-3d-btn text-[#E8DFE0] hover:text-white'
            }`}
          >
            <Home className="w-3.5 h-3.5 text-[#E5C787]" />
            <span>تالار اصلی</span>
          </button>

          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeView === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={(e) => handleViewSelect(e, link.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] xl:text-[13px] font-bold cursor-pointer ${
                  isActive
                    ? 'nav-3d-btn nav-3d-btn-active text-white'
                    : 'nav-3d-btn text-[#E8DFE0] hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#E5C787]' : 'text-[#C29B53]'}`} />
                <span>{link.shortName}</span>
              </button>
            );
          })}
        </nav>

        {/* Left Section: Action Controls & Utilities */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Direct Phone Link in Dark Pill */}
          <a
            href={`tel:${phone}`}
            className="hidden 2xl:inline-flex items-center gap-2 text-[12px] text-[#E8DFE0] hover:text-white nav-3d-btn px-3 py-1.5 rounded-xl"
            title="تماس مستقیم با آموزشگاه"
          >
            <Phone className="w-3.5 h-3.5 text-[#E5C787]" />
            <span className="dir-ltr font-mono font-semibold text-white">{phoneDisplay}</span>
          </a>

          {/* Quick Call Icon on Mobile */}
          <a
            href={`tel:${phone}`}
            className="lg:hidden p-2 rounded-xl text-[#E5C787] hover:text-white nav-3d-btn"
            title={`تماس مستقیم با آموزشگاه: ${phoneDisplay}`}
            aria-label="تماس تلفنی با آموزشگاه"
          >
            <Phone className="w-4 h-4" />
          </a>

          {/* Theme Switcher */}
          <ThemeToggle variant="compact" />

          {/* Primary CTA (Opens Contact / Level Assessment 3D Stage) */}
          <button
            type="button"
            onClick={(e) => handleViewSelect(e, 'contact')}
            aria-label="رزرو برای تعیین سطح"
            title="رزرو برای تعیین سطح"
            className={`inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[12px] sm:text-[13px] font-extrabold transition-all duration-150 shadow-md ring-1 cursor-pointer ${
              activeView === 'contact'
                ? 'bg-[#E5C787] text-[#0B0909] ring-white/50'
                : 'bg-[#8E1B26] hover:bg-[#A6212E] active:scale-95 text-white ring-[#C29B53]/40'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${activeView === 'contact' ? 'text-[#8E1B26]' : 'text-[#E5C787]'}`} />
            <span className="hidden min-[480px]:inline">تعیین سطح</span>
            <span className="min-[480px]:hidden">مشاوره</span>
          </button>
        </div>

      </div>

      {/* FULLSCREEN MOBILE DRAWER WITH CONSERVATORY EBONY & BURNISHED BRASS PALETTE */}
      {isOpen && typeof document !== 'undefined' && createPortal(
        <div
          className={`fixed inset-0 z-[100] lg:hidden flex flex-col bg-[#0B0909]/98 backdrop-blur-2xl text-[#F7F4F0] select-none overflow-hidden will-change-transform ${
            isClosing ? 'drawer-exit' : 'drawer-enter'
          }`}
          role="dialog"
          aria-modal="true"
          id="mobile-fullscreen-drawer"
        >
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#8E1B26]/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
          <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-[#C29B53]/12 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* 1. Fullscreen Drawer Top Bar */}
          <div className="h-16 sm:h-20 px-4 sm:px-6 flex items-center justify-between border-b border-[#C29B53]/20 shrink-0 bg-[#141110]/80">
            {/* Logo and Brand Title */}
            <div className="flex items-center gap-3">
              <div className="h-11 sm:h-12 w-20 flex items-center justify-center shrink-0">
                <ChangLogo className="w-full h-full" variant="white" />
              </div>
              <div className="text-right">
                <span className="block font-brand-title text-[17px] sm:text-[20px] text-[#F7F4F0] leading-tight">
                  آموزشگاه موسیقی چنگ
                </span>
                <span className="block text-[11px] text-[#E5C787] font-medium mt-0.5">
                  خرمشهر و آبادان · نیم قرن اصالت
                </span>
              </div>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => closeMenu()}
              aria-label="بستن منو"
              className="w-11 h-11 rounded-2xl bg-white/5 hover:bg-[#C29B53]/20 active:scale-90 border border-[#C29B53]/30 flex items-center justify-center text-[#E5C787] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C29B53] cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* 2. Scrollable Body: 3D Stage Portals + Contact Quick Cards */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
            
            {/* Main Hall Return Card */}
            <button
              type="button"
              onClick={(e) => handleViewSelect(e, 'home')}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                activeView === 'home'
                  ? 'bg-gradient-to-l from-[#8E1B26] to-[#520D14] border-[#E5C787] shadow-lg'
                  : 'bg-[#171311] border-[#C29B53]/35 hover:border-[#E5C787]'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#C29B53]/20 border border-[#C29B53]/40 text-[#E5C787] flex items-center justify-center">
                  <Home className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <span className="block text-[16px] font-extrabold text-white">
                    تالار اصلی (صفحه نخست)
                  </span>
                  <span className="block text-[11px] text-[#E5C787]">
                    صحنه سه‌بعدی و ورودی تالارهای کنسرواتوار
                  </span>
                </div>
              </div>
              <ChevronLeft className="w-5 h-5 text-[#E5C787]" />
            </button>

            {/* Primary Large 3D Portal Links List */}
            <div className="space-y-2.5">
              <span className="text-[12px] font-bold text-[#E5C787] uppercase tracking-wider px-2 flex items-center gap-1.5 text-right">
                <Compass className="w-3.5 h-3.5" />
                <span>انتخاب صحنه اختصاصی (ورود سه‌بعدی)</span>
              </span>

              <nav className="space-y-2 text-right" aria-label="فهرست تالارهای اختصاصی">
                {navLinks.map((link, idx) => {
                  const Icon = link.icon;
                  const isActive = activeView === link.id;
                  return (
                    <button
                      key={link.id}
                      type="button"
                      onClick={(e) => handleViewSelect(e, link.id)}
                      className={`w-full group flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 active:scale-[0.98] cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-l from-[#8E1B26]/90 to-[#24090D] border-[#E5C787] shadow-[0_8px_24px_rgba(142,27,38,0.45)]'
                          : 'bg-gradient-to-l from-[#171311] to-[#120F0E] hover:from-[#1E1815] hover:to-[#161210] border-[#C29B53]/20 hover:border-[#C29B53]/50'
                      }`}
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        {/* Big Icon Container */}
                        <div className="w-12 h-12 rounded-2xl bg-[#8E1B26]/25 border border-[#C29B53]/35 text-[#E5C787] flex items-center justify-center shrink-0 group-hover:bg-[#8E1B26] group-hover:text-white transition-all shadow-sm">
                          <Icon className="w-6 h-6" />
                        </div>
                        
                        {/* Title and Description with Large Typography */}
                        <div className="text-right min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[16px] sm:text-[18px] font-extrabold text-[#F7F4F0] group-hover:text-[#E5C787] transition-colors">
                              {link.name}
                            </span>
                            {link.tag && (
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#C29B53]/15 text-[#E5C787] border border-[#C29B53]/30">
                                {link.tag}
                              </span>
                            )}
                          </div>
                          <p className="text-[12px] text-[#B8B0A6] truncate mt-1">
                            {link.description}
                          </p>
                        </div>
                      </div>

                      {/* Arrow indicator */}
                      <ChevronLeft className="w-5 h-5 text-[#C29B53]/60 group-hover:text-[#E5C787] group-hover:-translate-x-1.5 transition-all shrink-0" />
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Actions Grid: Call + Reservation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {/* Direct Call */}
              <a
                href={`tel:${phone}`}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="text-right">
                    <span className="block text-[13px] font-bold text-emerald-200">تماس تلفنی سریع</span>
                    <span className="block text-[14px] font-mono font-extrabold text-white dir-ltr">{phoneDisplay}</span>
                  </div>
                </div>
                <ArrowLeft className="w-4 h-4 text-emerald-400 group-hover:-translate-x-1 transition-transform" />
              </a>

              {/* Consultation / Level Assessment Reservation */}
              <button
                type="button"
                onClick={(e) => handleViewSelect(e, 'contact')}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-l from-[#8E1B26] to-[#6E121B] border border-[#C29B53]/40 text-white hover:brightness-110 active:scale-95 transition-all shadow-md group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C29B53]/25 text-[#E5C787] flex items-center justify-center shadow-xs">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="text-right">
                    <span className="block text-[14px] font-extrabold">رزرو برای تعیین سطح</span>
                    <span className="block text-[11px] text-[#E5C787]">مشاوره حضوری دو شعبه</span>
                  </div>
                </div>
                <ArrowLeft className="w-4 h-4 text-[#E5C787] group-hover:-translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Social Channels: Instagram Khorramshahr, Instagram Abadan, Eitaa */}
            <div className="p-4 rounded-2xl bg-[#141110] border border-[#C29B53]/20 space-y-3">
              <span className="text-[12px] font-bold text-[#E5C787] block text-right">
                شبکه‌های رسمی و پیام‌رسان‌ها
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {socialLinks.instagramKhorramshahr && (
                  <a
                    href={socialLinks.instagramKhorramshahr}
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
                )}

                {socialLinks.instagramAbadan && (
                  <a
                    href={socialLinks.instagramAbadan}
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
                )}
              </div>

              {socialLinks.eitaa && (
                <a
                  href={socialLinks.eitaa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between p-2.5 rounded-xl bg-orange-500/20 border border-orange-500/30 text-white text-[12px] font-bold hover:bg-orange-500/30 transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-orange-400" />
                    <span>کانال رسمی ایتا ({socialLinks.eitaaId || 'ایتا'})</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
                </a>
              )}
            </div>

            {/* Branch Addresses */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-[12px] text-[#A6AFBD] space-y-2 text-right">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B92B3A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">{branches.khorramshahr.name}: </strong>
                  <span>{branches.khorramshahr.address}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B92B3A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">{branches.abadan.name}: </strong>
                  <span>{branches.abadan.address}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1.5 border-t border-white/10 text-[11px] text-[#CBD5E1]">
                <Clock className="w-3.5 h-3.5 text-[#B92B3A] shrink-0" />
                <span>ساعات کاری: {workingHours}</span>
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
