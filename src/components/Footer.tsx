import React from 'react';
import { ChangLogo } from './ChangLogo';
import { Instagram, MessageCircle, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FCF8F8] text-[#202124] pt-16 pb-24 md:pb-16 border-t border-[#E8DFE0] select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial 4-Column Directory Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-[#E8DFE0] text-right">
          
          {/* Col 1 */}
          <div>
            <h4 className="text-[14px] font-bold text-[#202124] mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B92B3A]" />
              <span>دسترسی و بخش‌ها</span>
            </h4>
            <ul className="text-[15px] font-medium leading-[2.41] text-[#5a626d]">
              <li><a href="#teachers" className="hover:text-[#B92B3A] transition-colors">اساتید و کادر آموزشی</a></li>
              <li><a href="#story" className="hover:text-[#B92B3A] transition-colors">پیشینه و رسالت آموزشگاه</a></li>
              <li><a href="#stats" className="hover:text-[#B92B3A] transition-colors">شاخص‌ها و آمار رسمی</a></li>
              <li><a href="#events" className="hover:text-[#B92B3A] transition-colors">کنسرت‌ها و صحنه اجرا</a></li>
              <li><a href="#contact" className="hover:text-[#B92B3A] transition-colors">مشاوره و تعیین سطح</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-[14px] font-bold text-[#202124] mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B92B3A]" />
              <span>آموزش و صحنه</span>
            </h4>
            <ul className="text-[15px] font-medium leading-[2.41] text-[#5a626d]">
              <li><a href="#teachers" className="hover:text-[#B92B3A] transition-colors">اساتید راهنما</a></li>
              <li><a href="#events" className="hover:text-[#B92B3A] transition-colors">کنسرت‌های هنرجویی</a></li>
              <li><a href="#story" className="hover:text-[#B92B3A] transition-colors">کارگاه‌های همنوازی</a></li>
              <li><a href="#contact" className="hover:text-[#B92B3A] transition-colors">تعیین سطح حضوری</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-[14px] font-bold text-[#202124] mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B92B3A]" />
              <span>درباره آموزشگاه چنگ</span>
            </h4>
            <ul className="text-[15px] font-medium leading-[2.41] text-[#5a626d]">
              <li><a href="#story" className="hover:text-[#B92B3A] transition-colors">پیشینه از دهه ۱۳۵۰</a></li>
              <li><a href="#stats" className="hover:text-[#B92B3A] transition-colors">آمار و دستاوردها</a></li>
              <li><a href="#story" className="hover:text-[#B92B3A] transition-colors">رسالت و رویکرد آکادمیک</a></li>
              <li><a href="#teachers" className="hover:text-[#B92B3A] transition-colors">استانداردهای گزینش استاد</a></li>
              <li><a href="#contact" className="hover:text-[#B92B3A] transition-colors">همکاری با اساتید برجسته</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-[14px] font-bold text-[#202124] mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B92B3A]" />
              <span>ارتباط و شعب</span>
            </h4>
            <div className="text-[14px] font-medium leading-[2.1] text-[#5a626d]">
              <p className="mb-2">
                <a href="tel:09359352738" className="hover:text-[#B92B3A] font-extrabold text-[16px] text-[#202124] transition-colors dir-ltr inline-block font-mono">
                  ۰۹۳۵-۹۳۵-۲۷۳۸
                </a>
              </p>
              <div className="space-y-1.5 text-[13px] text-[#515964]">
                <p>
                  <strong className="text-[#202124]">شعبه خرمشهر:</strong> میدان فرمانداری - مجتمع فرهنگی هنری خلیج فارس
                </p>
                <p>
                  <strong className="text-[#202124]">شعبه آبادان:</strong> سه‌راه شاملو، نبش زمین چمن
                </p>
              </div>
              <p className="text-[12px] text-[#8996A6] mt-2.5">
                شنبه تا پنج‌شنبه: ۹:۰۰ تا ۱۳:۰۰ و ۱۶:۰۰ تا ۲۱:۰۰
              </p>

              {/* Instagram Official Links */}
              <div className="mt-3.5 pt-3 border-t border-[#E8DFE0] space-y-1.5">
                <a
                  href="https://www.instagram.com/chang_khorramshahr?stkn=MWpvZTljd2Rya3U1cw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-[12px] text-[#B92B3A] hover:text-[#9C1C29] font-bold group"
                >
                  <span className="flex items-center gap-1.5">
                    <Instagram className="w-3.5 h-3.5 text-[#B92B3A]" />
                    <span>اینستاگرام خرمشهر</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="https://www.instagram.com/chang_abadan?stkn=MTY1ZnhtdDVkcWZrbg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-[12px] text-[#B92B3A] hover:text-[#9C1C29] font-bold group"
                >
                  <span className="flex items-center gap-1.5">
                    <Instagram className="w-3.5 h-3.5 text-[#B92B3A]" />
                    <span>اینستاگرام آبادان</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="https://eitaa.com/Changabadan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-[12px] text-orange-600 hover:text-orange-700 font-bold group"
                >
                  <span className="flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-orange-600" />
                    <span>کانال ایتا (Changabadan@)</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Legal Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#8996A6]">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-auto flex items-center justify-center shrink-0">
              <ChangLogo className="h-6 w-auto" variant="currentColor" />
            </span>
            <p>© {new Date().getFullYear()} کلیه حقوق برای آموزشگاه موسیقی چنگ (شعب خرمشهر و آبادان) محفوظ است.</p>
          </div>
          <div className="flex items-center gap-3">
            <span>آموزشگاه تخصصی موسیقی چنگ</span>
            <span>·</span>
            <span>خرمشهر و آبادان، خوزستان</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
