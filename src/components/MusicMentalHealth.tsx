import React, { useState } from 'react';
import {
  HeartHandshake,
  Brain,
  Activity,
  Zap,
  Target,
  Smile,
  Music2,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Quote
} from 'lucide-react';

interface MindsetState {
  id: string;
  label: string;
  problem: string;
  solution: string;
  recommendedInstruments: string[];
  scientificFact: string;
}

export const MusicMentalHealth: React.FC = () => {
  const mindsets: MindsetState[] = [
    {
      id: 'stress-relief',
      label: 'کاهش استرس و آرامش اعصاب',
      problem: 'فشار کاری، خستگی مزمن، بی‌خوابی یا اضطراب روزمره',
      solution: 'نواختن ملودی‌های پیوسته و کشش‌های صوتی آرام، سیستم عصبی سمپاتیک را خاموش و سیستم پاراسمپاتیک (حالت آرامش و بازیابی) را فعال می‌کند.',
      recommendedInstruments: ['پیانو', 'سنتور', 'تار', 'سه‌تار', 'هنگ‌درام'],
      scientificFact: 'کاهش ۶۸ درصدی هورمون کورتیزول و تنظیم ضربان قلب پس از ۲۰ دقیقه نوازندگی.'
    },
    {
      id: 'deep-focus',
      label: 'تقویت تمرکز و حضور ذهن',
      problem: 'حواس‌پرتی دیجیتال، عدم توانایی در تمرکز عمیق و نشخوار فکری',
      solution: 'همگام‌سازی حرکات دقیق دست، بینایی نت‌ها و شنوایی گوش، تمام ظرفیت پردازش کورتکس پیش‌پیشانی مغز را درگیر کرده و امکان حواس‌پرتی را به صفر می‌رساند.',
      recommendedInstruments: ['ویولن', 'گیتار کلاسیک', 'فلوت', 'تنبور'],
      scientificFact: 'تقویت ارتباط جسم پینه‌ای (پل ارتباطی نیمکره چپ و راست مغز) و ورود پایدار به وضعیت Flow State.'
    },
    {
      id: 'energy-release',
      label: 'تخلیه هیجانی و افزایش شادی',
      problem: 'احساس کرختی، خستگی روحی و نیاز به تخلیه هیجانات درونی',
      solution: 'سازهای ضربی و ریتمیک با ارتعاشات فیزیکی، دوپامین و اندورفین طبیعی آزاد می‌کنند و مانند یک جلسه مدیتیشن پویا، خستگی‌های انباشته را رها می‌سازند.',
      recommendedInstruments: ['دف', 'تنبک', 'کاخن', 'درامز'],
      scientificFact: 'تحریک مدارهای پاداش مغز و ارتقای چشمگیر خلق‌وخو شبیه به یک تمرین ورزشی هوازی ملایم.'
    }
  ];

  const [activeMindset, setActiveMindset] = useState<string>(mindsets[0].id);
  const current = mindsets.find((m) => m.id === activeMindset) || mindsets[0];

  const pillars = [
    {
      icon: Activity,
      title: 'مهار هورمون استرس (کورتیزول)',
      stat: '۶۸٪',
      statLabel: 'کاهش اضطراب فیزیولوژیک',
      desc: 'ارتعاشات موسیقایی امواج مغزی را از فاز تند بتا (تنش روزمره) به امواج آلفا (آرامش عمیق و هوشیار) هدایت می‌کنند و عضلات منقبض شده را رها می‌سازند.'
    },
    {
      icon: Target,
      title: 'ورود به وضعیت تمرکز ناب (Flow)',
      stat: '۱۰۰٪',
      statLabel: 'قطع نشخوارهای فکری',
      desc: 'در حین لمس ساز، ذهن نمی‌تواند به گذشته یا آینده بگریزد؛ تمام توجه در "اینجا و اکنون" متمرکز شده و حواس‌پرتی‌های مدرن رنگ می‌بازند.'
    },
    {
      icon: Brain,
      title: 'شکل‌پذیری عصبی (Neuroplasticity)',
      stat: '+۴۰٪',
      statLabel: 'افزایش انعطاف شناختی',
      desc: 'یادگیری فواصل، ریتم‌ها و آکوردها شبکه‌های عصبی جدیدی می‌سازد که مقاومت مغز را در برابر فرسودگی، زوال عقل و خستگی ذهنی چند برابر می‌کند.'
    },
    {
      icon: Smile,
      title: 'بیان احساسات بدون نیاز به کلمات',
      stat: 'طبیعی',
      statLabel: 'ترشح دوپامین و اندورفین',
      desc: 'وقتی صحبت کردن از غم یا خستگی دشوار است، طنین ساز به شما اجازه می‌دهد هیجانات فشرده را به زیباترین شکل به صدای شفاف و آرام‌بخش تبدیل کنید.'
    }
  ];

  return (
    <section
      id="mental-health"
      role="region"
      aria-labelledby="mental-health-heading"
      className="py-20 lg:py-24 bg-gradient-to-b from-[#FAF4F4] to-[#FCF8F8] dark:from-[#12141A] dark:to-[#0E1013] border-b border-[#E8DFE0] dark:border-white/10 transition-colors relative overflow-hidden"
    >
      {/* Decorative Warm Ambient Glow */}
      <div 
        className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#B92B3A]/5 dark:bg-[#B92B3A]/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#F3C7CA]/20 dark:bg-[#F3C7CA]/5 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-2 text-[13px] font-bold text-[#B92B3A] dark:text-[#F3C7CA] mb-3 tracking-tight bg-[#F3C7CA]/30 dark:bg-[#B92B3A]/20 px-4 py-1.5 rounded-full border border-[#E8DFE0] dark:border-white/10 shadow-2xs">
            <HeartHandshake className="w-4 h-4 text-[#B92B3A] dark:text-[#F3C7CA]" />
            <span>علم عصب‌شناسی و روانشناسی موسیقی</span>
          </div>

          <h2
            id="mental-health-heading"
            className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#1a1b1e] dark:text-white leading-[1.18] tracking-[-0.025em] mb-5 [text-wrap:balance]"
          >
            موسیقی و سلامت روان: <br className="hidden sm:inline" />
            <span className="text-[#B92B3A] dark:text-[#F3C7CA]">پناهگاهی برای تمرکز عمیق و رهایی از استرس</span>
          </h2>

          <p className="text-[16px] sm:text-[18px] text-[#555e6b] dark:text-[#9ca3af] font-normal leading-[1.7] [text-wrap:pretty]">
            نواختن یک ساز تنها یک مهارت هنری نیست؛ کامل‌ترین تمرین بازآفرینی مغز است که فشارهای روحی، حواس‌پرتی‌های مداوم و اضطراب مدرن را به هارمونی، آرامش درون و شفافیت ذهنی تبدیل می‌کند.
          </p>
        </div>

        {/* 4 Science-Backed Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#171A21] border border-[#E8DFE0] dark:border-white/10 shadow-xs hover:shadow-md hover:border-[#B92B3A]/40 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#F3C7CA]/30 dark:bg-[#B92B3A]/20 border border-[#E8DFE0] dark:border-white/10 text-[#B92B3A] dark:text-[#F3C7CA] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-[17px] font-bold text-[#1a1b1e] dark:text-white mb-2 leading-snug">
                    {pillar.title}
                  </h3>
                  
                  <p className="text-[14px] text-[#555e6b] dark:text-[#9ca3af] leading-relaxed mb-6 font-normal">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8DFE0]/80 dark:border-white/10 flex items-baseline justify-between">
                  <span className="text-[12px] font-medium text-[#717b8a] dark:text-[#9ca3af]">
                    {pillar.statLabel}
                  </span>
                  <span className="font-mono text-[18px] font-black text-[#B92B3A] dark:text-[#F3C7CA]">
                    {pillar.statLabel === 'ترشح دوپامین و اندورفین' ? 'پایدار' : pillar.stat}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Mindset Box: "ساز متناسب با نیاز روحی شما" */}
        <div className="rounded-3xl bg-white dark:bg-[#171A21] border border-[#E8DFE0] dark:border-white/10 p-6 sm:p-10 lg:p-12 shadow-md">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-[#E8DFE0] dark:border-white/10">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#B92B3A] dark:text-[#F3C7CA] mb-1">
                <Sparkles className="w-4 h-4" />
                <span>راهنمای تعاملی انتخاب ساز</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#1a1b1e] dark:text-white">
                بر اساس اولویت ذهنی خود، چه سازی برای شما مناسب‌تر است؟
              </h3>
            </div>

            {/* Mindset Tab Buttons */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#FCF8F8] dark:bg-[#0E1013] border border-[#E8DFE0] dark:border-white/10 w-full lg:w-auto">
              {mindsets.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveMindset(item.id)}
                  type="button"
                  className={`px-4 py-2.5 rounded-xl text-[13px] sm:text-[14px] font-bold transition-all duration-150 cursor-pointer flex-1 lg:flex-none text-center ${
                    activeMindset === item.id
                      ? 'bg-[#B92B3A] text-white shadow-sm'
                      : 'text-[#555e6b] dark:text-[#d1d5db] hover:text-[#1a1b1e] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Mindset Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left/Main Column: Explanation */}
            <div className="lg:col-span-7 space-y-5">
              <div className="p-4 rounded-2xl bg-[#F3C7CA]/20 dark:bg-[#B92B3A]/10 border border-[#E8DFE0] dark:border-white/10">
                <span className="block text-[12px] font-bold text-[#B92B3A] dark:text-[#F3C7CA] mb-1">
                  چالش ذهنی که با آن مواجهید:
                </span>
                <p className="text-[15px] font-medium text-[#202124] dark:text-white">
                  {current.problem}
                </p>
              </div>

              <div>
                <span className="block text-[13px] font-bold text-[#1a1b1e] dark:text-white mb-2">
                  چگونه یادگیری این ساز به درمان و بازتوانی کمک می‌کند؟
                </span>
                <p className="text-[15px] text-[#555e6b] dark:text-[#9ca3af] leading-relaxed">
                  {current.solution}
                </p>
              </div>

              <div className="flex items-center gap-2 text-[13px] text-[#10b981] dark:text-[#34d399] font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>مستند علمی: {current.scientificFact}</span>
              </div>
            </div>

            {/* Right Column: Recommended Instruments & CTA */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#FAF4F4] dark:bg-[#0E1013] border border-[#E8DFE0] dark:border-white/10 flex flex-col justify-between">
              <div>
                <span className="block text-[12px] font-bold text-[#717b8a] dark:text-[#9ca3af] uppercase tracking-wider mb-3">
                  سازهای با بالاترین بازدهی برای این هدف:
                </span>
                <div className="flex flex-wrap gap-2 mb-6">
                  {current.recommendedInstruments.map((inst, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-bold bg-white dark:bg-[#171A21] border border-[#E8DFE0] dark:border-white/15 text-[#B92B3A] dark:text-[#F3C7CA] shadow-2xs"
                    >
                      <Music2 className="w-3.5 h-3.5" />
                      <span>{inst}</span>
                    </span>
                  ))}
                </div>
              </div>

              <a
                href="#contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full text-[14px] font-bold bg-[#B92B3A] hover:bg-[#A52432] active:scale-95 text-white transition-all duration-150 shadow-sm"
              >
                <span>مشاوره و تعیین سطح بر اساس روحیات شما</span>
                <ArrowLeft className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Neuroscientist Quote Callout */}
          <div className="mt-8 pt-6 border-t border-[#E8DFE0] dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-[#555e6b] dark:text-[#9ca3af] text-[13px] sm:text-[14px] leading-relaxed">
            <Quote className="w-8 h-8 text-[#B92B3A]/40 dark:text-[#F3C7CA]/40 shrink-0 rotate-180" />
            <p className="italic">
              «موسیقی بیش از هر فعالیت انسانی دیگری، ارتباطات دو نیمکره مغز را فعال می‌کند. این سریع‌ترین و پایدارترین مسیر برای برقراری تعادل میان تفکر منطقی و آسودگی عاطفی است.»
              <strong className="block sm:inline font-bold text-[#1a1b1e] dark:text-white not-italic sm:mr-2">
                — دکتر الیور ساکس، عصب‌شناس برجسته
              </strong>
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
