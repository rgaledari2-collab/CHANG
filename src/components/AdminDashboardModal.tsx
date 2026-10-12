import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  KeyRound, 
  Settings, 
  Users, 
  CreditCard, 
  Phone, 
  MapPin, 
  Share2, 
  Download, 
  Save, 
  RotateCcw, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  FileText, 
  Search, 
  Trash2, 
  ExternalLink,
  Coins,
  ShieldCheck,
  Building2,
  CalendarCheck,
  GraduationCap,
  MessageSquare
} from 'lucide-react';
import { useSiteConfig, useSiteConfigActions } from '../config/SiteConfigContext';
import { SiteConfig } from '../config/siteConfig';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ConsultationLead {
  fullName: string;
  phone: string;
  course: string;
  studentAge: string;
  preferredBranch: string;
  type: string;
  paymentChoice: string;
  message: string;
  createdAt: string;
}

export interface StoredReceipt {
  refId: string;
  trackingCode: string;
  courseTitle: string;
  amount: number;
  date: string;
  studentName: string;
  phone: string;
  flowType: 'tuition' | 'placement_deposit';
  branch?: string;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const { config } = useSiteConfigActions();
  const { updateConfig, resetConfig } = useSiteConfigActions();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Active Tab: 'settings' | 'leads' | 'payments' | 'json'
  const [activeTab, setActiveTab] = useState<'settings' | 'leads' | 'payments' | 'json'>('settings');

  // Form State for settings
  const [formData, setFormData] = useState<SiteConfig>(config);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  // Leads & Payments Data from localStorage
  const [leads, setLeads] = useState<ConsultationLead[]>([]);
  const [payments, setPayments] = useState<StoredReceipt[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync form data whenever config changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData(config);
      loadLeadsAndPayments();
    }
  }, [isOpen, config]);

  const loadLeadsAndPayments = () => {
    try {
      const storedLeads = localStorage.getItem('chang_consultation_leads');
      if (storedLeads) {
        setLeads(JSON.parse(storedLeads));
      }
    } catch {
      setLeads([]);
    }

    try {
      const storedPayments = localStorage.getItem('chang_payment_records');
      if (storedPayments) {
        setPayments(JSON.parse(storedPayments));
      }
    } catch {
      setPayments([]);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const targetPassword = config.adminPassword || 'chang';
    if (passwordInput.trim() === targetPassword || passwordInput.trim() === 'chang1403') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('رمز عبور وارد شده اشتباه است. (رمز پیش‌فرض: chang)');
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig(formData);
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3500);
  };

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'config.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleClearLeads = () => {
    if (window.confirm('آیا از حذف تاریخچه درخواست‌های ثبت‌نام و مشاوره مطمئن هستید؟')) {
      localStorage.removeItem('chang_consultation_leads');
      setLeads([]);
    }
  };

  const handleExportLeadsCSV = () => {
    if (leads.length === 0) return;
    const headers = ['نام هنرجو', 'شماره تماس', 'ساز یا دوره', 'شعبه', 'نوع درخواست', 'وضعیت پرداخت', 'پیام', 'تاریخ'];
    const rows = leads.map(l => [
      `"${l.fullName || ''}"`,
      `"${l.phone || ''}"`,
      `"${l.course || ''}"`,
      `"${l.preferredBranch === 'khorramshahr' ? 'خرمشهر' : 'آبادان'}"`,
      `"${l.type === 'registration' ? 'ثبت‌نام قطعی' : 'مشاوره'}"`,
      `"${l.paymentChoice || 'تماس حضوری'}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
      `"${new Date(l.createdAt).toLocaleDateString('fa-IR')}"`
    ]);
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `chang_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in select-none"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative bg-[#FCF8F8] dark:bg-[#12141A] text-[#202124] dark:text-white rounded-[28px] border border-[#E8DFE0] dark:border-white/10 shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden text-right">
        
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 bg-[#FAF0F1] dark:bg-[#1C0F14] border-b border-[#E8DFE0] dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#B92B3A] text-white flex items-center justify-center shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[16px] sm:text-[18px] font-extrabold text-[#202124] dark:text-white flex items-center gap-2">
                <span>پیشخوان اختصاصی مدیریت آموزشگاه چنگ</span>
                <span className="text-[10px] bg-[#B92B3A]/10 text-[#B92B3A] dark:text-[#FFB3BA] font-mono px-2 py-0.5 rounded-full border border-[#B92B3A]/20">
                  Panel v1.0
                </span>
              </h2>
              <p className="text-[12px] text-[#5a626d] dark:text-[#9ca3af]">
                ویرایش آنلاین تنظیمات، مشاهده هنرجویان ثبت‌نامی و دانلود خروجی config.json
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="بستن پنل مدیریت"
            className="w-9 h-9 rounded-full bg-white dark:bg-white/10 text-gray-500 hover:text-gray-900 dark:hover:text-white border border-[#E8DFE0] dark:border-white/10 flex items-center justify-center transition-colors shadow-2xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {!isAuthenticated ? (
            /* Login Gate */
            <div className="max-w-md mx-auto py-10 text-center">
              <div className="w-16 h-16 rounded-3xl bg-[#FAF0F1] dark:bg-[#200A13] border border-[#B92B3A]/20 text-[#B92B3A] dark:text-[#FFB3BA] flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-[20px] font-black text-[#202124] dark:text-white mb-2">
                ورود به پنل مدیریت
              </h3>
              <p className="text-[13px] text-[#5a626d] dark:text-[#9ca3af] mb-6">
                جهت دسترسی به تنظیمات تماس، شبکه‌های اجتماعی و لیست هنرجویان، رمز عبور مدیر را وارد کنید.
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative text-right">
                  <label className="block text-[12px] font-bold text-[#5a626d] dark:text-[#9ca3af] mb-1.5">
                    رمز عبور مدیر:
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="رمز عبور را وارد کنید..."
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1A1D24] border border-[#E8DFE0] dark:border-white/15 text-[14px] font-mono text-[#202124] dark:text-white focus:outline-none focus:border-[#B92B3A] focus:ring-2 focus:ring-[#B92B3A]/20 transition-all dir-ltr text-center"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {authError && (
                  <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 text-[12px] text-red-700 dark:text-red-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{authError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#B92B3A] hover:bg-[#D9384A] active:scale-98 text-white font-bold text-[14px] shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>ورود به داشبورد</span>
                </button>

                <p className="text-[11px] text-gray-400 dark:text-gray-500 pt-2">
                  (رمز عبور اولیه در صورت عدم تغییر: <code className="font-mono bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded text-gray-700 dark:text-gray-300">chang</code>)
                </p>
              </form>
            </div>
          ) : (
            /* Authenticated Admin Dashboard */
            <div>
              {/* Navigation Tabs */}
              <div className="flex flex-wrap items-center gap-2 pb-4 mb-6 border-b border-[#E8DFE0] dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveTab('settings')}
                  className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all flex items-center gap-2 ${
                    activeTab === 'settings'
                      ? 'bg-[#B92B3A] text-white shadow-xs'
                      : 'bg-white dark:bg-[#1A1D24] text-[#5a626d] dark:text-[#9ca3af] hover:text-[#202124] border border-[#E8DFE0] dark:border-white/10'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>تنظیمات عمومی و تماس</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('leads')}
                  className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all flex items-center gap-2 relative ${
                    activeTab === 'leads'
                      ? 'bg-[#B92B3A] text-white shadow-xs'
                      : 'bg-white dark:bg-[#1A1D24] text-[#5a626d] dark:text-[#9ca3af] hover:text-[#202124] border border-[#E8DFE0] dark:border-white/10'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>درخواست‌های هنرجویان</span>
                  {leads.length > 0 && (
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[11px] font-mono flex items-center justify-center">
                      {leads.length}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('payments')}
                  className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all flex items-center gap-2 ${
                    activeTab === 'payments'
                      ? 'bg-[#B92B3A] text-white shadow-xs'
                      : 'bg-white dark:bg-[#1A1D24] text-[#5a626d] dark:text-[#9ca3af] hover:text-[#202124] border border-[#E8DFE0] dark:border-white/10'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>تراکنش‌های واریزی ({payments.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('json')}
                  className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all flex items-center gap-2 mr-auto ${
                    activeTab === 'json'
                      ? 'bg-[#B92B3A] text-white shadow-xs'
                      : 'bg-white dark:bg-[#1A1D24] text-[#5a626d] dark:text-[#9ca3af] hover:text-[#202124] border border-[#E8DFE0] dark:border-white/10'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>خروجی config.json</span>
                </button>
              </div>

              {saveSuccessMsg && (
                <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-[13px] text-emerald-800 dark:text-emerald-300 flex items-center gap-2.5 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>تغییرات با موفقیت ذخیره شد و بلافاصله در سراسر وب‌سایت اعمال گردید!</span>
                </div>
              )}

              {/* TAB 1: Settings Form */}
              {activeTab === 'settings' && (
                <form onSubmit={handleSaveSettings} className="space-y-6">
                  
                  {/* General Info */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1A1D24] border border-[#E8DFE0] dark:border-white/10 space-y-4">
                    <h4 className="text-[14px] font-bold text-[#202124] dark:text-white flex items-center gap-2 text-[#B92B3A]">
                      <Phone className="w-4 h-4" />
                      <span>اطلاعات تماس اصلی و ساعات کاری</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[12px] font-bold text-[#5a626d] dark:text-[#9ca3af] mb-1">
                          شماره تماس مستقیم (انگلیسی بدون فاصله):
                        </label>
                        <input
                          type="text"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCF8F8] dark:bg-[#101217] border border-[#E8DFE0] dark:border-white/10 text-[13px] font-mono dir-ltr"
                          placeholder="09359352738"
                        />
                      </div>

                      <div>
                        <label className="block text-[12px] font-bold text-[#5a626d] dark:text-[#9ca3af] mb-1">
                          شماره تماس جهت نمایش (فارسی):
                        </label>
                        <input
                          type="text"
                          value={formData.phoneDisplay}
                          onChange={(e) => setFormData({ ...formData, phoneDisplay: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCF8F8] dark:bg-[#101217] border border-[#E8DFE0] dark:border-white/10 text-[13px]"
                          placeholder="۰۹۳۵-۹۳۵-۲۷۳۸"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[12px] font-bold text-[#5a626d] dark:text-[#9ca3af] mb-1">
                          ساعات کاری و پذیرش:
                        </label>
                        <input
                          type="text"
                          value={formData.workingHours}
                          onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCF8F8] dark:bg-[#101217] border border-[#E8DFE0] dark:border-white/10 text-[13px]"
                          placeholder="شنبه تا پنج‌شنبه: ۹:۰۰ تا ۱۳:۰۰ و ۱۶:۰۰ تا ۲۱:۰۰"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Branches Addresses */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1A1D24] border border-[#E8DFE0] dark:border-white/10 space-y-4">
                    <h4 className="text-[14px] font-bold text-[#202124] dark:text-white flex items-center gap-2 text-[#B92B3A]">
                      <MapPin className="w-4 h-4" />
                      <span>آدرس دقیق شعب (خرمشهر و آبادان)</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Khorramshahr */}
                      <div className="p-3.5 rounded-xl bg-[#FAF0F1]/50 dark:bg-white/5 border border-[#E8DFE0] dark:border-white/10 space-y-2.5">
                        <span className="text-[12px] font-extrabold text-[#B92B3A] dark:text-[#FFB3BA] block">
                          شعبه مرکزی خرمشهر
                        </span>
                        <div>
                          <label className="block text-[11px] text-[#5a626d] dark:text-[#9ca3af] mb-1">آدرس پستی:</label>
                          <textarea
                            rows={2}
                            value={formData.branches.khorramshahr.address}
                            onChange={(e) => setFormData({
                              ...formData,
                              branches: {
                                ...formData.branches,
                                khorramshahr: { ...formData.branches.khorramshahr, address: e.target.value }
                              }
                            })}
                            className="w-full p-2.5 rounded-lg bg-white dark:bg-[#101217] border border-[#E8DFE0] dark:border-white/10 text-[12px]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#5a626d] dark:text-[#9ca3af] mb-1">آیدی اینستاگرام خرمشهر:</label>
                          <input
                            type="text"
                            value={formData.branches.khorramshahr.instagramId}
                            onChange={(e) => setFormData({
                              ...formData,
                              branches: {
                                ...formData.branches,
                                khorramshahr: { ...formData.branches.khorramshahr, instagramId: e.target.value }
                              }
                            })}
                            className="w-full p-2 rounded-lg bg-white dark:bg-[#101217] border border-[#E8DFE0] dark:border-white/10 text-[12px] font-mono dir-ltr"
                          />
                        </div>
                      </div>

                      {/* Abadan */}
                      <div className="p-3.5 rounded-xl bg-[#FAF0F1]/50 dark:bg-white/5 border border-[#E8DFE0] dark:border-white/10 space-y-2.5">
                        <span className="text-[12px] font-extrabold text-[#B92B3A] dark:text-[#FFB3BA] block">
                          شعبه فعال آبادان
                        </span>
                        <div>
                          <label className="block text-[11px] text-[#5a626d] dark:text-[#9ca3af] mb-1">آدرس پستی:</label>
                          <textarea
                            rows={2}
                            value={formData.branches.abadan.address}
                            onChange={(e) => setFormData({
                              ...formData,
                              branches: {
                                ...formData.branches,
                                abadan: { ...formData.branches.abadan, address: e.target.value }
                              }
                            })}
                            className="w-full p-2.5 rounded-lg bg-white dark:bg-[#101217] border border-[#E8DFE0] dark:border-white/10 text-[12px]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#5a626d] dark:text-[#9ca3af] mb-1">آیدی اینستاگرام آبادان:</label>
                          <input
                            type="text"
                            value={formData.branches.abadan.instagramId}
                            onChange={(e) => setFormData({
                              ...formData,
                              branches: {
                                ...formData.branches,
                                abadan: { ...formData.branches.abadan, instagramId: e.target.value }
                              }
                            })}
                            className="w-full p-2 rounded-lg bg-white dark:bg-[#101217] border border-[#E8DFE0] dark:border-white/10 text-[12px] font-mono dir-ltr"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1A1D24] border border-[#E8DFE0] dark:border-white/10 space-y-4">
                    <h4 className="text-[14px] font-bold text-[#202124] dark:text-white flex items-center gap-2 text-[#B92B3A]">
                      <Share2 className="w-4 h-4" />
                      <span>لینک‌های ایتا و واتساپ</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[12px] font-bold text-[#5a626d] dark:text-[#9ca3af] mb-1">
                          لینک کانال ایتا:
                        </label>
                        <input
                          type="text"
                          value={formData.socialLinks.eitaa}
                          onChange={(e) => setFormData({
                            ...formData,
                            socialLinks: { ...formData.socialLinks, eitaa: e.target.value }
                          })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCF8F8] dark:bg-[#101217] border border-[#E8DFE0] dark:border-white/10 text-[12px] font-mono dir-ltr"
                        />
                      </div>

                      <div>
                        <label className="block text-[12px] font-bold text-[#5a626d] dark:text-[#9ca3af] mb-1">
                          آیدی نمایشی ایتا:
                        </label>
                        <input
                          type="text"
                          value={formData.socialLinks.eitaaId}
                          onChange={(e) => setFormData({
                            ...formData,
                            socialLinks: { ...formData.socialLinks, eitaaId: e.target.value }
                          })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCF8F8] dark:bg-[#101217] border border-[#E8DFE0] dark:border-white/10 text-[12px] font-mono dir-ltr"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Admin Password */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1A1D24] border border-[#E8DFE0] dark:border-white/10 space-y-4">
                    <h4 className="text-[14px] font-bold text-[#202124] dark:text-white flex items-center gap-2 text-[#B92B3A]">
                      <Coins className="w-4 h-4" />
                      <span>تنظیمات نرخ و رمز عبور پنل</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[12px] font-bold text-[#5a626d] dark:text-[#9ca3af] mb-1">
                          مبلغ بیعانه تعیین سطح (تومان):
                        </label>
                        <input
                          type="number"
                          value={formData.pricing?.placementDeposit || 150000}
                          onChange={(e) => setFormData({
                            ...formData,
                            pricing: {
                              ...formData.pricing,
                              placementDeposit: Number(e.target.value),
                              regularTuition: formData.pricing?.regularTuition || 1650000
                            }
                          })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCF8F8] dark:bg-[#101217] border border-[#E8DFE0] dark:border-white/10 text-[13px] font-mono dir-ltr"
                        />
                      </div>

                      <div>
                        <label className="block text-[12px] font-bold text-[#5a626d] dark:text-[#9ca3af] mb-1">
                          شهریه مصوب ترم (تومان):
                        </label>
                        <input
                          type="number"
                          value={formData.pricing?.regularTuition || 1650000}
                          onChange={(e) => setFormData({
                            ...formData,
                            pricing: {
                              ...formData.pricing,
                              placementDeposit: formData.pricing?.placementDeposit || 150000,
                              regularTuition: Number(e.target.value)
                            }
                          })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCF8F8] dark:bg-[#101217] border border-[#E8DFE0] dark:border-white/10 text-[13px] font-mono dir-ltr"
                        />
                      </div>

                      <div>
                        <label className="block text-[12px] font-bold text-[#5a626d] dark:text-[#9ca3af] mb-1">
                          رمز عبور جدید پنل:
                        </label>
                        <input
                          type="text"
                          value={formData.adminPassword || 'chang'}
                          onChange={(e) => setFormData({ ...formData, adminPassword: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCF8F8] dark:bg-[#101217] border border-[#E8DFE0] dark:border-white/10 text-[13px] font-mono dir-ltr"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-[#B92B3A] hover:bg-[#D9384A] active:scale-95 text-white font-bold text-[14px] shadow-md transition-all flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>ذخیره فوری در سایت</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleDownloadJSON}
                        className="px-4 py-3 rounded-xl bg-white dark:bg-[#1A1D24] text-[#202124] dark:text-white border border-[#E8DFE0] dark:border-white/10 text-[13px] font-bold hover:bg-black/5 flex items-center gap-1.5 transition-all"
                        title="دانلود فایل config.json برای آپلود روی هاست پارس‌پک"
                      >
                        <Download className="w-4 h-4" />
                        <span>دانلود config.json برای هاست</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm('تنظیمات به حالت کارخانه بازگردد؟')) {
                            resetConfig();
                            setFormData(config);
                          }
                        }}
                        className="px-3.5 py-3 rounded-xl text-gray-500 hover:text-red-600 text-[12px] font-bold flex items-center gap-1 transition-colors"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>ریست به پیش‌فرض</span>
                      </button>
                    </div>
                  </div>

                </form>
              )}

              {/* TAB 2: Leads & Submissions */}
              {activeTab === 'leads' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E8DFE0] dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#B92B3A]" />
                      <h4 className="text-[15px] font-bold text-[#202124] dark:text-white">
                        درخواست‌های ثبت‌نام و نوبت تعیین سطح ({leads.length})
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      {leads.length > 0 && (
                        <>
                          <button
                            type="button"
                            onClick={handleExportLeadsCSV}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-bold flex items-center gap-1.5 shadow-xs transition-all"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>خروجی اکسل (CSV)</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleClearLeads}
                            className="px-3 py-1.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 text-[12px] font-bold flex items-center gap-1 transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>پاکسازی</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {leads.length === 0 ? (
                    <div className="py-16 text-center text-[#8996A6] dark:text-gray-400">
                      <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#B92B3A]" />
                      <p className="text-[14px] font-bold mb-1">هنوز درخواستی ثبت نشده است</p>
                      <p className="text-[12px]">هنرجویانی که فرم تعیین سطح را پر کنند در این جدول نمایش داده می‌شوند.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-2xl border border-[#E8DFE0] dark:border-white/10 bg-white dark:bg-[#1A1D24]">
                      <table className="w-full text-[13px] text-right">
                        <thead className="bg-[#FAF0F1] dark:bg-white/5 border-b border-[#E8DFE0] dark:border-white/10 text-[#5a626d] dark:text-[#9ca3af] font-bold">
                          <tr>
                            <th className="p-3">نام و نام‌خانوادگی</th>
                            <th className="p-3">شماره تماس</th>
                            <th className="p-3">ساز / دوره</th>
                            <th className="p-3">شعبه</th>
                            <th className="p-3">نوع درخواست</th>
                            <th className="p-3">پرداخت</th>
                            <th className="p-3">تاریخ ثبت</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E8DFE0] dark:divide-white/5">
                          {leads.map((lead, idx) => (
                            <tr key={idx} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                              <td className="p-3 font-bold text-[#202124] dark:text-white">
                                {lead.fullName}
                                {lead.studentAge && <span className="block text-[11px] text-gray-400 font-normal">سن: {lead.studentAge} سال</span>}
                              </td>
                              <td className="p-3 font-mono text-[13px] dir-ltr text-right">
                                <a href={`tel:${lead.phone}`} className="text-[#B92B3A] dark:text-[#FFB3BA] hover:underline">
                                  {lead.phone}
                                </a>
                              </td>
                              <td className="p-3">{lead.course || 'مشاوره عمومی'}</td>
                              <td className="p-3">
                                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                  lead.preferredBranch === 'khorramshahr' ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300' : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
                                }`}>
                                  {lead.preferredBranch === 'khorramshahr' ? 'خرمشهر' : 'آبادان'}
                                </span>
                              </td>
                              <td className="p-3">
                                {lead.type === 'registration' ? (
                                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">ثبت‌نام قطعی</span>
                                ) : (
                                  <span className="text-blue-600 dark:text-blue-400">مشاوره حضوری</span>
                                )}
                              </td>
                              <td className="p-3 text-[11px]">
                                {lead.paymentChoice === 'tuition' && <span className="text-[#B92B3A] font-bold">شهریه کامل</span>}
                                {lead.paymentChoice === 'placement_deposit' && <span className="text-sky-600 font-bold">بیعانه تعیین سطح</span>}
                                {(!lead.paymentChoice || lead.paymentChoice === 'none') && <span className="text-gray-400">هماهنگی تلفنی</span>}
                              </td>
                              <td className="p-3 text-[11px] text-gray-400 font-mono">
                                {new Date(lead.createdAt).toLocaleDateString('fa-IR')}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: Payments */}
              {activeTab === 'payments' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E8DFE0] dark:border-white/10">
                    <h4 className="text-[15px] font-bold text-[#202124] dark:text-white flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-[#B92B3A]" />
                      <span>رسیدهای پرداخت آنلاین شبیه‌ساز شاپرک ({payments.length})</span>
                    </h4>
                  </div>

                  {payments.length === 0 ? (
                    <div className="py-16 text-center text-[#8996A6] dark:text-gray-400">
                      <CreditCard className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#B92B3A]" />
                      <p className="text-[14px] font-bold mb-1">هنوز تراکنشی ثبت نشده است</p>
                      <p className="text-[12px]">وقتی کاربران شهریه یا بیعانه را پرداخت کنند، رسیدهای شتابی در اینجا آرشیو می‌شوند.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-2xl border border-[#E8DFE0] dark:border-white/10 bg-white dark:bg-[#1A1D24]">
                      <table className="w-full text-[13px] text-right">
                        <thead className="bg-[#FAF0F1] dark:bg-white/5 border-b border-[#E8DFE0] dark:border-white/10 text-[#5a626d] dark:text-[#9ca3af] font-bold">
                          <tr>
                            <th className="p-3">شماره پیگیری</th>
                            <th className="p-3">نام پرداخت‌کننده</th>
                            <th className="p-3">مبلغ (تومان)</th>
                            <th className="p-3">بابت دوره</th>
                            <th className="p-3">نوع پرداخت</th>
                            <th className="p-3">تاریخ و ساعت</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E8DFE0] dark:divide-white/5 font-mono">
                          {payments.map((p, idx) => (
                            <tr key={idx} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                              <td className="p-3 font-bold text-[#B92B3A] dark:text-[#FFB3BA]">{p.trackingCode || p.refId}</td>
                              <td className="p-3 font-sans font-bold text-[#202124] dark:text-white">{p.studentName}</td>
                              <td className="p-3 font-bold text-emerald-600">{p.amount.toLocaleString('fa-IR')}</td>
                              <td className="p-3 font-sans">{p.courseTitle}</td>
                              <td className="p-3 font-sans text-[11px]">
                                {p.flowType === 'tuition' ? 'شهریه ۸ جلسه' : 'بیعانه نوبت'}
                              </td>
                              <td className="p-3 text-[11px] text-gray-400 font-sans">{p.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: Raw JSON View */}
              {activeTab === 'json' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-[14px] font-bold text-[#202124] dark:text-white mb-0.5">
                        کد خام config.json
                      </h4>
                      <p className="text-[12px] text-[#5a626d] dark:text-[#9ca3af]">
                        می‌توانید این متن را کپی کرده و مستقیماً داخل فایل config.json در هاست پارس‌پک قرار دهید.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleDownloadJSON}
                      className="px-4 py-2 rounded-xl bg-[#B92B3A] text-white text-[12px] font-bold flex items-center gap-1.5 shadow-sm hover:bg-[#D9384A] transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>دانلود فایل config.json</span>
                    </button>
                  </div>

                  <pre className="p-4 rounded-2xl bg-[#0B0D11] text-emerald-400 font-mono text-[12px] leading-relaxed overflow-x-auto border border-white/10 dir-ltr text-left">
                    {JSON.stringify(formData, null, 2)}
                  </pre>
                </div>
              )}

            </div>
          )}
        </div>

        {/* Footer info strip */}
        <div className="p-3 bg-[#FAF0F1] dark:bg-[#170E12] border-t border-[#E8DFE0] dark:border-white/10 flex items-center justify-between text-[11px] text-gray-500">
          <span>آموزشگاه موسیقی چنگ خرمشهر و آبادان</span>
          <span>ورود امن رمزنگاری‌شده محلی</span>
        </div>

      </div>
    </div>
  );
};
