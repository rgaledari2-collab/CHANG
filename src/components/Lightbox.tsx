import React, { useEffect, useRef } from 'react';
import { X, ArrowLeft } from 'lucide-react';

export interface LightboxData {
  src: string;
  title: string;
  subtitle?: string;
  badge?: string;
  actionText?: string;
  onAction?: () => void;
}

interface LightboxProps {
  data: LightboxData | null;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ data, onClose }) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (data) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [data, onClose]);

  if (!data) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`نمایش بزرگ‌نمایی تصویر ${data.title}`}
      className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl transition-opacity duration-200 cursor-zoom-out select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative max-w-[94vw] max-h-[94vh] flex flex-col items-center cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Circular translucent control button */}
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label="بستن پنجره بزرگ‌نمایی تصویر"
          title="بستن (Esc)"
          className="absolute -top-3.5 -left-3.5 sm:-top-4 sm:-left-4 z-50 w-11 h-11 rounded-full bg-white/20 hover:bg-white text-white hover:text-black border border-white/20 shadow-2xl flex items-center justify-center active:scale-95 transition-all duration-150 backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* High-Resolution Image Frame */}
        <div className="relative rounded-[18px] overflow-hidden apple-product-shadow border border-white/10 bg-black max-h-[76vh] sm:max-h-[80vh] flex items-center justify-center">
          <img
            src={data.src}
            alt={data.title}
            className="w-auto h-auto max-w-[92vw] max-h-[76vh] sm:max-h-[80vh] object-contain select-none"
            loading="eager"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Frosted Caption Bar */}
        <div className="mt-3 sm:mt-4 w-full max-w-2xl bg-[#3B1720]/90 backdrop-blur-xl border border-white/15 rounded-[14px] p-4 text-[#FCF8F8] shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-right">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="text-[17px] font-semibold text-white leading-tight">
                {data.title}
              </h3>
              {data.badge && (
                <span className="text-[12px] text-[#F3C7CA] font-bold">
                  · {data.badge}
                </span>
              )}
            </div>
            {data.subtitle && (
              <p className="text-[14px] text-[#E8DFE0] leading-snug">
                {data.subtitle}
              </p>
            )}
          </div>

          {data.actionText && data.onAction && (
            <button
              type="button"
              onClick={() => {
                onClose();
                data.onAction?.();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#B92B3A] hover:bg-[#A52432] active:scale-95 text-white text-[14px] font-semibold rounded-full transition-all shrink-0 shadow-sm"
            >
              <span>{data.actionText}</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
