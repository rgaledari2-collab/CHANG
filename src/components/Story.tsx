import React from 'react';
import { History, HeartHandshake } from 'lucide-react';

export const Story: React.FC = () => {
  return (
    <section id="story" className="py-20 lg:py-24 bg-[#3B1720] text-[#FCF8F8] border-b border-white/10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Presentation with Selective Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[18px] overflow-hidden apple-product-shadow aspect-[4/5] bg-[#290f16] border border-white/15 group">
              <img
                src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1100&q=84"
                alt="فضای سازها و آکوستیک آموزشگاه موسیقی چنگ خرمشهر"
                className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-105 transition-all duration-700 ease-out"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3B1720]/90 via-transparent to-transparent" />
            </div>

            {/* Overlapping Secondary Image */}
            <div className="hidden sm:block absolute -bottom-6 -left-6 w-1/2 aspect-[3/4] rounded-[14px] overflow-hidden border border-white/20 apple-product-shadow bg-[#290f16] group/sec">
              <img
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=84"
                alt="تمرین و اجرای موسیقی در چنگ"
                className="w-full h-full object-cover filter grayscale contrast-120 group-hover/sec:grayscale-0 transition-all duration-700"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Museum Editorial Label */}
            <div className="absolute -top-3 right-6 bg-[#3B1720]/95 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/20 text-center flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B92B3A]" />
              <span className="text-[12px] text-[#FCF8F8] font-medium">آرشیو فرهنگی · از دهه ۱۳۵۰ خرمشهر</span>
            </div>
          </div>

          {/* Story Copy & Timeline */}
          <div className="lg:col-span-7 text-right">
            <div className="inline-flex items-center gap-2 text-[13px] font-bold text-[#F3C7CA] mb-3">
              <span className="font-mono text-[14px]">۰۲</span>
              <span>/</span>
              <History className="w-3.5 h-3.5 text-[#F3C7CA]" />
              <span>پیشینه و رسالت چنگ</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white leading-[1.10] tracking-[-0.025em] mb-4 [text-wrap:balance]">
              ریشه در خرمشهر، <br className="hidden sm:inline" />
              <span className="text-[#F3C7CA]">نگاه رو به صحنه‌های آینده.</span>
            </h2>

            <p className="text-[20px] text-[#FCF8F8] font-normal mb-4 leading-[1.35] [text-wrap:pretty]">
              آموزشگاه چنگ در گذر پنج دهه، پلی استوار بوده است میان شور و استعداد نسل‌های مختلف خرمشهر و زبان رهایی‌بخش موسیقی.
            </p>

            <p className="text-[16px] text-[#E8DFE0] leading-[1.5] mb-8 font-normal">
              ما باور داریم آموزش اصولی، تنها به انتقال تکنیک‌های مکانیکی ساز خلاصه نمی‌شود؛ بلکه خلق فضایی امن برای رشد کاراکتر، درک شنیداری عمیق، تقویت جسارت صحنه و ارتباط شخصی هنرجو با ساز است.
            </p>

            {/* Editorial Timeline with Lacquer Red Indicator Dots */}
            <div className="space-y-6 border-r-2 border-white/15 pr-6 mb-10">
              <div className="relative">
                <span className="absolute -right-[31px] top-1.5 w-3 h-3 rounded-full bg-[#B92B3A] ring-4 ring-[#3B1720]" />
                <h3 className="text-[17px] font-bold text-white mb-1">
                  آغاز مسیر و پایه‌گذاری آموزش آکادمیک در خوزستان
                </h3>
                <p className="text-[14px] text-[#E8DFE0]/80 leading-relaxed">
                  تأسیس نخستین کلاس‌های نظام‌مند سازهای ایرانی و غربی در خرمشهر
                </p>
              </div>

              <div className="relative">
                <span className="absolute -right-[31px] top-1.5 w-3 h-3 rounded-full bg-[#B92B3A] ring-4 ring-[#3B1720]" />
                <h3 className="text-[17px] font-bold text-white mb-1">
                  نوآوری در متدهای روز، سلفژ و آموزش تخصصی کودک
                </h3>
                <p className="text-[14px] text-[#E8DFE0]/80 leading-relaxed">
                  راه‌اندازی کارگاه‌های تخصصی ارف، گروه‌نوازی و پرورش ریتم و شنوایی
                </p>
              </div>

              <div className="relative">
                <span className="absolute -right-[31px] top-1.5 w-3 h-3 rounded-full bg-[#B92B3A] ring-4 ring-[#3B1720]" />
                <h3 className="text-[17px] font-bold text-white mb-1">
                  امروز؛ کانون همنوازی و اجرای زنده هنرجویان
                </h3>
                <p className="text-[14px] text-[#E8DFE0]/80 leading-relaxed">
                  برگزاری کنسرت‌های سالانه، ضبط استودیویی قطعات و ورود هنرجویان به صحنه‌های ملی
                </p>
              </div>
            </div>

            {/* CTA Button in Lacquer Red #B92B3A */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-[24px] py-[12px] rounded-full text-[17px] font-semibold bg-[#B92B3A] hover:bg-[#A52432] active:scale-95 text-white transition-all duration-150 shadow-md"
              >
                مشاوره و تعیین سطح حضوری
              </a>

              <span className="text-[#E8DFE0] text-[14px] flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-[#F3C7CA]" />
                <span>همراهی با صبر و شیوه‌های نوین تدریس</span>
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
