import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Music,
  ChevronLeft,
  GraduationCap,
  History,
  BarChart3,
  PhoneCall,
} from 'lucide-react';
import type { ConservatoryViewId } from './Header';
import {
  CHANG_WORDMARK_MASK,
  CHANG_LEFT_NOTE_MASK,
  CHANG_RIGHT_NOTE_MASK,
} from './changMotionMasks';

interface HeroProps {
  onNavigate?: (view: ConservatoryViewId) => void;
}

const NB = 7;
const SY = [287, 322, 358, 395, 431];
const NP = 90;

const SEA_STAFF_CONFIG = [
  { y: 287, swell: '7.4s', drift: '13.5s', gold: '17.5s', tide: '5.6s', delay: '0s' },
  { y: 322, swell: '8.6s', drift: '15.2s', gold: '19.4s', tide: '6.4s', delay: '-1.8s' },
  { y: 358, swell: '9.8s', drift: '16.8s', gold: '21.0s', tide: '7.2s', delay: '-3.4s' },
  { y: 395, swell: '8.1s', drift: '14.4s', gold: '18.2s', tide: '6.0s', delay: '-5.1s' },
  { y: 431, swell: '9.2s', drift: '16.0s', gold: '20.2s', tide: '6.8s', delay: '-2.6s' },
];

// Seamless 2-period sinusoidal wave paths (viewBox 0..1440 x 0..22, period = 720)
const SEA_PRIMARY_WAVE_PATH =
  'M 0 11 C 180 4.5, 180 4.5, 360 11 C 540 17.5, 540 17.5, 720 11 C 900 4.5, 900 4.5, 1080 11 C 1260 17.5, 1260 17.5, 1440 11';
const SEA_GOLD_CREST_PATH =
  'M 0 11 C 180 16.5, 180 16.5, 360 11 C 540 5.5, 540 5.5, 720 11 C 900 16.5, 900 16.5, 1080 11 C 1260 5.5, 1260 5.5, 1440 11';

interface MotionItem {
  el: HTMLElement;
  o: HTMLElement;
  t: 'b' | 'n';
  k: number;
  p: number;
  v: number;
  on: number;
  s?: number;
}

interface RippleRing {
  x: number;
  y: number;
  r: number;
  a: number;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [titleOn, setTitleOn] = useState(false);

  const motionStageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const bandOuterRefs = useRef<Array<HTMLDivElement | null>>([]);
  const bandInnerRefs = useRef<Array<HTMLElement | null>>([]);
  const nlOuterRef = useRef<HTMLDivElement | null>(null);
  const nlInnerRef = useRef<HTMLElement | null>(null);
  const nrOuterRef = useRef<HTMLDivElement | null>(null);
  const nrInnerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 40);
    return () => clearTimeout(timer);
  }, []);

  // Lightweight 1D string pluck physics, ripple rings & 7-band wordmark entrance
  // Continuous calm-sea staff wave runs on the GPU via CSS @keyframes (.hero-sea-staff-*)
  useEffect(() => {
    const stageEl = motionStageRef.current;
    const cv = canvasRef.current;
    const logo = logoRef.current;
    const nlOuter = nlOuterRef.current;
    const nlInner = nlInnerRef.current;
    const nrOuter = nrOuterRef.current;
    const nrInner = nrInnerRef.current;

    if (!stageEl || !cv || !logo || !nlOuter || !nlInner || !nrOuter || !nrInner) {
      return;
    }

    const cx = cv.getContext('2d');
    if (!cx) return;

    const rm =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const items: MotionItem[] = [];
    for (let i = 0; i < NB; i++) {
      const outer = bandOuterRefs.current[i];
      const inner = bandInnerRefs.current[i];
      if (outer && inner) {
        items.push({
          el: inner,
          o: outer,
          t: 'b',
          k: Math.round((i * 4) / (NB - 1)),
          p: 1,
          v: 0,
          on: 0,
        });
      }
    }

    items.push({
      el: nlInner,
      o: nlOuter,
      t: 'n',
      k: 1,
      p: 1,
      v: 0,
      on: 0,
      s: -1,
    });
    items.push({
      el: nrInner,
      o: nrOuter,
      t: 'n',
      k: 3,
      p: 1,
      v: 0,
      on: 0,
      s: 1,
    });

    const U: Float32Array[] = [];
    const V: Float32Array[] = [];
    const EK = [0, 0, 0, 0, 0];
    const rings: RippleRing[] = [];

    for (let k = 0; k < 5; k++) {
      U.push(new Float32Array(NP));
      V.push(new Float32Array(NP));
    }

    let W = 0;
    let H = 0;
    let stageLeft = 0;
    let stageTop = 0;
    let logoTop = 0;
    let logoHeight = 320;
    let dpr = 1;
    let px = 0;
    let lx = -1;
    let ly = -1;
    let rafId = 0;
    let introComplete = false;
    const timeouts: number[] = [];

    const updateMetrics = () => {
      const stageRect = stageEl.getBoundingClientRect();
      const b = logo.getBoundingClientRect();
      stageLeft = stageRect.left;
      stageTop = stageRect.top;
      W = Math.max(1, stageRect.width || window.innerWidth);
      H = Math.max(1, stageRect.height || 420);
      logoTop = b.top - stageRect.top;
      logoHeight = Math.max(1, b.height);
    };

    const rs = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      updateMetrics();
      cv.width = W * dpr;
      cv.height = H * dpr;
    };

    rs();
    window.addEventListener('resize', rs, { passive: true });
    window.addEventListener('scroll', updateMetrics, { passive: true });

    const by = (k: number) => logoTop + (SY[k] / 450) * logoHeight;

    const wakeLoop = () => {
      if (!rafId && !rm) {
        rafId = window.requestAnimationFrame(fr);
      }
    };

    const pluck = (k: number, f: number, a: number, y: number) => {
      const c = f * (NP - 1);
      for (let j = 1; j < NP - 1; j++) {
        const d = (j - c) / 6;
        U[k][j] += a * Math.exp(-d * d);
      }
      rings.push({ x: f * W, y, r: 4, a: 1 });
      const now = performance.now();
      items.forEach((it, ix) => {
        if (it.k === k) {
          if (!it.on) {
            it.on = now + ix * 90;
          } else {
            it.v -= 0.012;
          }
        }
      });
      wakeLoop();
    };

    const strum = (first?: boolean) => {
      updateMetrics();
      for (let k = 0; k < 5; k++) {
        const tid = window.setTimeout(() => {
          pluck(k, 0.3 + Math.random() * 0.4, (k % 2 ? -1 : 1) * 14, by(k));
        }, k * 210);
        timeouts.push(tid);
      }
      if (first) {
        const tid = window.setTimeout(() => {
          setTitleOn(true);
        }, 1500);
        timeouts.push(tid);
        const doneId = window.setTimeout(() => {
          introComplete = true;
        }, 4200);
        timeouts.push(doneId);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const x = e.clientX - stageLeft;
      const y = e.clientY - stageTop;
      if (W > 0) {
        px = x / W - 0.5;
      }
      if (lx >= 0 && y >= -20 && y <= H + 20) {
        for (let k = 0; k < 5; k++) {
          const yy = by(k);
          if ((ly - yy) * (y - yy) < 0) {
            pluck(
              k,
              Math.max(0.02, Math.min(0.98, x / W)),
              Math.max(-16, Math.min(16, (y - ly) * 0.75)),
              yy
            );
          }
        }
      }
      lx = x;
      ly = y;
    };

    const handlePointerLeave = () => {
      lx = -1;
      ly = -1;
    };

    stageEl.addEventListener('pointermove', handlePointerMove, { passive: true });
    stageEl.addEventListener('pointerleave', handlePointerLeave);

    if (rm) {
      items.forEach((it) => {
        it.el.style.opacity = '1';
      });
      setTitleOn(true);
    } else {
      const firstId = window.setTimeout(() => strum(true), 550);
      timeouts.push(firstId);
    }

    const fr = (now: number) => {
      rafId = 0;
      const T = now / 1000;
      const sc = logoHeight / 450;

      const isDark =
        document.documentElement.classList.contains('dark') ||
        document.documentElement.getAttribute('data-theme') === 'dark';

      // Brand palette: #BF1C2C (Chang Crimson) & #C29B53 (Burnished Gold)
      const I = isDark ? [245, 240, 234] : [20, 20, 20];
      const Rr = [191, 28, 44]; // #BF1C2C

      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx.clearRect(0, 0, W, H);
      cx.lineCap = 'round';

      let totalEnergy = 0;

      for (let k = 0; k < 5; k++) {
        const u = U[k];
        const v = V[k];
        const y0 = logoTop + SY[k] * sc;
        let en = 0;

        for (let s = 0; s < 3; s++) {
          for (let j = 1; j < NP - 1; j++) {
            v[j] = (v[j] + (u[j - 1] + u[j + 1] - 2 * u[j]) * 0.22 - u[j] * 0.0012) * 0.99;
          }
          for (let j = 1; j < NP - 1; j++) {
            u[j] += v[j];
          }
        }

        for (let j = 1; j < NP; j++) {
          en += Math.abs(v[j]) + Math.abs(u[j]) * 0.08;
        }
        EK[k] = EK[k] * 0.88 + Math.min(1, (en / NP) * 5) * 0.12;
        totalEnergy += EK[k];

        // Only draw plucked string harmonic overlay when actively vibrating
        if (EK[k] > 0.004) {
          cx.save();
          cx.globalAlpha = Math.min(0.9, EK[k] * 2.2);
          cx.strokeStyle = k % 2 === 0 ? '#BF1C2C' : '#C29B53';
          cx.lineWidth = Math.max(1.6, sc * 2.8);
          cx.beginPath();
          cx.moveTo(0, y0);
          for (let j = 1; j < NP; j++) {
            cx.lineTo((W * j) / (NP - 1), y0 + u[j]);
          }
          cx.stroke();
          cx.restore();
        }
      }

      cx.lineWidth = Math.max(1.5, sc * 2);
      for (let r = rings.length - 1; r >= 0; r--) {
        const g = rings[r];
        g.r += sc * 3;
        g.a *= 0.95;
        if (g.a < 0.03) {
          rings.splice(r, 1);
          continue;
        }
        cx.globalAlpha = g.a;
        cx.strokeStyle = r % 2 === 0 ? '#BF1C2C' : '#C29B53';
        cx.beginPath();
        cx.arc(g.x, g.y, g.r, 0, 6.283);
        cx.stroke();
      }
      cx.globalAlpha = 1;

      let settlingBands = false;
      if (!rm) {
        items.forEach((it, ix) => {
          if (it.on && now >= it.on) {
            for (let s = 0; s < 2; s++) {
              it.v += -it.p * 0.0012;
              it.v *= 0.945;
              it.p += it.v;
            }
            if (Math.abs(it.p) > 0.002 || Math.abs(it.v) > 0.0005) {
              settlingBands = true;
            } else {
              it.p = 0;
              it.v = 0;
            }
          } else {
            settlingBands = true;
          }
          const e = EK[it.k];
          const o = it.on && now >= it.on ? Math.max(0, Math.min(1, (1 - it.p) * 1.8)) : 0;
          it.el.style.opacity = String(o);

          if (it.t === 'b') {
            const m = Math.sin(T * 0.7) * 0.25 + px * 0.6;
            const od = ix - (NB - 1) / 2;
            const wob = U[it.k][45] * 0.25;
            it.el.style.transform = `translate3d(${it.p * 16}%, 0, 0)`;
            it.o.style.transform = `translate3d(${
              m * od * 10 * sc
            }px, ${wob}px, 0)`;
          } else {
            const bob = e * 14 * sc;
            it.el.style.transform = `scale(${1 - 0.7 * it.p})`;
            it.o.style.transform = `translate3d(0, ${-bob}px, 0) rotate(${(it.s || 1) * e * 4}deg)`;
          }

          const f = Math.min(1, e * 1.5);
          it.el.style.background = `rgb(${Math.round(I[0] + (Rr[0] - I[0]) * f)},${Math.round(
            I[1] + (Rr[1] - I[1]) * f
          )},${Math.round(I[2] + (Rr[2] - I[2]) * f)})`;
        });
      } else {
        items.forEach((it) => {
          it.el.style.background = `rgb(${I[0]},${I[1]},${I[2]})`;
        });
      }

      // Automatically pause RAF loop when pluck energy & entrance settle to keep CPU at 0%
      if (!introComplete || settlingBands || totalEnergy > 0.012 || rings.length > 0) {
        rafId = window.requestAnimationFrame(fr);
      }
    };

    wakeLoop();

    return () => {
      window.removeEventListener('resize', rs);
      window.removeEventListener('scroll', updateMetrics);
      stageEl.removeEventListener('pointermove', handlePointerMove);
      stageEl.removeEventListener('pointerleave', handlePointerLeave);
      if (rafId) window.cancelAnimationFrame(rafId);
      timeouts.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  const handlePortalClick = (e: React.MouseEvent, view: ConservatoryViewId) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(view);
    }
  };

  const hallPortals: Array<{
    id: ConservatoryViewId;
    index: string;
    title: string;
    subtitle: string;
    meta: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    {
      id: 'courses',
      index: '۰۱',
      title: 'سازها و دوره‌ها',
      subtitle: 'پیانو، تار، ویولن، گیتار، ارف و آواز',
      meta: '۷ دپارتمان',
      icon: Music,
    },
    {
      id: 'teachers',
      index: '۰۲',
      title: 'اساتید و کادر علمی',
      subtitle: 'رزومه و سوابق اساتید کنسرواتوار',
      meta: 'کادر مجرب',
      icon: GraduationCap,
    },
    {
      id: 'story',
      index: '۰۳',
      title: 'پیشینه و رسالت چنگ',
      subtitle: 'پنج دهه اصالت هنری از سال ۱۳۵۰',
      meta: 'تأسیس ۱۳۵۰',
      icon: History,
    },
    {
      id: 'stats',
      index: '۰۴',
      title: 'شاخص‌ها و آمار رسمی',
      subtitle: 'کارنامه آموزشی و دست‌آوردهای هنرجویان',
      meta: 'کارنامه رسمی',
      icon: BarChart3,
    },
    {
      id: 'events',
      index: '۰۵',
      title: 'کنسرت‌ها و صحنه اجرا',
      subtitle: 'گالری ویدیو و تصاویر رسیتال‌های هنرجویی',
      meta: 'اجرای زنده',
      icon: Sparkles,
    },
    {
      id: 'contact',
      index: '۰۶',
      title: 'تعیین سطح و ثبت‌نام',
      subtitle: 'مشاوره واتساپ، رزرو حضوری و شهریه',
      meta: 'پذیرش فعال',
      icon: PhoneCall,
    },
  ];

  return (
    <section
      id="top"
      role="region"
      aria-labelledby="hero-heading"
      className="stage-3d-home relative w-full max-w-full min-h-[calc(100vh-74px)] flex flex-col justify-between bg-[#FBF9F6] dark:bg-[#0B0909] text-[#141414] dark:text-[#f5f0ea] pb-8 lg:pb-10 overflow-hidden select-none transition-colors"
    >
      {/* =========================================================================
          FULL-WIDTH FRAMELESS CHANG MOTION HEADER (چنگ | هدر موشن ۳ — بدون کادر)
          ========================================================================= */}
      <div
        ref={motionStageRef}
        aria-label="آموزشگاه موسیقی چنگ"
        className="relative w-full min-h-[350px] sm:min-h-[420px] lg:min-h-[460px] grid place-items-center overflow-hidden pt-2 pb-3"
      >
        {/* Shared SVG Gradient Definition for the 5 Calm-Sea Staff Lines (#BF1C2C & #C29B53) */}
        <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
          <defs>
            <linearGradient id="chang-sea-staff-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#BF1C2C" stopOpacity="0.92" />
              <stop offset="25%" stopColor="#C29B53" stopOpacity="0.88" />
              <stop offset="50%" stopColor="#BF1C2C" stopOpacity="0.95" />
              <stop offset="75%" stopColor="#C29B53" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#BF1C2C" stopOpacity="0.92" />
            </linearGradient>
            <linearGradient id="chang-sea-crest-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C29B53" stopOpacity="0.15" />
              <stop offset="30%" stopColor="#C29B53" stopOpacity="0.78" />
              <stop offset="50%" stopColor="#BF1C2C" stopOpacity="0.55" />
              <stop offset="70%" stopColor="#C29B53" stopOpacity="0.78" />
              <stop offset="100%" stopColor="#C29B53" stopOpacity="0.15" />
            </linearGradient>
          </defs>
        </svg>

        {/* Edge-to-edge full-width transparent canvas for interactive pluck ripples */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        {/* Frameless Centered Logo & Title Stack */}
        <div className="relative z-10 grid justify-items-center gap-[clamp(6px,1.5vw,16px)] w-full px-[4vw]">
          {/* 1080/450 Chang Calligraphy Wordmark (5 calm-sea staff lines + 7 wave bands + 2 dancing notes) */}
          <div
            ref={logoRef}
            role="img"
            aria-label="لوگوی چنگ"
            className="relative w-[min(92vw,960px,calc(40vh*2.4))] aspect-[1080/450]"
          >
            {/* 5 GPU-Accelerated Calm-Sea Musical Staff Lines (#BF1C2C & #C29B53) */}
            <div
              dir="ltr"
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
            >
              {SEA_STAFF_CONFIG.map((cfg, idx) => (
                <div
                  key={idx}
                  className="hero-sea-staff-row"
                  style={
                    {
                      top: `${(cfg.y / 450) * 100}%`,
                      '--sea-swell-duration': cfg.swell,
                      '--sea-drift-duration': cfg.drift,
                      '--sea-gold-duration': cfg.gold,
                      '--sea-tide-duration': cfg.tide,
                      '--sea-delay': cfg.delay,
                    } as React.CSSProperties
                  }
                >
                  <svg
                    viewBox="0 0 1440 22"
                    preserveAspectRatio="none"
                    className="hero-sea-staff-track"
                  >
                    <path
                      d={SEA_PRIMARY_WAVE_PATH}
                      fill="none"
                      stroke="url(#chang-sea-staff-grad)"
                      strokeWidth="2.1"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                  <svg
                    viewBox="0 0 1440 22"
                    preserveAspectRatio="none"
                    className="hero-sea-staff-track-gold"
                  >
                    <path
                      d={SEA_GOLD_CREST_PATH}
                      fill="none"
                      stroke="url(#chang-sea-crest-grad)"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>
              ))}
            </div>

            {Array.from({ length: NB }).map((_, i) => {
              const aPct = `${(i * 100) / NB}%`;
              const bPct = `${100 - ((i + 1) * 100) / NB + 0.3}%`;
              return (
                <div
                  key={i}
                  ref={(el) => {
                    bandOuterRefs.current[i] = el;
                  }}
                  style={{
                    clipPath: `inset(${aPct} 0 ${bPct} 0)`,
                  }}
                  className="absolute inset-0 will-change-transform z-10"
                >
                  <i
                    ref={(el) => {
                      bandInnerRefs.current[i] = el;
                    }}
                    style={{
                      WebkitMask: `${CHANG_WORDMARK_MASK} center / 100% 100% no-repeat`,
                      mask: `${CHANG_WORDMARK_MASK} center / 100% 100% no-repeat`,
                      opacity: 0,
                    }}
                    className="absolute inset-0 block bg-[#141414] dark:bg-[#f5f0ea]"
                  />
                </div>
              );
            })}

            {/* Left Musical Note (.p.nl) */}
            <div
              ref={nlOuterRef}
              className="absolute inset-0 will-change-transform z-10"
            >
              <i
                ref={nlInnerRef}
                style={{
                  WebkitMask: `${CHANG_LEFT_NOTE_MASK} center / 100% 100% no-repeat`,
                  mask: `${CHANG_LEFT_NOTE_MASK} center / 100% 100% no-repeat`,
                  transformOrigin: '15% 90%',
                  opacity: 0,
                }}
                className="absolute inset-0 block bg-[#141414] dark:bg-[#f5f0ea]"
              />
            </div>

            {/* Right Musical Note (.p.nr) */}
            <div
              ref={nrOuterRef}
              className="absolute inset-0 will-change-transform z-10"
            >
              <i
                ref={nrInnerRef}
                style={{
                  WebkitMask: `${CHANG_RIGHT_NOTE_MASK} center / 100% 100% no-repeat`,
                  mask: `${CHANG_RIGHT_NOTE_MASK} center / 100% 100% no-repeat`,
                  transformOrigin: '85% 90%',
                  opacity: 0,
                }}
                className="absolute inset-0 block bg-[#141414] dark:bg-[#f5f0ea]"
              />
            </div>
          </div>

          {/* Motion Header Title & Subtitle (.t, .t1, .t2) */}
          <div
            className={`grid justify-items-center gap-1.5 text-center transition-all duration-[1600ms] ease-[cubic-bezier(.2,.9,.2,1)] ${
              titleOn
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-[22px]'
            }`}
          >
            <h1
              id="hero-heading"
              className="font-black text-[clamp(26px,5.5vw,60px)] leading-[1.18] tracking-[-0.02em] text-[#141414] dark:text-[#f5f0ea]"
            >
              آموزشگاه موسیقی
            </h1>
            <p className="flex items-center justify-center gap-3.5 font-medium text-[clamp(13px,2vw,21px)] text-[#141414] dark:text-[#f5f0ea]">
              <b className="w-[clamp(24px,5vw,60px)] h-[3px] bg-[#BF1C2C] dark:bg-[#E04858] inline-block" />
              <span>خرمشهر · نزدیک به نیم‌قرن آموزش موسیقی</span>
              <b className="w-[clamp(24px,5vw,60px)] h-[3px] bg-[#BF1C2C] dark:bg-[#E04858] inline-block" />
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MINIMALIST LOWER SECTION: HARMONIZED ACTIONS & 6 HALL CARDS
          ========================================================================= */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col gap-6">
        {/* Minimalist Action Row & Clean Unboxed Branch Strip */}
        <div
          className={`flex flex-col items-center gap-3.5 hero-reveal-base ${
            isVisible ? 'hero-reveal-active' : ''
          }`}
          style={{ transitionDelay: '0.1s' }}
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#courses"
              onClick={(e) => handlePortalClick(e, 'courses')}
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#BF1C2C] hover:bg-[#9E1523] active:scale-98 text-white font-bold text-[14px] sm:text-[15px] shadow-[0_10px_24px_-6px_rgba(191,28,44,0.4)] transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>سازها و دوره‌های آموزشی</span>
              <ChevronLeft className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              onClick={(e) => handlePortalClick(e, 'contact')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-[#151211] text-[#141414] dark:text-[#f5f0ea] border border-[#E5DDD2] dark:border-white/15 hover:border-[#BF1C2C] dark:hover:border-[#E04858] font-bold text-[14px] sm:text-[15px] transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>تعیین سطح و مشاوره ثبت‌نام</span>
            </a>
          </div>

          {/* Quiet Editorial Branch Line (No Boxes, Clean Separators) */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12px] sm:text-[13px] text-[#544D49] dark:text-[#B8B0A6]">
            <button
              type="button"
              onClick={(e) => handlePortalClick(e, 'contact')}
              className="hover:text-[#BF1C2C] dark:hover:text-[#E04858] transition-colors cursor-pointer"
            >
              <strong className="font-bold text-[#141414] dark:text-[#f5f0ea]">شعبه خرمشهر:</strong> میدان فرمانداری، مجتمع خلیج فارس
            </button>
            <span aria-hidden="true" className="text-[#BF1C2C] dark:text-[#E04858] font-bold">·</span>
            <button
              type="button"
              onClick={(e) => handlePortalClick(e, 'contact')}
              className="hover:text-[#BF1C2C] dark:hover:text-[#E04858] transition-colors cursor-pointer"
            >
              <strong className="font-bold text-[#141414] dark:text-[#f5f0ea]">شعبه آبادان:</strong> سه‌راه شاملو، نبش زمین چمن
            </button>
            <span aria-hidden="true" className="hidden sm:inline text-[#BF1C2C] dark:text-[#E04858] font-bold">·</span>
            <span className="hidden sm:inline">مجوز رسمی درجه یک وزارت فرهنگ و ارشاد</span>
          </div>
        </div>

        {/* 6 Unified Hall Cards (Harmonized with #FBF9F6 / #141414 / #BF1C2C) */}
        <div
          className={`pt-4 border-t border-[#141414]/10 dark:border-white/10 hero-reveal-base ${
            isVisible ? 'hero-reveal-active' : ''
          }`}
          style={{ transitionDelay: '0.18s' }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {hallPortals.map((portal) => {
              const Icon = portal.icon;
              return (
                <button
                  key={portal.id}
                  type="button"
                  onClick={(e) => handlePortalClick(e, portal.id)}
                  className="group text-right p-3.5 sm:p-4 rounded-2xl bg-white/90 dark:bg-[#141110] border border-[#E5DDD2] dark:border-white/10 hover:border-[#BF1C2C] dark:hover:border-[#E04858] flex flex-col justify-between gap-3 transition-all duration-200 hover:-translate-y-1 shadow-[0_6px_20px_-8px_rgba(20,20,20,0.06)] hover:shadow-[0_14px_28px_-10px_rgba(191,28,44,0.16)] cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="w-8 h-8 rounded-lg bg-[#BF1C2C]/8 dark:bg-[#E04858]/15 text-[#BF1C2C] dark:text-[#E04858] group-hover:bg-[#BF1C2C] group-hover:text-white transition-colors flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-medium text-[#5C534B] dark:text-[#B8B0A6] tabular-nums">
                      {portal.index} <span aria-hidden="true">·</span> {portal.meta}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[14px] sm:text-[15px] font-extrabold text-[#141414] dark:text-[#f5f0ea] group-hover:text-[#BF1C2C] dark:group-hover:text-[#E04858] transition-colors truncate">
                        {portal.title}
                      </span>
                      <ChevronLeft className="w-3.5 h-3.5 text-[#BF1C2C] dark:text-[#E04858] opacity-60 group-hover:opacity-100 group-hover:-translate-x-1 transition-all shrink-0" />
                    </div>
                    <p className="text-[11px] sm:text-[12px] text-[#5C534B] dark:text-[#B8B0A6] truncate mt-1">
                      {portal.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
