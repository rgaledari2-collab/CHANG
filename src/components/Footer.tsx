import React from 'react';
import { CHANG_TRANSPARENT_LOGO_DATA_URI } from '../assets/logoData';
import { ResponsiveImage } from './ResponsiveImage';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FCF8F8] text-[#202124] py-16 border-t border-[#E8DFE0] select-none">
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
            </div>
          </div>

        </div>

        {/* Legal Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#8996A6]">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg overflow-hidden bg-black/5 dark:bg-white/10 flex items-center justify-center p-0.5 border border-black/10 dark:border-white/10 shrink-0">
              <ResponsiveImage
                src={CHANG_TRANSPARENT_LOGO_DATA_URI}
                alt="لوگوی چنگ"
                width={28}
                height={28}
                aspectRatio="1/1"
                sizes="28px"
                className="w-full h-full object-contain"
              />
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
