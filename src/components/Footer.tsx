import React from 'react';
import { ChangLogo } from './ChangLogo';
import { Instagram, MessageCircle, ArrowUpRight } from 'lucide-react';
import { useSiteConfig } from '../config/SiteConfigContext';

export const Footer: React.FC = () => {
  const config = useSiteConfig();
  const { phone, phoneDisplay, workingHours, branches, socialLinks } = config;

  return (
    <footer className="bg-[#FCF8F8] dark:bg-[#0B0D11] text-[#202124] dark:text-white pt-16 pb-24 md:pb-16 border-t border-[#E8DFE0] dark:border-white/10 transition-colors select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial 4-Column Directory Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-[#E8DFE0] dark:border-white/10 text-right">
          
          {/* Col 1 */}
          <div>
            <h4 className="text-[14px] font-bold text-[#202124] dark:text-white mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B92B3A] dark:bg-[#FFB3BA]" />
              <span>دسترسی و بخش‌ها</span>
            </h4>
            <ul className="text-[15px] font-medium leading-[2.41] text-[#5a626d] dark:text-[#9ca3af]">
              <li><a href="#courses" className="hover:text-[#B92B3A] dark:hover:text-[#FFB3BA] transition-colors">سازها و دوره‌های آموزشی</a></li>
              <li><a href="#online-class" className="hover:text-[#B92B3A] dark:hover:text-[#FFB3BA] transition-colors">کلاس آنلاین و استودیو زنده</a></li>
              <li><a href="#teachers" className="hover:text-[#B92B3A] dark:hover:text-[#FFB3BA] transition-colors">اساتید و کادر آموزشی</a></li>
              <li><a href="#story" className="hover:text-[#B92B3A] dark:hover:text-[#FFB3BA] transition-colors">پیشینه و رسالت آموزشگاه</a></li>
              <li><a href="#stats" className="hover:text-[#B92B3A] dark:hover:text-[#FFB3BA] transition-colors">شاخص‌ها و آمار رسمی</a></li>
              <li><a href="#events" className="hover:text-[#B92B3A] dark:hover:text-[#FFB3BA] transition-colors">کنسرت‌ها و صحنه اجرا</a></li>
              <li><a href="#contact" className="hover:text-[#B92B3A] dark:hover:text-[#FFB3BA] transition-colors">مشاوره و تعیین سطح</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-[14px] font-bold text-[#202124] dark:text-white mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B92B3A] dark:bg-[#FFB3BA]" />
              <span>آموزش و صحنه</span>
            </h4>
            <ul className="text-[15px] font-medium leading-[2.41] text-[#5a626d] dark:text-[#9ca3af]">
              <li><a href="#teachers" className="hover:text-[#B92B3A] dark:hover:text-[#FFB3BA] transition-colors">اساتید راهنما</a></li>
              <li><a href="#events" className="hover:text-[#B92B3A] dark:hover:text-[#FFB3BA] transition-colors">کنسرت‌های هنرجویی</a></li>
              <li><a href="#story" className="hover:text-[#B92B3A] dark:hover:text-[#FFB3BA] transition-colors">کارگاه‌های همنوازی</a></li>
              <li><a href="#contact" className="hover:text-[#B92B3A] dark:hover:text-[#FFB3BA] transition-colors">تعیین سطح حضوری</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-[14px] font-bold text-[#202124] dark:text-white mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B92B3A] dark:bg-[#FFB3BA]" />
              <span>درباره آموزشگاه چنگ</span>
            </h4>
            <ul className="text-[15px] font-medium leading-[2.41] text-[#5a626d] dark:text-[#9ca3af]">
              <li><a href="#story" className="hover:text-[#B92B3A] dark:hover:text-[#FFB3BA] transition-colors">پیشینه از دهه ۱۳۵۰</a></li>
              <li><a href="#stats" className="hover:text-[#B92B3A] dark:hover:text-[#FFB3BA] transition-colors">آمار و دستاوردها</a></li>
              <li><a href="#story" className="hover:text-[#B92B3A] dark:hover:text-[#FFB3BA] transition-colors">رسالت و رویکرد آکادمیک</a></li>
              <li><a href="#teachers" className="hover:text-[#B92B3A] dark:hover:text-[#FFB3BA] transition-colors">استانداردهای گزینش استاد</a></li>
              <li><a href="#contact" className="hover:text-[#B92B3A] dark:hover:text-[#FFB3BA] transition-colors">همکاری با اساتید برجسته</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-[14px] font-bold text-[#202124] dark:text-white mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B92B3A] dark:bg-[#FFB3BA]" />
              <span>ارتباط و شعب</span>
            </h4>
            <div className="text-[14px] font-medium leading-[2.1] text-[#5a626d] dark:text-[#9ca3af]">
              <p className="mb-2">
                <a href={`tel:${phone}`} className="hover:text-[#B92B3A] dark:hover:text-[#FFB3BA] font-extrabold text-[16px] text-[#202124] dark:text-white transition-colors dir-ltr inline-block font-mono">
                  {phoneDisplay}
                </a>
              </p>
              <div className="space-y-1.5 text-[13px] text-[#515964] dark:text-[#CBD5E1]">
                <p>
                  <strong className="text-[#202124] dark:text-white">{branches.khorramshahr.name}:</strong> {branches.khorramshahr.address}
                </p>
                <p>
                  <strong className="text-[#202124] dark:text-white">{branches.abadan.name}:</strong> {branches.abadan.address}
                </p>
              </div>
              <p className="text-[12px] text-[#8996A6] dark:text-[#9ca3af] mt-2.5">
                {workingHours}
              </p>

              {/* Official Social Links from config.json */}
              <div className="mt-3.5 pt-3 border-t border-[#E8DFE0] dark:border-white/10 space-y-1.5">
                {socialLinks.instagramKhorramshahr && (
                  <a
                    href={socialLinks.instagramKhorramshahr}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-[12px] text-[#B92B3A] dark:text-[#FFB3BA] hover:text-[#9C1C29] font-bold group"
                  >
                    <span className="flex items-center gap-1.5">
                      <Instagram className="w-3.5 h-3.5 text-[#B92B3A] dark:text-[#FFB3BA]" />
                      <span>اینستاگرام خرمشهر</span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}

                {socialLinks.instagramAbadan && (
                  <a
                    href={socialLinks.instagramAbadan}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-[12px] text-[#B92B3A] dark:text-[#FFB3BA] hover:text-[#9C1C29] font-bold group"
                  >
                    <span className="flex items-center gap-1.5">
                      <Instagram className="w-3.5 h-3.5 text-[#B92B3A] dark:text-[#FFB3BA]" />
                      <span>اینستاگرام آبادان</span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}

                {socialLinks.eitaa && (
                  <a
                    href={socialLinks.eitaa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-[12px] text-orange-600 dark:text-orange-400 hover:text-orange-700 font-bold group"
                  >
                    <span className="flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                      <span>کانال ایتا ({socialLinks.eitaaId || 'ایتا'})</span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Legal Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#8996A6] dark:text-[#9ca3af]">
          <div className="flex items-center gap-2.5">
            <span className="h-7 w-14 flex items-center justify-center shrink-0">
              <ChangLogo className="w-full h-full" variant="currentColor" />
            </span>
            <p>© {new Date().getFullYear()} کلیه حقوق برای {config.siteName} (شعب خرمشهر و آبادان) محفوظ است.</p>
          </div>
          <div className="flex items-center gap-3">
            <span>{config.siteName}</span>
            <span>·</span>
            <span>خرمشهر و آبادان، خوزستان</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
