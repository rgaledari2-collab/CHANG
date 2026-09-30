import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  ArrowLeft, 
  ZoomIn, 
  Award
} from 'lucide-react';
import { EVENTS_DATA } from '../data';
import { LightboxData } from './Lightbox';

interface EventsProps {
  onOpenLightbox?: (data: LightboxData) => void;
}

// Low-quality placeholder (LQIP) under 1KB base64 for instant zero-wait perceived render
const LQIP_DATA = "data:image/webp;base64,UklGRqQAAABXRUJQVlA4IJgAAAAQBACdASogAA8APzmGuVOvKSWisAgB4CcJagCuHGjseX1BEjxGm+3gyAD+9pcsznLxBx8dqsabof5CTs1ohUfvjoZw5nCg+fLoqUHkbt56WemACf6lNcpATqpDa/vQr66GEOo8kdVFkTIfWKinfu1Zv7cf9mqUWGx/HEtYGOIgiTbItNvBKSV4Bl7BSj2JcP8DlcTlAAkgAA==";

export const Events: React.FC<EventsProps> = ({ onOpenLightbox }) => {
  const event = EVENTS_DATA[0];
  const [isInViewport, setIsInViewport] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Lazy load the high-res poster only when the section approaches viewport
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
        subtitle: `${event.daySolar} ${event.dateSolar} • ${event.location} • آموزشگاه موسیقی چنگ`,
        badge: event.type,
        actionText: 'رزرو صندلی یا ثبت‌نام در اجرا',
        onAction: () => {
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
        },
      });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="events" 
      className="py-20 lg:py-24 bg-[#3B1720] text-[#FCF8F8] border-b border-white/10"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header with Numbering */}
        <div className="max-w-2xl mb-10 text-right">
          <div className="inline-flex items-center gap-2 text-[13px] font-bold text-[#F3C7CA] mb-2 tracking-tight">
            <span className="font-mono text-[14px]">۰۴</span>
            <span>/</span>
            <span>رویدادها، صحنه و اجرای زنده</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white leading-[1.10] tracking-[-0.025em] mb-3 [text-wrap:balance]">
            از تمرین تا صحنه؛ <span className="text-[#F3C7CA]">شور اجرای زنده.</span>
          </h2>
          <p className="text-[17px] text-[#E8DFE0] font-normal leading-[1.5] [text-wrap:pretty]">
            نواختن روی صحنه، کمال فرآیند یادگیری موسیقی است. در آموزشگاه چنگ، سالانه کنسرت‌های حرفه‌ای هنرجویی با سن، نورپردازی و صدابرداری زنده برای تثبیت اعتمادبه‌نفس برگزار می‌شود.
          </p>
        </div>

        {/* Edge-to-Edge Cinematic Poster / Stage Tile */}
        <div className="relative rounded-[22px] overflow-hidden apple-product-shadow border border-white/20 group bg-[#290f16] shadow-2xl">
          <div
            className="aspect-[16/8] sm:aspect-[16/7] w-full overflow-hidden bg-[#1E080F] relative cursor-zoom-in group/poster"
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
            {/* Instant Blur-up placeholder while main image stream completes */}
            <div 
              className={`absolute inset-0 bg-cover bg-center filter blur-lg transition-opacity duration-500 scale-105 pointer-events-none ${
                imageLoaded ? 'opacity-0' : 'opacity-100'
              }`}
              style={{ backgroundImage: `url("${LQIP_DATA}")` }}
            />

            {/* Lazy Load Picture Tag: only loads network bytes when section enters viewport */}
            {isInViewport && (
              <picture>
                {/* Mobile (< 640px) receives 35KB WebP */}
                <source
                  media="(max-width: 640px)"
                  srcSet="IMG_0549_640.webp"
                  type="image/webp"
                />
                {/* Tablet & Small Desktop (< 1100px) receives 87KB WebP */}
                <source
                  media="(max-width: 1100px)"
                  srcSet="IMG_0549_1100.webp"
                  type="image/webp"
                />
                {/* Desktop & Retina receives 175KB WebP */}
                <source
                  srcSet="IMG_0549_1600.webp"
                  type="image/webp"
                />
                {/* Fallback img with lazy loading */}
                <img
                  src="IMG_0549_1600.webp"
                  alt={event.title}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => setImageLoaded(true)}
                  className={`w-full h-full object-cover object-center group-hover:scale-102 transition-all duration-700 ease-out ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </picture>
            )}

            {/* Subtle Gradient Vignette at bottom for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#200A13]/85 via-transparent to-black/20 pointer-events-none" />

            {/* Top Right: Official Stage Badge */}
            <div className="absolute top-4 right-4 z-20">
              <span className="bg-[#200A13]/90 backdrop-blur-md text-[#F7D898] border border-[#DA9E4A]/40 px-3.5 py-1.5 rounded-full text-[12px] font-bold flex items-center gap-1.5 shadow-xl">
                <Award className="w-3.5 h-3.5 text-[#DA9E4A]" />
                <span>اجرای رسمی جشنواره فجر</span>
              </span>
            </div>

            {/* Top Left: Clean Zoom Cue */}
            <div className="absolute top-4 left-4 z-20 opacity-0 group-hover/poster:opacity-100 transition-opacity duration-200">
              <span className="bg-[#FCF8F8] text-[#202124] border border-[#E8DFE0] px-3.5 py-1.5 rounded-full text-[13px] font-semibold flex items-center gap-1.5 shadow-xl">
                <ZoomIn className="w-3.5 h-3.5 text-[#B92B3A]" />
                <span>بزرگنمایی تصویر اصلی</span>
              </span>
            </div>
          </div>

          {/* Frosted Editorial Bar at Bottom */}
          <div className="bg-[#250912]/95 backdrop-blur-xl border-t border-white/15 p-6 sm:p-8 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="flex items-start sm:items-center gap-5 sm:gap-6 text-right">
              {/* Solar Date Indicator in Lacquer Red / Blush */}
              <div className="text-center pl-5 sm:pl-6 border-l border-white/20 flex-shrink-0">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#F3C7CA] leading-none block mb-1">
                  {event.daySolar}
                </span>
                <span className="text-[13px] text-[#FCF8F8] font-medium block">
                  {event.dateSolar}
                </span>
              </div>

              <div>
                <span className="text-[12px] text-[#F3C7CA] font-bold block mb-1">
                  {event.type}
                </span>
                <h3
                  className="text-xl sm:text-2xl font-bold text-white mb-1.5 hover:text-[#F3C7CA] cursor-pointer transition-colors"
                  onClick={handleOpenEventLightbox}
                >
                  {event.title}
                </h3>
                <p className="text-[14px] text-[#E8DFE0] max-w-2xl leading-relaxed">
                  {event.description}
                </p>
                <div className="flex items-center gap-1.5 text-[12px] sm:text-[13px] text-[#F3C7CA] mt-2 font-medium">
                  <MapPin className="w-4 h-4 text-[#FFB3BA] shrink-0" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>

            {/* Primary Action Button in Lacquer Red */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-[24px] py-[13px] rounded-full bg-[#B92B3A] hover:bg-[#A52432] text-white text-[15px] font-semibold transition-all active:scale-95 flex-shrink-0 shadow-lg self-start lg:self-auto"
            >
              <span>رزرو صندلی یا ثبت‌نام در اجرا</span>
              <ArrowLeft className="w-4 h-4" />
            </a>

          </div>
        </div>

      </div>
    </section>
  );
};
