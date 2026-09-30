import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  ArrowLeft, 
  X, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  RefreshCw,
  Eye,
  EyeOff,
  HelpCircle,
  FileCheck
} from 'lucide-react';

interface ZarinPalGatewaySimulatorProps {
  amount: number;
  courseTitle: string;
  studentName: string;
  phone: string;
  onSuccess: (details: { refId: string; cardPan: string; trackingCode: string }) => void;
  onCancel: () => void;
}

export const ZarinPalGatewaySimulator: React.FC<ZarinPalGatewaySimulatorProps> = ({
  amount,
  courseTitle,
  studentName,
  phone,
  onSuccess,
  onCancel
}) => {
  // Card Inputs
  const [cardNumber, setCardNumber] = useState('');
  const [cvv2, setCvv2] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [pin2, setPin2] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('74281');
  const [saveCard, setSaveCard] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [isRequestingOtp, setIsRequestingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(120);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [remainingTime, setRemainingTime] = useState(600); // 10 minutes session

  // 10 minutes session countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onCancel();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onCancel]);

  // Dynamic OTP timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpSent && otpTimer > 0) {
      timer = setInterval(() => setOtpTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [otpSent, otpTimer]);

  const generateCaptcha = () => {
    const rand = Math.floor(10000 + Math.random() * 90000).toString();
    setCaptchaCode(rand);
    setCaptchaInput('');
  };

  // Format Card Number (4 digits grouped)
  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const parts = raw.match(/.{1,4}/g);
    setCardNumber(parts ? parts.join(' - ') : raw);
  };

  const handleRequestOtp = () => {
    if (cardNumber.replace(/\D/g, '').length < 16) {
      setErrorMsg('ابتدا شماره کارت ۱۶ رقمی را به صورت کامل وارد کنید.');
      return;
    }
    setIsRequestingOtp(true);
    setErrorMsg(null);
    setTimeout(() => {
      setIsRequestingOtp(false);
      setOtpSent(true);
      setOtpTimer(120);
      setPin2('492815'); // Auto-fill demo OTP for convenience
    }, 900);
  };

  const fillQuickDemoCard = () => {
    setCardNumber('6037 - 9919 - 8452 - 1928');
    setCvv2('384');
    setExpMonth('08');
    setExpYear('06');
    setPin2('492815');
    setCaptchaInput(captchaCode);
    setErrorMsg(null);
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCard = cardNumber.replace(/\D/g, '');
    
    if (cleanCard.length !== 16) {
      setErrorMsg('شماره کارت بانکی نامعتبر است (باید ۱۶ رقم باشد).');
      return;
    }
    if (cvv2.length < 3) {
      setErrorMsg('کد CVV2 را وارد نمایید (۳ یا ۴ رقم).');
      return;
    }
    if (!expMonth || !expYear) {
      setErrorMsg('تاریخ انقضای کارت (ماه و سال) را وارد نمایید.');
      return;
    }
    if (!pin2 || pin2.length < 5) {
      setErrorMsg('رمز پویا / دوم اینترنتی نامعتبر است.');
      return;
    }
    if (captchaInput !== captchaCode) {
      setErrorMsg('کد امنیتی تصویر به درستی وارد نشده است.');
      generateCaptcha();
      return;
    }

    setErrorMsg(null);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const maskedCard = `${cleanCard.slice(0, 4)}***${cleanCard.slice(12)}`;
      const refId = 'ZP-' + Math.floor(100000000 + Math.random() * 900000000).toString();
      const trackingCode = 'TRK-' + Math.floor(100000 + Math.random() * 900000).toString();
      
      onSuccess({
        refId,
        cardPan: maskedCard,
        trackingCode
      });
    }, 1500);
  };

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <div className="bg-[#F8F9FA] text-[#212529] rounded-[24px] border border-[#DEE2E6] shadow-2xl overflow-hidden font-sans text-right select-none animate-fade-in">
      
      {/* Shaparak & ZarinPal Official Header Bar */}
      <div className="bg-gradient-to-l from-[#19407e] to-[#12284c] text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 border-b-4 border-[#F39200]">
        <div className="flex items-center gap-3">
          {/* ZarinPal Official Yellow Badge */}
          <div className="w-10 h-10 rounded-xl bg-[#F39200] text-white font-extrabold flex items-center justify-center text-[18px] shadow-md">
            Z
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[16px] sm:text-[18px] font-black tracking-tight text-white">
                درگاه پرداخت اینترنتی زرین‌پال
              </h3>
              <span className="bg-white/20 text-[11px] font-mono px-2 py-0.5 rounded text-amber-300">
                شاپرک امن
              </span>
            </div>
            <p className="text-[11px] sm:text-[12px] text-gray-300">
              سامانه پرداخت الکترونیک بانک مرکزی جمهوری اسلامی ایران
            </p>
          </div>
        </div>

        {/* Security indicators & Countdown */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full text-[12px] font-mono border border-white/10 text-amber-300">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
          </div>
          <button 
            type="button" 
            onClick={onCancel}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            title="انصراف و بازگشت به آموزشگاه"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Merchant Info Banner */}
      <div className="bg-white border-b border-[#E9ECEF] p-4 sm:px-6 flex flex-wrap items-center justify-between gap-3 text-[13px]">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          <div>
            <span className="text-gray-500 ml-1">پذیرنده:</span>
            <strong className="text-gray-900">آموزشگاه موسیقی چنگ خرمشهر</strong>
          </div>
          <div>
            <span className="text-gray-500 ml-1">دوره:</span>
            <strong className="text-[#19407e]">{courseTitle}</strong>
          </div>
          <div>
            <span className="text-gray-500 ml-1">هنرجو:</span>
            <span className="text-gray-800">{studentName} ({phone})</span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#FFF8E7] text-[#9A6700] border border-[#FFE8A3] px-3 py-1.5 rounded-xl">
          <span className="text-[12px]">مبلغ تراکنش:</span>
          <span className="text-[17px] font-black text-[#D9384A] font-mono">
            {amount.toLocaleString('fa-IR')}
          </span>
          <span className="text-[12px]">تومان</span>
        </div>
      </div>

      {/* Main Payment Form Body */}
      <div className="p-4 sm:p-6 max-w-xl mx-auto">
        
        {/* Quick Fill Banner for Demo convenience */}
        <div className="mb-5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[12px] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>محیط آزمایشی شبیه‌ساز زرین‌پال. می‌توانید از اطلاعات نمونه استفاده کنید:</span>
          </div>
          <button
            type="button"
            onClick={fillQuickDemoCard}
            className="px-2.5 py-1 rounded-lg bg-[#F39200] hover:bg-[#DE8400] text-white font-bold text-[11px] shrink-0 transition-colors shadow-xs"
          >
            تکمیل خودکار کارت تست
          </button>
        </div>

        <form onSubmit={handleSubmitPayment} className="space-y-4">
          
          {/* Card Number Input */}
          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-[#19407e]" />
                <span>شماره کارت ۱۶ رقمی بانکی *</span>
              </span>
              <span className="text-[11px] text-gray-400 font-normal">عضو شتاب</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                maxLength={25}
                value={cardNumber}
                onChange={handleCardChange}
                placeholder="____ - ____ - ____ - ____"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-300 focus:border-[#19407e] focus:ring-2 focus:ring-[#19407e]/20 text-[16px] font-mono font-bold tracking-widest text-center dir-ltr text-gray-800"
              />
              <div className="absolute right-3 top-3 text-gray-400">
                <Lock className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* CVV2 & Expiry Date in Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* CVV2 */}
            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5 flex items-center justify-between">
                <span>کد شناسایی دوم (CVV2) *</span>
                <span className="text-[11px] text-gray-400">۳ یا ۴ رقمی</span>
              </label>
              <input
                type="password"
                required
                maxLength={4}
                value={cvv2}
                onChange={(e) => setCvv2(e.target.value.replace(/\D/g, ''))}
                placeholder="•••"
                className="w-full px-3 py-2.5 rounded-xl bg-white border border-gray-300 focus:border-[#19407e] focus:ring-2 focus:ring-[#19407e]/20 text-[15px] font-mono text-center dir-ltr"
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">
                تاریخ انقضای کارت (ماه / سال) *
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  required
                  maxLength={2}
                  value={expMonth}
                  onChange={(e) => setExpMonth(e.target.value.replace(/\D/g, ''))}
                  placeholder="ماه (۰۸)"
                  className="w-1/2 px-3 py-2.5 rounded-xl bg-white border border-gray-300 focus:border-[#19407e] text-[14px] font-mono text-center dir-ltr"
                />
                <span className="text-gray-400 font-bold">/</span>
                <input
                  type="text"
                  required
                  maxLength={2}
                  value={expYear}
                  onChange={(e) => setExpYear(e.target.value.replace(/\D/g, ''))}
                  placeholder="سال (۰۶)"
                  className="w-1/2 px-3 py-2.5 rounded-xl bg-white border border-gray-300 focus:border-[#19407e] text-[14px] font-mono text-center dir-ltr"
                />
              </div>
            </div>

          </div>

          {/* OTP / Dynamic Pin */}
          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-1.5 flex items-center justify-between">
              <span>رمز اینترنتی / رمز پویا (OTP) *</span>
              {otpSent && (
                <span className="text-[11px] text-emerald-600 font-mono">
                  زمان اعتبار رمز: {otpTimer} ثانیه
                </span>
              )}
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type={showPin ? 'text' : 'password'}
                  required
                  maxLength={8}
                  value={pin2}
                  onChange={(e) => setPin2(e.target.value.replace(/\D/g, ''))}
                  placeholder="رمز ارسالی از بانک"
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-gray-300 focus:border-[#19407e] focus:ring-2 focus:ring-[#19407e]/20 text-[15px] font-mono text-center dir-ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute left-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <button
                type="button"
                disabled={isRequestingOtp}
                onClick={handleRequestOtp}
                className="px-4 py-2.5 rounded-xl bg-[#19407e] hover:bg-[#133263] text-white text-[12px] font-bold shrink-0 transition-colors disabled:opacity-50"
              >
                {isRequestingOtp ? 'در حال ارسال...' : otpSent ? 'ارسال مجدد' : 'دریافت رمز پویا'}
              </button>
            </div>
          </div>

          {/* Security Captcha */}
          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-1.5">
              کد امنیتی شاپرک *
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                required
                maxLength={6}
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                placeholder="حروف تصویر را وارد کنید"
                className="flex-1 px-3 py-2.5 rounded-xl bg-white border border-gray-300 focus:border-[#19407e] text-[14px] font-mono text-center dir-ltr"
              />
              
              {/* Fake Captcha Display */}
              <div 
                onClick={generateCaptcha}
                className="w-32 h-11 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl border border-gray-300 flex items-center justify-center cursor-pointer select-none relative overflow-hidden group shadow-inner"
                title="کلیک برای تولید تصویر جدید"
              >
                <span className="font-mono text-[20px] font-black tracking-widest text-[#19407e] line-through italic rotate-2">
                  {captchaCode}
                </span>
                <div className="absolute right-1 bottom-1 text-gray-400 group-hover:text-gray-700">
                  <RefreshCw className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[12px] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-3">
            <button
              type="submit"
              disabled={isProcessing}
              className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-[14px] transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>ارتباط با شاپرک...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>پرداخت نهایی شهریه</span>
                </>
              )}
            </button>

            <button
              type="button"
              disabled={isProcessing}
              onClick={onCancel}
              className="py-3 px-4 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-[14px] transition-colors"
            >
              انصراف از پرداخت
            </button>
          </div>

        </form>

        {/* Security Seals Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 text-[11px] text-gray-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>اتصال ایمن با گواهینامه SSL رمزنگاری ۲۵۶ بیتی شاپرک</span>
          </div>
          <span className="font-mono text-gray-400">IP: 5.127.84.102</span>
        </div>

      </div>

    </div>
  );
};
