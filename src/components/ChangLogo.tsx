import React from 'react';

interface ChangLogoProps {
  className?: string;
  variant?: 'white' | 'red' | 'dark' | 'currentColor';
}

/**
 * ChangLogo renders the authentic original logo artwork with transparent background.
 * It uses the pixel-perfect transparent renders directly generated from the academy's official source artwork.
 */
export const ChangLogo: React.FC<ChangLogoProps> = ({
  className = 'w-auto h-10',
  variant = 'currentColor'
}) => {
  return (
    <span className={`inline-flex items-center justify-center relative ${className} select-none`}>
      {/* 
        When variant is 'white': always show white version
        When variant is 'red': show crimson red version
        When variant is 'dark' or 'currentColor': dynamically show red/dark in light mode, and white in dark mode
      */}
      {variant === 'white' ? (
        <img
          src="/chang_logo_clean_white.webp"
          alt="لوگوی رسمی آموزشگاه موسیقی چنگ"
          className="w-full h-full object-contain filter drop-shadow-sm"
          loading="eager"
        />
      ) : variant === 'red' ? (
        <img
          src="/chang_logo_clean_red.webp"
          alt="لوگوی رسمی آموزشگاه موسیقی چنگ"
          className="w-full h-full object-contain"
          loading="eager"
        />
      ) : (
        <>
          {/* Light mode: Red logo */}
          <img
            src="/chang_logo_clean_red.webp"
            alt="لوگوی آموزشگاه چنگ"
            className="w-full h-full object-contain dark:hidden"
            loading="eager"
          />
          {/* Dark mode: Crisp White logo */}
          <img
            src="/chang_logo_clean_white.webp"
            alt="لوگوی آموزشگاه چنگ"
            className="w-full h-full object-contain hidden dark:block filter drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]"
            loading="eager"
          />
        </>
      )}
    </span>
  );
};
