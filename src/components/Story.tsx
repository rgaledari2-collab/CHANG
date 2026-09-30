import React from 'react';
import { History, HeartHandshake } from 'lucide-react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { ResponsiveImage } from './ResponsiveImage';

export const Story: React.FC = () => {
  const sectionRef = useRevealOnScroll<HTMLElement>();

  return (
    <section 
      id="story" 
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-24 bg-[#3B1720] text-[#FCF8F8] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Visual Presentation with Selective Photography */}
          <div className="lg:col-span-5 relative reveal-on-scroll">
            <div className="relative rounded-[18px] overflow-hidden apple-product-shadow aspect-[4/5] bg-[#290f16] border border-white/15 group">
              <ResponsiveImage
                src="story_instruments.webp"
                alt="فضای سازها و آکوستیک آموزشگاه موسیقی چنگ خرمشهر"
                width={600}
                height={750}
                aspectRatio="4/5"
                sizes="(max-width: 640px) 94vw, (max-width: 1024px) 44vw, 500px"
                className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-105 group-hover:scale-102 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3B1720]/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Overlapping Secondary Image */}
            <div className="hidden sm:block absolute -bottom-6 -left-6 w-1/2 aspect-[3/4] rounded-[14px] overflow-hidden border border-white/20 apple-product-shadow bg-[#290f16] group/sec">
              <ResponsiveImage
                src="story_practice.webp"
                alt="تمرین و اجرای موسیقی در چنگ"
                width={400}
                height={533}
                aspectRatio="3/4"
                sizes="(max-width: 640px) 45vw, 250px"
                className="w-full h-full object-cover filter grayscale contrast-120 group-hover/sec:grayscale-0 group-hover/sec:scale-105 transition-all duration-700"
              />
            </div>

            {/* Museum Editorial Label */}
            <div className="absolute -top-3 right-4 sm:right-6 bg-[#3B1720]/95 backdrop-blur-md text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20 text-center flex items-center gap-2 shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#B92B3A]" />
              <span className="text-[11px] sm:text-[12px] text-[#FCF8F8] font-medium">آرشیو فرهنگی · از دهه ۱۳۵۰ خرمشهر</span>
            </div>
          </div>

          {/* Story Copy & Timeline */}
          <div className="lg:col-span-7 text-right">
            <div className="reveal-on-scroll reveal-delay-1">
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
            </div>

            {/* Editorial Timeline with Lacquer Red Indicator Dots */}
            <div className="space-y-6 border-r-2 border-white/15 pr-6 mb-10 reveal-on-scroll reveal-delay-2">
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
                  پایداری، اجراهای صحنه‌ای و گسترش به نسل جدید
                </h3>
                <p className="text-[14px] text-[#E8DFE0]/80 leading-relaxed">
                  برگزاری سالانه بیش از ۱۰ کنسرت هنرجویی، مسترکلاس و همایش‌های فرهنگی
                </p>
              </div>
            </div>

            {/* Educational Commitment Callout */}
            <div className="p-5 sm:p-6 rounded-[14px] bg-[#290f16]/90 border border-white/15 flex items-start gap-4 reveal-on-scroll reveal-delay-3 text-right">
              <div className="w-10 h-10 rounded-full bg-[#B92B3A]/20 flex items-center justify-center shrink-0 border border-[#B92B3A]/40 text-[#F3C7CA]">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[16px] font-bold text-white mb-1">
                  تعهد به استاندارد و اخلاق آموزش
                </h4>
                <p className="text-[13.5px] text-[#E8DFE0] leading-relaxed">
                  در چنگ، هر هنرجو فارغ از سن و پیش‌زمینه، یک برنامه اختصاصی گام‌به‌گام دریافت می‌کند. ما هیچ هنرجویی را با انتظارات غیرواقعی یا روش‌های تجاری مواجه نمی‌کنیم.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
