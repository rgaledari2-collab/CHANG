import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  PhoneCall,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  User,
  Music2,
  Calendar,
  MessageSquare,
  ShieldCheck,
  Building2,
  Headphones,
  ArrowLeft
} from 'lucide-react';
import { COURSES_DATA } from '../data';

interface ContactFormProps {
  selectedCourse?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ selectedCourse }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState(selectedCourse || '');
  const [studentAge, setStudentAge] = useState('');
  const [preferredBranch, setPreferredBranch] = useState<'khorramshahr' | 'abadan'>('khorramshahr');
  const [message, setMessage] = useState('');

  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [formStatus, setFormStatus] = useState<{ success?: boolean; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedCourse) {
      setCourse(selectedCourse);
    }
  }, [selectedCourse]);

  // Convert Persian and Arabic digits to English ASCII digits
  const toEnglishDigits = (str: string): string => {
    return str
      .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString())
      .replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNameError('');
    setPhoneError('');
    setFormStatus(null);

    let hasError = false;

    if (!fullName.trim()) {
      setNameError('لطفاً نام و نام‌خانوادگی خود را وارد کنید.');
      hasError = true;
      nameInputRef.current?.focus();
    }

    const normalizedPhone = toEnglishDigits(phone.trim()).replace(/\s|-/g, '');
    const phonePattern = /^09\d{9}$/;

    if (!phone.trim()) {
      setPhoneError('لطفاً شماره موبایل را وارد کنید.');
      if (!hasError) {
        hasError = true;
        phoneInputRef.current?.focus();
      }
    } else if (!phonePattern.test(normalizedPhone)) {
      setPhoneError('شماره موبایل نامعتبر است. نمونه صحیح: ۰۹۳۵۹۳۵۲۷۳۸');
      if (!hasError) {
        hasError = true;
        phoneInputRef.current?.focus();
      }
    }

    if (hasError) {
      return;
    }

    setIsSubmitting(true);

    const branchName = preferredBranch === 'khorramshahr' ? 'شعبه خرمشهر' : 'شعبه آبادان';

    setTimeout(() => {
      setIsSubmitting(false);
      setFormStatus({
        success: true,
        text: `درخواست مشاوره برای ${fullName.trim()} جهت ${branchName} با موفقیت ثبت شد. کارشناسان آموزشگاه چنگ در اسرع وقت با شماره شما تماس خواهند گرفت.`
      });
      setFullName('');
      setPhone('');
      setStudentAge('');
      setMessage('');
    }, 600);
  };

  return (
    <section id="contact" className="py-20 lg:py-24 bg-[#FCF8F8] dark:bg-[#0E1013] border-b border-[#E8DFE0] dark:border-white/10 transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Contact Copy & Info */}
          <div className="lg:col-span-5 text-right">
            <div className="inline-flex items-center gap-2 text-[13px] font-bold text-[#B92B3A] dark:text-[#F3C7CA] mb-2 tracking-tight">
              <Headphones className="w-4 h-4 text-[#B92B3A] dark:text-[#F3C7CA]" />
              <span>مشاوره تخصصی و تعیین سطح هنرجو</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#202124] dark:text-white leading-[1.10] tracking-[-0.025em] mb-4 [text-wrap:balance]">
              یک گفت‌وگوی کوتاه، <br />یک شروع درست.
            </h2>
            <p className="text-[16px] text-[#5a626d] dark:text-[#9ca3af] font-normal leading-[1.6] mb-8 [text-wrap:pretty]">
              آموزشگاه موسیقی چنگ با دو شعبه فعال در خرمشهر و آبادان، آماده پاسخگویی و ارائه مشاوره حضوری و تلفنی جهت انتخاب ساز مناسب و تعیین سطح است.
            </p>

            <dl className="space-y-4">
              {/* Direct Phone */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#171A21] border border-[#E8DFE0] dark:border-white/10 shadow-xs flex items-start gap-4 group hover:border-[#B92B3A]/40 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-[#F3C7CA]/40 dark:bg-[#B92B3A]/20 border border-[#E8DFE0] dark:border-white/10 text-[#B92B3A] dark:text-[#F3C7CA] flex items-center justify-center shrink-0 shadow-xs">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <dt className="text-[12px] text-[#8996A6] dark:text-[#9ca3af] font-medium mb-0.5">شماره تماس و مشاوره</dt>
                  <dd className="text-[18px] font-extrabold text-[#202124] dark:text-white flex items-center justify-between">
                    <a href="tel:09359352738" className="hover:text-[#B92B3A] dark:hover:text-[#F3C7CA] transition-colors dir-ltr font-mono">
                      ۰۹۳۵-۹۳۵-۲۷۳۸
                    </a>
                    <a 
                      href="tel:09359352738" 
                      className="inline-flex items-center gap-1 text-[12px] font-bold text-[#B92B3A] dark:text-[#F3C7CA] hover:underline"
                    >
                      <span>تماس مستقیم</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </a>
                  </dd>
                </div>
              </div>

              {/* Khorramshahr Branch */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#171A21] border border-[#E8DFE0] dark:border-white/10 shadow-xs flex items-start gap-4 group hover:border-[#B92B3A]/40 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-[#F3C7CA]/40 dark:bg-[#B92B3A]/20 border border-[#E8DFE0] dark:border-white/10 text-[#B92B3A] dark:text-[#F3C7CA] flex items-center justify-center shrink-0 shadow-xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <dt className="text-[12px] font-extrabold text-[#B92B3A] dark:text-[#F3C7CA] bg-[#FAF0F1] dark:bg-[#B92B3A]/15 px-2.5 py-0.5 rounded-md inline-block">
                      شعبه خرمشهر
                    </dt>
                    <span className="text-[11px] text-[#8996A6] dark:text-[#9ca3af]">دفتر مرکزی</span>
                  </div>
                  <dd className="text-[14px] sm:text-[15px] font-bold text-[#202124] dark:text-white leading-relaxed">
                    میدان فرمانداری - مجتمع فرهنگی هنری خلیج فارس
                  </dd>
                </div>
              </div>

              {/* Abadan Branch */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#171A21] border border-[#E8DFE0] dark:border-white/10 shadow-xs flex items-start gap-4 group hover:border-[#B92B3A]/40 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-[#F3C7CA]/40 dark:bg-[#B92B3A]/20 border border-[#E8DFE0] dark:border-white/10 text-[#B92B3A] dark:text-[#F3C7CA] flex items-center justify-center shrink-0 shadow-xs">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <dt className="text-[12px] font-extrabold text-[#B92B3A] dark:text-[#F3C7CA] bg-[#FAF0F1] dark:bg-[#B92B3A]/15 px-2.5 py-0.5 rounded-md inline-block">
                      شعبه آبادان
                    </dt>
                    <span className="text-[11px] text-[#8996A6] dark:text-[#9ca3af]">شعبه فعال</span>
                  </div>
                  <dd className="text-[14px] sm:text-[15px] font-bold text-[#202124] dark:text-white leading-relaxed">
                    سه‌راه شاملو، نبش زمین چمن
                  </dd>
                </div>
              </div>

              {/* Working Hours */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#171A21] border border-[#E8DFE0] dark:border-white/10 shadow-xs flex items-start gap-4 group hover:border-[#B92B3A]/40 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-[#F3C7CA]/40 dark:bg-[#B92B3A]/20 border border-[#E8DFE0] dark:border-white/10 text-[#B92B3A] dark:text-[#F3C7CA] flex items-center justify-center shrink-0 shadow-xs">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <dt className="text-[12px] text-[#8996A6] dark:text-[#9ca3af] font-medium">ساعات پذیرش و پاسخگویی</dt>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>پاسخگویی هر دو شعبه</span>
                    </span>
                  </div>
                  <dd className="text-[14px] font-bold text-[#202124] dark:text-white">
                    شنبه تا پنج‌شنبه: ۹:۰۰ تا ۱۳:۰۰ و ۱۶:۰۰ تا ۲۱:۰۰
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-7 bg-white dark:bg-[#171A21] border border-[#E8DFE0] dark:border-white/10 rounded-[18px] p-6 sm:p-10 shadow-sm transition-colors">
            <form onSubmit={handleSubmit} noValidate className="space-y-5 text-right">
              
              {/* Branch Selection Tabs */}
              <div>
                <label className="block text-[14px] font-bold text-[#202124] dark:text-white mb-2">
                  انتخاب شعبه مورد نظر برای هماهنگی و کلاس <span className="text-[#B92B3A]">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="انتخاب شعبه">
                  <button
                    type="button"
                    onClick={() => setPreferredBranch('khorramshahr')}
                    className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
                      preferredBranch === 'khorramshahr'
                        ? 'border-[#B92B3A] bg-[#FAF0F1] dark:bg-[#B92B3A]/15 text-[#B92B3A] dark:text-white ring-1 ring-[#B92B3A]'
                        : 'border-[#E8DFE0] dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-[#5a626d] dark:text-[#9ca3af]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="font-bold text-[14px]">شعبه خرمشهر</span>
                      <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                        preferredBranch === 'khorramshahr' ? 'border-[#B92B3A] bg-[#B92B3A]' : 'border-gray-400'
                      }`}>
                        {preferredBranch === 'khorramshahr' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#8996A6] dark:text-[#9ca3af]">میدان فرمانداری، مجتمع خلیج فارس</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPreferredBranch('abadan')}
                    className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
                      preferredBranch === 'abadan'
                        ? 'border-[#B92B3A] bg-[#FAF0F1] dark:bg-[#B92B3A]/15 text-[#B92B3A] dark:text-white ring-1 ring-[#B92B3A]'
                        : 'border-[#E8DFE0] dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-[#5a626d] dark:text-[#9ca3af]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="font-bold text-[14px]">شعبه آبادان</span>
                      <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                        preferredBranch === 'abadan' ? 'border-[#B92B3A] bg-[#B92B3A]' : 'border-gray-400'
                      }`}>
                        {preferredBranch === 'abadan' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#8996A6] dark:text-[#9ca3af]">سه‌راه شاملو، نبش زمین چمن</span>
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label htmlFor="full-name" className="block text-[14px] font-bold text-[#202124] dark:text-white mb-1.5">
                  نام و نام‌خانوادگی <span className="text-[#B92B3A]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#8996A6] dark:text-[#6b7280]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    ref={nameInputRef}
                    id="full-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="مثلاً: مریم احمدی"
                    className={`w-full pr-10 pl-4 py-3 rounded-xl bg-[#FCF8F8] dark:bg-[#0E1013] border text-[15px] text-[#202124] dark:text-white transition-all focus:outline-none focus:ring-2 ${
                      nameError 
                        ? 'border-red-500 focus:ring-red-500/20' 
                        : 'border-[#E8DFE0] dark:border-white/10 focus:border-[#B92B3A] focus:ring-[#B92B3A]/20'
                    }`}
                    required
                  />
                </div>
                {nameError && (
                  <p className="mt-1.5 text-[13px] text-red-600 flex items-center gap-1 font-medium" aria-live="polite">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{nameError}</span>
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-[14px] font-bold text-[#202124] dark:text-white mb-1.5">
                  شماره موبایل برای تماس و هماهنگی <span className="text-[#B92B3A]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#8996A6] dark:text-[#6b7280]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    ref={phoneInputRef}
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="مثال: ۰۹۳۵۹۳۵۲۷۳۸"
                    className={`w-full pr-10 pl-4 py-3 rounded-xl bg-[#FCF8F8] dark:bg-[#0E1013] border text-[15px] text-[#202124] dark:text-white transition-all focus:outline-none focus:ring-2 ${
                      phoneError 
                        ? 'border-red-500 focus:ring-red-500/20' 
                        : 'border-[#E8DFE0] dark:border-white/10 focus:border-[#B92B3A] focus:ring-[#B92B3A]/20'
                    }`}
                    required
                  />
                </div>
                {phoneError && (
                  <p className="mt-1.5 text-[13px] text-red-600 flex items-center gap-1 font-medium" aria-live="polite">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{phoneError}</span>
                  </p>
                )}
              </div>

              {/* Course & Age row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="course-select" className="block text-[14px] font-bold text-[#202124] dark:text-white mb-1.5">
                    ساز یا دوره مورد علاقه
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#8996A6] dark:text-[#6b7280]">
                      <Music2 className="w-4 h-4" />
                    </div>
                    <select
                      id="course-select"
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      className="w-full pr-10 pl-4 py-3 rounded-xl bg-[#FCF8F8] dark:bg-[#0E1013] border border-[#E8DFE0] dark:border-white/10 text-[14px] text-[#202124] dark:text-white focus:outline-none focus:border-[#B92B3A] focus:ring-2 focus:ring-[#B92B3A]/20"
                    >
                      <option value="">هنوز تصمیم نگرفته‌ام (مشاوره کلی)</option>
                      {COURSES_DATA.map((c) => (
                        <option key={c.id} value={c.title}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="student-age" className="block text-[14px] font-bold text-[#202124] dark:text-white mb-1.5">
                    سن هنرجو (سال)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#8996A6] dark:text-[#6b7280]">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <input
                      id="student-age"
                      type="number"
                      min="3"
                      max="99"
                      value={studentAge}
                      onChange={(e) => setStudentAge(e.target.value)}
                      placeholder="مثلاً: ۱۲"
                      className="w-full pr-10 pl-4 py-3 rounded-xl bg-[#FCF8F8] dark:bg-[#0E1013] border border-[#E8DFE0] dark:border-white/10 text-[14px] text-[#202124] dark:text-white focus:outline-none focus:border-[#B92B3A] focus:ring-2 focus:ring-[#B92B3A]/20"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="user-message" className="block text-[14px] font-bold text-[#202124] dark:text-white mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#B92B3A] dark:text-[#F3C7CA]" />
                  <span>پرسش یا توضیحات تکمیلی (اختیاری)</span>
                </label>
                <textarea
                  id="user-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="تجربه قبلی موسیقی، زمان ترجیحی تماس و..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FCF8F8] dark:bg-[#0E1013] border border-[#E8DFE0] dark:border-white/10 text-[14px] text-[#202124] dark:text-white focus:outline-none focus:border-[#B92B3A] focus:ring-2 focus:ring-[#B92B3A]/20 resize-y"
                />
              </div>

              {/* Status Message */}
              {formStatus && (
                <div
                  className={`p-4 rounded-xl flex items-start gap-3 ${
                    formStatus.success
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40'
                      : 'bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800/40'
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-[14px] leading-relaxed font-medium">{formStatus.text}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-full text-[16px] font-bold tracking-[-0.01em] bg-[#B92B3A] hover:bg-[#A52432] active:scale-[0.98] text-white transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B92B3A] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <span>در حال ثبت اطلاعات...</span>
                ) : (
                  <>
                    <span>ثبت درخواست مشاوره و تعیین سطح</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 pt-2 text-[12px] text-[#8996A6] dark:text-[#9ca3af]">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>اطلاعات تماس شما به صورت محرمانه نزد آموزشگاه چنگ محفوظ است.</span>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
