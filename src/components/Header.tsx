import React, { useState } from 'react';
import {
  Menu,
  X,
  PhoneCall,
  Phone,
  Music2,
  GraduationCap,
  History,
  BarChart3,
  Sparkles,
  ArrowLeft,
  HeartHandshake
} from 'lucide-react';
import { CHANG_TRANSPARENT_LOGO_DATA_URI } from '../assets/logoData';
import { ThemeToggle } from './ThemeToggle';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'سازها و دوره‌ها', href: '#courses', icon: Music2 },
    { name: 'موسیقی و سلامت روان', href: '#mental-health', icon: HeartHandshake },
    { name: 'اساتید', href: '#teachers', icon: GraduationCap },
    { name: 'پیشینه و رسالت', href: '#story', icon: History },
    { name: 'شاخص‌ها و آمار', href: '#stats', icon: BarChart3 },
    { name: 'کنسرت‌ها', href: '#events', icon: Sparkles },
    { name: 'تماس و مشاوره', href: '#contact', icon: PhoneCall },
  ];

  return (
    <header className="sticky top-0 z-50 w-full select-none bg-[#1A0A0F]/95 dark:bg-[#0B0D11]/95 backdrop-blur-md border-b border-white/10 shadow-md transition-colors duration-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[68px] flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <a 
          href="#top" 
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B92B3A] rounded-xl p-1 -m-1"
          aria-label="آموزشگاه موسیقی چنگ خرمشهر - صفحه نخست"
        >
          <span className="w-10 h-10 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center border border-white/20 shrink-0 transition-transform group-hover:scale-105 shadow-inner">
            <img 
              src={CHANG_TRANSPARENT_LOGO_DATA_URI} 
              alt="لوگوی آموزشگاه موسیقی چنگ" 
              className="w-full h-full object-contain filter drop-shadow-sm" 
            />
          </span>
          <div className="text-right">
            <span className="block font-bold text-[16px] sm:text-[18px] text-white tracking-tight leading-none">
              آموزشگاه موسیقی چنگ
            </span>
            <span className="block text-[11px] text-[#F3C7CA]/80 font-medium mt-1">
              خرمشهر · تأسیس ۱۳۵۰
            </span>
          </div>
        </a>

        {/* Desktop Nav Links with Visual Modern Icons */}
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

        {/* Action Controls & Utilities */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Direct Phone Link in Dark Pill */}
          <a
            href="tel:06153522000"
            className="hidden xl:inline-flex items-center gap-2 text-[12px] text-[#E8DFE0] hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-full transition-all duration-150 shadow-2xs"
            title="تماس مستقیم با آموزشگاه"
          >
            <Phone className="w-3.5 h-3.5 text-[#F3C7CA]" />
            <span className="dir-ltr font-mono font-semibold text-white">۰۶۱-۵۳۵۲۲۰۰۰</span>
          </a>

          {/* Theme Switcher */}
          <ThemeToggle variant="compact" />

          {/* Primary CTA */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-[13px] font-semibold bg-[#B92B3A] hover:bg-[#D9384A] active:scale-95 text-white transition-all duration-150 shadow-md ring-1 ring-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B92B3A]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F3C7CA]" />
            <span>مشاوره و تعیین سطح</span>
          </a>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "بستن منو" : "باز کردن منوی ناوبری"}
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B92B3A]"
          >
            {isOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Dropdown in Sleek Dark Style */}
      {isOpen && (
        <nav 
          id="mobile-menu" 
          className="lg:hidden bg-[#1A0A0F] dark:bg-[#0B0D11] border-b border-white/10 px-6 py-4 flex flex-col gap-1.5 shadow-2xl transition-colors"
        >
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 py-2.5 px-3 rounded-xl text-[14px] text-[#E8DFE0] hover:text-white hover:bg-white/10 font-medium transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-[#F3C7CA]" />
                </div>
                <span>{link.name}</span>
              </a>
            );
          })}

          <div className="pt-3 mt-2 border-t border-white/10 flex flex-col gap-2.5">
            <a
              href="tel:06153522000"
              className="flex items-center justify-center gap-2 py-2 text-[14px] text-[#E8DFE0] font-medium border border-white/15 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#F3C7CA]" />
              <span className="dir-ltr font-mono">۰۶۱-۵۳۵۲۲۰۰۰</span>
            </a>

            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full text-[14px] font-semibold bg-[#B92B3A] hover:bg-[#D9384A] text-white active:scale-95 shadow-md"
            >
              <span>مشاوره و تعیین سطح حضوری</span>
              <ArrowLeft className="w-4 h-4" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
