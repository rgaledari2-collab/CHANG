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
  ArrowLeft,
  Instagram,
  ArrowUpRight,
  CreditCard,
  Sparkles,
  CheckCircle,
  FileCheck,
  CalendarCheck,
  Coins
} from 'lucide-react';
import { COURSES_DATA } from '../data';
import { Course } from '../types';
import { PaymentFlowMode } from './PaymentModal';
import { useSiteConfig } from '../config/SiteConfigContext';

interface ContactFormProps {
  selectedCourse?: string;
  onOpenPayment?: (course: Course, mode: PaymentFlowMode) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ selectedCourse, onOpenPayment }) => {
  const config = useSiteConfig();
  const { phone: configPhone, phoneDisplay, workingHours, branches } = config;

  const [activeTab, setActiveTab] = useState<'consultation' | 'registration'>('registration');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState(selectedCourse || '');
  const [studentAge, setStudentAge] = useState('');
  const [preferredBranch, setPreferredBranch] = useState<'khorramshahr' | 'abadan'>('khorramshahr');
  const [message, setMessage] = useState('');
  const [paymentChoice, setPaymentChoice] = useState<'tuition' | 'placement_deposit' | 'none'>('tuition');

  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [formStatus, setFormStatus] = useState<{ success?: boolean; text: string; isPaymentTriggered?: boolean } | null>(null);
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

  const selectedCourseObj = COURSES_DATA.find(c => c.title === course) || COURSES_DATA[0];

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

    // Store lead locally in browser localStorage
    try {
      const storedLeads = JSON.parse(localStorage.getItem('chang_consultation_leads') || '[]');
      storedLeads.push({
        fullName: fullName.trim(),
        phone: normalizedPhone,
        course: course || 'مشاوره و تعیین سطح کلی',
        studentAge,
        preferredBranch,
        type: activeTab,
        paymentChoice,
        message: message.trim(),
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('chang_consultation_leads', JSON.stringify(storedLeads));
    } catch {
      // Ignore localStorage errors
    }

    setTimeout(() => {
      setIsSubmitting(false);

      if (paymentChoice !== 'none' && onOpenPayment) {
        // Direct transition into the ZarinPal Payment Gateway Modal
        setFormStatus({
          success: true,
          text: `اطلاعات هنرجو ${fullName.trim()} با موفقیت ثبت شد. در حال هدایت به درگاه شاپرک جهت ${
            paymentChoice === 'tuition' ? 'پرداخت شهریه دوره' : 'واریز بیعانه رزرو نوبت تعیین سطح'
          }...`,
          isPaymentTriggered: true
        });
        
        setTimeout(() => {
          onOpenPayment(selectedCourseObj, paymentChoice);
        }, 600);
      } else {
        setFormStatus({
          success: true,
          text: `درخواست ${activeTab === 'registration' ? 'رزرو کلاس و پیش‌ثبت‌نام' : 'مشاوره و تعیین سطح'} برای ${fullName.trim()} جهت ${branchName} (${course || 'تعیین سطح کلی'}) با موفقیت ثبت گردید. کارشناسان آموزشگاه به زودی با شما تماس خواهند گرفت.`
        });
      }

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
              <span>پذیرش، رزرو و پرداخت آنلاین شهریه</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#202124] dark:text-white leading-[1.10] tracking-[-0.025em] mb-4 [text-wrap:balance]">
              یک گفت‌وگوی کوتاه، <br />یک شروع درست و مستقیم.
            </h2>
            <p className="text-[16px] text-[#5a626d] dark:text-[#9ca3af] font-normal leading-[1.6] mb-8 [text-wrap:pretty]">
              شما می‌توانید بسته به نیازتان یکی از گزینه‌ها را انتخاب کنید: رزرو نوبت تعیین سطح تخصصی (با بیعانه کسر شونده از شهریه) یا پرداخت مستقیم و قطعی شهریه دوره با درگاه زرین‌پال.
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
                    <a href={`tel:${configPhone}`} className="hover:text-[#B92B3A] dark:hover:text-[#F3C7CA] transition-colors dir-ltr font-mono">
                      {phoneDisplay}
                    </a>
                    <a 
                      href={`tel:${configPhone}`} 
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
                      {branches.khorramshahr.name}
                    </dt>
                    <span className="text-[11px] text-[#8996A6] dark:text-[#9ca3af]">دفتر مرکزی</span>
                  </div>
                  <dd className="text-[14px] sm:text-[15px] font-bold text-[#202124] dark:text-white leading-relaxed mb-2">
                    {branches.khorramshahr.address}
                  </dd>
                  {branches.khorramshahr.instagram && (
                    <a
                      href={branches.khorramshahr.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#B92B3A] dark:text-[#FFB3BA] hover:underline"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                      <span>پیج اینستاگرام شعبه خرمشهر ({branches.khorramshahr.instagramId}@)</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
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
                      {branches.abadan.name}
                    </dt>
                    <span className="text-[11px] text-[#8996A6] dark:text-[#9ca3af]">شعبه فعال</span>
                  </div>
                  <dd className="text-[14px] sm:text-[15px] font-bold text-[#202124] dark:text-white leading-relaxed mb-2">
                    {branches.abadan.address}
                  </dd>
                  {branches.abadan.instagram && (
                    <a
                      href={branches.abadan.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#B92B3A] dark:text-[#FFB3BA] hover:underline"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                      <span>پیج اینستاگرام شعبه آبادان ({branches.abadan.instagramId}@)</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Working Hours */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#171A21] border border-[#E8DFE0] dark:border-white/10 shadow-xs flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#F3C7CA]/40 dark:bg-[#B92B3A]/20 border border-[#E8DFE0] dark:border-white/10 text-[#B92B3A] dark:text-[#F3C7CA] flex items-center justify-center shrink-0 shadow-xs">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <dt className="text-[12px] text-[#8996A6] dark:text-[#9ca3af] font-medium mb-0.5">ساعات فعالیت و پذیرش</dt>
                  <dd className="text-[14px] font-bold text-[#202124] dark:text-white">
                    {workingHours}
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-7 bg-white dark:bg-[#171A21] border border-[#E8DFE0] dark:border-white/10 rounded-[24px] p-5 sm:p-8 lg:p-10 shadow-sm transition-colors">
            
            {/* Header Mode Switcher (Level Assessment vs Direct Class Registration) */}
            <div className="mb-6 p-1.5 bg-[#FAF0F1] dark:bg-white/5 rounded-2xl flex items-center gap-1 border border-[#E8DFE0] dark:border-white/10">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('registration');
                  setPaymentChoice('tuition');
                }}
                className={`flex-1 py-3 px-3 rounded-xl text-[13px] sm:text-[14px] font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'registration'
                    ? 'bg-[#B92B3A] text-white shadow-sm'
                    : 'text-[#5a626d] dark:text-[#9ca3af] hover:text-[#202124]'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>ثبت‌نام دوره و شهریه</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('consultation');
                  setPaymentChoice('placement_deposit');
                }}
                className={`flex-1 py-3 px-3 rounded-xl text-[13px] sm:text-[14px] font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'consultation'
                    ? 'bg-[#19407e] text-white shadow-sm'
                    : 'text-[#5a626d] dark:text-[#9ca3af] hover:text-[#202124]'
                }`}
              >
                <CalendarCheck className="w-4 h-4" />
                <span>رزرو تعیین سطح و بیعانه</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5 text-right">
              
              {/* Branch Selection Tabs */}
              <div>
                <label className="block text-[14px] font-bold text-[#202124] dark:text-white mb-2">
                  انتخاب شعبه مورد نظر برای هماهنگی و کلاس <span className="text-[#B92B3A]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3" role="radiogroup" aria-label="انتخاب شعبه">
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
                  نام و نام‌خانوادگی هنرجو <span className="text-[#B92B3A]">*</span>
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
                    ساز یا دوره مورد نظر
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
                          {c.title} (شهریه: {(c.tuitionFee || 1650000).toLocaleString('fa-IR')} تومان)
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

              {/* Dynamic Payment Option Box */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1D24] border border-[#E8DFE0] dark:border-white/10 space-y-2.5">
                <label className="block text-[13px] font-bold text-[#202124] dark:text-white">
                  شیوه ثبت درخواست و پرداخت در شاپرک:
                </label>
                
                <div className="space-y-2">
                  <label 
                    onClick={() => setPaymentChoice('tuition')}
                    className={`cursor-pointer p-3 rounded-xl border flex items-center justify-between transition-all ${
                      paymentChoice === 'tuition'
                        ? 'border-[#B92B3A] bg-[#FAF0F1] dark:bg-[#200A13] ring-1 ring-[#B92B3A]'
                        : 'border-[#E8DFE0] dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        paymentChoice === 'tuition' ? 'border-[#B92B3A]' : 'border-gray-400'
                      }`}>
                        {paymentChoice === 'tuition' && <div className="w-2 h-2 rounded-full bg-[#B92B3A]" />}
                      </div>
                      <div>
                        <span className="text-[13px] font-bold text-[#202124] dark:text-white block">
                          پرداخت مستقیم شهریه دوره (ثبت‌نام قطعی)
                        </span>
                        <span className="text-[11px] text-[#8996A6]">شهریه مصوب ترم ۸ جلسه‌ای</span>
                      </div>
                    </div>
                    <span className="font-bold text-[14px] text-[#B92B3A] dark:text-[#FFB3BA]">
                      {(selectedCourseObj.tuitionFee || 1650000).toLocaleString('fa-IR')} تومان
                    </span>
                  </label>

                  <label 
                    onClick={() => setPaymentChoice('placement_deposit')}
                    className={`cursor-pointer p-3 rounded-xl border flex items-center justify-between transition-all ${
                      paymentChoice === 'placement_deposit'
                        ? 'border-[#19407e] bg-blue-50/50 dark:bg-blue-950/20 ring-1 ring-[#19407e]'
                        : 'border-[#E8DFE0] dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        paymentChoice === 'placement_deposit' ? 'border-[#19407e]' : 'border-gray-400'
                      }`}>
                        {paymentChoice === 'placement_deposit' && <div className="w-2 h-2 rounded-full bg-[#19407e]" />}
                      </div>
                      <div>
                        <span className="text-[13px] font-bold text-[#202124] dark:text-white block">
                          بیعانه رزرو نوبت تعیین سطح تخصصی
                        </span>
                        <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                          کسر کامل از شهریه پس از ثبت‌نام
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-[14px] text-[#19407e] dark:text-sky-300">
                      ۱۵۰,۰۰۰ تومان
                    </span>
                  </label>

                  <label 
                    onClick={() => setPaymentChoice('none')}
                    className={`cursor-pointer p-2.5 rounded-xl border flex items-center gap-2.5 transition-all ${
                      paymentChoice === 'none'
                        ? 'border-gray-500 bg-gray-100 dark:bg-white/10'
                        : 'border-[#E8DFE0] dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      paymentChoice === 'none' ? 'border-gray-700' : 'border-gray-400'
                    }`}>
                      {paymentChoice === 'none' && <div className="w-2 h-2 rounded-full bg-gray-700 dark:bg-white" />}
                    </div>
                    <span className="text-[12px] text-[#5a626d] dark:text-[#9ca3af]">
                      فقط تماس تلفنی و هماهنگی حضوری (بدون پرداخت آنلاین در این مرحله)
                    </span>
                  </label>
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
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="تجربه قبلی موسیقی، زمان ترجیحی تماس یا کلاس و..."
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
                className={`w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-full text-[16px] font-bold tracking-[-0.01em] text-white transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer ${
                  paymentChoice === 'placement_deposit'
                    ? 'bg-[#19407e] hover:bg-[#12284c]'
                    : 'bg-[#B92B3A] hover:bg-[#A52432]'
                }`}
              >
                {isSubmitting ? (
                  <span>در حال پردازش و ثبت...</span>
                ) : paymentChoice !== 'none' ? (
                  <>
                    <span>
                      {paymentChoice === 'tuition' 
                        ? 'انتقال به درگاه زرین‌پال و پرداخت شهریه' 
                        : 'واریز بیعانه ۱۵۰,۰۰۰ تومانی تعیین سطح در شاپرک'}
                    </span>
                    <ArrowLeft className="w-4 h-4" />
                  </>
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
