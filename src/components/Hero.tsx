import React, { useState, useEffect, useRef } from 'react';
import { 
  Award, 
  Sparkles, 
  ShieldCheck, 
  Volume2, 
  Music, 
  MapPin, 
  ChevronLeft,
  Users,
  GraduationCap
} from 'lucide-react';
import { useSiteConfig } from '../config/SiteConfigContext';

// Pentatonic / Persian Dastgah fret frequencies in Hz for harmonic physical sound synthesis
const STRINGS = [
  { id: 'c', note: 'دو (C3)', freq: 130.81, label: 'بم' },
  { id: 'f', note: 'فا (F3)', freq: 174.61, label: 'بمل' },
  { id: 'g', note: 'سل (G3)', freq: 196.00, label: 'طنین' },
  { id: 'bb', note: 'سی‌بمل (Bb3)', freq: 233.08, label: 'کرن' },
  { id: 'c4', note: 'دو (C4)', freq: 261.63, label: 'میانی' },
  { id: 'd', note: 'ر (D4)', freq: 293.66, label: 'اوج' },
  { id: 'eb', note: 'می‌بمل (Eb4)', freq: 311.13, label: 'شور' },
  { id: 'f4', note: 'فا (F4)', freq: 349.23, label: 'زیر' },
];

export const Hero: React.FC = () => {
  const config = useSiteConfig();
  const [activeString, setActiveString] = useState<number | null>(null);
  const [vibratingIndex, setVibratingIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const heroRef = useRef<HTMLElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Scroll-triggered & entrance observer to smoothly elevate elements on entry
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    // Immediate trigger fallback in case already in viewport on mount
    const timer = setTimeout(() => setIsVisible(true), 60);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // Web Audio pluck synthesizer imitating an acoustic Chang / Persian Harp / Tar resonator
  const pluckString = (index: number) => {
    setActiveString(index);
    setVibratingIndex(index);
    setTimeout(() => setVibratingIndex(null), 900);

    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;
      const freq = STRINGS[index].freq;

      // Primary acoustic oscillator (triangle for string woodiness)
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Sub-harmonic oscillator for body resonance
      const sub = ctx.createOscillator();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(freq * 0.5, now);

      // Gain Envelope (percussive string pluck attack + exponential decay)
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.linearRampToValueAtTime(0.25, now + 0.012);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

      // Biquad filter imitating wood cavity damping
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.frequency.exponentialRampToValueAtTime(320, now + 1.2);

      osc.connect(filter);
      sub.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      sub.start(now);
      osc.stop(now + 1.5);
      sub.stop(now + 1.5);
    } catch {
      // Audio autoplay gracefully handled if disabled
    }
  };

  const playChordCadence = () => {
    [0, 2, 4, 6, 7].forEach((strIndex, delayIdx) => {
      setTimeout(() => {
        pluckString(strIndex);
      }, delayIdx * 110);
    });
  };

  return (
    <section
      ref={heroRef}
      id="top"
      role="region"
      aria-labelledby="hero-heading"
      className="relative w-full max-w-full bg-[#FAF5F5] dark:bg-[#0B0D11] text-[#202124] dark:text-[#F3F4F6] pt-10 pb-18 lg:pt-16 lg:pb-24 border-b border-[#E8DFE0] dark:border-white/10 overflow-hidden select-none transition-colors"
    >
      {/* Background Ambient Radial Accents */}
      <div 
        className="absolute top-0 right-1/4 w-[550px] h-[550px] bg-radial from-[#B92B3A]/10 via-[#F3C7CA]/5 to-transparent rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-0 left-10 w-[420px] h-[420px] bg-radial from-amber-500/8 via-transparent to-transparent rounded-full blur-2xl pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Decorative Subtle Geometric Grid Pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#B92B3A08_1px,transparent_1px),linear-gradient(to_bottom,#B92B3A08_1px,transparent_1px)] bg-[size:48px_48px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] pointer-events-none"
        aria-hidden="true"
      />

      {/* =========================================================================
          DECORATIVE GRAPHIC ELEMENT: FLOATING MUSICAL STAFF & NOTATION WAVES (LEFT SIDE)
          Creates pristine compositional harmony with the typography on the right
          ========================================================================= */}
      <div 
        className="absolute top-12 left-0 w-80 lg:w-[460px] h-[420px] pointer-events-none opacity-45 dark:opacity-30 overflow-hidden hidden md:block" 
        aria-hidden="true"
      >
        <svg 
          viewBox="0 0 520 360" 
          className="w-full h-full text-[#B92B3A] dark:text-[#FFB3BA] animate-staff-float"
          fill="none"
        >
          {/* 5 Classical Music Staff Lines with organic curvature */}
          <path d="M-60 65 Q 150 130 380 45 T 560 85" stroke="currentColor" strokeWidth="1.3" strokeOpacity="0.32" />
          <path d="M-60 90 Q 150 155 380 70 T 560 110" stroke="currentColor" strokeWidth="1.3" strokeOpacity="0.45" />
          <path d="M-60 115 Q 150 180 380 95 T 560 135" stroke="currentColor" strokeWidth="1.3" strokeOpacity="0.55" />
          <path d="M-60 140 Q 150 205 380 120 T 560 160" stroke="currentColor" strokeWidth="1.3" strokeOpacity="0.45" />
          <path d="M-60 165 Q 150 230 380 145 T 560 185" stroke="currentColor" strokeWidth="1.3" strokeOpacity="0.32" />

          {/* Floating Notes and Persian Chords orbiting dynamically */}
          <g className="animate-orbit-1">
            <ellipse cx="120" cy="115" rx="10" ry="7.5" transform="rotate(-20 120 115)" fill="currentColor" fillOpacity="0.85" />
            <line x1="129" y1="112" x2="129" y2="52" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M129 52 Q 146 62 148 78" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          </g>

          <g className="animate-orbit-2">
            <ellipse cx="230" cy="153" rx="9" ry="7" transform="rotate(-20 230 153)" fill="currentColor" fillOpacity="0.9" />
            <line x1="238" y1="150" x2="238" y2="92" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          <g className="animate-orbit-3">
            <ellipse cx="310" cy="98" rx="9" ry="7" transform="rotate(-20 310 98)" fill="currentColor" fillOpacity="0.8" />
            <ellipse cx="355" cy="85" rx="9" ry="7" transform="rotate(-20 355 85)" fill="currentColor" fillOpacity="0.8" />
            <line x1="318" y1="95" x2="318" y2="40" stroke="currentColor" strokeWidth="2.5" />
            <line x1="363" y1="82" x2="363" y2="30" stroke="currentColor" strokeWidth="2.5" />
            <line x1="318" y1="40" x2="363" y2="30" stroke="currentColor" strokeWidth="4.5" />
          </g>

          {/* Persian Chang Clef symbol accent */}
          <g className="animate-orbit-4" opacity="0.65">
            <path 
              d="M50 135 C42 90, 78 72, 78 105 C78 132, 38 148, 62 192 C72 210, 82 182, 76 162 C70 142, 54 142, 60 162" 
              stroke="currentColor" 
              strokeWidth="2.4" 
              strokeLinecap="round" 
              fill="none" 
            />
          </g>
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Top Heritage & Branch Status Strip (Reveals step 0) */}
        <div 
          className={`flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-[#E8DFE0]/80 dark:border-white/10 text-[12px] sm:text-[13px] hero-reveal-base ${
            isVisible ? 'hero-reveal-active' : ''
          }`}
          style={{ transitionDelay: '0.05s' }}
        >
          {/* Heritage Badge */}
          <div className="inline-flex items-center gap-2 font-medium text-[#5a626d] dark:text-[#9ca3af]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-[#1a1b1e] dark:text-white">پذیرش فعال ترم جدید:</span>
            <span>شعبه خرمشهر (خلیج فارس) & شعبه آبادان (شاملو)</span>
          </div>

          {/* Golden Legacy Counter */}
          <div className="inline-flex items-center gap-2 font-bold text-amber-900 dark:text-amber-300 bg-amber-500/10 dark:bg-amber-400/10 px-3 py-1 rounded-full border border-amber-500/25">
            <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>نیم قرن اصالت آموزش موسیقی</span>
            <span className="font-mono text-[11px] text-amber-700 dark:text-amber-400">۱۳۵۰ — ۱۴۰۳</span>
          </div>
        </div>

        {/* Main Split Hero Canvas (Grid: Right High-Impact Typography / Left Resonant Chang) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Right Column: Typography-Focused Editorial Hero */}
          <div className="lg:col-span-7 text-right order-2 lg:order-1">
            
            {/* Academy Name with Iconic Lacquer Accent (Reveal step 1) */}
            <div 
              className={`inline-flex items-center gap-3 mb-4 hero-reveal-base ${
                isVisible ? 'hero-reveal-active' : ''
              }`}
              style={{ transitionDelay: '0.1s' }}
            >
              <span className="w-10 h-[2.5px] bg-[#B92B3A] rounded-full" />
              <span className="text-[13px] sm:text-[15px] font-extrabold text-[#B92B3A] dark:text-[#FFB3BA] tracking-wider uppercase">
                کنسرواتوار و آکادمی موسیقی چنگ خوزستان
              </span>
            </div>

            {/* BOLD TYPOGRAPHY: Large Gradient Headline (Reveal step 2) */}
            <h1
              id="hero-heading"
              className={`font-brand-title font-black text-3xl sm:text-5xl lg:text-[58px] leading-[1.22] tracking-[-0.035em] mb-6 [text-wrap:balance] hero-reveal-base ${
                isVisible ? 'hero-reveal-active' : ''
              }`}
              style={{ transitionDelay: '0.18s' }}
            >
              <span className="block text-[#17181C] dark:text-white">
                طنینِ اصالت، آموزش آکادمیک
              </span>
              
              {/* Bold Gradient Text Effect (Dark Ruby Red -> Warm Persimmon -> Amber Gold) */}
              <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-l from-[#9C1C29] via-[#C92A3A] to-[#E55B3C] dark:from-[#FF8F9B] dark:via-[#FFB3BA] dark:to-[#FBBF24] drop-shadow-xs">
                و شکوهِ اجرای زنده بر صحنه
              </span>
            </h1>

            {/* CREATIVE EDITORIAL SUBTITLE & ACCENT BLOCK (Reveal step 3) */}
            <div 
              className={`relative mb-8 pr-4 sm:pr-5 border-r-3 border-[#B92B3A] dark:border-[#FFB3BA] space-y-3 hero-reveal-base ${
                isVisible ? 'hero-reveal-active' : ''
              }`}
              style={{ transitionDelay: '0.26s' }}
            >
              <p className="text-[17px] sm:text-[20px] font-bold text-[#202124] dark:text-white leading-[1.6] tracking-[-0.015em] [text-wrap:pretty]">
                نخستین مرکز تخصصی آموزش سازهای ایرانی و جهانی در منطقه آزاد اروند با اعطای مدرک رسمی و معتبر فرهنگ و ارشاد اسلامی.
              </p>
              
              <p className="text-[14px] sm:text-[16px] text-[#555E6B] dark:text-[#CBD5E1] font-normal leading-[1.75] max-w-xl">
                یادگیری گام‌به‌گام اصول تکنیک، سلفژ، همنوازی و ورود مستقیم به ارکستر زیر نظر اساتید برجسته کنسرواتواری.
              </p>
            </div>

            {/* Primary & Secondary Call to Actions (Reveal step 4) */}
            <div 
              className={`flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 mb-9 hero-reveal-base ${
                isVisible ? 'hero-reveal-active' : ''
              }`}
              style={{ transitionDelay: '0.34s' }}
            >
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#B92B3A] hover:bg-[#A32230] active:scale-98 text-white font-extrabold text-[15px] sm:text-[16px] shadow-lg shadow-[#B92B3A]/25 transition-all"
              >
                <span>رزرو نوبت تعیین سطح حضوری</span>
                <ChevronLeft className="w-4 h-4" />
              </a>

              <a
                href="#teachers"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white dark:bg-[#15181F] text-[#202124] dark:text-white border border-[#D5C6C8] dark:border-white/15 hover:border-[#B92B3A] dark:hover:border-[#FFB3BA] font-bold text-[15px] transition-all"
              >
                <GraduationCap className="w-4 h-4 text-[#B92B3A] dark:text-[#FFB3BA]" />
                <span>رزومه و سابقه اساتید</span>
              </a>

              {/* Sound Chord Preview Button */}
              <button
                type="button"
                onClick={playChordCadence}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-4 rounded-2xl text-[13px] font-bold text-[#6a7380] dark:text-[#A6B0BE] hover:text-[#B92B3A] dark:hover:text-white transition-colors"
                title="لمس پرده‌های چنگ و پخش هارمونی"
              >
                <Volume2 className="w-4 h-4 text-[#B92B3A]" />
                <span>طنین چنگ (کوک شور)</span>
              </button>
            </div>

            {/* Verified Accreditation Badges (Reveal step 5) */}
            <div 
              className={`pt-6 border-t border-[#E8DFE0] dark:border-white/10 flex flex-wrap items-center gap-y-3 gap-x-6 text-[13px] text-[#5a626d] dark:text-[#9ca3af] hero-reveal-base ${
                isVisible ? 'hero-reveal-active' : ''
              }`}
              style={{ transitionDelay: '0.42s' }}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-bold text-[#202124] dark:text-white">مجوز رسمی درجه یک</span>
                <span>از اداره کل فرهنگ و ارشاد</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#B92B3A] dark:text-[#FFB3BA] shrink-0" />
                <span className="font-bold text-[#202124] dark:text-white">کادر آکادمیک</span>
                <span>فارغ‌التحصیلان کنسرواتوار تهران</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span className="font-bold text-[#202124] dark:text-white">کنسرت‌های فصلی</span>
                <span>استیج اختصاصی سینما نفت و تالارها</span>
              </div>
            </div>

          </div>

          {/* Left Column: KASE-YE TANIN (کاسه طنین و پرده‌های سیمین چنگ) */}
          <div 
            className={`lg:col-span-5 order-1 lg:order-2 hero-reveal-base ${
              isVisible ? 'hero-reveal-active' : ''
            }`}
            style={{ transitionDelay: '0.28s' }}
          >
            <div className="relative rounded-[28px] bg-gradient-to-br from-white via-[#FCF6F6] to-[#F5EBEB] dark:from-[#151821] dark:via-[#13151C] dark:to-[#0D0F14] border border-[#E8DFE0] dark:border-white/15 p-5 sm:p-6 shadow-xl overflow-hidden">
              
              {/* Header inside the interactive instrument card */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E8DFE0] dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF0F1] dark:bg-[#B92B3A]/20 flex items-center justify-center text-[#B92B3A] dark:text-[#FFB3BA]">
                    <Music className="w-5 h-5" />
                  </div>
                  <div className="text-right">
                    <h2 className="text-[15px] font-extrabold text-[#202124] dark:text-white flex items-center gap-1.5">
                      <span>کاسه طنین و پرده‌های سیمین چنگ</span>
                    </h2>
                    <span className="text-[11px] text-[#8996A6] dark:text-[#9ca3af]">
                      سیم‌ها را لمس کنید تا طنین آکوستیک کوک ایرانی شنیده شود
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={playChordCadence}
                  className="px-2.5 py-1.5 rounded-lg bg-[#FAF0F1] dark:bg-white/10 text-[#B92B3A] dark:text-[#FFB3BA] text-[11px] font-bold hover:bg-[#B92B3A] hover:text-white transition-all flex items-center gap-1 shadow-2xs"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>آرپژ</span>
                </button>
              </div>

              {/* The Physical Chang Instrument Simulation (Harp Strings) */}
              <div 
                className="relative h-[250px] sm:h-[280px] rounded-2xl bg-[#200A13] dark:bg-[#07090D] border border-amber-900/30 overflow-hidden flex items-center justify-around px-3 sm:px-6 shadow-inner group cursor-pointer"
                title="کلیک روی هر سیم برای لمس صدای زنده ساز"
              >
                {/* Wood Grain Texture Overlay */}
                <div 
                  className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#D97706_1px,transparent_1px)] [background-size:16px_16px]"
                  aria-hidden="true" 
                />

                {/* Harmonic Golden Ambient Glow */}
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"
                  aria-hidden="true"
                />

                {/* Vertical Interactive Resonating Strings */}
                {STRINGS.map((str, idx) => {
                  const isVibrating = vibratingIndex === idx;
                  const isHovered = activeString === idx;
                  const heightPercent = 94 - idx * 4.5; // Traditional harp curve

                  return (
                    <button
                      key={str.id}
                      type="button"
                      onClick={() => pluckString(idx)}
                      onMouseEnter={() => pluckString(idx)}
                      aria-label={`نواختن سیم ${str.note}`}
                      className="relative h-full flex flex-col items-center justify-between py-3.5 focus:outline-none focus:ring-1 focus:ring-amber-400 group/str px-1 sm:px-1.5 transition-transform"
                    >
                      {/* Peg Top Marker */}
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 shadow-[0_0_6px_rgba(251,191,36,0.6)]" />

                      {/* The String Line with physical dynamic wave motion */}
                      <div className="relative flex-1 w-full flex items-center justify-center my-1.5">
                        <span 
                          style={{ height: `${heightPercent}%` }}
                          className={`w-[2.5px] rounded-full transition-all duration-150 ${
                            isVibrating 
                              ? 'bg-amber-300 shadow-[0_0_12px_#FBBF24] scale-x-150 animate-pulse' 
                              : isHovered 
                              ? 'bg-white shadow-[0_0_8px_#FFF]' 
                              : 'bg-gradient-to-b from-amber-200/50 via-amber-400/70 to-amber-200/50'
                          }`}
                        />
                      </div>

                      {/* Note Fret Label at Bottom */}
                      <span className={`text-[10px] font-mono transition-colors ${
                        isHovered ? 'text-amber-300 font-bold' : 'text-amber-200/60'
                      }`}>
                        {str.id.toUpperCase()}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Quick Branch Nav Bar */}
              <div className="mt-4 pt-3.5 border-t border-[#E8DFE0] dark:border-white/10 flex items-center justify-between text-[11px] text-[#717b88] dark:text-[#9ca3af] px-1">
                <span className="flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#B92B3A]" />
                  <span>شعبه ۱: خرمشهر، خلیج فارس</span>
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#B92B3A]" />
                  <span>شعبه ۲: آبادان، شاملو</span>
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
