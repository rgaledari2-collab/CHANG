import React from 'react';

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
              <span>انتخاب ساز و دوره‌ها</span>
            </h4>
            <ul className="text-[15px] font-medium leading-[2.41] text-[#5a626d]">
              <li><a href="#courses" className="hover:text-[#B92B3A] transition-colors">پیانو و کیبورد</a></li>
              <li><a href="#courses" className="hover:text-[#B92B3A] transition-colors">تار، سه‌تار و سنتور</a></li>
              <li><a href="#courses" className="hover:text-[#B92B3A] transition-colors">گیتار کلاسیک و پاپ</a></li>
              <li><a href="#courses" className="hover:text-[#B92B3A] transition-colors">آواز سنتی و صداسازی</a></li>
              <li><a href="#courses" className="hover:text-[#B92B3A] transition-colors">ارف و ریتم کودکان</a></li>
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
              <li><a href="#testimonials" className="hover:text-[#B92B3A] transition-colors">روایت و نظرات هنرجویان</a></li>
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
              <span>ارتباط و نشانی</span>
            </h4>
            <div className="text-[15px] font-medium leading-[2.41] text-[#5a626d]">
              <p>
                <a href="tel:06153522000" className="hover:text-[#B92B3A] font-bold text-[#202124] transition-colors dir-ltr inline-block">
                  ۰۶۱-۵۳۵۲۲۰۰۰
                </a>
              </p>
              <p className="leading-relaxed text-[14px] text-[#8996A6] mt-1">
                خوزستان، خرمشهر، بلوار ساحلی، نبش خیابان فردوسی
              </p>
              <p className="text-[13px] text-[#8996A6] mt-2">
                شنبه تا پنج‌شنبه: ۹:۰۰ تا ۲۱:۰۰
              </p>
            </div>
          </div>

        </div>

        {/* Legal Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#8996A6]">
          <p>© {new Date().getFullYear()} کلیه حقوق برای آموزشگاه موسیقی چنگ خرمشهر محفوظ است.</p>
          <div className="flex items-center gap-3">
            <span>هویت دیداری نوین چنگ</span>
            <span>·</span>
            <span>خرمشهر، خوزستان</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
