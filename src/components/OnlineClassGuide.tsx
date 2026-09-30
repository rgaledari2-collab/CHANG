import React, { useState } from 'react';
import { 
  Link2, 
  Video, 
  ExternalLink, 
  Headphones, 
  CheckCircle2, 
  HelpCircle, 
  Smartphone, 
  Laptop, 
  Wifi, 
  ShieldCheck, 
  Music, 
  ArrowLeft,
  ChevronDown,
  Sparkles,
  Volume2
} from 'lucide-react';

export const OnlineClassGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'steps' | 'tips' | 'faq'>('steps');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const steps = [
    {
      step: '۰۱',
      title: 'دریافت لینک پیامکی یا کپی شناسه اتاق',
      desc: 'پس از ثبت‌نام دوره، لینک اختصاصی اتاق کلاس (شامل آدرس chang-music.ir/live-room) از طریق پیامک برای شما ارسال می‌شود. همچنین در جدول استودیوهای فعال در همین صفحه شناسه اتاق‌ها قابل انتخاب است.',
      icon: Link2,
      badge: 'مرحله اول'
    },
    {
      step: '۰۲',
      title: 'ورود نام و کلیک روی ورود به پنجره کلاس',
      desc: 'نام و نام خانوادگی خود را در کادر درگاه وارد کرده و روی دکمه "ورود به پنجره کلاس آنلاین" کلیک کنید. یک پنجره مستقل و بدون حواس‌پرتی روی صفحه باز می‌شود.',
      icon: ExternalLink,
      badge: 'مرحله دوم'
    },
    {
      step: '۰۳',
      title: 'تایید دسترسی دوربین و میکروفون (Allow)',
      desc: 'پیغام مرورگر مبنی بر اجازه دسترسی به وب‌کم و میکروفون را روی گزینه "Allow / اجازه دادن" بزنید تا استاد بتواند تصویر دست و ساز شما را مشاهده کند.',
      icon: Video,
      badge: 'مرحله سوم'
    },
    {
      step: '۰۴',
      title: 'فعال‌سازی حالت High-Fi و ابزارهای سلفژ',
      desc: 'با کلیک روی دکمه High-Fi نویزگیرهای تلفنی غیرفعال می‌شوند تا فرکانس غنی ساز بدون خفگی به گوش استاد برسد. برای کوک ساز و سلفژ از پیانو و مترونوم درون پنجره استفاده کنید.',
      icon: Music,
      badge: 'شروع کلاس'
    }
  ];

  const tips = [
    {
      icon: Wifi,
      title: 'سرعت و پایداری اینترنت',
      text: 'حداقل سرعت ۵۱۲ کیلوبیت بر ثانیه با پینگ زیر ۶۰ms مناسب است. سرورهای چنگ در داخل ایران مستقر بوده و ترافیک به صورت نیم‌بها محاسبه می‌شود.'
    },
    {
      icon: Headphones,
      title: 'استفاده از هندزفری یا هدفون',
      text: 'برای جلوگیری از اکو شدن صدای ساز و شنیدن دقیق ریتم و راهنمایی‌های استاد، استفاده از یک هدفون سیم‌دار ساده پیشنهاد می‌شود.'
    },
    {
      icon: Laptop,
      title: 'زاویه قرارگیری دوربین',
      text: 'دوربین یا موبایل را در زاویه ۴۵ درجه قرار دهید تا اکول و حالت مچ، کلاویه‌ها، پرده‌ها یا سیم‌های ساز به طور واضح در کادر باشد.'
    },
    {
      icon: Volume2,
      title: 'حالت صدای اختصاصی موسیقی',
      text: 'نرم‌افزارهای ارتباطی معمولی صدای ساز را به عنوان نویز شناسایی و قطع می‌کنند؛ در استودیو چنگ این مشکل با سوئیچ High-Fi برطرف شده است.'
    }
  ];

  const faqs = [
    {
      q: 'آیا برای ورود به کلاس آنلاین نیاز به نصب برنامه یا فیلترشکن است؟',
      a: 'خیر، هیچ نیازی به نصب اپلیکیشن نیست و با هر مرورگری (کروم، فایرفاکس، سافاری) در موبایل یا لپ‌تاپ باز می‌شود. همچنین به دلیل میزبانی داخلی، فیلترشکن باید خاموش باشد.'
    },
    {
      q: 'اگر در حین کلاس اینترنت قطع شد چه اتفاقی می‌افتد؟',
      a: 'پنجره کلاس از اتصال مجدد خودکار (Auto-Reconnect) پشتیبانی می‌کند و با باز کردن مجدد همان لینک در همان جلسه بدون نیاز به تایید مجدد وارد کلاس می‌شوید.'
    },
    {
      q: 'آیا امکان ضبط جلسات کلاس آنلاین وجود دارد؟',
      a: 'بله، استاد می‌تواند ویدیو و نکات مهم تمرین هر جلسه را ذخیره کرده و فایل آن را برای مرور هفتگی در اختیارتان قرار دهد.'
    }
  ];

  return (
    <div className="mt-12 bg-white dark:bg-[#151821] rounded-[24px] border border-[#E8DFE0] dark:border-white/10 p-6 sm:p-8 shadow-sm text-right overflow-hidden transition-colors">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8DFE0] dark:border-white/10 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[17px] sm:text-[19px] font-bold text-[#202124] dark:text-white">
              راهنمای گام‌به‌گام اتصال به پنجره کلاس آنلاین
            </h3>
            <p className="text-[13px] text-[#8996A6] dark:text-[#9ca3af]">
              آموزش تصویری ۴ مرحله‌ای برای ورود سریع، بی دغدغه و با بالاترین کیفیت صدا
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 p-1 bg-[#FAF0F1] dark:bg-white/5 rounded-xl border border-[#E8DFE0] dark:border-white/10 text-[12px] font-bold self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('steps')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'steps' 
                ? 'bg-[#B92B3A] text-white shadow-xs' 
                : 'text-[#5a626d] dark:text-[#9ca3af] hover:text-[#202124]'
            }`}
          >
            مراحل ۴ گانه
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tips')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'tips' 
                ? 'bg-[#B92B3A] text-white shadow-xs' 
                : 'text-[#5a626d] dark:text-[#9ca3af] hover:text-[#202124]'
            }`}
          >
            نکات کیفی صدا و تصویر
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('faq')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'faq' 
                ? 'bg-[#B92B3A] text-white shadow-xs' 
                : 'text-[#5a626d] dark:text-[#9ca3af] hover:text-[#202124]'
            }`}
          >
            پرسش‌های متداول
          </button>
        </div>
      </div>

      {/* Tab 1: 4 Steps Journey */}
      {activeTab === 'steps' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          {steps.map((st, idx) => {
            const IconComponent = st.icon;
            return (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-[#FCF8F8] dark:bg-[#101217] border border-[#E8DFE0] dark:border-white/10 flex flex-col justify-between relative group hover:border-[#B92B3A]/40 transition-all hover:shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-8 h-8 rounded-xl bg-white dark:bg-white/10 border border-[#E8DFE0] dark:border-white/10 font-mono font-black text-[13px] text-[#B92B3A] dark:text-[#FFB3BA] flex items-center justify-center shadow-xs">
                      {st.step}
                    </span>
                    <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 bg-white/60 dark:bg-white/5 px-2 py-0.5 rounded-md">
                      {st.badge}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-[#FAF0F1] dark:bg-[#B92B3A]/20 text-[#B92B3A] dark:text-[#FFB3BA] flex items-center justify-center mb-3">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <h4 className="text-[14px] font-bold text-[#202124] dark:text-white mb-2 leading-snug">
                    {st.title}
                  </h4>

                  <p className="text-[12px] text-[#5a626d] dark:text-[#9ca3af] leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E8DFE0] dark:border-white/10 flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>تست شده و پایدار</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Pro Tips */}
      {activeTab === 'tips' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
          {tips.map((tip, idx) => {
            const Icon = tip.icon;
            return (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-[#FCF8F8] dark:bg-[#101217] border border-[#E8DFE0] dark:border-white/10 flex items-start gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-[#FAF0F1] dark:bg-[#B92B3A]/20 text-[#B92B3A] dark:text-[#FFB3BA] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#202124] dark:text-white mb-1">
                    {tip.title}
                  </h4>
                  <p className="text-[12px] text-[#5a626d] dark:text-[#9ca3af] leading-relaxed">
                    {tip.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 3: FAQ Accordion */}
      {activeTab === 'faq' && (
        <div className="space-y-3 pt-6">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="rounded-2xl border border-[#E8DFE0] dark:border-white/10 bg-[#FCF8F8] dark:bg-[#101217] overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 flex items-center justify-between text-right font-bold text-[13px] text-[#202124] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#B92B3A]" />
                  <span>{faq.q}</span>
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openFaq === idx ? 'rotate-180 text-[#B92B3A]' : ''}`} />
              </button>
              
              {openFaq === idx && (
                <div className="p-4 pt-0 text-[12px] text-[#5a626d] dark:text-[#9ca3af] leading-relaxed border-t border-[#E8DFE0]/60 dark:border-white/5">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Help Hotline Strip */}
      <div className="mt-6 pt-4 border-t border-[#E8DFE0] dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-[12px] text-[#5a626d] dark:text-[#9ca3af]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>پشتیبانی فنی آنلاین در تمام طول ساعت برگزاری کلاس فعال است.</span>
        </div>

        <a 
          href="tel:09359352738" 
          className="text-[#B92B3A] dark:text-[#FFB3BA] hover:underline font-bold flex items-center gap-1 font-mono"
        >
          <span>شماره پشتیبانی کلاس‌ها: ۰۹۳۵۹۳۵۲۷۳۸</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
};
