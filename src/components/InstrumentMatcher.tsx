import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  ArrowLeft, 
  RotateCcw, 
  CheckCircle2, 
  Music, 
  Heart, 
  Clock, 
  Smile, 
  Volume2,
  CalendarCheck
} from 'lucide-react';

interface QuizQuestion {
  id: number;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    icon: React.ReactNode;
    tag: string;
    points: Record<string, number>;
  }[];
}

interface MatchResult {
  instrumentTitle: string;
  courseTitle: string;
  category: string;
  matchScore: number;
  summary: string;
  advantages: string[];
  recommendedAge: string;
  weeklyPractice: string;
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    title: 'هنرجو در چه رده سنی قرار دارد؟',
    subtitle: 'سازها بر اساس ارگونومی دست، وزن و مبانی شنیداری برای سنین مختلف بهینه‌سازی می‌شوند.',
    options: [
      {
        label: 'کودک خردسال (۳.۵ تا ۸ سال)',
        description: 'کشف ریتم با بازی و بلز پیش از ورود به سازهای جدی',
        icon: <Smile className="w-5 h-5 text-amber-500" />,
        tag: 'کودک',
        points: { orff: 10, piano: 3, percussion: 3 }
      },
      {
        label: 'نوجوان و جوان (۹ تا ۱۸ سال)',
        description: 'انعطاف بالای انگشتان و آمادگی کامل برای نت‌خوانی تخصصی',
        icon: <Music className="w-5 h-5 text-blue-500" />,
        tag: 'نوجوان',
        points: { piano: 6, guitar: 6, violin: 6, tar: 5, santur: 5 }
      },
      {
        label: 'بزرگسال (۱۹ سال به بالا)',
        description: 'علاقه‌مندی به آرامش روحی، بداهه‌نوازی یا تسلط بر تکنیک ساز',
        icon: <Heart className="w-5 h-5 text-[#B92B3A]" />,
        tag: 'بزرگسال',
        points: { tar: 6, setar: 7, santur: 6, piano: 5, guitar: 5, vocal: 6, daf: 5 }
      }
    ]
  },
  {
    id: 2,
    title: 'چه سبک و فضایی از موسیقی به روحیه شما نزدیک‌تر است؟',
    subtitle: 'طنین و فرکانس کدام خانواده ساز حس عمیق‌تری به شما منتقل می‌کند؟',
    options: [
      {
        label: 'کلاسیک غربی، باشکوه و چندصدایی (پلی‌فونیک)',
        description: 'علاقه‌مند به هارمونی، آکوردها، موسیقی ارکسترال و فیلم',
        icon: <Sparkles className="w-5 h-5 text-purple-500" />,
        tag: 'کلاسیک',
        points: { piano: 8, violin: 7, guitar: 4 }
      },
      {
        label: 'موسیقی اصیل ایرانی، عرفانی و دستگاهی',
        description: 'طنین سیم و پرده‌های سنتی، گوشه‌های شور، همایون و ماهور',
        icon: <Music className="w-5 h-5 text-emerald-600" />,
        tag: 'سنتی',
        points: { tar: 8, setar: 8, santur: 7, tonbak: 4 }
      },
      {
        label: 'ریتمیک، ضربی و پرانرژی',
        description: 'تپش ریتم، ادوار ایقاعی، رهاسازی انرژی دست و هیجان ریتم',
        icon: <Volume2 className="w-5 h-5 text-rose-500" />,
        tag: 'کوبه‌ای',
        points: { daf: 8, tonbak: 8, percussion: 7 }
      },
      {
        label: 'آواز، تحریر و بیان احساس با حنجره',
        description: 'استفاده از ساز طبیعی بدن همراه با سلفژ و تصنیف‌خوانی',
        icon: <Heart className="w-5 h-5 text-amber-600" />,
        tag: 'آواز',
        points: { vocal: 9, piano: 2, setar: 3 }
      }
    ]
  },
  {
    id: 3,
    title: 'در طول روز چه میزان فرصت برای تمرین خانگی دارید؟',
    subtitle: 'برخی سازها نیازمند اکول تمرین طولانی‌تر و برخی سازها سریع‌تر به ملودی می‌رسند.',
    options: [
      {
        label: 'روزانه ۲۰ تا ۳۰ دقیقه (زمان متمرکز و متعادل)',
        description: 'یادگیری پیوسته بدون فشار کاری زیاد',
        icon: <Clock className="w-5 h-5 text-sky-500" />,
        tag: 'متعادل',
        points: { setar: 5, santur: 5, daf: 6, guitar: 5, orff: 6 }
      },
      {
        label: 'روزانه ۴۵ تا ۶۰ دقیقه به بالا (تمرین آکادمیک جدی)',
        description: 'آمادگی برای تمرین اتودهای تکنیکی و ورود به ارکستر',
        icon: <Clock className="w-5 h-5 text-amber-500" />,
        tag: 'جدی',
        points: { piano: 7, violin: 8, tar: 6 }
      }
    ]
  }
];

const INSTRUMENT_PROFILES: Record<string, MatchResult> = {
  piano: {
    instrumentTitle: 'پیانو آکوستیک و کلاسیک',
    courseTitle: 'پیانو کلاسیک و مدرن',
    category: 'کلاویه‌ای و آکادمیک',
    matchScore: 97,
    summary: 'مادر سازها؛ بهترین انتخاب برای درک عمیق سلفژ، هارمونی و چندصدایی با اکول بین‌المللی ABRSM.',
    advantages: ['دید باز تصویری روی شستی‌ها', 'تقویت همزمان دو نیمکره مغز', 'پایه‌ای بی‌نظیر برای فهم کل موسیقی'],
    recommendedAge: 'از ۵ سال به بالا',
    weeklyPractice: '۴۰ دقیقه روزانه'
  },
  tar: {
    instrumentTitle: 'تار ایرانی',
    courseTitle: 'تار و سه‌تار ایرانی',
    category: 'سازهای اصیل ایرانی',
    matchScore: 96,
    summary: 'ساز شاهوار موسیقی دستگاهی ایران با کاسه پوستی و مضراب‌شناسی دقیق ردیف‌های میرزا عبدالله و شهنازی.',
    advantages: ['طنین پرصلابت و پرده‌بندی دقیق', 'تسلط بر ربع‌پرده‌های شور و همایون', 'عضویت سریع در ارکستر سنتی چنگ'],
    recommendedAge: 'از ۹ سال به بالا',
    weeklyPractice: '۳۰ تا ۴۵ دقیقه روزانه'
  },
  setar: {
    instrumentTitle: 'سه‌تار',
    courseTitle: 'تار و سه‌تار ایرانی',
    category: 'موسیقی دستگاهی و خلوت دل',
    matchScore: 95,
    summary: 'سازی با نجوای درونی و آرامش‌بخش؛ حمل آسان و یادگیری صمیمانه با ناخن سبابه.',
    advantages: ['صدای ملایم مناسب تمرین در آپارتمان', 'ارتباط عاطفی و بداهه‌پردازی سریع', 'روایت اصیل دستگاه‌های هفت‌گانه'],
    recommendedAge: 'از ۱۰ سال به بالا',
    weeklyPractice: '۳۰ دقیقه روزانه'
  },
  violin: {
    instrumentTitle: 'ویولن کلاسیک و ایرانی',
    courseTitle: 'ویولن کلاسیک و ایرانی',
    category: 'زهی آرشه‌ای',
    matchScore: 94,
    summary: 'ظریف‌ترین ساز آرشه‌ای برای تربیت گوش مطلق، بدون فرت؛ پرورش شنوایی دقیق و حس اجرای ارکسترال.',
    advantages: ['تربیت گوش صوتی فوق‌العاده قوی', 'ساز اول ارکسترهای بزرگ جهانی', 'تکنیک غنی آرشه‌کشی و ویبراتو'],
    recommendedAge: 'از ۶ سال به بالا',
    weeklyPractice: '۴۵ دقیقه روزانه'
  },
  santur: {
    instrumentTitle: 'سنتور',
    courseTitle: 'سنتور',
    category: 'سازهای مضرابی زهی',
    matchScore: 95,
    summary: 'طنین بلورین ۷۲ سیم با مضراب‌های نمددار؛ سرعت انتقال بالا و لذت همنوازی چهارمضراب‌ها.',
    advantages: ['تولید صدای شفاف و لذت‌بخش از جلسات نخست', 'هماهنگی فوق‌العاده سرعت دو دست', 'جذابیت بالا در تکنوازی'],
    recommendedAge: 'از ۸ سال به بالا',
    weeklyPractice: '۳۰ دقیقه روزانه'
  },
  daf: {
    instrumentTitle: 'دف و سازهای کوبه‌ای',
    courseTitle: 'دف و دایره',
    category: 'ریتمیک و عرفانی',
    matchScore: 93,
    summary: 'شورانگیزترین ساز کوبه‌ای ایرانی با حلقه‌های زنگ‌دار؛ رهاسازی انرژی، تقویت ریتم و همنوازی.',
    advantages: ['یادگیری ریتم بدون نیاز به تئوری پیچیده اولیه', 'تخلیه هیجان و هماهنگی عضلانی', 'نقش کلیدی در تمام گروه‌های موسیقی'],
    recommendedAge: 'از ۷ سال به بالا',
    weeklyPractice: '۲۰ تا ۳۰ دقیقه روزانه'
  },
  orff: {
    instrumentTitle: 'موسیقی تخصصی کودک (متد اُرف)',
    courseTitle: 'موسیقی کودک (متد اُرف)',
    category: 'دپارتمان کودک و نوجوان',
    matchScore: 99,
    summary: 'جامع‌ترین متد بین‌المللی آموزش کودکان با بلز، فلوت ریکوردر، بازی و قصه جهت کشف استعداد نهایی.',
    advantages: ['محیطی شاد و بدون استرس', 'کشف دقیق ساز تخصصی آینده توسط استاد', 'تقویت مهارت‌های کلامی و اجتماعی'],
    recommendedAge: '۳.۵ تا ۸ سال',
    weeklyPractice: '۱۵ تا ۲۰ دقیقه بازی‌محور'
  },
  vocal: {
    instrumentTitle: 'آواز اصیل ایرانی و صداسازی',
    courseTitle: 'آواز ایرانی و صداسازی',
    category: 'آواز و صدا',
    matchScore: 94,
    summary: 'پرورش اصولی تنفس دیافراگمی، تحریرهای سنتی و بیان صحیح شعر با متد بدون آسیب به حنجره.',
    advantages: ['استفاده از طبیعی‌ترین ساز وجودی', 'اعتمادبه‌نفس بالا در اجراهای زنده', 'تسلط بر ردیف آوازی و تصنیف‌خوانی'],
    recommendedAge: 'از ۱۲ سال به بالا',
    weeklyPractice: '۳۰ دقیقه صداسازی و تمرین تنفس'
  }
};

interface InstrumentMatcherModalProps {
  onSelectCourse: (courseTitle: string) => void;
}

export const InstrumentMatcher: React.FC<InstrumentMatcherModalProps> = ({ onSelectCourse }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<MatchResult | null>(null);

  const handleSelectOption = (points: Record<string, number>) => {
    const updatedScores = { ...scores };
    Object.entries(points).forEach(([instKey, pts]) => {
      updatedScores[instKey] = (updatedScores[instKey] || 0) + pts;
    });
    setScores(updatedScores);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Calculate top matching instrument
      let topInstrumentKey = 'piano';
      let highestScore = -1;

      Object.entries(updatedScores).forEach(([instKey, score]) => {
        if (score > highestScore && INSTRUMENT_PROFILES[instKey]) {
          highestScore = score;
          topInstrumentKey = instKey;
        }
      });

      setResult(INSTRUMENT_PROFILES[topInstrumentKey] || INSTRUMENT_PROFILES.piano);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setScores({});
    setResult(null);
  };

  const handleBookConsultation = () => {
    if (!result) return;
    onSelectCourse(result.courseTitle);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const nameField = document.getElementById('full-name');
        if (nameField) nameField.focus();
      }, 500);
    }
  };

  return (
    <div className="mt-14 pt-10 border-t border-[#E8DFE0] dark:border-white/10 select-none">
      <div className="bg-gradient-to-br from-white via-[#FCF8F8] to-[#F8EEEE] dark:from-[#171A21] dark:via-[#13161C] dark:to-[#0D0F14] rounded-3xl border border-[#E8DFE0] dark:border-white/10 p-6 sm:p-10 shadow-lg relative overflow-hidden">
        
        {/* Decorative Top Accent Glow */}
        <div 
          className="absolute -top-12 -left-12 w-48 h-48 bg-[#B92B3A]/10 rounded-full blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E8DFE0] dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#B92B3A] text-white flex items-center justify-center shadow-md shadow-[#B92B3A]/25">
              <Compass className="w-6 h-6" />
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-bold font-brand-title text-[#1a1b1e] dark:text-white">
                  آزمون هوشمند استعدادیابی و انتخاب ساز
                </h3>
                <span className="text-[11px] font-bold text-[#B92B3A] dark:text-[#FFB3BA] bg-[#B92B3A]/10 px-2.5 py-0.5 rounded-full">
                  ۳ سوال کوتاه
                </span>
              </div>
              <p className="text-[13px] sm:text-[14px] text-[#555E6B] dark:text-[#CBD5E1] mt-0.5">
                بر اساس ارگونومی دست، علاقه شنیداری و سبک زندگی، ساز ایده‌آل خود را بشناسید.
              </p>
            </div>
          </div>

          {(currentStep > 0 || result) && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-bold text-[#555E6B] dark:text-[#CBD5E1] hover:text-[#B92B3A] dark:hover:text-[#FFB3BA] border border-[#E8DFE0] dark:border-white/10 hover:border-[#B92B3A] transition-all self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>شروع مجدد آزمون</span>
            </button>
          )}
        </div>

        {/* QUIZ FLOW: Questions or Result */}
        {!result ? (
          <div>
            {/* Step Progress Bar */}
            <div className="flex items-center justify-between text-xs text-[#8996A6] dark:text-[#9ca3af] mb-2 font-mono">
              <span>گام ۰{currentStep + 1} از ۰{QUESTIONS.length}</span>
              <span>{Math.round(((currentStep) / QUESTIONS.length) * 100)}% تکمیل شده</span>
            </div>
            <div className="w-full h-1.5 bg-[#FAF0F1] dark:bg-white/10 rounded-full overflow-hidden mb-6">
              <div 
                className="h-full bg-gradient-to-r from-[#B92B3A] to-amber-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Current Question */}
            <div className="text-right mb-6">
              <h4 className="text-lg sm:text-xl font-bold text-[#141518] dark:text-white mb-1.5">
                {QUESTIONS[currentStep].title}
              </h4>
              <p className="text-[13px] text-[#6b7280] dark:text-[#9ca3af]">
                {QUESTIONS[currentStep].subtitle}
              </p>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
              {QUESTIONS[currentStep].options.map((option, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(option.points)}
                  className="p-5 rounded-2xl bg-white dark:bg-[#1a1d26] border border-[#E8DFE0] dark:border-white/10 hover:border-[#B92B3A] dark:hover:border-[#FFB3BA] hover:shadow-md transition-all text-right group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#FAF0F1] dark:bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {option.icon}
                    </div>
                    <span className="block font-bold text-[15px] text-[#202124] dark:text-white mb-1.5 leading-snug">
                      {option.label}
                    </span>
                    <span className="block text-[12px] text-[#555E6B] dark:text-[#CBD5E1] leading-relaxed">
                      {option.description}
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F2ECEC] dark:border-white/5 flex items-center justify-between text-[11px] font-bold text-[#B92B3A] dark:text-[#FFB3BA]">
                    <span>انتخاب این گزینه</span>
                    <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                  </div>
                </button>
              ))}
            </div>

          </div>
        ) : (
          /* RESULT PRESENTATION CARD */
          <div className="text-right">
            <div className="bg-white dark:bg-[#1A1D26] rounded-2xl border-2 border-[#B92B3A]/30 dark:border-[#B92B3A]/50 p-6 sm:p-8 shadow-md">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E8DFE0] dark:border-white/10">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[12px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>تطابق با بالاترین امتیاز ({result.matchScore}٪ سازگاری)</span>
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-black font-brand-title text-[#141518] dark:text-white">
                    ساز ایده‌آل شما: <span className="text-[#B92B3A] dark:text-[#FFB3BA]">{result.instrumentTitle}</span>
                  </h4>
                  <span className="text-[13px] font-bold text-[#8996A6] dark:text-[#9ca3af] block mt-1">
                    دپارتمان: {result.category}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-[#FAF0F1] dark:bg-white/5 px-4 py-2 rounded-xl text-center">
                    <span className="block text-[11px] text-[#8996A6]">سن پیشنهادی</span>
                    <span className="font-bold text-[13px] text-[#141518] dark:text-white">{result.recommendedAge}</span>
                  </div>
                  <div className="bg-[#FAF0F1] dark:bg-white/5 px-4 py-2 rounded-xl text-center">
                    <span className="block text-[11px] text-[#8996A6]">تمرین خانگی</span>
                    <span className="font-bold text-[13px] text-[#141518] dark:text-white">{result.weeklyPractice}</span>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <p className="text-[15px] sm:text-[16px] text-[#374151] dark:text-[#E2E8F0] leading-relaxed mb-6">
                {result.summary}
              </p>

              {/* Bullet Points */}
              <div className="mb-8">
                <span className="text-[13px] font-bold text-[#141518] dark:text-white block mb-3">
                  چرا این ساز برای شما مناسب‌ترین است؟
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {result.advantages.map((adv, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-start gap-2 p-3 rounded-xl bg-[#FCF8F8] dark:bg-white/5 border border-[#E8DFE0] dark:border-white/5 text-[12px] sm:text-[13px] text-[#4b5563] dark:text-[#CBD5E1] font-medium"
                    >
                      <Sparkles className="w-4 h-4 text-[#B92B3A] shrink-0 mt-0.5" />
                      <span>{adv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[#E8DFE0] dark:border-white/10">
                <button
                  type="button"
                  onClick={handleBookConsultation}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#B92B3A] hover:bg-[#A32230] text-white font-bold text-[15px] shadow-md shadow-[#B92B3A]/25 transition-all"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>رزرو نوبت تعیین سطح برای «{result.instrumentTitle}»</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-full border border-[#D5C6C8] dark:border-white/10 text-[13px] font-bold text-[#555E6B] dark:text-white hover:text-[#B92B3A] transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>آزمودن ساز دیگر</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
