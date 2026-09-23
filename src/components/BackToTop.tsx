import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrolled > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: isReduced ? 'auto' : 'smooth',
    });
    const heading = document.querySelector('h1') || document.querySelector('header');
    if (heading && typeof (heading as HTMLElement).focus === 'function') {
      (heading as HTMLElement).setAttribute('tabindex', '-1');
      (heading as HTMLElement).focus({ preventScroll: true });
    }
  };

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 transition-all duration-300 pointer-events-none group ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
          : 'opacity-0 translate-y-4 scale-90'
      }`}
    >
      {/* Editorial circular control button */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="بازگشت به بالای صفحه"
        title="بازگشت به ابتدای صفحه"
        className="w-11 h-11 rounded-full bg-[#F4F1EB]/95 hover:bg-[#F6E4E1] active:scale-95 text-[#211F1E] hover:text-[#C93438] hover:border-[#C93438] border border-[#D9D2CA] shadow-md flex items-center justify-center transition-all duration-150 backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C93438]"
      >
        <ChevronUp className="w-5 h-5 transition-transform duration-150 group-hover:-translate-y-0.5" />
      </button>

      {/* Micro Tooltip */}
      <span
        aria-hidden="true"
        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#211F1E] text-[#F4F1EB] text-[11px] font-medium rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none border border-[#D9D2CA]/40"
      >
        بالای صفحه
      </span>
    </div>
  );
};
