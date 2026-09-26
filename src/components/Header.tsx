import React, { useState } from 'react';
import { Menu, X, PhoneCall } from 'lucide-react';
import { CHANG_HEADER_LOGO_DATA_URI } from '../assets/logoData';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'دوره‌ها', href: '#courses' },
    { name: 'اساتید', href: '#teachers' },
    { name: 'پیشینه و رسالت', href: '#story' },
    { name: 'کنسرت و صحنه', href: '#events' },
    { name: 'نظرات هنرجویان', href: '#testimonials' },
    { name: 'مشاوره و تماس', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full select-none">
      {/* 1. Global Editorial Top Bar: Dark Crimson #3B1720 with Lacquer Red #B92B3A accent */}
      <div className="bg-[#3B1720] text-[#E8DFE0] h-[44px] border-b border-white/10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1440px] mx-auto h-full flex items-center justify-between text-[12px] tracking-[-0.01em]">
          
          {/* Brand Mark on Global Nav */}
          <a 
            href="#top" 
            className="flex items-center gap-2.5 text-white hover:text-[#F3C7CA] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B92B3A] rounded py-1"
            aria-label="صفحه اصلی آموزشگاه موسیقی چنگ"
          >
            <span className="w-5 h-5 rounded-md overflow-hidden bg-white/10 flex items-center justify-center border border-white/10">
              <img src="/chang_music_logo.jpg" alt="چنگ" className="w-full h-full object-cover" />
            </span>
            <span className="font-semibold tracking-tight text-[13px] text-white">چَـنـگ</span>
            <span className="text-[10px] text-[#8996A6] hidden sm:inline">| خرمشهر</span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="ناوبری اصلی">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#E8DFE0] hover:text-white transition-colors duration-150 py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Utility Tools on Global Nav */}
          <div className="flex items-center gap-3">
            <a
              href="tel:06153522000"
              className="hidden lg:inline-flex items-center gap-1.5 text-[11px] text-[#E8DFE0] hover:text-white transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-[#F3C7CA]" />
              <span className="dir-ltr font-mono text-[11px]">۰۶۱-۵۳۵۲۲۰۰۰</span>
            </a>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "بستن منو" : "باز کردن منوی ناوبری"}
              className="md:hidden p-1.5 rounded text-[#E8DFE0] hover:text-white hover:bg-white/10 focus:outline-none"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Sub-Nav Frosted Surface: 52px height, Pale Pink-White #FCF8F8 with 90% opacity & border */}
      <div className="bg-[#FCF8F8]/90 backdrop-blur-xl border-b border-[#E8DFE0] h-[52px] px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-[1440px] mx-auto h-full flex items-center justify-between">
          
          {/* Sub-nav Category / Title */}
          <div className="flex items-center gap-3">
            <h2 className="text-[19px] sm:text-[21px] font-semibold text-[#202124] tracking-tight leading-none flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B92B3A]" />
              <span>آموزشگاه موسیقی چنگ</span>
            </h2>
            <span className="hidden sm:inline-block text-[12px] text-[#8996A6] font-medium">
              کانون آموزش تخصصی ساز، آواز و اجرای زنده
            </span>
          </div>

          {/* Sub-nav Secondary Links + Primary Button */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-6 text-[14px] text-[#202124]">
              <a href="#courses" className="hover:text-[#B92B3A] transition-colors font-medium">انتخاب ساز</a>
              <a href="#teachers" className="hover:text-[#B92B3A] transition-colors font-medium">اساتید راهنما</a>
              <a href="#events" className="hover:text-[#B92B3A] transition-colors font-medium">کنسرت هنرجویی</a>
              <a href="#testimonials" className="hover:text-[#B92B3A] transition-colors font-medium">روایت همراهان</a>
            </div>

            {/* Primary Button in Lacquer Red #B92B3A */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[13px] sm:text-[14px] font-semibold bg-[#B92B3A] hover:bg-[#A52432] active:scale-95 text-white transition-all duration-150 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B92B3A]"
            >
              مشاوره و تعیین سطح
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <nav id="mobile-menu" className="md:hidden bg-[#FCF8F8] border-b border-[#E8DFE0] px-6 py-4 flex flex-col gap-3 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="py-2.5 border-b border-[#E8DFE0]/60 text-[15px] text-[#202124] font-medium hover:text-[#B92B3A] transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2.5">
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="w-full inline-flex items-center justify-center py-2.5 rounded-full text-[14px] font-semibold bg-[#B92B3A] text-white active:scale-95 shadow-sm"
            >
              درخواست مشاوره رایگان
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
