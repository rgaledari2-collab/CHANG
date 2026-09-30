import React, { useState } from 'react';
import { 
  CreditCard, 
  ShieldCheck, 
  X, 
  CheckCircle, 
  AlertCircle, 
  ArrowLeft, 
  Lock, 
  ExternalLink, 
  Receipt, 
  Sparkles, 
  Smartphone, 
  Calendar, 
  Building, 
  Key, 
  Printer, 
  Download, 
  Share2,
  CalendarCheck,
  GraduationCap,
  Clock,
  UserCheck
} from 'lucide-react';
import { Course } from '../types';
import { ZarinPalGatewaySimulator } from './ZarinPalGatewaySimulator';
import { ConfettiCelebration } from './ConfettiCelebration';

export type PaymentFlowMode = 'tuition' | 'placement_deposit';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
  mode?: PaymentFlowMode; // 'tuition' for full term payment vs 'placement_deposit' for assessment booking
  onSuccess: (receipt: PaymentReceipt) => void;
}

export interface PaymentReceipt {
  refId: string;
  trackingCode: string;
  cardPan?: string;
  courseTitle: string;
  amount: number;
  date: string;
  studentName: string;
  phone: string;
  gateway: 'zarinpal' | 'zibal' | 'shaparak';
  flowType: 'tuition' | 'placement_deposit';
  branch?: string;
  preferredTime?: string;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  course,
  mode = 'tuition',
  onSuccess
}) => {
  const [currentMode, setCurrentMode] = useState<PaymentFlowMode>(mode);
  const [step, setStep] = useState<'info' | 'gateway' | 'result'>('info');
  const [studentName, setStudentName] = useState('');
  const [phone, setPhone] = useState('');
  const [branch, setBranch] = useState<'خرمشهر' | 'آبادان'>('خرمشهر');
  const [preferredDate, setPreferredDate] = useState('عصر (۱۷:۰۰ تا ۲۱:۰۰)');
  const [selectedGateway, setSelectedGateway] = useState<'zarinpal' | 'zibal'>('zarinpal');
  const [merchantCode, setMerchantCode] = useState('');
  const [showConfig, setShowConfig] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<PaymentReceipt | null>(null);

  // Sync mode prop if it changes
  React.useEffect(() => {
    setCurrentMode(mode);
  }, [mode]);

  if (!isOpen) return null;

  // Calculation of amount:
  // 1. Tuition: Full term fee (e.g., 1,650,000 to 1,850,000 Tomans for 8 sessions)
  // 2. Placement Deposit (بیعانه رزرو نوبت تعیین سطح تخصصی): 150,000 Tomans (کسر از شهریه پس از ثبت‌نام قطعی)
  const fullTuition = course?.tuitionFee || 1650000;
  const placementDepositFee = 150000;
  const payableAmount = currentMode === 'tuition' ? fullTuition : placementDepositFee;
  const sessions = course?.sessionCount || 8;
  const targetTitle = course?.title || 'مشاوره و تعیین سطح تخصصی موسیقی';

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || studentName.trim().length < 3) {
      setError('لطفاً نام و نام خانوادگی هنرجو را وارد نمایید.');
      return;
    }
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (!cleanPhone.startsWith('09') || cleanPhone.length !== 11) {
      setError('شماره موبایل وارد شده باید ۱۱ رقمی باشد (مانند ۰۹۳۵۹۳۵۲۷۳۸)');
      return;
    }

    setError(null);
    setStep('gateway');
  };

  const handleGatewaySuccess = (details: { refId: string; cardPan: string; trackingCode: string }) => {
    const generatedReceipt: PaymentReceipt = {
      refId: details.refId,
      trackingCode: details.trackingCode,
      cardPan: details.cardPan,
      courseTitle: targetTitle,
      amount: payableAmount,
      date: new Intl.DateTimeFormat('fa-IR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date()),
      studentName: studentName.trim(),
      phone: phone.trim(),
      gateway: selectedGateway,
      flowType: currentMode,
      branch: branch,
      preferredTime: currentMode === 'placement_deposit' ? preferredDate : undefined
    };

    // Save to localStorage for school accounting records
    try {
      const storageKey = currentMode === 'tuition' ? 'chang_tuition_payments' : 'chang_placement_bookings';
      const records = JSON.parse(localStorage.getItem(storageKey) || '[]');
      records.push(generatedReceipt);
      localStorage.setItem(storageKey, JSON.stringify(records));
    } catch {
      // ignore storage error
    }

    setReceipt(generatedReceipt);
    setStep('result');
    onSuccess(generatedReceipt);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className={`relative bg-[#FCF8F8] dark:bg-[#150D11] text-[#202124] dark:text-white rounded-[24px] border border-[#E8DFE0] dark:border-white/10 shadow-2xl w-full overflow-hidden flex flex-col transition-all ${
        step === 'gateway' ? 'max-w-2xl' : 'max-w-xl'
      }`}>

        {/* Confetti celebration shown upon payment success */}
        {step === 'result' && <ConfettiCelebration />}

        {/* Header - shown during info and result */}
        {step !== 'gateway' && (
          <div className="p-5 sm:p-6 bg-[#FAF0F1] dark:bg-[#200A13] border-b border-[#E8DFE0] dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-xl text-white flex items-center justify-center shadow-sm ${
                currentMode === 'tuition' ? 'bg-[#B92B3A]' : 'bg-[#19407e]'
              }`}>
                {currentMode === 'tuition' ? <GraduationCap className="w-5 h-5" /> : <CalendarCheck className="w-5 h-5" />}
              </div>
              <div className="text-right">
                <h3 className="text-[17px] sm:text-[19px] font-bold text-[#202124] dark:text-white flex items-center gap-1.5">
                  <span>{currentMode === 'tuition' ? 'پرداخت قطعی شهریه ترم' : 'رزرو نوبت تعیین سطح حضوری و بیعانه'}</span>
                </h3>
                <p className="text-[12px] sm:text-[13px] text-[#B92B3A] dark:text-[#FFB3BA] font-semibold">
                  {targetTitle} {currentMode === 'tuition' ? `· دوره ${sessions} جلسه‌ای` : '· شعبه خرمشهر و آبادان'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white dark:bg-white/10 hover:bg-[#FAF0F1] border border-[#E8DFE0] dark:border-white/10 flex items-center justify-center text-[#202124] dark:text-white transition-colors"
              aria-label="بستن"
            >
              <X className="w-4 h-4 text-[#B92B3A] dark:text-[#FFB3BA]" />
            </button>
          </div>
        )}

        {/* Mode Selector Pill - inside modal info step to easily toggle */}
        {step === 'info' && (
          <div className="px-6 pt-5 pb-1 bg-white/50 dark:bg-black/20 border-b border-[#E8DFE0] dark:border-white/5">
            <div className="grid grid-cols-2 p-1 bg-[#FAF0F1] dark:bg-white/5 rounded-2xl border border-[#E8DFE0] dark:border-white/10 text-[12px] sm:text-[13px] font-bold">
              <button
                type="button"
                onClick={() => setCurrentMode('tuition')}
                className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  currentMode === 'tuition'
                    ? 'bg-[#B92B3A] text-white shadow-sm'
                    : 'text-[#5a626d] dark:text-[#9ca3af] hover:text-[#202124]'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>پرداخت کامل شهریه ترم</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentMode('placement_deposit')}
                className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  currentMode === 'placement_deposit'
                    ? 'bg-[#19407e] text-white shadow-sm'
                    : 'text-[#5a626d] dark:text-[#9ca3af] hover:text-[#202124]'
                }`}
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>بیعانه رزرو تعیین سطح</span>
              </button>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className={`overflow-y-auto max-h-[80vh] text-right ${step === 'gateway' ? 'p-0' : 'p-6'}`}>
          {step === 'info' && (
            <form onSubmit={handleStartPayment} className="space-y-4">
              
              {/* Fee summary card - dynamic based on flow */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#1B1D24] border border-[#E8DFE0] dark:border-white/10 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[12px] text-[#8996A6] block">
                    {currentMode === 'tuition' ? 'مبلغ شهریه دوره انتخابی:' : 'مبلغ بیعانه تثبیت وقت ارزیابی:'}
                  </span>
                  <span className="text-[22px] font-black text-[#B92B3A] dark:text-[#FFB3BA]">
                    {payableAmount.toLocaleString('fa-IR')}
                  </span>
                  <span className="text-[13px] text-[#5a626d] dark:text-[#9ca3af] mr-1.5">تومان</span>
                </div>

                <div className="text-left text-[11px] sm:text-[12px] leading-snug">
                  {currentMode === 'tuition' ? (
                    <span className="inline-block bg-[#FAF0F1] dark:bg-[#B92B3A]/20 px-3 py-1.5 rounded-xl border border-[#B92B3A]/20 font-bold text-[#B92B3A] dark:text-[#FFB3BA]">
                      دوره {sessions} جلسه‌ای · ثبت‌نام نهایی
                    </span>
                  ) : (
                    <span className="inline-block bg-blue-50 dark:bg-blue-950/40 text-[#19407e] dark:text-sky-300 px-3 py-1.5 rounded-xl border border-blue-200 dark:border-blue-900/40 font-bold">
                      کسر کامل از شهریه پس از ثبت‌نام
                    </span>
                  )}
                </div>
              </div>

              {/* Explanatory banner */}
              {currentMode === 'placement_deposit' ? (
                <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/30 text-[12px] text-blue-900 dark:text-blue-200 flex items-start gap-2 leading-relaxed">
                  <UserCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <p>
                    این مبلغ جهت <strong>رزرو قطعی وقت استاد و اتاق آزمون تعیین سطح</strong> است و در صورت ثبت‌نام در دوره‌های آموزشی چنگ، تماماً از مبلغ شهریه شما کسر می‌گردد.
                  </p>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/30 text-[12px] text-emerald-900 dark:text-emerald-200 flex items-start gap-2 leading-relaxed">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p>
                    ثبت‌نام رسمی و قطعی در دپارتمان {targetTitle}. بلافاصله پس از پرداخت رسید صادر شده و کارشناس آموزش هماهنگی جلسات را با شما انجام می‌دهد.
                  </p>
                </div>
              )}

              {/* Specific inputs for Placement vs Tuition */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[13px] font-bold text-[#202124] dark:text-[#CBD5E1] mb-1.5">
                    شعبه مورد نظر برای کلاس یا تعیین سطح *
                  </label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value as 'خرمشهر' | 'آبادان')}
                    className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#12141A] border border-[#E8DFE0] dark:border-white/10 text-[13px] text-[#202124] dark:text-white focus:outline-none focus:border-[#B92B3A]"
                  >
                    <option value="خرمشهر">شعبه خرمشهر (میدان فرمانداری)</option>
                    <option value="آبادان">شعبه آبادان (سه‌راه شاملو)</option>
                  </select>
                </div>

                {currentMode === 'placement_deposit' && (
                  <div>
                    <label className="block text-[13px] font-bold text-[#202124] dark:text-[#CBD5E1] mb-1.5 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#19407e]" />
                      <span>بازه زمانی ترجیحی حضور</span>
                    </label>
                    <select
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#12141A] border border-[#E8DFE0] dark:border-white/10 text-[13px] text-[#202124] dark:text-white focus:outline-none focus:border-[#19407e]"
                    >
                      <option value="عصر (۱۷:۰۰ تا ۲۱:۰۰)">شیفت عصر (۱۷:۰۰ تا ۲۱:۰۰)</option>
                      <option value="صبح (۱۰:۰۰ تا ۱۳:۰۰)">شیفت صبح (۱۰:۰۰ تا ۱۳:۰۰)</option>
                      <option value="پنج‌شنبه‌ها">روزهای پنج‌شنبه</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Form Fields: Name & Phone */}
              <div>
                <label className="block text-[13px] font-bold text-[#202124] dark:text-[#CBD5E1] mb-1.5">
                  نام و نام خانوادگی هنرجو *
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="مثال: پارسا ناصری"
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#12141A] border border-[#E8DFE0] dark:border-white/10 text-[14px] text-[#202124] dark:text-white focus:outline-none focus:border-[#B92B3A] focus:ring-2 focus:ring-[#B92B3A]/20"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#202124] dark:text-[#CBD5E1] mb-1.5">
                  شماره موبایل جهت ارسال پیامک تایید و رسید *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="۰۹۳۵۹۳۵۲۷۳۸"
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#12141A] border border-[#E8DFE0] dark:border-white/10 text-[14px] text-[#202124] dark:text-white focus:outline-none focus:border-[#B92B3A] focus:ring-2 focus:ring-[#B92B3A]/20 dir-ltr text-right font-mono"
                />
              </div>

              {/* Gateway selector */}
              <div>
                <label className="block text-[13px] font-bold text-[#202124] dark:text-[#CBD5E1] mb-2">
                  درگاه پرداخت الکترونیک شاپرک:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label 
                    onClick={() => setSelectedGateway('zarinpal')}
                    className={`cursor-pointer p-3 rounded-xl border flex items-center justify-between transition-all ${
                      selectedGateway === 'zarinpal'
                        ? 'border-[#F39200] bg-amber-500/10 ring-2 ring-[#F39200]/30'
                        : 'border-[#E8DFE0] dark:border-white/10 bg-white dark:bg-[#171A21]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border border-[#F39200] flex items-center justify-center">
                        {selectedGateway === 'zarinpal' && <div className="w-2 h-2 rounded-full bg-[#F39200]" />}
                      </div>
                      <span className="text-[13px] font-bold text-[#202124] dark:text-white">زرین‌پال شاپرک</span>
                    </div>
                    <span className="text-[11px] text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded font-mono font-bold">ZarinPal</span>
                  </label>

                  <label 
                    onClick={() => setSelectedGateway('zibal')}
                    className={`cursor-pointer p-3 rounded-xl border flex items-center justify-between transition-all ${
                      selectedGateway === 'zibal'
                        ? 'border-[#B92B3A] bg-[#FAF0F1] dark:bg-[#200A13] ring-2 ring-[#B92B3A]/30'
                        : 'border-[#E8DFE0] dark:border-white/10 bg-white dark:bg-[#171A21]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border border-[#B92B3A] flex items-center justify-center">
                        {selectedGateway === 'zibal' && <div className="w-2 h-2 rounded-full bg-[#B92B3A]" />}
                      </div>
                      <span className="text-[13px] font-bold text-[#202124] dark:text-white">زیبال / سداد</span>
                    </div>
                    <span className="text-[11px] text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded font-mono">Zibal</span>
                  </label>
                </div>
              </div>

              {/* Optional merchant config */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowConfig(!showConfig)}
                  className="text-[11px] text-[#8996A6] hover:text-[#B92B3A] flex items-center gap-1 transition-colors"
                >
                  <Key className="w-3 h-3" />
                  <span>تنظیم مرچنت‌کد درگاه آموزشگاه (اختیاری)</span>
                </button>
                {showConfig && (
                  <div className="mt-2 p-3 bg-white dark:bg-[#171A21] rounded-xl border border-[#E8DFE0] dark:border-white/10 text-[12px]">
                    <input
                      type="text"
                      value={merchantCode}
                      onChange={(e) => setMerchantCode(e.target.value)}
                      placeholder="e.g. 71839201-4920-4102-9901"
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E8DFE0] dark:border-white/10 bg-[#FCF8F8] dark:bg-[#101217] font-mono text-[12px] dir-ltr text-right"
                    />
                  </div>
                )}
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 text-red-700 dark:text-red-300 text-[13px] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                className={`w-full py-3.5 px-6 rounded-full active:scale-98 text-white text-[15px] font-bold shadow-md transition-all flex items-center justify-center gap-2 mt-4 ${
                  currentMode === 'tuition' 
                    ? 'bg-[#B92B3A] hover:bg-[#A52432]' 
                    : 'bg-[#19407e] hover:bg-[#133263]'
                }`}
              >
                <span>انتقال به درگاه اینترنتی زرین‌پال شاپرک</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 'gateway' && (
            <ZarinPalGatewaySimulator
              amount={payableAmount}
              courseTitle={currentMode === 'tuition' ? targetTitle : `بیعانه نوبت تعیین سطح (${targetTitle})`}
              studentName={studentName}
              phone={phone}
              onSuccess={handleGatewaySuccess}
              onCancel={() => setStep('info')}
            />
          )}

          {step === 'result' && receipt && (
            <div className="space-y-5 text-center py-2 relative z-10 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-inner ring-4 ring-emerald-500/20 animate-bounce">
                <CheckCircle className="w-9 h-9" />
              </div>

              <div>
                <h4 className="text-[20px] font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                  {receipt.flowType === 'tuition' ? 'پرداخت شهریه با موفقیت انجام شد' : 'رزرو نوبت تعیین سطح قطعی شد'}
                </h4>
                <p className="text-[13px] text-[#5a626d] dark:text-[#9ca3af]">
                  رسید دیجیتال ثبت‌نام در سیستم مالی آموزشگاه چنگ صادر گردید.
                </p>
              </div>

              {/* Digital Official Receipt Card with distinction */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#171A21] border border-[#E8DFE0] dark:border-white/10 text-right space-y-3 text-[13px] shadow-sm relative overflow-hidden">
                <div className="absolute left-3 top-3 opacity-10 font-black text-6xl text-[#19407e] select-none pointer-events-none">
                  ZARIN
                </div>

                <div className="flex justify-between items-center border-b border-[#E8DFE0] dark:border-white/10 pb-2.5">
                  <span className="text-[#8996A6]">نوع تراکنش:</span>
                  <span className="font-bold text-[#202124] dark:text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>
                      {receipt.flowType === 'tuition' ? 'پرداخت کامل شهریه ترم' : 'بیعانه رزرو نوبت تعیین سطح (کسر از شهریه)'}
                    </span>
                  </span>
                </div>

                <div className="flex justify-between items-center border-b border-[#E8DFE0] dark:border-white/10 pb-2.5">
                  <span className="text-[#8996A6]">عنوان دوره / ارزیابی:</span>
                  <span className="font-bold text-[#B92B3A] dark:text-[#FFB3BA]">{receipt.courseTitle}</span>
                </div>

                <div className="flex justify-between items-center border-b border-[#E8DFE0] dark:border-white/10 pb-2.5">
                  <span className="text-[#8996A6]">شماره پیگیری تراکنش (RRN):</span>
                  <span className="font-mono font-bold text-[#202124] dark:text-white tracking-wider">{receipt.trackingCode}</span>
                </div>

                <div className="flex justify-between items-center border-b border-[#E8DFE0] dark:border-white/10 pb-2.5">
                  <span className="text-[#8996A6]">شناسه مرجع زرین‌پال (RefId):</span>
                  <span className="font-mono font-bold text-[#19407e] dark:text-sky-300 tracking-wider">{receipt.refId}</span>
                </div>

                {receipt.branch && (
                  <div className="flex justify-between items-center border-b border-[#E8DFE0] dark:border-white/10 pb-2.5">
                    <span className="text-[#8996A6]">شعبه آموزشگاه:</span>
                    <span className="font-bold text-[#202124] dark:text-white">شعبه {receipt.branch}</span>
                  </div>
                )}

                {receipt.preferredTime && (
                  <div className="flex justify-between items-center border-b border-[#E8DFE0] dark:border-white/10 pb-2.5">
                    <span className="text-[#8996A6]">زمان هماهنگ‌شده:</span>
                    <span className="text-[#202124] dark:text-white">{receipt.preferredTime}</span>
                  </div>
                )}

                <div className="flex justify-between items-center border-b border-[#E8DFE0] dark:border-white/10 pb-2.5">
                  <span className="text-[#8996A6]">نام هنرجو:</span>
                  <span className="font-bold text-[#202124] dark:text-white">{receipt.studentName} ({receipt.phone})</span>
                </div>

                <div className="flex justify-between items-center border-b border-[#E8DFE0] dark:border-white/10 pb-2.5">
                  <span className="text-[#8996A6]">مبلغ پرداخت شده:</span>
                  <span className="font-extrabold text-[16px] text-[#B92B3A] dark:text-[#FFB3BA]">
                    {receipt.amount.toLocaleString('fa-IR')} تومان
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#8996A6]">زمان دقیق ثبت تراکنش:</span>
                  <span className="text-[#202124] dark:text-white font-mono">{receipt.date}</span>
                </div>
              </div>

              {/* Action Buttons: Print Receipt + Go to Classroom */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePrintReceipt}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 text-[13px] font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>چاپ / ذخیره رسید دیجیتال</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="py-2.5 px-5 rounded-full bg-[#B92B3A] text-white font-bold text-[13px] hover:bg-[#A52432] active:scale-95 transition-all shadow-sm"
                  >
                    تایید و بستن
                  </button>

                  <a
                    href="#online-class"
                    onClick={onClose}
                    className="py-2.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[13px] transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>ورود به کلاس آنلاین</span>
                  </a>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
