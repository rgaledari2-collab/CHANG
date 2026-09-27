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
  Mail,
  Navigation,
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
      setPhoneError('شماره موبایل نامعتبر است. نمونه صحیح: ۰۹۱۲۳۴۵۶۷۸۹');
      if (!hasError) {
        hasError = true;
        phoneInputRef.current?.focus();
      }
    }

    if (hasError) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormStatus({
        success: true,
        text: `درخواست مشاوره برای ${fullName.trim()} با موفقیت ثبت شد. همکاران آموزشگاه چنگ حداکثر ظرف ۲۴ ساعت کاری با شماره شما تماس خواهند گرفت.`
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
            <p className="text-[17px] text-[#5a626d] dark:text-[#9ca3af] font-normal leading-[1.5] mb-8 [text-wrap:pretty]">
              برای انتخاب سازی که با علایق، فیزیک دست، سن و روحیات شما یا فرزندتان کاملاً هماهنگ باشد، مشاوره تخصصی و رایگان دریافت کنید.
            </p>

            <dl className="space-y-5">
              {/* Direct Phone */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#171A21] border border-[#E8DFE0] dark:border-white/10 shadow-xs flex items-start gap-4 group hover:border-[#B92B3A]/40 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-[#F3C7CA]/40 dark:bg-[#B92B3A]/20 border border-[#E8DFE0] dark:border-white/10 text-[#B92B3A] dark:text-[#F3C7CA] flex items-center justify-center shrink-0 shadow-xs">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <dt className="text-[12px] text-[#8996A6] dark:text-[#9ca3af] font-medium mb-0.5">تلفن مستقیم آموزشگاه</dt>
                  <dd className="text-[17px] font-bold text-[#202124] dark:text-white flex items-center justify-between">
                    <a href="tel:06153522000" className="hover:text-[#B92B3A] dark:hover:text-[#F3C7CA] transition-colors dir-ltr font-mono">
                      ۰۶۱-۵۳۵۲۲۰۰۰
                    </a>
                    <a 
                      href="tel:06153522000" 
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#B92B3A] dark:text-[#F3C7CA] hover:underline"
                    >
                      <span>تماس فوری</span>
                      <ArrowLeft className="w-3 h-3" />
                    </a>
                  </dd>
                </div>
              </div>

              {/* Physical Address */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#171A21] border border-[#E8DFE0] dark:border-white/10 shadow-xs flex items-start gap-4 group hover:border-[#B92B3A]/40 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-[#F3C7CA]/40 dark:bg-[#B92B3A]/20 border border-[#E8DFE0] dark:border-white/10 text-[#B92B3A] dark:text-[#F3C7CA] flex items-center justify-center shrink-0 shadow-xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <dt className="text-[12px] text-[#8996A6] dark:text-[#9ca3af] font-medium">نشانی حضوری</dt>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#5a626d] dark:text-[#9ca3af]">
                      <Navigation className="w-3 h-3 text-[#B92B3A] dark:text-[#F3C7CA]" />
                      <span>مسیریابی در نقشه</span>
                    </span>
                  </div>
                  <dd className="text-[15px] font-bold text-[#202124] dark:text-white leading-normal">
                    خوزستان، خرمشهر، بلوار ساحلی، نبش خیابان فردوسی
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
                      <span>پاسخگویی حضوری و تلفنی</span>
                    </span>
                  </div>
                  <dd className="text-[15px] font-bold text-[#202124] dark:text-white">
                    شنبه تا پنج‌شنبه: ۹:۰۰ تا ۱۳:۰۰ و ۱۶:۰۰ تا ۲۱:۰۰
                  </dd>
                </div>
              </div>

              {/* Email */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#171A21] border border-[#E8DFE0] dark:border-white/10 shadow-xs flex items-start gap-4 group hover:border-[#B92B3A]/40 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-[#F3C7CA]/40 dark:bg-[#B92B3A]/20 border border-[#E8DFE0] dark:border-white/10 text-[#B92B3A] dark:text-[#F3C7CA] flex items-center justify-center shrink-0 shadow-xs">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <dt className="text-[12px] text-[#8996A6] dark:text-[#9ca3af] font-medium mb-0.5">پست الکترونیک آکادمیک</dt>
                  <dd className="text-[15px] font-bold text-[#202124] dark:text-white">
                    <a href="mailto:info@chang-music.ir" className="hover:text-[#B92B3A] dark:hover:text-[#F3C7CA] transition-colors dir-ltr font-mono">
                      info@chang-music.ir
                    </a>
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-7 bg-white dark:bg-[#171A21] border border-[#E8DFE0] dark:border-white/10 rounded-[18px] p-6 sm:p-10 shadow-sm transition-colors">
            <form onSubmit={handleSubmit} noValidate className="space-y-5 text-right">
              
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
                  شماره موبایل برای هماهنگی <span className="text-[#B92B3A]">*</span>
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
                    placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
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

              {/* Submit Button in Lacquer Red */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-[13px] px-[22px] rounded-full bg-[#B92B3A] hover:bg-[#A52432] active:scale-95 text-white font-bold text-[16px] flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B92B3A] shadow-md"
              >
                {isSubmitting ? (
                  <span className="inline-block animate-pulse">در حال ثبت درخواست…</span>
                ) : (
                  <>
                    <span>ارسال درخواست مشاوره و تعیین سطح</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Form Status Message */}
              {formStatus && (
                <div
                  className="p-4 rounded-xl text-[14px] font-medium flex items-start gap-2.5 bg-[#F3C7CA]/30 border border-[#B92B3A]/30 text-[#202124] dark:text-white"
                  aria-live="polite"
                >
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-[#B92B3A] dark:text-[#F3C7CA]" />
                  <p className="leading-relaxed">{formStatus.text}</p>
                </div>
              )}

              {/* Privacy Badge */}
              <div className="pt-2 flex items-center justify-center gap-1.5 text-[12px] text-[#8996A6] dark:text-[#9ca3af]">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>اطلاعات شما نزد آموزشگاه چنگ محفوظ است و صرفاً برای پاسخگویی به مشاوره استفاده می‌شود.</span>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
