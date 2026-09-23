import React from 'react';
import { Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F4F1EB] text-[#211F1E] py-16 border-t border-[#D9D2CA] select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial 4-Column Directory Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-[#D9D2CA] text-right">
          
          {/* Col 1 */}
          <div>
            <h4 className="text-[14px] font-bold text-[#211F1E] mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C93438]" />
              <span>انتخاب ساز و دوره‌ها</span>
            </h4>
            <ul className="text-[15px] font-medium leading-[2.41] text-[#6E665E]">
              <li><a href="#courses" className="hover:text-[#C93438] transition-colors">پیانو و کیبورد</a></li>
              <li><a href="#courses" className="hover:text-[#C93438] transition-colors">تار، سه‌تار و سنتور</a></li>
              <li><a href="#courses" className="hover:text-[#C93438] transition-colors">گیتار کلاسیک و پاپ</a></li>
              <li><a href="#courses" className="hover:text-[#C93438] transition-colors">آواز سنتی و صداسازی</a></li>
              <li><a href="#courses" className="hover:text-[#C93438] transition-colors">ارف و ریتم کودکان</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-[14px] font-bold text-[#211F1E] mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C93438]" />
              <span>آموزش و صحنه</span>
            </h4>
            <ul className="text-[15px] font-medium leading-[2.41] text-[#6E665E]">
              <li><a href="#teachers" className="hover:text-[#C93438] transition-colors">اساتید راهنما</a></li>
              <li><a href="#events" className="hover:text-[#C93438] transition-colors">کنسرت‌های هنرجویی</a></li>
              <li><a href="#story" className="hover:text-[#C93438] transition-colors">کارگاه‌های همنوازی</a></li>
              <li><a href="#contact" className="hover:text-[#C93438] transition-colors">تعیین سطح حضوری</a></li>
              <li><a href="#courses" className="hover:text-[#C93438] transition-colors">تئوری موسیقی و سلفژ</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-[14px] font-bold text-[#211F1E] mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C93438]" />
              <span>درباره آموزشگاه چنگ</span>
            </h4>
            <ul className="text-[15px] font-medium leading-[2.41] text-[#6E665E]">
              <li><a href="#story" className="hover:text-[#C93438] transition-colors">پیشینه از دهه ۱۳۵۰</a></li>
              <li><a href="#story" className="hover:text-[#C93438] transition-colors">رسالت و رویکرد آکادمیک</a></li>
              <li><a href="#teachers" className="hover:text-[#C93438] transition-colors">استانداردهای گزینش استاد</a></li>
              <li><a href="#contact" className="hover:text-[#C93438] transition-colors">همکاری با اساتید برجسته</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-[14px] font-bold text-[#211F1E] mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C93438]" />
              <span>ارتباط و نشانی</span>
            </h4>
            <div className="text-[15px] font-medium leading-[2.41] text-[#6E665E]">
              <p>
                <a href="tel:06153522000" className="hover:text-[#C93438] font-bold text-[#211F1E] transition-colors dir-ltr inline-block">
                  ۰۶۱-۵۳۵۲۲۰۰۰
                </a>
              </p>
              <p className="leading-relaxed text-[14px] text-[#6E665E] mt-1">
                خوزستان، خرمشهر، بلوار ساحلی، نبش خیابان فردوسی
              </p>
              <p className="text-[13px] text-[#6E665E] mt-2">
                شنبه تا پنج‌شنبه: ۹:۰۰ تا ۲۱:۰۰
              </p>
            </div>
          </div>

        </div>

        {/* Legal Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#6E665E]">
          <p>© {new Date().getFullYear()} کلیه حقوق برای آموزشگاه موسیقی چنگ خرمشهر محفوظ است.</p>
          <div className="flex items-center gap-3">
            <span>هویت ادیتوریال و پوستر فرهنگی چنگ</span>
            <span>·</span>
            <span>خرمشهر، خوزستان</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
