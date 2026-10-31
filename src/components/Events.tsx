import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  ArrowLeft,
  ZoomIn,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Film,
  Camera,
} from 'lucide-react';
import { EVENTS_DATA } from '../data';
import { LightboxData } from './Lightbox';

interface EventsProps {
  onOpenLightbox?: (data: LightboxData) => void;
}

const LQIP_DATA =
  'data:image/webp;base64,UklGRqQAAABXRUJQVlA4IJgAAAAQBACdASogAA8APzmGuVOvKSWisAgB4CcJagCuHGjseX1BEjxGm+3gyAD+9pcsznLxBx8dqsabof5CTs1ohUfvjoZw5nCg+fLoqUHkbt56WemACf6lNcpATqpDa/vQr66GEOo8kdVFkTIfWKinfu1Zv7cf9mqUWGx/HEtYGOIgiTbItNvBKSV4Bl7BSj2JcP8DlcTlAAkgAA==';

interface RecitalGalleryItem {
  id: string;
  index: string;
  title: string;
  caption: string;
  location: string;
  date: string;
  image: string;
}

const RECITAL_GALLERY_ITEMS: RecitalGalleryItem[] = [
  {
    id: 'g1',
    index: '۰۱',
    title: 'همنوازی و گروه سرود هنرجویان در جشنواره فجر',
    caption: 'اجرای صحنه‌ای ارکستر کودک و نوجوان آموزشگاه موسیقی چنگ با حضور خانواده‌ها و اساتید.',
    location: 'تالار خلیج فارس خرمشهر',
    date: 'بهمن ۱۴۰۳',
    image: 'IMG_0549_1600.webp',
  },
  {
    id: 'g2',
    index: '۰۲',
    title: 'تمرین آنسامبل و آمادگی پیش از رسیتال فصلی',
    caption: 'هماهنگی ریتم، کوک و پارت‌خوانی گروهی هنرجویان پیش از ورود به صحنه کنسرت.',
    location: 'پلاتو مرکزی چنگ · خرمشهر',
    date: 'پاییز ۱۴۰۳',
    image: 'story_practice.webp',
  },
  {
    id: 'g3',
    index: '۰۳',
    title: 'رسیتال سازهای اصیل ایرانی و کلاسیک',
    caption: 'تکنوازی و دونوازی تار، سه‌تار، پیانو و ویولن توسط هنرجویان دوره‌های متوسطه و عالی.',
    location: 'شعبه خرمشهر و آبادان',
    date: 'تابستان ۱۴۰۳',
    image: 'story_instruments.webp',
  },
  {
    id: 'g4',
    index: '۰۴',
    title: 'کارگاه تخصصی مضراب‌شناسی و بداهه‌نوازی',
    caption: 'نشست عملی تحلیل ردیف و تکنیک‌های اجرایی صحنه ویژه هنرجویان سازهای زهی.',
    location: 'شعبه آبادان · سه‌راه شاملو',
    date: 'بهار ۱۴۰۳',
    image: 'teacher_mehdi.webp',
  },
];

export const Events: React.FC<EventsProps> = ({ onOpenLightbox }) => {
  const event = EVENTS_DATA[0];
  const [isInViewport, setIsInViewport] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setIsInViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInViewport(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '250px 0px',
        threshold: 0.01,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleOpenEventLightbox = () => {
    if (onOpenLightbox) {
      onOpenLightbox({
        src: 'IMG_0549_optimized.webp',
        title: event.title,
        subtitle: `${event.daySolar} ${event.dateSolar} · ${event.location} · آموزشگاه موسیقی چنگ`,
        badge: event.type,
        actionText: 'رزرو صندلی یا ثبت‌نام در اجرا',
        onAction: () => {
          window.location.hash = '#contact';
        },
      });
    }
  };

  const handleOpenGalleryItem = (item: RecitalGalleryItem) => {
    if (onOpenLightbox) {
      onOpenLightbox({
        src: item.image,
        title: item.title,
        subtitle: `${item.date} · ${item.location} · ${item.caption}`,
        badge: 'آرشیو رسیتال‌های چنگ',
        actionText: 'ثبت‌نام در دوره‌های اجرایی',
        onAction: () => {
          window.location.hash = '#contact';
        },
      });
    }
  };

  const toggleVideoPlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().then(() => setIsPlayingVideo(true)).catch(() => {});
    } else {
      vid.pause();
      setIsPlayingVideo(false);
    }
  };

  const toggleVideoMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setIsVideoMuted(vid.muted);
  };

  return (
    <section
      ref={sectionRef}
      id="events"
      className="py-16 lg:py-22 bg-[#1A0D10] text-[#FCF8F8] border-b border-white/10"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Editorial Section Header */}
        <div className="max-w-2xl text-right">
          <div className="inline-flex items-center gap-2 text-[13px] font-medium text-[#E5C787] mb-2">
            <span className="font-mono tabular-nums">۰۵</span>
            <span aria-hidden="true">·</span>
            <span>صحنه اجرا، کنسرت‌ها و گالری رسیتال‌ها</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-white leading-[1.15] tracking-[-0.02em] mb-3 [text-wrap:balance]">
            از تمرین تا صحنه؛ شور اجرای زنده.
          </h2>
          <p className="text-[16px] sm:text-[17px] text-[#D8CFD0] font-normal leading-[1.65] [text-wrap:pretty]">
            نواختن روی صحنه، کمال فرآیند یادگیری موسیقی است. در آموزشگاه چنگ خرمشهر و آبادان، سالانه کنسرت‌های هنرجویی با سن، نورپردازی و صدابرداری استاندارد برگزار می‌شود.
          </p>
        </div>

        {/* Lead Stage Poster */}
        <div className="relative rounded-3xl overflow-hidden border border-white/15 group bg-[#12080B] shadow-2xl">
          <div
            className="aspect-[16/8] sm:aspect-[16/7] w-full overflow-hidden bg-[#12080B] relative cursor-zoom-in group/poster"
            onClick={handleOpenEventLightbox}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOpenEventLightbox();
              }
            }}
            title="مشاهده تصویر صحنه با وضوح بالا"
          >
            <div
              className={`absolute inset-0 bg-cover bg-center filter blur-lg transition-opacity duration-500 scale-105 pointer-events-none ${
                imageLoaded ? 'opacity-0' : 'opacity-100'
              }`}
              style={{ backgroundImage: `url("${LQIP_DATA}")` }}
            />

            {isInViewport && (
              <picture>
                <source
                  media="(max-width: 640px)"
                  srcSet="IMG_0549_640.webp"
                  type="image/webp"
                />
                <source
                  media="(max-width: 1100px)"
                  srcSet="IMG_0549_1100.webp"
                  type="image/webp"
                />
                <source srcSet="IMG_0549_1600.webp" type="image/webp" />
                <img
                  src="IMG_0549_1600.webp"
                  alt={event.title}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onLoad={() => setImageLoaded(true)}
                  className={`w-full h-full object-cover object-center group-hover:scale-102 transition-all duration-700 ease-out ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </picture>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

            <div className="absolute top-4 right-4 z-20 text-[12px] font-bold text-[#F7D898] bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/15">
              اجرای رسمی جشنواره موسیقی فجر · خرمشهر
            </div>

            <div className="absolute top-4 left-4 z-20 opacity-0 group-hover/poster:opacity-100 transition-opacity duration-200">
              <span className="bg-white text-[#141414] px-3.5 py-1.5 rounded-lg text-[12px] font-bold flex items-center gap-1.5 shadow-lg">
                <ZoomIn className="w-3.5 h-3.5 text-[#BF1C2C]" />
                <span>بزرگنمایی تصویر</span>
              </span>
            </div>
          </div>

          <div className="bg-[#15090D] border-t border-white/10 p-6 sm:p-8 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-5 sm:gap-6 text-right">
              <div className="text-center pl-5 sm:pl-6 border-l border-white/15 shrink-0">
                <span className="text-3xl sm:text-4xl font-black text-[#E5C787] leading-none block mb-1 tabular-nums">
                  {event.daySolar}
                </span>
                <span className="text-[13px] text-[#FCF8F8] font-medium block">
                  {event.dateSolar}
                </span>
              </div>

              <div>
                <div className="text-[12px] text-[#E5C787] font-medium mb-1">
                  {event.type}
                </div>
                <h3
                  className="text-xl sm:text-2xl font-extrabold text-white mb-1.5 hover:text-[#E5C787] cursor-pointer transition-colors"
                  onClick={handleOpenEventLightbox}
                >
                  {event.title}
                </h3>
                <p className="text-[14px] text-[#D8CFD0] max-w-2xl leading-relaxed">
                  {event.description}
                </p>
                <div className="flex items-center gap-1.5 text-[12px] sm:text-[13px] text-[#E5C787] mt-2 font-medium">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#BF1C2C] hover:bg-[#9E1523] text-white text-[14px] font-bold transition-all active:scale-95 shrink-0 shadow-lg self-start lg:self-auto whitespace-nowrap"
            >
              <span>ثبت‌نام در دوره‌ها و اجراها</span>
              <ArrowLeft className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Real Video Reel & Recital Photography Gallery */}
        <div className="pt-4 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-[12px] font-medium text-[#E5C787] mb-1.5">
                <Camera className="w-3.5 h-3.5" />
                <span>آرشیو مستند اجراهای هنرجویان · خرمشهر و آبادان</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                گالری ویدیو و تصاویر واقعی صحنه
              </h3>
            </div>
            <p className="text-[13px] text-[#D8CFD0] max-w-md">
              برای مشاهده هر تصویر با وضوح کامل، روی قاب مورد نظر کلیک کنید.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left/Right Column: Interactive Real Video Frame */}
            <div className="lg:col-span-5 rounded-2xl overflow-hidden bg-[#12080B] border border-white/15 flex flex-col justify-between group">
              <div
                onClick={toggleVideoPlay}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleVideoPlay();
                  }
                }}
                className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:flex-1 w-full bg-black overflow-hidden cursor-pointer min-h-[260px]"
              >
                {isInViewport && (
                  <video
                    ref={videoRef}
                    poster="IMG_0549_1100.webp"
                    muted={isVideoMuted}
                    loop
                    playsInline
                    preload="metadata"
                    onPlay={() => setIsPlayingVideo(true)}
                    onPause={() => setIsPlayingVideo(false)}
                    className="w-full h-full object-cover"
                  >
                    <source src="chang_hero_video.webm" type="video/webm" />
                    <source src="chang_hero_video.mp4" type="video/mp4" />
                  </video>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

                {/* Top Label */}
                <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 text-[11px] font-bold text-white bg-black/70 backdrop-blur-md px-3 py-1 rounded-md border border-white/15">
                  <Film className="w-3.5 h-3.5 text-[#E5C787]" />
                  <span>ویدیوی فضای آموزشی و صحنه چنگ</span>
                </div>

                {/* Mute/Unmute Toggle */}
                <button
                  type="button"
                  onClick={toggleVideoMute}
                  className="absolute top-3.5 left-3.5 w-9 h-9 rounded-lg bg-black/70 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-colors cursor-pointer z-20"
                  aria-label={isVideoMuted ? 'پخش صدای ویدیو' : 'قطع صدای ویدیو'}
                >
                  {isVideoMuted ? (
                    <VolumeX className="w-4 h-4 text-[#D8CFD0]" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-[#E5C787]" />
                  )}
                </button>

                {/* Center Play/Pause Button */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    className={`w-14 h-14 rounded-full bg-[#BF1C2C] text-white flex items-center justify-center shadow-xl border border-white/30 transition-transform duration-200 ${
                      isPlayingVideo ? 'scale-90 opacity-75 group-hover:opacity-100' : 'scale-100'
                    }`}
                  >
                    {isPlayingVideo ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6 translate-x-0.5" />
                    )}
                  </div>
                </div>
              </div>

              <div className="p-5 bg-[#15090D] border-t border-white/10">
                <div className="text-[11px] text-[#E5C787] font-medium mb-1">
                  نمای ویدیویی · کنسرواتوار چنگ
                </div>
                <h4 className="text-[16px] font-extrabold text-white mb-1">
                  شور تمرین و صحنه در شعب خرمشهر و آبادان
                </h4>
                <p className="text-[13px] text-[#D8CFD0] leading-relaxed">
                  گزیده‌ای از فضای کلاس‌های تخصصی، سازهای آکوستیک و آماده‌سازی هنرجویان برای اجرای صحنه‌ای.
                </p>
              </div>
            </div>

            {/* 4-Card Recital Photo Archive Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {RECITAL_GALLERY_ITEMS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleOpenGalleryItem(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOpenGalleryItem(item);
                    }
                  }}
                  className="group rounded-2xl overflow-hidden bg-[#15090D] border border-white/12 hover:border-[#E5C787]/60 flex flex-col justify-between transition-all cursor-zoom-in"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#12080B]">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 right-3 left-3 flex items-center justify-between text-[11px] text-[#F7D898]">
                      <span>
                        {item.index} <span aria-hidden="true">·</span> {item.location}
                      </span>
                      <span className="tabular-nums">{item.date}</span>
                    </div>
                  </div>

                  <div className="p-4 text-right flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-[14px] sm:text-[15px] font-extrabold text-white group-hover:text-[#E5C787] transition-colors mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[12px] text-[#D8CFD0] leading-relaxed line-clamp-2">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
