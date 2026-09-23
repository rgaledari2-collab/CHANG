import React, { useState, useEffect, useRef } from 'react';
import { Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
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
    <section id="contact" className="py-20 lg:py-24 bg-[#FCF8F8] border-b border-[#E8DFE0]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Contact Copy & Info */}
          <div className="lg:col-span-5 text-right">
            <div className="inline-flex items-center gap-2 text-[13px] font-bold text-[#B92B3A] mb-2 tracking-tight">
              <span className="font-mono text-[14px]">۰۵</span>
              <span>/</span>
              <span>مشاوره و تعیین سطح تخصصی</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#202124] leading-[1.10] tracking-[-0.025em] mb-4 [text-wrap:balance]">
              یک گفت‌وگوی کوتاه، <br />یک شروع درست.
            </h2>
            <p className="text-[17px] text-[#5a626d] font-normal leading-[1.5] mb-8 [text-wrap:pretty]">
              برای انتخاب سازی که با علایق، فیزیک دست، سن و روحیات شما یا فرزندتان کاملاً هماهنگ باشد، مشاوره تخصصی و رایگان دریافت کنید.
            </p>

            <dl className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-[11px] bg-[#F3C7CA]/40 border border-[#E8DFE0] text-[#B92B3A] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Phone className="w-5 h-5 text-[#B92B3A]" />
                </div>
                <div>
                  <dt className="text-[13px] text-[#8996A6] font-medium">تلفن مستقیم آموزشگاه</dt>
                  <dd className="text-[18px] font-bold text-[#202124]">
                    <a href="tel:06153522000" className="hover:text-[#B92B3A] transition-colors dir-ltr inline-block">
                      ۰۶۱-۵۳۵۲۲۰۰۰
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-[11px] bg-[#F3C7CA]/40 border border-[#E8DFE0] text-[#B92B3A] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5 text-[#B92B3A]" />
                </div>
                <div>
                  <dt className="text-[13px] text-[#8996A6] font-medium">نشانی حضوری</dt>
                  <dd className="text-[16px] font-bold text-[#202124]">
                    خوزستان، خرمشهر، بلوار ساحلی، نبش خیابان فردوسی
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-[11px] bg-[#F3C7CA]/40 border border-[#E8DFE0] text-[#B92B3A] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Clock className="w-5 h-5 text-[#B92B3A]" />
                </div>
                <div>
                  <dt className="text-[13px] text-[#8996A6] font-medium">ساعات پذیرش و پاسخگویی</dt>
                  <dd className="text-[16px] font-bold text-[#202124]">
                    شنبه تا پنج‌شنبه: ۹:۰۰ تا ۱۳:۰۰ و ۱۶:۰۰ تا ۲۱:۰۰
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          {/* Form Card: White on Pale Pink-White Base */}
          <div className="lg:col-span-7 bg-white border border-[#E8DFE0] rounded-[18px] p-6 sm:p-10 shadow-sm">
            <form onSubmit={handleSubmit} noValidate className="space-y-5 text-right">
              
              {/* Full Name */}
              <div>
                <label htmlFor="full-name" className="block text-[14px] font-bold text-[#202124] mb-1.5">
                  نام و نام‌خانوادگی <span className="text-[#B92B3A]">*</span>
                </label>
                <input
                  ref={nameInputRef}
                  id="full-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="مثلاً: مریم احمدی"
                  className={`w-full px-4 py-3 rounded-[11px] bg-[#FCF8F8] border text-[16px] text-[#202124] transition-all focus:outline-none focus:ring-2 ${
                    nameError 
                      ? 'border-red-500 focus:ring-red-500/20' 
                      : 'border-[#E8DFE0] focus:border-[#B92B3A] focus:ring-[#B92B3A]/20'
                  }`}
                  required
                />
                {nameError && (
                  <p className="mt-1.5 text-[13px] text-red-600 flex items-center gap-1 font-medium" aria-live="polite">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{nameError}</span>
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-[14px] font-bold text-[#202124] mb-1.5">
                  شماره موبایل برای هماهنگی <span className="text-[#B92B3A]">*</span>
                </label>
                <input
                  ref={phoneInputRef}
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
                  className={`w-full px-4 py-3 rounded-[11px] bg-[#FCF8F8] border text-[16px] text-[#202124] transition-all focus:outline-none focus:ring-2 ${
                    phoneError 
                      ? 'border-red-500 focus:ring-red-500/20' 
                      : 'border-[#E8DFE0] focus:border-[#B92B3A] focus:ring-[#B92B3A]/20'
                  }`}
                  required
                />
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
                  <label htmlFor="course-select" className="block text-[14px] font-bold text-[#202124] mb-1.5">
                    ساز یا دوره مورد علاقه
                  </label>
                  <select
                    id="course-select"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full px-4 py-3 rounded-[11px] bg-[#FCF8F8] border border-[#E8DFE0] text-[15px] text-[#202124] focus:outline-none focus:border-[#B92B3A] focus:ring-2 focus:ring-[#B92B3A]/20"
                  >
                    <option value="">هنوز تصمیم نگرفته‌ام (مشاوره کلی)</option>
                    {COURSES_DATA.map((c) => (
                      <option key={c.id} value={c.title}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="student-age" className="block text-[14px] font-bold text-[#202124] mb-1.5">
                    سن هنرجو (سال)
                  </label>
                  <input
                    id="student-age"
                    type="number"
                    min="3"
                    max="99"
                    value={studentAge}
                    onChange={(e) => setStudentAge(e.target.value)}
                    placeholder="مثلاً: ۱۲"
                    className="w-full px-4 py-3 rounded-[11px] bg-[#FCF8F8] border border-[#E8DFE0] text-[15px] text-[#202124] focus:outline-none focus:border-[#B92B3A] focus:ring-2 focus:ring-[#B92B3A]/20"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="user-message" className="block text-[14px] font-bold text-[#202124] mb-1.5">
                  پرسش یا توضیحات تکمیلی (اختیاری)
                </label>
                <textarea
                  id="user-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="تجربه قبلی موسیقی، زمان ترجیحی تماس و..."
                  className="w-full px-4 py-3 rounded-[11px] bg-[#FCF8F8] border border-[#E8DFE0] text-[15px] text-[#202124] focus:outline-none focus:border-[#B92B3A] focus:ring-2 focus:ring-[#B92B3A]/20 resize-y"
                />
              </div>

              {/* Submit Button in Lacquer Red */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-[13px] px-[22px] rounded-full bg-[#B92B3A] hover:bg-[#A52432] active:scale-95 text-white font-bold text-[17px] flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B92B3A] shadow-md"
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
                  className="p-4 rounded-[11px] text-[14px] font-medium flex items-start gap-2.5 bg-[#F3C7CA]/30 border border-[#B92B3A]/30 text-[#202124]"
                  aria-live="polite"
                >
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#B92B3A]" />
                  <p className="leading-relaxed">{formStatus.text}</p>
                </div>
              )}

              <p className="text-[12px] text-center text-[#8996A6]">
                اطلاعات شما نزد آموزشگاه چنگ محفوظ است و صرفاً برای پاسخگویی به مشاوره استفاده می‌شود.
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
