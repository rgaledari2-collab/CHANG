import React from 'react';
import { MapPin, ArrowLeft, ZoomIn } from 'lucide-react';
import { EVENTS_DATA } from '../data';
import { LightboxData } from './Lightbox';

interface EventsProps {
  onOpenLightbox?: (data: LightboxData) => void;
}

export const Events: React.FC<EventsProps> = ({ onOpenLightbox }) => {
  const event = EVENTS_DATA[0];

  const handleOpenEventLightbox = () => {
    if (onOpenLightbox) {
      onOpenLightbox({
        src: event.image.replace('w=1400', 'w=2000').replace('q=84', 'q=92'),
        title: event.title,
        subtitle: `${event.daySolar} ${event.dateSolar} • ${event.location || 'سالن همایش خرمشهر'} • آموزشگاه موسیقی چنگ`,
        badge: event.type,
        actionText: 'رزرو صندلی یا مشاوره',
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
    <section id="events" className="py-20 lg:py-24 bg-[#211F1E] text-white border-b border-[#D9D2CA]/20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header with Numbering */}
        <div className="max-w-2xl mb-10 text-right">
          <div className="inline-flex items-center gap-2 text-[13px] font-bold text-[#C93438] mb-2 tracking-tight">
            <span className="font-mono text-[14px]">۰۴</span>
            <span>/</span>
            <span>رویدادها، صحنه و اجرای زنده</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white leading-[1.10] tracking-[-0.025em] mb-3 [text-wrap:balance]">
            از تمرین تا صحنه؛ <span className="text-[#C93438]">شور اجرای زنده.</span>
          </h2>
          <p className="text-[17px] text-[#D9D2CA] font-normal leading-[1.5] [text-wrap:pretty]">
            نواختن روی صحنه، کمال فرآیند یادگیری موسیقی است. در آموزشگاه چنگ، سالانه کنسرت‌های حرفه‌ای هنرجویی با سن، نورپردازی و صدابرداری زنده برای تثبیت اعتمادبه‌نفس برگزار می‌شود.
          </p>
        </div>

        {/* Edge-to-Edge Cinematic Poster Tile */}
        <div className="relative rounded-[18px] overflow-hidden apple-product-shadow border border-[#D9D2CA]/30 group bg-[#181716]">
          <div
            className="aspect-[16/8] sm:aspect-[16/7] w-full overflow-hidden bg-black relative cursor-zoom-in group/poster"
            onClick={handleOpenEventLightbox}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOpenEventLightbox();
              }
            }}
            title="مشاهده پوستر کنسرت با وضوح بالا"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#211F1E]/95 via-[#211F1E]/40 to-transparent" />

            {/* Hover Zoom Cue Overlay */}
            <div className="absolute top-4 left-4 z-20 opacity-0 group-hover/poster:opacity-100 transition-opacity duration-200">
              <span className="bg-[#F4F1EB] text-[#211F1E] border border-[#D9D2CA] px-3.5 py-1.5 rounded-full text-[13px] font-semibold flex items-center gap-1.5 shadow-xl">
                <ZoomIn className="w-3.5 h-3.5 text-[#C93438]" />
                <span>مشاهده پوستر اصلی</span>
              </span>
            </div>
          </div>

          {/* Frosted Editorial Bar at Bottom */}
          <div className="absolute inset-x-0 bottom-0 bg-[#211F1E]/90 backdrop-blur-xl border-t border-[#D9D2CA]/20 p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            
            <div className="flex items-center gap-6">
              {/* Solar Date Indicator in Vivid Red */}
              <div className="text-center pl-6 border-l border-[#D9D2CA]/20 flex-shrink-0">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#C93438] leading-none block mb-1">
                  {event.daySolar}
                </span>
                <span className="text-[13px] text-[#F4F1EB] font-medium">
                  {event.dateSolar}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[12px] text-[#F6E4E1] font-bold block mb-1">
                  {event.type} · آموزشگاه موسیقی چنگ خرمشهر
                </span>
                <h3
                  className="text-xl sm:text-2xl font-bold text-white mb-1.5 hover:text-[#C93438] cursor-pointer transition-colors"
                  onClick={handleOpenEventLightbox}
                >
                  {event.title}
                </h3>
                <p className="text-[14px] text-[#D9D2CA] max-w-xl line-clamp-1 leading-relaxed">
                  {event.description}
                </p>
                <div className="flex items-center gap-1.5 text-[12px] text-[#F6E4E1] mt-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C93438]" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>

            {/* Primary Vivid Red Action Button */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-[24px] py-[12px] rounded-full bg-[#C93438] hover:bg-[#B82A2E] text-white text-[15px] font-semibold transition-all active:scale-95 flex-shrink-0 shadow-lg"
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
